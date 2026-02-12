package com.replate.backendreplate.dto;

public class DashboardSummaryResponse {

    private Long foodListedToday;
    private Long ordersCompleted;
    private Double revenueGenerated;
    private Long pendingPickups;

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(Long foodListedToday, Long ordersCompleted, Double revenueGenerated, Long pendingPickups) {
        this.foodListedToday = foodListedToday;
        this.ordersCompleted = ordersCompleted;
        this.revenueGenerated = revenueGenerated;
        this.pendingPickups = pendingPickups;
    }

    public Long getFoodListedToday() {
        return foodListedToday;
    }

    public void setFoodListedToday(Long foodListedToday) {
        this.foodListedToday = foodListedToday;
    }

    public Long getOrdersCompleted() {
        return ordersCompleted;
    }

    public void setOrdersCompleted(Long ordersCompleted) {
        this.ordersCompleted = ordersCompleted;
    }

    public Double getRevenueGenerated() {
        return revenueGenerated;
    }

    public void setRevenueGenerated(Double revenueGenerated) {
        this.revenueGenerated = revenueGenerated;
    }

    public Long getPendingPickups() {
        return pendingPickups;
    }

    public void setPendingPickups(Long pendingPickups) {
        this.pendingPickups = pendingPickups;
    }
}
