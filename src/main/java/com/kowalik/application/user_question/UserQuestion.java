package com.kowalik.application.user_question;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.kowalik.application.question.Question;
import com.kowalik.application.user.User;

@Entity
public class UserQuestion {
	
	@EmbeddedId
	private UserQuestionId id = new UserQuestionId();
	
	@ManyToOne
	@MapsId("userId")
	private User user;
	
	@ManyToOne
	@MapsId("questionId")
	private Question question;
		
	private boolean know;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	public boolean isKnow() {
		return know;
	}

	public void setKnow(boolean know) {
		this.know = know;
	}

	@Embeddable
	public static class UserQuestionId implements Serializable {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		
		private Long userId;
		private Long questionId;
		
		public UserQuestionId() {
			
		}

		public UserQuestionId(Long userId, Long questionId) {
			this.userId = userId;
			this.questionId = questionId;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public Long getQuestionId() {
			return questionId;
		}

		public void setQuestionId(Long questionId) {
			this.questionId = questionId;
		}
		
	}
}





