package com.kowalik.application.theme;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.kowalik.application.themetype.ThemeType;


@Entity
@Table(name = "Theme")
public class Theme implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private long id;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "type")
	private ThemeType themeType;
	
	public Theme() {
		
	}
	
	public Theme(long id, ThemeType themeType) {
		this.id = id;
		this.themeType = themeType;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public ThemeType getThemeType() {
		return themeType;
	}

	public void setThemeType(ThemeType themeType) {
		this.themeType = themeType;
	}

}
