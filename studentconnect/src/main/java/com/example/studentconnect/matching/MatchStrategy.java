package com.example.studentconnect.matching;

import com.example.studentconnect.model.Mentor;
import com.example.studentconnect.model.Student;

public interface MatchStrategy {
    boolean isMatch(Student student, Mentor mentor);
}
