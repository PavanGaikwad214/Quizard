package com.example.quizzapp.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.quizzapp.dao.QuestionsDao;
import com.example.quizzapp.dao.QuizDao;
import com.example.quizzapp.model.Questions;
import com.example.quizzapp.model.QuestionsWrapper;
import com.example.quizzapp.model.Quiz;
import com.example.quizzapp.model.Response;
import com.example.quizzapp.model.ReviewQuestionWrapper;

@Service
public class QuizService {

    @Autowired
    private QuizDao quizDao;

    @Autowired
    private QuestionsDao questionsDao;

    // =========================
    // ADMIN: CREATE QUIZ
    // =========================
    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        category = category.toLowerCase(); // normalize

        List<Questions> questions =
            questionsDao.findRandomQuestionsByCategory(category, numQ);

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);

        quizDao.save(quiz);

        return new ResponseEntity<>("Successfully created", HttpStatus.CREATED);
    }

    // =========================
    // USER: PLAY SAVED QUIZ
    // =========================
    public ResponseEntity<List<QuestionsWrapper>> getQuizQuestions(int id) {

        Quiz quiz = quizDao.findById(id)
            .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<QuestionsWrapper> questionsForUser = new ArrayList<>();

        for (Questions q : quiz.getQuestions()) {
            questionsForUser.add(
                new QuestionsWrapper(
                    q.getId(),
                    q.getQuestionTitle(),
                    q.getOption1(),
                    q.getOption2(),
                    q.getOption3(),
                    q.getOption4()
                )
            );
        }

        return new ResponseEntity<>(questionsForUser, HttpStatus.OK);
    }

    // =========================
    // USER: SUBMIT QUIZ
    // =========================
    public ResponseEntity<Integer> calculateResult(int id, List<Response> responses) {

        Quiz quiz = quizDao.findById(id)
            .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Map<Integer, String> answerMap = new HashMap<>();

        for (Response r : responses) {
            answerMap.put(r.getQuestionId(), r.getResponse());
        }

        int score = 0;

        for (Questions q : quiz.getQuestions()) {

            String userLetter = answerMap.get(q.getId());
            String userAnswer = null;

            if (userLetter != null) {
                switch (userLetter) {
                    case "A" -> userAnswer = q.getOption1();
                    case "B" -> userAnswer = q.getOption2();
                    case "C" -> userAnswer = q.getOption3();
                    case "D" -> userAnswer = q.getOption4();
                }
            }

            if (userAnswer != null && userAnswer.equals(q.getRightAnswer())) {
                score++;
            }
        }

        return ResponseEntity.ok(score);
    }

    // =========================
    // USER: REVIEW QUIZ
    // =========================
    public ResponseEntity<List<ReviewQuestionWrapper>> getReviewQuestions(int id) {

        Quiz quiz = quizDao.findById(id)
            .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<ReviewQuestionWrapper> review =
            quiz.getQuestions().stream()
                .map(q -> new ReviewQuestionWrapper(
                        q.getId(),
                        q.getQuestionTitle(),
                        q.getOption1(),
                        q.getOption2(),
                        q.getOption3(),
                        q.getOption4(),
                        q.getRightAnswer()
                ))
                .toList();

        return ResponseEntity.ok(review);
    }
}
