package com.replate.backendreplate.dto;

import com.replate.backendreplate.Model.Responsibility;
import com.replate.backendreplate.Model.ResponsibilityStatus;

import java.time.LocalDateTime;

public class ResponsibilityResponse {

    private Long id;
    private String title;
    private String location;
    private LocalDateTime deadline;
    private LocalDateTime completedAt;
    private ResponsibilityStatus status;

    public static ResponsibilityResponse from(Responsibility responsibility) {

        ResponsibilityResponse response = new ResponsibilityResponse();

        response.setId(responsibility.getId());
        response.setStatus(responsibility.getStatus());
        response.setCompletedAt(responsibility.getCompletedAt());

        // Map realistic looking titles/locations using connected NGo/Rest
        if (responsibility.getNgo() != null) {
            response.setTitle("Food rescue for " + responsibility.getNgo().getName());
        } else {
            response.setTitle("Food rescue task");
        }

        if (responsibility.getRestaurant() != null) {
            response.setLocation(responsibility.getRestaurant().getAddress());
        } else {
            response.setLocation("Location pending");
        }

        if (responsibility.getCreatedAt() != null) {
            // Rough dummy deadline or actual logic here
            response.setDeadline(responsibility.getCreatedAt().plusHours(4));
        }

        return response;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public ResponsibilityStatus getStatus() {
        return status;
    }

    public void setStatus(ResponsibilityStatus status) {
        this.status = status;
    }
}
