package com.example.Debt_Management_backend.service;

import com.example.Debt_Management_backend.model.Interest;
import com.example.Debt_Management_backend.repository.InterestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterestService {
    @Autowired
    InterestRepo interestRepo;
    public List<Interest> getInterestById(int id) {
        return interestRepo.findAllByDebtId(id);

    }

    public String addInterest(Interest interest) {
        interestRepo.save(interest);
        return "Added successfully";
    }
}
