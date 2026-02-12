package com.replate.backendreplate.dto;

import com.replate.backendreplate.Model.OrderStatus;

import java.time.LocalDateTime;

public class CurrentOrderResponse {

    private Long orderId;
    private String foodItemName;
    private Integer quantity;
    private String quantityUnit;
    private String ngoName;
    private OrderStatus status;
    private LocalDateTime createdAt;

    public CurrentOrderResponse(Long orderId, String foodItemName, Integer quantity, String quantityUnit, String ngoName, OrderStatus status, LocalDateTime createdAt) {
        this.orderId = orderId;
        this.foodItemName = foodItemName;
        this.quantity = quantity;
        this.quantityUnit = quantityUnit;
        this.ngoName = ngoName;
        this.status = status;
        this.createdAt = createdAt;
    }

    public CurrentOrderResponse() {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getFoodItemName() {
        return foodItemName;
    }

    public void setFoodItemName(String foodItemName) {
        this.foodItemName = foodItemName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getQuantityUnit() {
        return quantityUnit;
    }

    public void setQuantityUnit(String quantityUnit) {
        this.quantityUnit = quantityUnit;
    }

    public String getNgoName() {
        return ngoName;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
