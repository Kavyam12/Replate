package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Model.User;
import com.replate.backendreplate.Model.Volunteer;
import com.replate.backendreplate.Service.VolunteerService;
import com.replate.backendreplate.dto.VolunteerActiveRequest;
import com.replate.backendreplate.dto.VolunteerRequest;
import com.replate.backendreplate.dto.VolunteerResponse;
import com.replate.backendreplate.dto.VolunteerTaskResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/volunteer")
public class VolunteerController {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(VolunteerController.class);

    @Autowired
    private VolunteerService volunteerService;

    @GetMapping("/me")
    public VolunteerResponse getVolunteer(Authentication authentication) {

        User volunteer = (User) authentication.getPrincipal();

        return volunteerService.getVolunteer(volunteer);
    }

    @PutMapping(value = "/update", consumes = "multipart/form-data")
    public ResponseEntity<?> updateProfile(@Valid @ModelAttribute VolunteerRequest request,
            Authentication authentication) {

        User volunteer = (User) authentication.getPrincipal();

        volunteerService.updateProfile(volunteer, request);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/tasks")
    public ResponseEntity<VolunteerTaskResponse> getVolunteerTaskResponse(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        logger.info("Fetching tasks for volunteer: {}", user.getEmail());
        try {
            VolunteerTaskResponse response = volunteerService.getVolunteerTask(user);
            logger.info("Retrieved {} current and {} completed tasks",
                    response.getCurrent().size(), response.getCompleted().size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching volunteer tasks", e);
            throw e;
        }
    }

    @PutMapping("/active")
    public ResponseEntity<?> updateActiveStatus(
            Authentication authentication,
            @RequestBody VolunteerActiveRequest request) {
        User user = (User) authentication.getPrincipal();
        logger.info("Updating active status for volunteer {}: {}", user.getEmail(), request.isActive());
        volunteerService.updateActiveStatus(user, request.isActive());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/tasks/{id}/accept")
    public ResponseEntity<?> acceptTask(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        volunteerService.acceptTask(user, id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/tasks/{id}/complete")
    public ResponseEntity<?> completeTask(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        volunteerService.completeTask(user, id);
        return ResponseEntity.ok().build();
    }
}
