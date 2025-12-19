package com.sherlock.expensesplitter.service;

import com.sherlock.expensesplitter.model.Expense;
import com.sherlock.expensesplitter.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public Expense addExpense(Expense expense) {
        return repository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public boolean deleteExpense(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public double getTotalExpensesByGroup(Long groupId) {
        return repository.findByGroupId(groupId)
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public double splitExpense(Long groupId, int people) {
        if (people <= 0) {
            throw new IllegalArgumentException("Number of people must be positive");
        }

        double totalAmount = getTotalExpensesByGroup(groupId);
        return totalAmount / people;
    }

    public List<Expense> getExpensesByGroup(Long groupId) {
        return repository.findByGroupId(groupId);
    }
}
