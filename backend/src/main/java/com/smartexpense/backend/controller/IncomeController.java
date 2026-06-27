package com.smartexpense.backend.controller;

import com.smartexpense.backend.entity.Income;
import com.smartexpense.backend.service.IncomeService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/income")
@CrossOrigin(origins = "http://localhost:5173")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    // Add Income
    @PostMapping
    public ResponseEntity<Income> addIncome(
            @RequestBody Income income) {

        return ResponseEntity.ok(
                incomeService.addIncome(income)
        );
    }

    // Get All Income
    @GetMapping
    public ResponseEntity<List<Income>> getAllIncome() {

        return ResponseEntity.ok(
                incomeService.getAllIncome()
        );
    }

    // Get Income By ID
    @GetMapping("/{id}")
    public ResponseEntity<Income> getIncome(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                incomeService.getIncome(id)
        );
    }

    // Update Income
    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(
            @PathVariable Long id,
            @RequestBody Income income) {

        return ResponseEntity.ok(
                incomeService.updateIncome(id, income)
        );
    }

    // Delete Income
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIncome(
            @PathVariable Long id) {

        incomeService.deleteIncome(id);

        return ResponseEntity.ok(
                "Income Deleted Successfully"
        );
    }

    // Get Income By Date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Income>> getIncomeByDate(

            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

        return ResponseEntity.ok(
                incomeService.getIncomeByDate(date)
        );
    }

    // Get Income By Category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Income>> getIncomeByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                incomeService.getIncomeByCategory(category)
        );
    }

    // Get Income Between Dates
    @GetMapping("/between")
    public ResponseEntity<List<Income>> getIncomeBetweenDates(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate end) {

        return ResponseEntity.ok(
                incomeService.getIncomeBetweenDates(
                        start,
                        end
                )
        );
    }

    // Total Income
    @GetMapping("/total")
    public ResponseEntity<Double> getTotalIncome() {

        return ResponseEntity.ok(
                incomeService.getTotalIncome()
        );
    }

}
