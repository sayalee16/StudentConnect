package com.example.studentconnect.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Student extends User {

    @ElementCollection
    private List<String> goal; // ["frontend", "java"]

    @ElementCollection
    private List<String> availableTime; // ["evening", "morning"]

    @Builder.Default
    private boolean mentorAssigned = false;

    private String assignedMentorId; // <-- ADD THIS

    @PrePersist
    public void setUserType() {
        super.setUserType(UserType.STUDENT);
    }

}
