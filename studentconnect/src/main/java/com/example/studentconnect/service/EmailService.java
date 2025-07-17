package com.example.studentconnect.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendStudentNotification(String toEmail, String studentName, String mentorName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Mentor Request Accepted");
        message.setText("Hi " + studentName + ",\n\nYour request has been accepted by " + mentorName + "! 🎉\n\nYou’re connected with a senior who’s here to help — go ahead and say hi.\n\n~ StudentConnect");
        message.setFrom("your_email@gmail.com");

        mailSender.send(message);
    }
}

