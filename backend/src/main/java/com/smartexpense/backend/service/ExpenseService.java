package com.smartexpense.backend.service;

import com.smartexpense.backend.entity.Expense;
import com.smartexpense.backend.exception.ResourceNotFoundException;
import com.smartexpense.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpense(Long id) {

        return expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense Not Found"));
    }

    public Expense updateExpense(Long id, Expense newExpense) {

        Expense expense = getExpense(id);

        expense.setTitle(newExpense.getTitle());
        expense.setAmount(newExpense.getAmount());
        expense.setCategory(newExpense.getCategory());
        expense.setDate(newExpense.getDate());
        expense.setNote(newExpense.getNote());

        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {

        Expense expense = getExpense(id);

        expenseRepository.delete(expense);
    }
}
