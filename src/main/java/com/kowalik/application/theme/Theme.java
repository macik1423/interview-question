package com.kowalik.application.theme;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "themes")
public class Theme implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private long id;
	
	@Column(name = "type")
	private String type;
	
	public Theme() {
		
	}
	
	public Theme(long id, String type) {
		this.id = id;
		this.type = type;
	}

	public long getId() {
		return id;
	}
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Theme [id=" + id + ", type=" + type + "]";
	}
	
}
