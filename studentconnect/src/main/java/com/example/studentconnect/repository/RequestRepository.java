package com.example.studentconnect.repository;

import com.example.studentconnect.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByMentorAndStatus(Mentor mentor, RequestStatus status);
    List<Request> findByStudent(Student student);

    Collection<? extends Request> findByStudentId(Long id);

    Collection<? extends Request> findByMentorId(Long id);
}
