package com.kowalik.application.question;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
public class QuestionService {
	
	private QuestionRepository questionRepository;
	
	QuestionService(QuestionRepository questionRepository) {
		this.questionRepository = questionRepository;
	}
	
	@Transactional
	public List<Question> findAll() {
		return questionRepository.findAll();
	}
	
	@Transactional
	public void deleteById(long id) {
		questionRepository.deleteById(id);
	}
	
	@Transactional
	public Optional<Question> findById(long id) {
		return questionRepository.findById(id);
	}
	
	@Transactional
	public Question save(Question question) {
		return questionRepository.save(question);
	}
	
	@Transactional
	public List<Question> findByThemeId(Long themeId) {
		return questionRepository.findByThemeId(themeId);
	}
		
}	

