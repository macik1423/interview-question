package com.kowalik.application.question;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
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
	
	@Transactional
	public void deleteById(long id) {
		questionRepository.deleteById(id);
	}
	
	public Optional<Question> findById(long id) {
		return questionRepository.findById(id);
	}
	
	@Transactional
	public Question save(Question question) {
		return questionRepository.save(question);
	}
	
	public List<Question> findByThemeId(Long themeId) {
		return questionRepository.findByThemeId(themeId);
	}

	
	public Page<Question> findAll(Pageable pageable) {
		return questionRepository.findAll(pageable);
	}
	
	
	public long getTotalPages(Pageable pageable) {
		Page<Question> page = questionRepository.findAll(pageable);
		return page.getTotalPages();
	}
	
	public long countQuestion() {
		return questionRepository.count();
	}
		
}	

