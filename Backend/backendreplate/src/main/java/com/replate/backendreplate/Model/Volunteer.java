package com.replate.backendreplate.Model;

import jakarta.persistence.*;

@Entity
public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User volunteerOwner;

    private String volunteerAddress;

    private String volunteerDescription;

    private boolean active;

    private String imageUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getVolunteerOwner() {
        return volunteerOwner;
    }

    public void setVolunteerOwner(User volunteerOwner) {
        this.volunteerOwner = volunteerOwner;
    }

    public String getVolunteerAddress() {
        return volunteerAddress;
    }

    public void setVolunteerAddress(String volunteerAddress) {
        this.volunteerAddress = volunteerAddress;
    }

    public String getVolunteerDescription() {
        return volunteerDescription;
    }

    public void setVolunteerDescription(String volunteerDescription) {
        this.volunteerDescription = volunteerDescription;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
