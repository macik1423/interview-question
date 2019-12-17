package com.kowalik.application.themetype;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081" )
@RestController
public class ThemeTypeController {
	
	private ThemeTypeService themeTypeService;
	
	ThemeTypeController(ThemeTypeService themeTypeService) {
		this.themeTypeService = themeTypeService;
	}
	
	@GetMapping("/api/themeType")
	public List<ThemeType> findAll() {
		return themeTypeService.getAll();
	}
}
