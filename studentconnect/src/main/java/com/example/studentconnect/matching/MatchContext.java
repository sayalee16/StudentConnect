package com.example.studentconnect.matching;

import com.example.studentconnect.model.Mentor;
import com.example.studentconnect.model.Student;

import java.util.List;

public class MatchContext {
    private final List<MatchStrategy> strategies;

    public MatchContext(List<MatchStrategy> strategies) {
        this.strategies = strategies;
    }

    public boolean isMatch(Student student, Mentor mentor) {
        for (MatchStrategy strategy : strategies) {
            if (!strategy.isMatch(student, mentor)) {
                return false; // all conditions must be true
            }
        }
        return true;
    }
}
