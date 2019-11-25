package com.kowalik.application.question;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class QuestionService {
	private static List<Question> questions = new ArrayList<>();
	private static long idCounter = 0;
	
	static {
		questions.add(new Question(++idCounter, "java basic", "is string object"));
		questions.add(new Question(++idCounter, "java basic", "co tam"));
	}
	
	public List<Question> findAll() {
		Collections.sort(questions);
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
	
	public Question save(Question question) {
		if(question.getId() == -1 || question.getId() == 0) {
			question.setId(++idCounter);
			System.out.println("idcounter: " + idCounter);
			questions.add(question);
		} else {
			deleteById(question.getId());
			questions.add(question);
		}
		return question;
	}
}	

