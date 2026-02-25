package com.replate.backendreplate.dto;

import com.replate.backendreplate.Model.VerificationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

public class VolunteerRequest {




    @NotBlank
    private String volunteerAddress;

    @Size(max = 500)
    private String volunteerDescription;


    private MultipartFile image;


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


    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
