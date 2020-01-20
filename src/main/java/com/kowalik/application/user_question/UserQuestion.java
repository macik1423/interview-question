package com.kowalik.application.user_question;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.kowalik.application.question.Question;
import com.kowalik.application.user.User;

@Entity
public class UserQuestion implements Serializable {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private UserQuestionId id = new UserQuestionId();
	
	@ManyToOne
	@MapsId("userId")
	private User user;
	
	@ManyToOne
	@MapsId("questionId")
	private Question question;
		
	private boolean know;

	public UserQuestion() {
	}
	
	public UserQuestion(UserQuestionId id, User user, Question question, boolean know) {
		this.id = id;
		this.user = user;
		this.question = question;
		this.know = know;
	}



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

	@Override
	public String toString() {
		return "UserQuestion [id=" + id + ", user=" + user + ", question=" + question + ", know=" + know + "]";
	}
	
	@Embeddable
	public static class UserQuestionId implements Serializable {

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

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((questionId == null) ? 0 : questionId.hashCode());
			result = prime * result + ((userId == null) ? 0 : userId.hashCode());
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			UserQuestionId other = (UserQuestionId) obj;
			if (questionId == null) {
				if (other.questionId != null)
					return false;
			} else if (!questionId.equals(other.questionId))
				return false;
			if (userId == null) {
				if (other.userId != null)
					return false;
			} else if (!userId.equals(other.userId))
				return false;
			return true;
		}
	
	}
}





