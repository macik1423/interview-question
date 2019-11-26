package com.kowalik.application.question;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class QuestionService {
	
	private QuestionRepository questionRepository;
	
	QuestionService(QuestionRepository questionRepository) {
		this.questionRepository = questionRepository;
	}
	
	public List<Question> findAll() {
		return questionRepository.findAll();
	}
	
	public void deleteById(long id) {
		questionRepository.deleteById(id);
	}
	
	public Optional<Question> findById(long id) {
		return questionRepository.findById(id);
	}
	
	public Question save(Question question) {
		return questionRepository.save(question);
	}
		
}	

