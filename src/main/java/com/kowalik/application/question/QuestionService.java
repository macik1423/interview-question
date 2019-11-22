package com.kowalik.application.question;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class QuestionService {
	private static List<Question> questions = new ArrayList<>();
	private static long idConuter = 0;
	
	static {
		questions.add(new Question(++idConuter, "java basic", "is string object"));
		questions.add(new Question(++idConuter, "java basic", "co tam"));
	}
	
	public List<Question> findAll() {
		return questions;
	}
	
	public Question deleteById(long id) {
		Question question = findById(id);
		
		if (question == null)
			return null;
		
		if (questions.remove(question)) {
			return question;
		}
		
		return null;
	}
	
	public Question findById(long id) {
		for (Question question: questions) {
			if (question.getId() == id) {
				return question;
			}
		}
		return null;
	}
}	

