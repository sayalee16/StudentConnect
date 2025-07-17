package com.example.studentconnect.service;

import com.example.studentconnect.matching.*;
import com.example.studentconnect.model.Mentor;
import com.example.studentconnect.model.Student;
import com.example.studentconnect.repository.MentorRepository;
import com.example.studentconnect.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private MentorRepository mentorRepo;

    public List<Mentor> getRecommendedMentors(Long studentId, List<MatchStrategyType> strategyTypes) {
        Student student = studentRepo.findById(studentId).orElseThrow();

        List<MatchStrategy> strategies = MatchStrategyFactory.getStrategies(strategyTypes);

        MatchContext context = new MatchContext(strategies);

        return mentorRepo.findAll().stream()
                .filter(mentor -> context.isMatch(student, mentor))
                .toList();
    }

}
