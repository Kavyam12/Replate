package com.replate.backendreplate.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ngos")
public class Ngo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ngoName;

    @Column(nullable = false)
    private String ngoAddress;


    private String ngoDescription;

    @OneToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false, unique = true)
    private User ngoOwner;


    @Column(nullable = false)
    private LocalDateTime createdAt;




    public Ngo() {

    }

    public Ngo(String ngoName, String ngoAddress, String ngoDescription, User ngoOwner) {
        this.ngoName = ngoName;
        this.ngoAddress = ngoAddress;
        this.ngoDescription = ngoDescription;
        this.ngoOwner = ngoOwner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public User getNgoOwner() {
        return ngoOwner;
    }

    public void setNgoOwner(User ngoOwner) {
        this.ngoOwner = ngoOwner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


}
