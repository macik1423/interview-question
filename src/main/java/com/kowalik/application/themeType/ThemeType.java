package com.kowalik.application.themeType;

public enum ThemeType {
	JAVA("java"), SPRING("spring");
	
	String type;
	
	private ThemeType() {
		
	}

	private ThemeType(String type) {
		this.type = type;
	}

}	
