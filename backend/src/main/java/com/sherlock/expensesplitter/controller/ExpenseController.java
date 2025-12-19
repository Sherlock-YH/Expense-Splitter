package com.sherlock.expensesplitter.controller;

import com.sherlock.expensesplitter.exception.ResourceNotFoundException;
import com.sherlock.expensesplitter.model.Expense;
import com.sherlock.expensesplitter.service.ExpenseService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Expense> addExpense(@Valid @RequestBody Expense expense) {
        Expense created = service.addExpense(expense);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getExpensesByGroup(@RequestParam Long groupId) {
        List<Expense> expenses = service.getExpensesByGroup(groupId);
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        boolean deleted = service.deleteExpense(id);
        if (!deleted) {
            throw new ResourceNotFoundException("Expense with id " + id + " not found");
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/total")
    public ResponseEntity<Double> getTotal(@RequestParam Long groupId) {
        double total = service.getTotalExpensesByGroup(groupId);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/split")
    public ResponseEntity<Double> splitExpense(@RequestParam Long groupId, @RequestParam int people) {
        if (people <= 0) {
            throw new IllegalArgumentException("Number of people must be positive");
        }
        double splitAmount = service.splitExpense(groupId, people);
        return ResponseEntity.ok(splitAmount);
    }
}
