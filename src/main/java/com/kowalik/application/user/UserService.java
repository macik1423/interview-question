package com.kowalik.application.user;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements CommandLineRunner{
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
		
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public void run(String... args) throws Exception {
		
		userRepository.deleteAll();
		
		User dan = new User("dan", passwordEncoder.encode("dan123"), "USER","");
		User admin = new User("admin", passwordEncoder.encode("123"), "ADMIN","ACCESS_TEST1,ACCESS_TEST2");
		List<User> users = Arrays.asList(dan, admin);
		
		this.userRepository.saveAll(users);
	}
	
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);	
	}
	
	public List<User> findAll() {
		return userRepository.findAll();
	}

}
