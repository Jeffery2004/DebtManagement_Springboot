package com.example.Debt_Management_backend.controller;
import com.example.Debt_Management_backend.model.User;
import com.example.Debt_Management_backend.service.TwilioOtpService;
import com.example.Debt_Management_backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TwilioOtpService otpService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {
        User validUser = userService.login(user.getUsername(), user.getPassword());
        if (validUser != null) {
            System.out.println(">>> SENDING TO: " + validUser.getMobileNumber());
            session.setAttribute("tempUserId", validUser.getUserid());
            session.setAttribute("phone", validUser.getMobileNumber());
            otpService.sendOtp(String.valueOf(validUser.getMobileNumber()));
            return ResponseEntity.ok("OTP sent to registered mobile.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> req, HttpSession session) {
        String otp = req.get("otp");
        String phone = (String) session.getAttribute("phone");

        if (phone != null && otpService.verifyOtp(phone, otp)) {
            session.setAttribute("userid", session.getAttribute("tempUserId"));
            session.removeAttribute("tempUserId");
            session.removeAttribute("phone");
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logged out successfully";
    }
}
