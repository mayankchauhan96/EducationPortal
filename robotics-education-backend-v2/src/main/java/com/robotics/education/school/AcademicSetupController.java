package com.robotics.education.school;

import com.robotics.education.auth.AdminUser;
import com.robotics.education.auth.AdminUserRepository;
import com.robotics.education.auth.Role;
import com.robotics.education.common.ApiResponse;
import com.robotics.education.common.ResourceNotFoundException;
import com.robotics.education.curriculum.Curriculum;
import com.robotics.education.curriculum.CurriculumRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/academic")
@PreAuthorize("hasRole('ADMIN')")
@Transactional
public class AcademicSetupController {
    public record SchoolRequest(@NotBlank @Size(max = 160) String name) {}
    public record SchoolResponse(Long id, String name, boolean active) {}
    public record ClassroomRequest(
        @NotNull Long schoolId,
        @NotNull Long curriculumId,
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Size(max = 20) String academicYear
    ) {}
    public record ClassroomResponse(Long id, Long schoolId, String schoolName, Long curriculumId,
                                    String curriculumName, String name, String academicYear) {}
    public record PlacementRequest(Long schoolId, List<Long> classroomIds) {}
    public record ParentChildrenRequest(List<Long> studentIds) {}
    public record AcademicUserResponse(
        Long id, String email, String role, List<Long> classroomIds, List<String> classroomNames,
        Long classroomSchoolId, Long principalSchoolId, String principalSchoolName, List<Long> linkedStudentIds,
        List<String> linkedStudentEmails
    ) {}

    private final SchoolRepository schools;
    private final ClassroomRepository classrooms;
    private final ClassroomMembershipRepository memberships;
    private final PrincipalSchoolRepository principalSchools;
    private final ParentStudentLinkRepository parentLinks;
    private final AdminUserRepository users;
    private final CurriculumRepository curricula;

    public AcademicSetupController(
        SchoolRepository schools,
        ClassroomRepository classrooms,
        ClassroomMembershipRepository memberships,
        PrincipalSchoolRepository principalSchools,
        ParentStudentLinkRepository parentLinks,
        AdminUserRepository users,
        CurriculumRepository curricula
    ) {
        this.schools = schools;
        this.classrooms = classrooms;
        this.memberships = memberships;
        this.principalSchools = principalSchools;
        this.parentLinks = parentLinks;
        this.users = users;
        this.curricula = curricula;
    }

    @GetMapping("/schools")
    public ApiResponse<List<SchoolResponse>> listSchools() {
        return ApiResponse.ok(schools.findAll().stream()
            .map(school -> new SchoolResponse(school.getId(), school.getName(), school.isActive()))
            .toList());
    }

    @PostMapping("/schools")
    public ApiResponse<SchoolResponse> createSchool(@Valid @RequestBody SchoolRequest request) {
        School school = new School();
        school.setName(request.name().trim());
        School saved = schools.save(school);
        return ApiResponse.created(new SchoolResponse(saved.getId(), saved.getName(), saved.isActive()));
    }

    @GetMapping("/classrooms")
    public ApiResponse<List<ClassroomResponse>> listClassrooms(@RequestParam Long schoolId) {
        requireSchool(schoolId);
        return ApiResponse.ok(classrooms.findAllBySchoolIdOrderByNameAsc(schoolId).stream().map(this::map).toList());
    }

    @PostMapping("/classrooms")
    public ApiResponse<ClassroomResponse> createClassroom(@Valid @RequestBody ClassroomRequest request) {
        Classroom classroom = new Classroom();
        classroom.setSchool(requireSchool(request.schoolId()));
        classroom.setCurriculum(requireCurriculum(request.curriculumId()));
        classroom.setName(request.name().trim());
        classroom.setAcademicYear(request.academicYear().trim());
        return ApiResponse.created(map(classrooms.save(classroom)));
    }

    @GetMapping("/users")
    public ApiResponse<List<AcademicUserResponse>> listAcademicUsers() {
        return ApiResponse.ok(users.findAll().stream()
            .filter(user -> switch (user.getRole()) {
                case STUDENT, TEACHER, PRINCIPAL, PARENT -> true;
                default -> false;
            })
            .map(this::map)
            .toList());
    }

    @PutMapping("/users/{userId}/placement")
    public ApiResponse<AcademicUserResponse> setPlacement(
        @PathVariable Long userId,
        @Valid @RequestBody PlacementRequest request
    ) {
        AdminUser user = requireUser(userId);
        List<Long> classroomIds = request.classroomIds() == null ? List.of() : request.classroomIds().stream().distinct().toList();

        if (user.getRole() == Role.PRINCIPAL) {
            if (request.schoolId() == null || !classroomIds.isEmpty()) {
                throw new IllegalArgumentException("Assign a principal to one school, not a classroom.");
            }
            principalSchools.deleteAllByUserId(userId);
            principalSchools.save(new PrincipalSchool(user, requireSchool(request.schoolId())));
            memberships.deleteAllByUserId(userId);
        } else if (user.getRole() == Role.TEACHER || user.getRole() == Role.STUDENT) {
            if (request.schoolId() == null || classroomIds.isEmpty()) {
                throw new IllegalArgumentException("Assign a school and at least one classroom.");
            }
            if (user.getRole() == Role.STUDENT && classroomIds.size() != 1) {
                throw new IllegalArgumentException("A student can be assigned to one classroom.");
            }
            List<Classroom> selected = classroomIds.stream().map(this::requireClassroom).toList();
            if (selected.stream().anyMatch(classroom -> !classroom.getSchool().getId().equals(request.schoolId()))) {
                throw new IllegalArgumentException("All selected classrooms must belong to the assigned school.");
            }
            memberships.deleteAllByUserId(userId);
            selected.forEach(classroom -> memberships.save(new ClassroomMembership(user, classroom)));
            principalSchools.deleteAllByUserId(userId);
        } else {
            throw new IllegalArgumentException("Only principals, teachers, and students have school placement.");
        }

        return ApiResponse.ok(map(user));
    }

    @PutMapping("/users/{userId}/children")
    public ApiResponse<AcademicUserResponse> setParentChildren(
        @PathVariable Long userId,
        @Valid @RequestBody ParentChildrenRequest request
    ) {
        AdminUser parent = requireUser(userId);
        if (parent.getRole() != Role.PARENT) {
            throw new IllegalArgumentException("Only a parent account can be linked to students.");
        }

        List<Long> studentIds = request.studentIds() == null ? List.of() : request.studentIds().stream().distinct().toList();
        List<AdminUser> students = studentIds.stream().map(this::requireUser).toList();
        if (students.stream().anyMatch(student -> student.getRole() != Role.STUDENT)) {
            throw new IllegalArgumentException("Parent links can only point to student accounts.");
        }
        parentLinks.deleteAllByParentId(userId);
        students.forEach(student -> parentLinks.save(new ParentStudentLink(parent, student)));
        return ApiResponse.ok(map(parent));
    }

    private School requireSchool(Long id) {
        return schools.findById(id).orElseThrow(() -> new ResourceNotFoundException("School not found"));
    }

    private Classroom requireClassroom(Long id) {
        return classrooms.findById(id).orElseThrow(() -> new ResourceNotFoundException("Classroom not found"));
    }

    private Curriculum requireCurriculum(Long id) {
        return curricula.findById(id).orElseThrow(() -> new ResourceNotFoundException("Curriculum stage not found"));
    }

    private AdminUser requireUser(Long id) {
        return users.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private ClassroomResponse map(Classroom classroom) {
        return new ClassroomResponse(
            classroom.getId(), classroom.getSchool().getId(), classroom.getSchool().getName(),
            classroom.getCurriculum().getId(), classroom.getCurriculum().getLevelName(),
            classroom.getName(), classroom.getAcademicYear());
    }

    private AcademicUserResponse map(AdminUser user) {
        List<ClassroomMembership> userMemberships = memberships.findAllByUserId(user.getId());
        List<PrincipalSchool> principalLinks = principalSchools.findAllByUserId(user.getId());
        List<ParentStudentLink> childLinks = parentLinks.findAllByParentId(user.getId());
        ClassroomMembership classroomLink = userMemberships.isEmpty() ? null : userMemberships.get(0);
        PrincipalSchool principalLink = principalLinks.isEmpty() ? null : principalLinks.get(0);
        return new AcademicUserResponse(
            user.getId(),
            user.getEmail(),
            user.getRole().name(),
            userMemberships.stream().map(link -> link.getClassroom().getId()).toList(),
            userMemberships.stream().map(link -> link.getClassroom().getName()).toList(),
            classroomLink == null ? null : classroomLink.getClassroom().getSchool().getId(),
            principalLink == null ? null : principalLink.getSchool().getId(),
            principalLink == null ? null : principalLink.getSchool().getName(),
            childLinks.stream().map(link -> link.getStudent().getId()).toList(),
            childLinks.stream().map(link -> link.getStudent().getEmail()).toList());
    }
}
