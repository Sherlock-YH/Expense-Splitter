package com.sherlock.expensesplitter.controller;

import com.sherlock.expensesplitter.model.Expense;
import com.sherlock.expensesplitter.service.ExpenseService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    // Add a new expense
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return service.addExpense(expense);
    }

    // Get all expenses
    @GetMapping
    public List<Expense> getExpensesByGroup(@RequestParam Long groupId) {
        return service.getExpensesByGroup(groupId);
    }

    // Delete expense by ID
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        service.deleteExpense(id);
    }

    // Get total expenses
    @GetMapping("/total")
    public double getTotal(@RequestParam Long groupId) {
        return service.getTotalExpensesByGroup(groupId);
    }

    // Split a total amount among N people
    @GetMapping("/split")
    public double splitExpense( @RequestParam Long groupId, @RequestParam int people) {
        return service.splitExpense(groupId, people);
    }

}
