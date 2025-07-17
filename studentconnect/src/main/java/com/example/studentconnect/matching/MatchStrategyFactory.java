package com.example.studentconnect.matching;

import java.util.ArrayList;
import java.util.List;

public class MatchStrategyFactory {

    public static List<MatchStrategy> getStrategies(List<MatchStrategyType> types) {
        List<MatchStrategy> strategies = new ArrayList<>();
        for (MatchStrategyType type : types) {
            switch (type) {
                case BASIC -> strategies.add(new BasicMatchStrategy());
                case GOAL -> strategies.add(new GoalMatchStrategy());
                case TIME -> strategies.add(new TimeMatchStrategy());
            }
        }
        return strategies;
    }
}
