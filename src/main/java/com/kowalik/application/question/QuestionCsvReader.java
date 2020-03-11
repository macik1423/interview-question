package com.kowalik.application.question;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kowalik.application.theme.Theme;
import com.kowalik.application.theme.ThemeService;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

@Component
public class QuestionCsvReader {	
	
	@Autowired
	private ThemeService themeService;
	
	public QuestionCsvReader() {
	}
	
	public List<Question> readQuestionsFromCsvFile(MultipartFile file) {
		List<Question> readedQuestions = new ArrayList<>(); 
		CSVReader csvReader = null;
		try {
			Reader reader = new InputStreamReader(file.getInputStream());
			csvReader = new CSVReaderBuilder(reader).withSkipLines(1).build();
			String[] line;
			while((line = csvReader.readNext()) != null) {
				List<Theme> themes = themeService.findAll();
				Theme newTheme = null;
				for(Theme theme : themes) {
					if(theme.getType().equals(line[2].toUpperCase())) {
						newTheme = theme;
					}
				}
				readedQuestions.add(new Question(newTheme, line[1], line[0]));
			}
			reader.close();
			return readedQuestions;
		} catch (IOException e) {
			System.out.println("brak pliku");
			e.printStackTrace();
		}
		return null;
	}
}











