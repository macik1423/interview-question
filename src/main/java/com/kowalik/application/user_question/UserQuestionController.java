package com.kowalik.application.user_question;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:8081" )
@RestController
@RequestMapping("/api")
public class UserQuestionController {
	
	private UserQuestionService userQuestionService;
	
	UserQuestionController(UserQuestionService userQuestionService) {
		this.userQuestionService = userQuestionService;
	}
	
	@PostMapping("/userQuestions") 
	public List<UserQuestion> createUserQuestions(@RequestBody List<UserQuestion> userQuestions) {
		List<UserQuestion> createdUserQuestion = userQuestionService.saveAll(userQuestions);
		return createdUserQuestion;
	}
	
	@PostMapping("/userQuestion") 
	public UserQuestion createUserQuestion(@RequestBody UserQuestion userQuestion) {
		UserQuestion createdUserQuestion = userQuestionService.save(userQuestion);
		return createdUserQuestion;
	}
	
	@GetMapping("/userQuestions/user/{userId}") 
	public List<UserQuestion> getUserQuestions(@PathVariable Long userId) {
		List<UserQuestion> userQuestion = userQuestionService.findQuestionsByUserId(userId);
		return userQuestion;
	}
	
}
