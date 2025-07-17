package com.example.studentconnect.matching;

import com.example.studentconnect.model.Mentor;
import com.example.studentconnect.model.Student;

public class GoalMatchStrategy implements MatchStrategy {
    @Override
    public boolean isMatch(Student student, Mentor mentor) {
        return student.getGoal().stream().anyMatch(goal ->
                mentor.getExpertise().contains(goal));
    }
}
