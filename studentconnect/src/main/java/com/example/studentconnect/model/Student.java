package com.example.studentconnect.model;

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
public class Student extends User {

    @ElementCollection
    private List<String> goal; 

    @ElementCollection
    private List<String> availableTime; 

    @Builder.Default
    private boolean mentorAssigned = false;

    @ManyToMany
    @JoinTable(
            name = "student_mentor",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "mentor_id")
    )
    @Builder.Default
    private List<Mentor> assignedMentors = new ArrayList<>();

    @PrePersist
    public void setUserType() {
        super.setUserType(UserType.STUDENT);
    }

}
