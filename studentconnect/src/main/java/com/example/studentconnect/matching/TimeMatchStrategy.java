package com.example.studentconnect.matching;

import com.example.studentconnect.model.Mentor;
import com.example.studentconnect.model.Student;

public class TimeMatchStrategy implements MatchStrategy {
    @Override
    public boolean isMatch(Student student, Mentor mentor) {
        return student.getAvailableTime().stream().anyMatch(time ->
                mentor.getAvailableTime().contains(time));
    }
}
