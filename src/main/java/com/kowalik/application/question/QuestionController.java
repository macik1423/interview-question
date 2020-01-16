package com.kowalik.application.question;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//3000 react; 4200 angular; 8081 vue
@CrossOrigin(origins = "http://localhost:8081" )
@RestController
@RequestMapping("/api")
public class QuestionController {
	
	final private int VALUEPAGINATION = 2;
	
	private QuestionService questionService;
	
	QuestionController(QuestionService questionService) {
		this.questionService = questionService;
	}
	
	@GetMapping("/questions/pages")
	public List<Question> getAllQuestions(@PageableDefault(value=VALUEPAGINATION, page=0) Pageable pageable) {
		Page<Question> page = questionService.findAll(pageable);
	    return page.getContent();
	}

	
	@GetMapping("/questions/countQuestions")
	public long getCountQuestion() {
		return questionService.countQuestion();
	}
	
	@GetMapping("/questions/pages/getTotalPages")
	public long getTotalPages(@PageableDefault(value=VALUEPAGINATION, page=0) Pageable pageable) {
		Page<Question> page = questionService.findAll(pageable);
	    return page.getTotalPages();
	}
	
	@GetMapping("/questions")
	public List<Question> getAllQuestions() {
		return questionService.findAll();
	}
	
	@GetMapping("/theme/{themeId}/questions") 
	public List<Question> getAllQuestionsByTheme(@PathVariable(value="themeId") Long themeId) {
		return questionService.findByThemeId(themeId);
	}
	
	@DeleteMapping("/admin/questions/{id}")
	public ResponseEntity<Long> deleteQuestion(@PathVariable long id) {
		try {
			questionService.deleteById(id);
			return new ResponseEntity<>(id, HttpStatus.OK);
		} catch(Exception EmptyResultDataAccessException) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
		}
	}
	
	@GetMapping("/questions/{id}")
	public Optional<Question> getQuestion(@PathVariable long id) {
		return questionService.findById(id);
	}
	
	@GetMapping("/admin/questions")
	public List<Question> getAllAdminQuestions() {
		return questionService.findAll();
	}
	
	@PutMapping("/admin/questions/{id}")
	public ResponseEntity<Question> updateQuestion(@PathVariable long id, @RequestBody Question question) {
		Question questionUpdate = questionService.save(question);
		
		return new ResponseEntity<Question>(questionUpdate, HttpStatus.OK);
	}

	@PostMapping("/admin/newQuestion") 
	public Question createQuestion(@RequestBody Question question) {
		Question createdQuestion = questionService.save(question);
		
		return createdQuestion;
	}
}
