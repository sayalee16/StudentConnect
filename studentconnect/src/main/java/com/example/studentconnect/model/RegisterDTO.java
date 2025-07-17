package com.example.studentconnect.model;

import com.example.studentconnect.model.UserType;
import lombok.Data;

import java.util.List;

@Data
public class RegisterDTO {
    private String name;
    private String email;
    private String password;
    private String branch;
    private String college;
    private int currentYear;
    private UserType userType;

    // For student
    private List<String> goal;
    private List<String> availableTime;

    // For mentor
    private List<String> expertise;
}
