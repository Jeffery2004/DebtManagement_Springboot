package com.example.Debt_Management_backend.controller;

import com.example.Debt_Management_backend.model.Interest;
import com.example.Debt_Management_backend.service.InterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class InterestController {
    @Autowired
    InterestService interestService;

    @GetMapping("/getInterest/{id}")
    public List<Interest> getInterestById(@PathVariable int id){
        List<Interest> interests=interestService.getInterestById(id);
        return interests;
    }
    @PostMapping("/addInterest")
    public String addInterest(@RequestBody Interest interest){
        return interestService.addInterest(interest);
    }


}
