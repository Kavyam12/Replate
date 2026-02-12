package com.replate.backendreplate.dto;

import com.replate.backendreplate.Model.OrderStatus;
import com.replate.backendreplate.Model.PaymentMethod;
import com.replate.backendreplate.Model.PaymentStatus;
import com.replate.backendreplate.Model.Status;

import java.time.LocalDateTime;

public class OrderHistoryResponse {

    private Long orderId;
    private LocalDateTime orderDate;
    private String ngoName;
    private String itemSummary;
    private Double totalAmount;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
    private PaymentMethod paymentMethod;
    private String volunteerName;

    public OrderHistoryResponse(Long orderId, LocalDateTime orderDate, String ngoName, String itemSummary, Double totalAmount, OrderStatus orderStatus, PaymentStatus paymentStatus, PaymentMethod paymentMethod, String volunteerName) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.ngoName = ngoName;
        this.itemSummary = itemSummary;
        this.totalAmount = totalAmount;
        this.orderStatus = orderStatus;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.volunteerName = volunteerName;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getNgoName() {
        return ngoName;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }

    public String getItemSummary() {
        return itemSummary;
    }

    public void setItemSummary(String itemSummary) {
        this.itemSummary = itemSummary;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getVolunteerName() {
        return volunteerName;
    }

    public void setVolunteerName(String volunteerName) {
        this.volunteerName = volunteerName;
    }
}
