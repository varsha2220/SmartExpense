package com.smartexpense.backend.dashboard;

import com.smartexpense.backend.entity.Expense;
import com.smartexpense.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final ExpenseRepository expenseRepository;

    public DashboardService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Map<String,Object> getDashboard() {

        List<Expense> expenses = expenseRepository.findAll();

        double total = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        Map<String,Object> response = new HashMap<>();

        response.put("totalExpenses", expenses.size());
        response.put("totalAmount", total);
        response.put("expenses", expenses);

        return response;
    }

}
