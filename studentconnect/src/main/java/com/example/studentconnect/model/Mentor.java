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
public class Mentor extends User {

    @ElementCollection
    private List<String> expertise; // ["frontend", "java"]

    @ElementCollection
    private List<String> availableTime;

    @Builder.Default
    private boolean studentAssigned = false;

    @PrePersist
    public void setUserType() {
        super.setUserType(UserType.MENTOR);
    }
}
