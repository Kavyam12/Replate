package com.replate.backendreplate.dto;

import java.util.List;

public class VolunteerTaskResponse {

    private List<ResponsibilityResponse> current;
    private List<ResponsibilityResponse> completed;
    private boolean active;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<ResponsibilityResponse> getCurrent() {
        return current;
    }

    public void setCurrent(List<ResponsibilityResponse> current) {
        this.current = current;
    }

    public List<ResponsibilityResponse> getCompleted() {
        return completed;
    }

    public void setCompleted(List<ResponsibilityResponse> completed) {
        this.completed = completed;
    }
}
