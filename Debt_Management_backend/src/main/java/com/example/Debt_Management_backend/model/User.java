package com.example.Debt_Management_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userid;

    private String username;
    private String password;
    private String mobileNumber;

    public User() {}

    public User(String username, String password, String mobileNumber) {
        this.username = username;
        this.password = password;
        this.mobileNumber = mobileNumber;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
