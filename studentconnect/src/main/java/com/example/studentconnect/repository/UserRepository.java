package com.example.studentconnect.repository;

import com.example.studentconnect.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByUserType(UserType userType);
}
