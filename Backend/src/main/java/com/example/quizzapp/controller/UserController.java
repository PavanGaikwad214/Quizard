package com.example.quizzapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizzapp.model.Questions;
import com.example.quizzapp.service.QuestionsService;

@RestController
@RequestMapping("/quiz")
public class UserController {

	@Autowired
	private QuestionsService questionsService;
	
	 @GetMapping("/category/{category}")
    public ResponseEntity<List<Questions>> playQuiz(
            @PathVariable String category,
            @RequestParam(defaultValue = "10") int limit
    ) {
        System.out.println("🔥 PLAY CONTROLLER HIT: " + category + " limit=" + limit);

        return questionsService.getQuestionsByCategory(category, limit);
    }
	
}
