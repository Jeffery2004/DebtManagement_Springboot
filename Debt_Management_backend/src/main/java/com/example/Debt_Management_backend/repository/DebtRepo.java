package com.example.Debt_Management_backend.repository;

import com.example.Debt_Management_backend.model.Debt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DebtRepo extends JpaRepository<Debt,Integer> {
    public List<Debt> findByUserid(Integer userid);
}
