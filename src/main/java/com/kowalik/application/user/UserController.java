package com.kowalik.application.user;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081" )
@RestController
public class UserController {
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/api/users")
	public List<User> users() {
		return userService.findAll();
	}
	
	@PostMapping("/api/users")
	public User addUser(@RequestBody User user) {
		User newUser = userService.save(user);
		return newUser;
	}
}
