package com.homefinder.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.homefinder.backend.model.User;
import com.homefinder.backend.repository.UserRepository;

@Configuration
public class UserInitializer {

    @Bean
    CommandLineRunner initializeUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByUsername("admin").isEmpty()) {

                User admin = new User(
                        null,
                        "admin",
                        passwordEncoder.encode("admin123"),
                        "ADMIN"
                );

                userRepository.save(admin);
            }
        };
    }
}