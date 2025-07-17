package com.example.studentconnect.factory;

import com.example.studentconnect.model.RegisterDTO;
import com.example.studentconnect.model.*;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {
    public static User createUser(RegisterDTO dto) {
        return switch (dto.getUserType()) {
            case STUDENT -> Student.builder()
                    .name(dto.getName())
                    .email(dto.getEmail())
                    .password(dto.getPassword())
                    .branch(dto.getBranch())
                    .college(dto.getCollege())
                    .currentYear(dto.getCurrentYear())
                    .userType(UserType.STUDENT)
                    .goal(dto.getGoal())
                    .availableTime(dto.getAvailableTime())
                    .mentorAssigned(false)
                    .build();

            case MENTOR -> Mentor.builder()
                    .name(dto.getName())
                    .email(dto.getEmail())
                    .password(dto.getPassword())
                    .branch(dto.getBranch())
                    .college(dto.getCollege())
                    .currentYear(dto.getCurrentYear())
                    .userType(UserType.MENTOR)
                    .expertise(dto.getExpertise())
                    .availableTime(dto.getAvailableTime())
                    .studentAssigned(false)
                    .build();
        };
    }
}
