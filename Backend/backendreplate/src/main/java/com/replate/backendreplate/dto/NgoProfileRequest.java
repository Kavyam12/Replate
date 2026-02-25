package com.replate.backendreplate.dto;

import jakarta.validation.constraints.NotBlank;

public class NgoProfileRequest {

    @NotBlank(message = "NGO name is required")
    private String ngoName;

    @NotBlank(message = "Address is a required field")
    private String ngoAddress;

    private String ngoDescription;

    public String getNgoName() {
        return ngoName;
    }

    public void setNgoName(String ngoName) {
        this.ngoName = ngoName;
    }

    public String getNgoAddress() {
        return ngoAddress;
    }

    public void setNgoAddress(String ngoAddress) {
        this.ngoAddress = ngoAddress;
    }

    public String getNgoDescription() {
        return ngoDescription;
    }

    public void setNgoDescription(String ngoDescription) {
        this.ngoDescription = ngoDescription;
    }
}
