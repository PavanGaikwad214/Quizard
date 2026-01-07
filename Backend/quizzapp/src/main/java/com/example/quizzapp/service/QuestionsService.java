package com.example.quizzapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.quizzapp.dao.QuestionsDao;
import com.example.quizzapp.model.Questions;

@Service
public class QuestionsService {

	@Autowired
	QuestionsDao questionDao;
	
	 // =========================
    // ADMIN METHODS
    // =========================
	
	 public ResponseEntity<List<Questions>> getAllQuestions() {
	        try {
	            return new ResponseEntity<>(
	                questionDao.findAll(),
	                HttpStatus.OK
	            );
	        } catch (Exception e) {
	            return new ResponseEntity<>(
	                new ArrayList<>(),
	                HttpStatus.INTERNAL_SERVER_ERROR
	            );
	        }
	    }

	    public ResponseEntity<String> addQuestion(Questions question) {
	        try {
	            questionDao.save(question);
	            return new ResponseEntity<>(
	                "Question added successfully",
	                HttpStatus.CREATED
	            );
	        } catch (Exception e) {
	            return new ResponseEntity<>(
	                "Failed to add question",
	                HttpStatus.INTERNAL_SERVER_ERROR
	            );
	        }
	    }
	    
	    
	    // =========================
	    // USER METHODS (PLAY QUIZ)
	    // =========================

	    
	    public ResponseEntity<List<Questions>> getQuestionsByCategory(String category) {
	        try {
	            // normalize category
	            category = category.toLowerCase();

	            int QUESTION_COUNT = 10; // change to 15 anytime

	            List<Questions> questions =
	                questionDao.findRandomQuestionsByCategory(category, QUESTION_COUNT);

	            return new ResponseEntity<>(questions, HttpStatus.OK);

	        } catch (Exception e) {
	            return new ResponseEntity<>(
	                new ArrayList<>(),
	                HttpStatus.INTERNAL_SERVER_ERROR
	            );
	        }
	    }
}
