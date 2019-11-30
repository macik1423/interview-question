package com.kowalik.application.themeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeTypeRepository extends JpaRepository<ThemeType, Long>{
	
}
