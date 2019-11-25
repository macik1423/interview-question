package com.kowalik.application.question;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//3000 react; 4200 angular; 8081 vue
@CrossOrigin(origins = "http://localhost:8081" )
@RestController
public class QuestionController {
	
	private QuestionService questionService;
	
	QuestionController(QuestionService questionService) {
		this.questionService = questionService;
	}
	
	@GetMapping("/questions")
	public List<Question> getAllQuestions() {
		return questionService.findAll();
	}
	
	@DeleteMapping("/questions/{id}")
	public ResponseEntity<Void> deleteCourse(@PathVariable long id) {
		Question question = questionService.deleteById(id);
		
		if (!question.equals(null)) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/questions/{id}")
	public Question getQuestion(@PathVariable long id) {
		return questionService.findById(id);
	}
	
	@PutMapping("/questions/{id}")
	public ResponseEntity<Question> updateQuestion(@PathVariable long id, @RequestBody Question question) {
		Question questionUpdate = questionService.save(question);
		
		return new ResponseEntity<Question>(questionUpdate, HttpStatus.OK);
	}
	
	@PostMapping("questions/") 
	public Question createQuestion(@RequestBody Question question) {
		Question createdQuestion = questionService.save(question);
		
		return createdQuestion;
	}
}
