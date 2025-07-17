package com.example.studentconnect.repository;

import com.example.studentconnect.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
