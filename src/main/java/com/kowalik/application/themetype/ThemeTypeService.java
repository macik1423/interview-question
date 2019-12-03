package com.kowalik.application.themetype;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ThemeTypeService {
	
	public List <ThemeType> getAll() {
		return Arrays.asList(ThemeType.values());
	}
}
