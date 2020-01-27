package com.kowalik.application.user_question;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
public class UserQuestionService {
	
	private UserQuestionRepository userQuestionRepository;

	public UserQuestionService(UserQuestionRepository userQuestionRepository) {
		this.userQuestionRepository = userQuestionRepository;
	}
	
	public List<UserQuestion> saveAll(List<UserQuestion> userQuestions) {
		return userQuestionRepository.saveAll(userQuestions);
	}
	
	public UserQuestion save(UserQuestion userQuestion) {
		return userQuestionRepository.save(userQuestion);
	}
	
	public List<UserQuestion> findAll() {
		return userQuestionRepository.findAll();
	}
	
	public List<UserQuestion> findQuestionsByUserId(Long userId) {
		return userQuestionRepository.findUserQuestionsByUserId(userId);
	}
}
