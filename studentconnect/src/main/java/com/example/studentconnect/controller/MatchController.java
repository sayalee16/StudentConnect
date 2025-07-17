package com.example.studentconnect.controller;

import com.example.studentconnect.matching.MatchStrategyType;
import com.example.studentconnect.model.Mentor;
import com.example.studentconnect.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

//    @GetMapping("/student/{id}/mentors")
//    public ResponseEntity<List<Mentor>> getMentorMatches(@PathVariable Long id) {
//        return ResponseEntity.ok(matchService.getRecommendedMentors(id));
//    }

    @GetMapping
    public List<Mentor> getRecommendations(
            @RequestParam Long studentId,
            @RequestParam List<MatchStrategyType> strategies) {
        return matchService.getRecommendedMentors(studentId, strategies);
    }

}
