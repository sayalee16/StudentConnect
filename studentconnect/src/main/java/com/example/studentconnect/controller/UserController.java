package com.example.studentconnect.controller;

import com.example.studentconnect.model.*;
import com.example.studentconnect.factory.UserFactory;
import com.example.studentconnect.repository.MentorRepository;
import com.example.studentconnect.repository.StudentRepository;
import com.example.studentconnect.repository.UserRepository;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepo;
    private final StudentRepository studentRepo;
    private final MentorRepository mentorRepo;

    @PostMapping("/register/student")
    public Student registerStudent(@RequestBody Student student) {
        student.setUserType(UserType.STUDENT);
        return studentRepo.save(student);
    }

    @PostMapping("/register/mentor")
    public Mentor registerMentor(@RequestBody Mentor mentor) {
        mentor.setUserType(UserType.MENTOR);
        return mentorRepo.save(mentor);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginReq) {
        Optional<User> userOpt = Optional.ofNullable(userRepo.findByEmail(loginReq.getEmail()));

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(loginReq.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/students")
    public List<User> getAllStudents(){
        return userRepo.findByUserType(UserType.STUDENT);
    }

    @GetMapping("/mentors")
    public List<User> getAllMentors(){
        return userRepo.findByUserType(UserType.MENTOR);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDTO dto) {
        User createdUser = UserFactory.createUser(dto);

        if (createdUser instanceof Student student) {
            return ResponseEntity.ok(studentRepo.save(student));
        }

        if (createdUser instanceof Mentor mentor) {
            return ResponseEntity.ok(mentorRepo.save(mentor));
        }

        return ResponseEntity.badRequest().build();
    }


}
