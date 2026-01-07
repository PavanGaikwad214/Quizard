package com.example.quizzapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quizzapp.model.Questions;
import com.example.quizzapp.service.QuestionsService;

@RestController
@RequestMapping("/admin/questions")
public class AdminQuestionsController {
	
	@Autowired
	QuestionsService questionService;

	@GetMapping("allQuestions")
	public ResponseEntity<List<Questions>> getAllQuestions() {
		return  questionService.getAllQuestions();
	}
	
	
	@PostMapping("add")
	public ResponseEntity<String> addQuestions(@RequestBody Questions question) {
	     return questionService.addQuestion(question);
	}
}
