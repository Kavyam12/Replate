package com.replate.backendreplate.dto;

import com.replate.backendreplate.Model.VerificationStatus;

import java.time.LocalDateTime;

public class NgoProfileResponse {

    private String ngoOwner;
    private LocalDateTime createdAt;
    private VerificationStatus verificationStatus;

    private String ngoName;
    private String ngoAddress;
    private String ngoDescription;

    public String getNgoOwner() {
        return ngoOwner;
    }

    public void setNgoOwner(String ngoOwner) {
        this.ngoOwner = ngoOwner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(VerificationStatus verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

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
