package com.kowalik.application.theme;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Theme")
public class Theme {
	
	@Id
	@GeneratedValue
	private long id;
	
	@Column(name = "description")
	private String description;
	
	public Theme() {
		
	}

	public Theme(long id, String description) {
		this.id = id;
		this.description = description;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
