package com.replate.backendreplate.dto;

import com.replate.backendreplate.Model.Role;
import jakarta.validation.constraints.*;

public class UserResponse {

    private Long userid;
    private String name;
    private String email;
    private Role role;

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
