package com.kowalik.application.theme;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


@Service
public class ThemeService {
	
	private ThemeRepository themeRepository;
	
	ThemeService(ThemeRepository themeRepository) {
		this.themeRepository = themeRepository;
	}

	public List<Theme> findAll() {
		return themeRepository.findAll();
	}

	public Optional<Theme> findById(long id) {
		return themeRepository.findById(id);
	}

}
