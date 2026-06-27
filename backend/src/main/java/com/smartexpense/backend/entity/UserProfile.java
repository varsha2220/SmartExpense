package com.smartexpense.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String email;

    private String phone;

    private String occupation;

    private Double monthlyIncome;

    private Double monthlyBudget;

    private Double savingsGoal;

    private String currency;

    private String theme;

    private String profileImage;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
