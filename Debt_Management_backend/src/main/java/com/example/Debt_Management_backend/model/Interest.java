package com.example.Debt_Management_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Interest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int debtId;
    private int interest;
    private String date;
    public Interest(){

    }
    public Interest(int debtId,int interest,String date){
        this.debtId=debtId;
        this.interest=interest;
        this.date=date;
    }
}
