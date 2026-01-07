package com.example.quizzapp.model;

import lombok.Data;

//Used ONLY for saved quizzes (quizId based review)
//Not used for category-based quizzes

@Data
public class ReviewQuestionWrapper {

	    private Integer id;
	    private String questionTitle;
	    private String option1;
	    private String option2;
	    private String option3;
	    private String option4;

	    private String rightAnswer;

		public ReviewQuestionWrapper(Integer id, String questionTitle, String option1, String option2, String option3,
				String option4, String rightAnswer) {
			super();
			this.id = id;
			this.questionTitle = questionTitle;
			this.option1 = option1;
			this.option2 = option2;
			this.option3 = option3;
			this.option4 = option4;
			this.rightAnswer = rightAnswer;
		}
	    
	    
	    
}
