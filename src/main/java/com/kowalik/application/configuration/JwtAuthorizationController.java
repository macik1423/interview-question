package com.kowalik.application.configuration;


import java.security.Principal;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:8081" )
@RestController
public class JwtAuthorizationController {
	
	@GetMapping(value = "/username")
    @ResponseBody
    public String currentUserName(Principal principal) {
        return principal.toString();
    }
}
