package com.smartexpense.backend.service;

import com.smartexpense.backend.entity.User;
import com.smartexpense.backend.entity.UserProfile;
import com.smartexpense.backend.exception.ResourceNotFoundException;
import com.smartexpense.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    // Create Profile
    public UserProfile createProfile(UserProfile profile) {

        return userProfileRepository.save(profile);

    }

    // Get Profile By ID
    public UserProfile getProfile(Long id) {

        return userProfileRepository.findById(id)

                .orElseThrow(() ->

                        new ResourceNotFoundException(
                                "Profile Not Found"
                        ));

    }

    // Get Profile By User
    public UserProfile getProfileByUser(User user) {

        return userProfileRepository.findByUser(user)

                .orElseThrow(() ->

                        new ResourceNotFoundException(
                                "Profile Not Found"
                        ));

    }

    // Update Profile
    public UserProfile updateProfile(
            Long id,
            UserProfile newProfile
    ) {

        UserProfile profile = getProfile(id);

        profile.setFullName(newProfile.getFullName());

        profile.setEmail(newProfile.getEmail());

        profile.setPhone(newProfile.getPhone());

        profile.setOccupation(newProfile.getOccupation());

        profile.setMonthlyIncome(
                newProfile.getMonthlyIncome()
        );

        profile.setMonthlyBudget(
                newProfile.getMonthlyBudget()
        );

        profile.setSavingsGoal(
                newProfile.getSavingsGoal()
        );

        profile.setCurrency(
                newProfile.getCurrency()
        );

        profile.setTheme(
                newProfile.getTheme()
        );

        profile.setProfileImage(
                newProfile.getProfileImage()
        );

        return userProfileRepository.save(profile);

    }

    // Delete Profile
    public void deleteProfile(Long id) {

        UserProfile profile = getProfile(id);

        userProfileRepository.delete(profile);

    }

    // Update Monthly Budget
    public UserProfile updateBudget(
            Long id,
            Double budget
    ) {

        UserProfile profile = getProfile(id);

        profile.setMonthlyBudget(budget);

        return userProfileRepository.save(profile);

    }

    // Update Savings Goal
    public UserProfile updateSavingsGoal(
            Long id,
            Double goal
    ) {

        UserProfile profile = getProfile(id);

        profile.setSavingsGoal(goal);

        return userProfileRepository.save(profile);

    }

    // Update Theme
    public UserProfile updateTheme(
            Long id,
            String theme
    ) {

        UserProfile profile = getProfile(id);

        profile.setTheme(theme);

        return userProfileRepository.save(profile);

    }

    // Update Currency
    public UserProfile updateCurrency(
            Long id,
            String currency
    ) {

        UserProfile profile = getProfile(id);

        profile.setCurrency(currency);

        return userProfileRepository.save(profile);

    }

}