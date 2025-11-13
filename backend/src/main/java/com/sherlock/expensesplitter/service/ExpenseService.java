package com.sherlock.expensesplitter.service;

import com.sherlock.expensesplitter.model.Expense;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {

    private final List<Expense> expenses = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong();

    // Add a new expense
    public Expense addExpense(Expense expense) {
        expense.setId(idCounter.incrementAndGet());
        expenses.add(expense);
        return expense;
    }

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return expenses;
    }

    // Delete an expense by ID
    public boolean deleteExpense(Long id) {
        return expenses.removeIf(e -> e.getId().equals(id));
    }

    // Calculate total expenses
    public double getTotalExpensesByGroup(Long groupId) {
        return expenses.stream().filter(e -> e.getGroupId().equals(groupId)).mapToDouble(Expense::getAmount).sum();
    }

    // Split total expenses of a specific group among N people
    public double splitExpense(Long groupId, int people) {
        if (people <= 0)
            return 0;

        // Sum only expenses belonging to the group
        double totalAmount = expenses.stream()
                .filter(e -> e.getGroupId().equals(groupId))
                .mapToDouble(Expense::getAmount)
                .sum();

        return totalAmount / people;
    }

    public List<Expense> getExpensesByGroup(Long groupId) {
        return expenses.stream()
                .filter(e -> e.getGroupId().equals(groupId))
                .toList();
    }
}
