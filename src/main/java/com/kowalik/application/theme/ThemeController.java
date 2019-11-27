package com.kowalik.application.theme;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ThemeController {
	
	private ThemeService themeService;
	
	ThemeController(ThemeService themeService){
		this.themeService = themeService;
	}
	
	@GetMapping("/theme")
	public List<Theme> getAllThemes() {
		return themeService.findAll();
	}
	
	@GetMapping("/theme/{id}")
	public Optional<Theme> getThemeById(@PathVariable long id) {
		return themeService.findById(id);
	}
}
