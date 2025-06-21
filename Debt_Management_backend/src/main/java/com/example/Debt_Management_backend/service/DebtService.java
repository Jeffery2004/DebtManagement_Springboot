package com.example.Debt_Management_backend.service;

import com.example.Debt_Management_backend.model.Debt;
import com.example.Debt_Management_backend.repository.DebtRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DebtService{
    @Autowired
    DebtRepo debtRepo;

    public List<Debt> getAllDebts(Integer userid) {
        return debtRepo.findByUserid(userid);
    }

    public String addDebt(Debt debt) {
        debtRepo.save(debt);
        return "Added successfully";
    }

    public String update(int id,Debt updateDebt,int userid) {
        Optional<Debt>optionalDebt=debtRepo.findById(id);
        if(optionalDebt.isEmpty()){
           return "No debt found";
        }
        Debt debt=optionalDebt.get();
        debt.setUserid(userid);
        debt.setDebtReceiver(updateDebt.getDebtReceiver());
        debt.setAmount(updateDebt.getAmount());
        debt.setDate(updateDebt.getDate());
        debtRepo.save(debt);
        return "Updated successfully";
    }

    public String delete(int id) {
        Optional<Debt>debt=debtRepo.findById(id);
        if(debt.isEmpty()){
            return "Debt not found";
        }
        debtRepo.deleteById(id);
        return "Deleted successfully";
    }

    public Optional<Debt> getDebtById(int id) {
        Optional<Debt>debt=debtRepo.findById(id);
        if(debt.isPresent()){
            return debt;
        }
        return null;
    }
}