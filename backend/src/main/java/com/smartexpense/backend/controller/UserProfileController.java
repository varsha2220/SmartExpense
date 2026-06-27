package com.smartexpense.backend.controller;

import com.smartexpense.backend.entity.UserProfile;
import com.smartexpense.backend.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    // Create Profile
    @PostMapping
    public ResponseEntity<UserProfile> createProfile(
            @RequestBody UserProfile profile) {

        return ResponseEntity.ok(
                userProfileService.createProfile(profile)
        );
    }

    // Get Profile
    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getProfile(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userProfileService.getProfile(id)
        );
    }

    // Update Profile
    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateProfile(
            @PathVariable Long id,
            @RequestBody UserProfile profile) {

        return ResponseEntity.ok(
                userProfileService.updateProfile(id, profile)
        );
    }

    // Delete Profile
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProfile(
            @PathVariable Long id) {

        userProfileService.deleteProfile(id);

        return ResponseEntity.ok(
                "Profile Deleted Successfully"
        );
    }

    // Update Monthly Budget
    @PutMapping("/{id}/budget")
    public ResponseEntity<UserProfile> updateBudget(

            @PathVariable Long id,

            @RequestParam Double budget) {

        return ResponseEntity.ok(

                userProfileService.updateBudget(
                        id,
                        budget
                )

        );

    }

    // Update Savings Goal
    @PutMapping("/{id}/goal")
    public ResponseEntity<UserProfile> updateGoal(

            @PathVariable Long id,

            @RequestParam Double goal) {

        return ResponseEntity.ok(

                userProfileService.updateSavingsGoal(
                        id,
                        goal
                )

        );

    }

    // Update Theme
    @PutMapping("/{id}/theme")
    public ResponseEntity<UserProfile> updateTheme(

            @PathVariable Long id,

            @RequestParam String theme) {

        return ResponseEntity.ok(

                userProfileService.updateTheme(
                        id,
                        theme
                )

        );

    }

    // Update Currency
    @PutMapping("/{id}/currency")
    public ResponseEntity<UserProfile> updateCurrency(

            @PathVariable Long id,

            @RequestParam String currency) {

        return ResponseEntity.ok(

                userProfileService.updateCurrency(
                        id,
                        currency
                )

        );

    }

}
