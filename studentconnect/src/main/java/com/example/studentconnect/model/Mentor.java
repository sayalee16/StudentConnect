package com.example.studentconnect.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Mentor extends User {

    @ElementCollection
    private List<String> expertise; 

    @ElementCollection
    private List<String> availableTime;

    @Builder.Default
    private boolean studentAssigned = false;

    @ManyToMany(mappedBy = "assignedMentors")
    @Builder.Default
    @JsonIgnore
    private List<Student> assignedStudents = new ArrayList<>();

    @PrePersist
    public void setUserType() {
        super.setUserType(UserType.MENTOR);
    }
}
