package com.example.studentconnect.controller;

import com.example.studentconnect.model.*;
import com.example.studentconnect.repository.*;
import com.example.studentconnect.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;


import java.util.List;

@RestController
@RequestMapping("/api/request")
@RequiredArgsConstructor
public class RequestController {
    private final EmailService emailService;
    private  final RequestRepository reqRepo;
    private final StudentRepository studentRepo;
    private final MentorRepository mentorRepo;

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody ReqDTO dto) {
        Optional<Student> studentOpt = studentRepo.findById(dto.getStudentId());
        Optional<Mentor> mentorOpt = mentorRepo.findById(dto.getMentorId());

        if (studentOpt.isEmpty() || mentorOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Request req = Request.builder()
                .student(studentOpt.get())
                .mentor(mentorOpt.get())
                .message(dto.getMessage())
                .status(RequestStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(reqRepo.save(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Request>> getRequestsForUser(@PathVariable Long id) {
        Optional<Student> studentOpt = studentRepo.findById(id);
        Optional<Mentor> mentorOpt = mentorRepo.findById(id);

        List<Request> requests = new ArrayList<>();

        if (studentOpt.isPresent()) {
            requests.addAll(reqRepo.findByStudentId(id));
        }

        if (mentorOpt.isPresent()) {
            requests.addAll(reqRepo.findByMentorId(id));
        }

        if (requests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(requests);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        Optional<Request> requestOpt = reqRepo.findById(id);

        if (requestOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        reqRepo.deleteById(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    @PutMapping("/status")
    public ResponseEntity<Request> updateRequestStatus(@RequestBody ReqStatusDTO dto) {
        Optional<Request> requestOpt = reqRepo.findById(dto.getRequestId());

        if (requestOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Request request = requestOpt.get();
        request.setStatus(dto.getStatus());
        reqRepo.save(request);

        // 🌟 If the request is accepted, assign the mentor to the student
        if (dto.getStatus() == RequestStatus.ACCEPTED) {
            Student student = request.getStudent();
            Mentor mentor = request.getMentor();
            System.out.println("✅ Mentor accepted request ID: " + request.getId());
            System.out.println("🧑 Student Email: " + student.getEmail());
            System.out.println("📧 Sending email...");
            try {
                emailService.sendStudentNotification(student.getEmail(), student.getName(), mentor.getName());
            } catch (Exception e) {
                System.out.println("❌ Email sending failed: " + e.getMessage());
            }

            student.setMentorAssigned(true);
            mentor.setStudentAssigned(true);
            student.setAssignedMentorId(String.valueOf(mentor.getId())); // use toString if your ID is Long
            studentRepo.save(student);
        }

        return ResponseEntity.ok(request);
    }



}
