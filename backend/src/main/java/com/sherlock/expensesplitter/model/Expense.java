package com.sherlock.expensesplitter.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "expenses")
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Description cannot be empty")
    @Column(nullable = false)
    private String description;

    @Positive(message = "Amount must be positive")
    @Column(nullable = false)
    private double amount;

    @NotBlank(message = "PaidBy cannot be empty")
    @Column(nullable = false)
    private String paidBy;

    @NotNull(message = "GroupId cannot be null")
    @Column(nullable = false)
    private Long groupId;

    public Expense() {}

    public Expense(Long id, String description, double amount, String paidBy, Long groupId) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.paidBy = paidBy;
        this.groupId = groupId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getPaidBy() { return paidBy; }
    public void setPaidBy(String paidBy) { this.paidBy = paidBy; }

    public Long getGroupId() { return groupId; }
    public void setGroupId(Long groupId) { this.groupId = groupId; }
}
