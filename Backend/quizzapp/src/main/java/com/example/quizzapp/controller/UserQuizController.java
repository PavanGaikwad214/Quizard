package com.example.quizzapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizzapp.model.QuestionsWrapper;
import com.example.quizzapp.model.Response;
import com.example.quizzapp.model.ReviewQuestionWrapper;
import com.example.quizzapp.service.QuizService;

@RestController
@RequestMapping("/quiz")
public class UserQuizController {

	@Autowired
	private QuizService quizService;
	
	 // USER: Play quiz by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionsWrapper>> getQuizQuestions(
            @PathVariable int id) {

    	System.out.println("❌ QUIZ CONTROLLER HIT with id = " + id);
    	
        return quizService.getQuizQuestions(id);
    }

    // USER: Submit quiz
    @PostMapping("/submit/{id}")
    public ResponseEntity<Integer> submitQuiz(
            @PathVariable int id,
            @RequestBody List<Response> response) {

        return quizService.calculateResult(id, response);
    }

    // USER: Review quiz
    @GetMapping("/review/{id}")
    public ResponseEntity<List<ReviewQuestionWrapper>> getReview(
            @PathVariable int id) {

        return quizService.getReviewQuestions(id);
    }
	
}
