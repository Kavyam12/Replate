package com.replate.backendreplate.dto;

import com.replate.backendreplate.Model.Status;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DashboardRecentListingsResponse {

    private String foodName;
    private Long quantity;

    private BigDecimal price;
    private LocalDateTime deadline;
    private Status status;
    private String imageUrl;

    public DashboardRecentListingsResponse() {
    }

    public DashboardRecentListingsResponse(String foodName, Long quantity, BigDecimal price, LocalDateTime deadline, Status status, String imageUrl) {
        this.foodName = foodName;
        this.quantity = quantity;
        this.price = price;
        this.deadline = deadline;
        this.status = status;
        this.imageUrl = imageUrl;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
