package com.example.quizzapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.quizzapp.model.Questions;

@Repository
public interface QuestionsDao extends JpaRepository<Questions, Integer> {

	@Override
    List<Questions> findAll();
	
	List<Questions> findByCategory(String category);
	
	
	 @Query(
      value = """
        SELECT *
        FROM questions
        WHERE category = :category
        ORDER BY RAND()
        LIMIT :numQ
      """,
      nativeQuery = true
    )
    List<Questions> findRandomQuestionsByCategory(
        @Param("category") String category,
        @Param("numQ") int numQ
    );
}
