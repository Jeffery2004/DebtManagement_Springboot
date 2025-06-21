package com.example.Debt_Management_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;
@Data
@Entity
public class Debt {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    private String debtReceiver;
    private int amount;
    private int userid;
    private String date;
    public Debt(){

    }
    public Debt(String debtReceiver,int amount,int userid,String date){
        this.debtReceiver=debtReceiver;
        this.amount=amount;
        this.userid=userid;
        this.date=date;
    }
    public Debt(String debtReceiver,int amount,String date){
        this.debtReceiver=debtReceiver;
        this.amount=amount;
        this.date=date;
    }
}
