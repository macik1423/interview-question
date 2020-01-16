package com.kowalik.application.user_question;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@PostMapping("/userQuestion") 
	public UserQuestion createUserQuestion(@RequestBody UserQuestion userQuestion) {
		UserQuestion createdUserQuestion = userQuestionService.save(userQuestion);
		return createdUserQuestion;
	}
	
	@GetMapping("/userQuestion") 
	public List<UserQuestion> getUserQuestion() {
		List<UserQuestion> userQuestion = userQuestionService.findAll();
		return userQuestion;
	}
	
}
