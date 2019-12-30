package com.kowalik.application.user;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);	
	}
	
	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	public User save(User user) {
		String encryptedPassword = passwordEncoder.encode(user.getPassword());
	    user.setPassword(encryptedPassword);
		return userRepository.save(user);
	}

}
