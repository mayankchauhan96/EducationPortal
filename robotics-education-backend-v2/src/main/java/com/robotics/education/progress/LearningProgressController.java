package com.robotics.education.progress;

import com.robotics.education.auth.AdminUser;
import com.robotics.education.auth.AdminUserRepository;
import com.robotics.education.auth.Role;
import com.robotics.education.common.ApiResponse;
import com.robotics.education.common.ResourceNotFoundException;
import com.robotics.education.curriculum.CurriculumLesson;
import com.robotics.education.curriculum.CurriculumLessonRepository;
import com.robotics.education.school.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
@Transactional
public class LearningProgressController {
    public record ClassResponse(Long id, String schoolName, String name, String academicYear, String curriculumName) {}
    public record LessonProgressResponse(
        Long lessonId, String title, String description, Integer displayOrder, boolean completed, String notes
    ) {}
    public record WorkProgressResponse(
        Long id, String type, String title, boolean completed, String notes, OffsetDateTime updatedAt
    ) {}
    public record StudentProgressResponse(
        Long studentId, String email, String schoolName, String classroomName, String curriculumName,
        long completedLessons, long totalLessons, List<LessonProgressResponse> lessons, List<WorkProgressResponse> work
    ) {}
    public record LessonUpdateRequest(boolean completed, @Size(max = 1000) String notes) {}
    public record WorkStatusUpdateRequest(boolean completed, @Size(max = 1000) String notes) {}
    public record WorkUpdateRequest(
        @NotNull StudentWorkProgress.WorkType type,
        @NotBlank @Size(max = 160) String title,
        boolean completed,
        @Size(max = 1000) String notes
    ) {}

    private final AdminUserRepository users;
    private final ClassroomRepository classrooms;
    private final ClassroomMembershipRepository memberships;
    private final PrincipalSchoolRepository principalSchools;
    private final ParentStudentLinkRepository parentLinks;
    private final CurriculumLessonRepository lessons;
    private final StudentLessonProgressRepository lessonProgress;
    private final StudentWorkProgressRepository workProgress;

    public LearningProgressController(
        AdminUserRepository users,
        ClassroomRepository classrooms,
        ClassroomMembershipRepository memberships,
        PrincipalSchoolRepository principalSchools,
        ParentStudentLinkRepository parentLinks,
        CurriculumLessonRepository lessons,
        StudentLessonProgressRepository lessonProgress,
        StudentWorkProgressRepository workProgress
    ) {
        this.users = users;
        this.classrooms = classrooms;
        this.memberships = memberships;
        this.principalSchools = principalSchools;
        this.parentLinks = parentLinks;
        this.lessons = lessons;
        this.lessonProgress = lessonProgress;
        this.workProgress = workProgress;
    }

    @GetMapping("/teacher/classes")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<List<ClassResponse>> teacherClasses(java.security.Principal principal) {
        AdminUser teacher = requireUser(principal.getName(), Role.TEACHER);
        List<ClassResponse> result = memberships.findAllByUserId(teacher.getId()).stream()
            .map(ClassroomMembership::getClassroom)
            .distinct()
            .map(this::mapClass)
            .toList();
        return ApiResponse.ok(result);
    }

    @GetMapping("/teacher/classes/{classroomId}/students")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<List<StudentProgressResponse>> teacherClassProgress(
        @PathVariable Long classroomId,
        java.security.Principal principal
    ) {
        AdminUser teacher = requireUser(principal.getName(), Role.TEACHER);
        if (!memberships.existsByUserIdAndClassroomId(teacher.getId(), classroomId)) {
            throw new AccessDeniedException("You are not assigned to this classroom.");
        }
        Classroom classroom = requireClassroom(classroomId);
        return ApiResponse.ok(memberships.findAllByClassroomId(classroomId).stream()
            .map(ClassroomMembership::getUser)
            .filter(student -> student.getRole() == Role.STUDENT)
            .map(student -> mapStudentProgress(student, classroom))
            .toList());
    }

    @PatchMapping("/teacher/students/{studentId}/lessons/{lessonId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<StudentProgressResponse> updateLessonProgress(
        @PathVariable Long studentId,
        @PathVariable Long lessonId,
        @Valid @RequestBody LessonUpdateRequest request,
        java.security.Principal principal
    ) {
        AdminUser teacher = requireUser(principal.getName(), Role.TEACHER);
        AdminUser student = requireUser(studentId);
        Classroom classroom = requireSharedClassroom(teacher, student);
        CurriculumLesson lesson = lessons.findByIdAndCurriculumId(lessonId, classroom.getCurriculum().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Lesson not found for the student's class curriculum"));

        StudentLessonProgress progress = lessonProgress.findByStudentIdAndLessonId(studentId, lessonId)
            .orElseGet(() -> new StudentLessonProgress(student, lesson, teacher.getEmail()));
        progress.setCompleted(request.completed());
        progress.setNotes(request.notes());
        progress.setUpdatedBy(teacher.getEmail());
        lessonProgress.save(progress);

        return ApiResponse.ok(mapStudentProgress(student, classroom));
    }

    @PostMapping("/teacher/students/{studentId}/work")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<StudentProgressResponse> recordStudentWork(
        @PathVariable Long studentId,
        @Valid @RequestBody WorkUpdateRequest request,
        java.security.Principal principal
    ) {
        AdminUser teacher = requireUser(principal.getName(), Role.TEACHER);
        AdminUser student = requireUser(studentId);
        Classroom classroom = requireSharedClassroom(teacher, student);
        StudentWorkProgress work = new StudentWorkProgress(student, request.type(), request.title().trim(), teacher.getEmail());
        work.setCompleted(request.completed());
        work.setNotes(request.notes());
        workProgress.save(work);
        return ApiResponse.ok(mapStudentProgress(student, classroom));
    }

    @PatchMapping("/teacher/students/{studentId}/work/{workId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<StudentProgressResponse> updateStudentWork(
        @PathVariable Long studentId,
        @PathVariable Long workId,
        @Valid @RequestBody WorkStatusUpdateRequest request,
        java.security.Principal principal
    ) {
        AdminUser teacher = requireUser(principal.getName(), Role.TEACHER);
        AdminUser student = requireUser(studentId);
        Classroom classroom = requireSharedClassroom(teacher, student);
        StudentWorkProgress work = workProgress.findByIdAndStudentId(workId, studentId)
            .orElseThrow(() -> new ResourceNotFoundException("Student work record not found"));
        work.setCompleted(request.completed());
        work.setNotes(request.notes());
        work.setUpdatedBy(teacher.getEmail());
        workProgress.save(work);
        return ApiResponse.ok(mapStudentProgress(student, classroom));
    }

    @GetMapping("/student/progress")
    @PreAuthorize("hasRole('STUDENT')")
    public ApiResponse<StudentProgressResponse> studentProgress(java.security.Principal principal) {
        AdminUser student = requireUser(principal.getName(), Role.STUDENT);
        return ApiResponse.ok(mapStudentProgress(student, assignedClassroom(student)));
    }

    @GetMapping("/parent/progress")
    @PreAuthorize("hasRole('PARENT')")
    public ApiResponse<List<StudentProgressResponse>> parentProgress(java.security.Principal principal) {
        AdminUser parent = requireUser(principal.getName(), Role.PARENT);
        return ApiResponse.ok(parentLinks.findAllByParentId(parent.getId()).stream()
            .map(ParentStudentLink::getStudent)
            .map(student -> mapStudentProgress(student, assignedClassroom(student)))
            .toList());
    }

    @GetMapping("/principal/progress")
    @PreAuthorize("hasRole('PRINCIPAL')")
    public ApiResponse<List<StudentProgressResponse>> principalProgress(java.security.Principal principal) {
        AdminUser user = requireUser(principal.getName(), Role.PRINCIPAL);
        Set<Long> schoolIds = new HashSet<>(principalSchools.findAllByUserId(user.getId()).stream()
            .map(link -> link.getSchool().getId())
            .toList());
        if (schoolIds.isEmpty()) {
            return ApiResponse.ok(List.of());
        }
        List<Classroom> schoolClasses = classrooms.findAllBySchoolIdIn(schoolIds);
        return ApiResponse.ok(schoolClasses.stream()
            .flatMap(classroom -> memberships.findAllByClassroomId(classroom.getId()).stream()
                .map(ClassroomMembership::getUser)
                .filter(student -> student.getRole() == Role.STUDENT)
                .map(student -> mapStudentProgress(student, classroom)))
            .toList());
    }

    private StudentProgressResponse mapStudentProgress(AdminUser student, Classroom classroom) {
        if (classroom == null) {
            return new StudentProgressResponse(
                student.getId(), student.getEmail(), null, null, null, 0, 0, List.of(), mapWork(student));
        }

        List<CurriculumLesson> curriculumLessons = lessons
            .findAllByCurriculumIdAndPublishedTrueOrderByDisplayOrderAscIdAsc(classroom.getCurriculum().getId());
        Map<Long, StudentLessonProgress> progressByLesson = new HashMap<>();
        lessonProgress.findAllByStudentId(student.getId())
            .forEach(progress -> progressByLesson.put(progress.getLesson().getId(), progress));
        List<LessonProgressResponse> lessonResponses = curriculumLessons.stream()
            .map(lesson -> {
                StudentLessonProgress progress = progressByLesson.get(lesson.getId());
                return new LessonProgressResponse(
                    lesson.getId(), lesson.getTitle(), lesson.getDescription(), lesson.getDisplayOrder(),
                    progress != null && progress.isCompleted(), progress == null ? null : progress.getNotes());
            })
            .toList();

        return new StudentProgressResponse(
            student.getId(), student.getEmail(), classroom.getSchool().getName(), classroom.getName(),
            classroom.getCurriculum().getLevelName(),
            lessonResponses.stream().filter(LessonProgressResponse::completed).count(),
            lessonResponses.size(),
            lessonResponses,
            mapWork(student));
    }

    private List<WorkProgressResponse> mapWork(AdminUser student) {
        return workProgress.findAllByStudentIdOrderByUpdatedAtDesc(student.getId()).stream()
            .map(work -> new WorkProgressResponse(
                work.getId(), work.getWorkType().name(), work.getTitle(), work.isCompleted(),
                work.getNotes(), work.getUpdatedAt()))
            .toList();
    }

    private Classroom requireSharedClassroom(AdminUser teacher, AdminUser student) {
        if (student.getRole() != Role.STUDENT) {
            throw new IllegalArgumentException("Progress can only be updated for a student account.");
        }
        Set<Long> teacherClassroomIds = new HashSet<>(memberships.findAllByUserId(teacher.getId()).stream()
            .map(link -> link.getClassroom().getId())
            .toList());
        Classroom classroom = assignedClassroom(student);
        if (classroom == null || !teacherClassroomIds.contains(classroom.getId())) {
            throw new AccessDeniedException("You are not assigned to this student's classroom.");
        }
        return classroom;
    }

    private Classroom assignedClassroom(AdminUser student) {
        return memberships.findAllByUserId(student.getId()).stream()
            .map(ClassroomMembership::getClassroom)
            .findFirst()
            .orElse(null);
    }

    private AdminUser requireUser(String email, Role role) {
        AdminUser user = users.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getRole() != role) {
            throw new AccessDeniedException("This account does not have the required role.");
        }
        return user;
    }

    private AdminUser requireUser(Long id) {
        return users.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private Classroom requireClassroom(Long id) {
        return classrooms.findById(id).orElseThrow(() -> new ResourceNotFoundException("Classroom not found"));
    }

    private ClassResponse mapClass(Classroom classroom) {
        return new ClassResponse(
            classroom.getId(), classroom.getSchool().getName(), classroom.getName(),
            classroom.getAcademicYear(), classroom.getCurriculum().getLevelName());
    }
}
