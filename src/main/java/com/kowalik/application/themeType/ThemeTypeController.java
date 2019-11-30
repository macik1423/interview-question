package com.kowalik.application.themeType;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ThemeTypeController {
	
	private ThemeTypeService themeTypeService;
	
	ThemeTypeController(ThemeTypeService themeTypeService) {
		this.themeTypeService = themeTypeService;
	}
	
	@GetMapping("/themeType")
	public List<ThemeType> findAll() {
		return themeTypeService.findAll();
	}
}
