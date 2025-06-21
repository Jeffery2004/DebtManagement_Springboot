package com.example.Debt_Management_backend.service;

import com.example.Debt_Management_backend.model.Debt;
import com.example.Debt_Management_backend.model.User;
import com.example.Debt_Management_backend.repository.DebtRepo;
import com.example.Debt_Management_backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();

    public User login(String username, String password) {
        Optional<User> userOpt = userRepo.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (encoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }


    public String register(User user) {
        String username = user.getUsername();
        Optional<User> existingUser = userRepo.findByUsername(username);
        if (existingUser.isPresent()) {
            if(encoder.matches(user.getPassword(),existingUser.get().getPassword())) {
                return "Username already taken";
            }
        }
        String encodedPassword = encoder.encode(user.getPassword());
        User newUser = new User(username, encodedPassword,user.getMobileNumber());
        userRepo.save(newUser);
        return "User registered successfully";
    }

}
