package com.example.studentconnect.model;


import lombok.Data;

@Data
public class ReqDTO {
    private Long studentId;
    private Long mentorId;
    private String message;
}