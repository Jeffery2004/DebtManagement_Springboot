package com.example.Debt_Management_backend.repository;

import com.example.Debt_Management_backend.model.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepo extends JpaRepository<Interest,Integer> {
    public List<Interest> findAllByDebtId(int id);
}
