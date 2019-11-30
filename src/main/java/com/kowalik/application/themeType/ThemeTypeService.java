package com.kowalik.application.themeType;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ThemeTypeService {
	
	private ThemeTypeRepository themeTypeRepository;
	
	ThemeTypeService(ThemeTypeRepository themeTypeRepository) {
		this.themeTypeRepository = themeTypeRepository;
	}
	
	public List<ThemeType> findAll() {
		return themeTypeRepository.findAll();
	}
}
