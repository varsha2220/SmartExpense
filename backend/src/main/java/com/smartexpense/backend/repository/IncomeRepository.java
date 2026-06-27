package com.smartexpense.backend.repository;

import com.smartexpense.backend.entity.Income;
import com.smartexpense.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    List<Income> findByUser(User user);

    List<Income> findByDate(LocalDate date);

    List<Income> findByCategory(String category);

    List<Income> findByDateBetween(LocalDate startDate,
                                   LocalDate endDate);

}
