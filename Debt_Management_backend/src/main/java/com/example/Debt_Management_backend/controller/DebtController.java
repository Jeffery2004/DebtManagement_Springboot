package com.example.Debt_Management_backend.controller;

import com.example.Debt_Management_backend.model.Debt;
import com.example.Debt_Management_backend.repository.DebtRepo;
import com.example.Debt_Management_backend.service.DebtService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DebtController {

    @Autowired
    DebtService debtService;

    @GetMapping("/getDebt/{id}")
    public ResponseEntity<?> getDebtById(@PathVariable int id) {
        Optional<Debt> debt = debtService.getDebtById(id);
        if (debt.isPresent()) {
            return ResponseEntity.ok(debt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Debt not found");
        }
    }

    @GetMapping("/getAllDebts")
    public ResponseEntity<?> getAllDebts(HttpSession session) {
        Object userIdObj = session.getAttribute("userid");
        if (userIdObj == null || !(userIdObj instanceof Integer)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
        int userId = (Integer) userIdObj;
        List<Debt> debts = debtService.getAllDebts(userId);
        return ResponseEntity.ok(debts);
    }

    @PostMapping("/addDebt")
    public String addDebt(@RequestBody Debt debt, HttpSession session){
        int userid =(Integer)session.getAttribute("userid");
        debt.setUserid(userid);
        return debtService.addDebt(debt);
    }


    @PutMapping("/update/{id}")
    public String update(@PathVariable int id,@RequestBody Debt updateDebt,HttpSession session){
        int userid=(Integer)session.getAttribute("userid");
        return debtService.update(id,updateDebt,userid);
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id){
        return debtService.delete(id);
    }
}
