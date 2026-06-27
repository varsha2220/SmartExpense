package com.smartexpense.backend.service;

import com.smartexpense.backend.entity.Income;
import com.smartexpense.backend.exception.ResourceNotFoundException;
import com.smartexpense.backend.repository.IncomeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeService(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    // Add Income
    public Income addIncome(Income income) {

        return incomeRepository.save(income);

    }

    // Get All Income
    public List<Income> getAllIncome() {

        return incomeRepository.findAll();

    }

    // Get Income By ID
    public Income getIncome(Long id) {

        return incomeRepository.findById(id)

                .orElseThrow(() ->

                        new ResourceNotFoundException(
                                "Income Not Found"
                        )

                );

    }

    // Update Income
    public Income updateIncome(Long id, Income newIncome) {

        Income income = getIncome(id);

        income.setTitle(newIncome.getTitle());

        income.setAmount(newIncome.getAmount());

        income.setCategory(newIncome.getCategory());

        income.setDate(newIncome.getDate());

        income.setNote(newIncome.getNote());

        return incomeRepository.save(income);

    }

    // Delete Income
    public void deleteIncome(Long id) {

        Income income = getIncome(id);

        incomeRepository.delete(income);

    }

    // Get Income By Date
    public List<Income> getIncomeByDate(LocalDate date) {

        return incomeRepository.findByDate(date);

    }

    // Get Income By Category
    public List<Income> getIncomeByCategory(String category) {

        return incomeRepository.findByCategory(category);

    }

    // Get Income Between Dates
    public List<Income> getIncomeBetweenDates(
            LocalDate start,
            LocalDate end
    ) {

        return incomeRepository.findByDateBetween(start, end);

    }

    // Total Income
    public Double getTotalIncome() {

        return incomeRepository.findAll()

                .stream()

                .mapToDouble(Income::getAmount)

                .sum();

    }

}
