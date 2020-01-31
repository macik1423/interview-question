package com.kowalik.application.user_question;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserQuestionRepository extends JpaRepository<UserQuestion, Long>{
	
	@Query(value = 
			"SELECT * " +
			"FROM questions q " + 
				"LEFT JOIN user_question us " + 
					"ON us.question_id = q.id " + 
				"LEFT JOIN themes t " + 
					"ON q.theme_id = t.id " + 
			"WHERE us.user_id = ?1", nativeQuery = true)
	List<UserQuestion> findUserQuestionsByUserId(Long userId);
}
