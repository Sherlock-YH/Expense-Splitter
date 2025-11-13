    package com.sherlock.expensesplitter.model;

    public class Expense {
        private Long id;
        private String description;
        private double amount;
        private String paidBy;
        private Long groupId;

        public Expense() {}

        public Expense(Long id, String description, double amount, String paidBy, Long groupId) {
            this.id = id;
            this.description = description;
            this.amount = amount;
            this.paidBy = paidBy;
            this.groupId = groupId;
        }

        // Getters and setters
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
