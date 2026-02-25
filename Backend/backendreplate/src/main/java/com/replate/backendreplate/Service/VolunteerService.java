package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.*;
import com.replate.backendreplate.Repository.*;
import com.replate.backendreplate.dto.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VolunteerService {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(VolunteerService.class);

    @Autowired
    private VolunteerRepository volunteerRepository;

    @Value("${app.defaults.volunteer-image-url}")
    private String DEFAULT_IMAGE_URL;

    @Autowired
    private ResponsibilityRepository responsibilityRepository;

    @Autowired
    private ImageStorageService imageStorageService;

    public VolunteerResponse getVolunteer(User volunteer) {

        VolunteerResponse response = new VolunteerResponse();
        response.setFullName(volunteer.getName());
        response.setPhoneNumber(volunteer.getContactNumber());
        response.setCreatedAt(volunteer.getCreatedAt());
        response.setVerificationStatus(volunteer.getVerificationStatus());

        Volunteer vol = volunteerRepository.findByVolunteerOwner(volunteer).orElse(null);
        if (vol != null) {
            response.setVolunteerAddress(vol.getVolunteerAddress());
            response.setVolunteerDescription(vol.getVolunteerDescription());
            response.setImageUrl(
                    vol.getImageUrl() != null ? vol.getImageUrl() : DEFAULT_IMAGE_URL);
        } else {
            response.setImageUrl(DEFAULT_IMAGE_URL);
        }

        return response;
    }

    public void updateProfile(User volunteer, @Valid VolunteerRequest request) {

        Volunteer vol = volunteerRepository.findByVolunteerOwner(volunteer)
                .orElseGet(() -> {
                    Volunteer v = new Volunteer();
                    v.setVolunteerOwner(volunteer);
                    v.setImageUrl(DEFAULT_IMAGE_URL);
                    return v;
                });

        vol.setVolunteerAddress(request.getVolunteerAddress());
        vol.setVolunteerDescription(request.getVolunteerDescription());

        if (request.getImage() != null && !request.getImage().isEmpty()) {
            String imageUrl = imageStorageService.store(request.getImage());
            vol.setImageUrl(imageUrl);
        }

        volunteerRepository.save(vol);
    }

    private Volunteer getOrCreateVolunteer(User user) {
        return volunteerRepository.findByVolunteerOwner(user)
                .orElseGet(() -> {
                    Volunteer v = new Volunteer();
                    v.setVolunteerOwner(user);
                    v.setImageUrl(DEFAULT_IMAGE_URL);
                    v.setActive(false);
                    return volunteerRepository.save(v);
                });
    }

    public VolunteerTaskResponse getVolunteerTask(User user) {
        logger.info("Getting tasks for user: {}", user.getEmail());
        Volunteer volunteer = getOrCreateVolunteer(user);
        logger.info("Volunteer ID: {}, Active: {}", volunteer.getId(), volunteer.isActive());

        List<Responsibility> assignedResponsibilities = responsibilityRepository.findByVolunteer(volunteer);
        logger.info("Assigned responsibilities count: {}", assignedResponsibilities.size());
        logger.info("TOTAL Responsibilities in entire DB: {}", responsibilityRepository.count());

        // Show available OPEN tasks regardless of active status so volunteers can see
        // why they should go active
        List<Responsibility> availableResponsibilities = responsibilityRepository
                .findByStatusAndVolunteerIsNull(ResponsibilityStatus.OPEN);
        logger.info("Available OPEN responsibilities count: {}", availableResponsibilities.size());

        VolunteerTaskResponse response = new VolunteerTaskResponse();
        response.setActive(volunteer.isActive());

        List<ResponsibilityResponse> completedList = new ArrayList<>();
        List<ResponsibilityResponse> currentList = new ArrayList<>();

        for (Responsibility responsibility : assignedResponsibilities) {
            if (responsibility.getStatus() == ResponsibilityStatus.CLOSED) {
                completedList.add(ResponsibilityResponse.from(responsibility));
            } else {
                currentList.add(ResponsibilityResponse.from(responsibility));
            }
        }

        for (Responsibility responsibility : availableResponsibilities) {
            currentList.add(ResponsibilityResponse.from(responsibility));
        }

        response.setCompleted(completedList);
        response.setCurrent(currentList);

        return response;
    }

    public void updateActiveStatus(User user, boolean active) {

        Volunteer volunteer = getOrCreateVolunteer(user);
        volunteer.setActive(active);
        volunteerRepository.save(volunteer);
    }

    @Autowired
    private CompleteOrderRepository completeOrderRepository;

    public void acceptTask(User user, Long responsibilityId) {
        Volunteer volunteer = getOrCreateVolunteer(user);

        Responsibility responsibility = responsibilityRepository.findById(responsibilityId)
                .orElseThrow(() -> new RuntimeException("Responsibility not found"));

        if (responsibility.getStatus() != ResponsibilityStatus.OPEN) {
            throw new RuntimeException("Responsibility is already accepted or closed");
        }

        responsibility.setVolunteer(volunteer);
        responsibility.setStatus(ResponsibilityStatus.ACCEPTED);
        responsibility.setAcceptedAt(LocalDateTime.now());
        responsibilityRepository.save(responsibility);

        // Also update the order status
        CompleteOrder order = responsibility.getOrder();
        order.setOrderStatus(OrderStatus.ACCEPTED);
        completeOrderRepository.save(order);
    }

    public void completeTask(User user, Long responsibilityId) {
        Volunteer volunteer = getOrCreateVolunteer(user);

        Responsibility responsibility = responsibilityRepository.findById(responsibilityId)
                .orElseThrow(() -> new RuntimeException("Responsibility not found"));

        if (responsibility.getVolunteer() == null || !responsibility.getVolunteer().getId().equals(volunteer.getId())) {
            throw new RuntimeException("This task is not assigned to you");
        }

        responsibility.setStatus(ResponsibilityStatus.CLOSED);
        responsibility.setCompletedAt(LocalDateTime.now());
        responsibilityRepository.save(responsibility);

        // Also update the order status
        CompleteOrder order = responsibility.getOrder();
        order.setOrderStatus(OrderStatus.COMPLETED);
        completeOrderRepository.save(order);
    }

}
