package com.example.Debt_Management_backend.repository;

import com.example.Debt_Management_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,String> {
    public Optional<User> findByUsername(String username);
}
