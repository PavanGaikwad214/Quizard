package com.example.quizzapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.quizzapp.model.Questions;

@Repository
public interface QuestionsDao extends JpaRepository<Questions, Integer> {

	@Override
    List<Questions> findAll();
	
	List<Questions> findByCategory(String category);
	
	
    //// Native query with positional params (IDE may warn, runtime OK)

	 @Query(
      value = """
        SELECT *
        FROM questions
        WHERE category = ?1
        ORDER BY RAND()
        LIMIT ?2
      """,
      nativeQuery = true
    )
    List<Questions> findRandomQuestionsByCategory(
        String category,
        int numQ
    );
}
