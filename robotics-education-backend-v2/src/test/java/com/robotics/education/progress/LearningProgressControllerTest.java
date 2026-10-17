package com.robotics.education.progress;

import com.robotics.education.auth.AdminUser;
import com.robotics.education.auth.AdminUserRepository;
import com.robotics.education.auth.Role;
import com.robotics.education.curriculum.CurriculumLessonRepository;
import com.robotics.education.school.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LearningProgressControllerTest {
    @Mock private AdminUserRepository users;
    @Mock private ClassroomRepository classrooms;
    @Mock private ClassroomMembershipRepository memberships;
    @Mock private PrincipalSchoolRepository principalSchools;
    @Mock private ParentStudentLinkRepository parentLinks;
    @Mock private CurriculumLessonRepository lessons;
    @Mock private StudentLessonProgressRepository lessonProgress;
    @Mock private StudentWorkProgressRepository workProgress;

    @Test
    void teacherCannotUpdateStudentOutsideAssignedClassrooms() throws Exception {
        AdminUser teacher = user(1L, Role.TEACHER, "teacher@example.test");
        AdminUser student = user(2L, Role.STUDENT, "student@example.test");
        Classroom classroom = new Classroom();

        when(users.findByEmailIgnoreCase(teacher.getEmail())).thenReturn(Optional.of(teacher));
        when(users.findById(student.getId())).thenReturn(Optional.of(student));
        when(memberships.findAllByUserId(teacher.getId())).thenReturn(List.of());
        when(memberships.findAllByUserId(student.getId()))
            .thenReturn(List.of(new ClassroomMembership(student, classroom)));

        LearningProgressController controller = new LearningProgressController(
            users, classrooms, memberships, principalSchools, parentLinks, lessons, lessonProgress, workProgress);

        assertThrows(AccessDeniedException.class, () -> controller.updateLessonProgress(
            student.getId(), 10L, new LearningProgressController.LessonUpdateRequest(true, null),
            teacher::getEmail));
        verifyNoInteractions(lessons, lessonProgress, workProgress);
    }

    private AdminUser user(Long id, Role role, String email) throws Exception {
        AdminUser user = new AdminUser(email, "not-a-real-password", role);
        Field idField = AdminUser.class.getDeclaredField("id");
        idField.setAccessible(true);
        idField.set(user, id);
        return user;
    }
}
