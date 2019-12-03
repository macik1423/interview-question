package com.kowalik.application.themetype;

public enum ThemeType {
	JAVA("java"), SPRING("spring");
	
	private String type;
	
	ThemeType() {
		
	}

	ThemeType(String type) {
		this.setType(type);
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}	
