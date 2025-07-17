package com.example.studentconnect.matching;

import com.example.studentconnect.model.Mentor;
import com.example.studentconnect.model.Student;

public class BasicMatchStrategy implements MatchStrategy {
    @Override
    public boolean isMatch(Student student, Mentor mentor) {
        return mentor.getCollege().equalsIgnoreCase(student.getCollege()) &&
                mentor.getCurrentYear() >= student.getCurrentYear();
    }
}
