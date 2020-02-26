package com.kowalik.application.question;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class QuestionService {
	
	private QuestionCsvReader questionCsvReader;
	private QuestionRepository questionRepository;
	
	QuestionService(QuestionRepository questionRepository, QuestionCsvReader questionCsvReader) {
		this.questionRepository = questionRepository;
		this.questionCsvReader = questionCsvReader;
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
	
	//metoda modyfikujaca powinna miec transactional
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
	
	@Transactional
	public List<Question> saveToDbQuestionsCsvFile(MultipartFile file) {
		List<Question> questionsToWrite = questionCsvReader.readQuestionsFromCsvFile(file);
		return questionRepository.saveAll(questionsToWrite);
	}
	
}	

