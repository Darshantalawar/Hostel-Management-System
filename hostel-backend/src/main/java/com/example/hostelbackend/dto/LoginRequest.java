package com.example.hostelbackend.dto;

import lombok.Data;

/**
 * Shared login payload. Admin login uses usernameOrEmail + password;
 * Student login uses email + password (usernameOrEmail is ignored for students).
 */
@Data
public class LoginRequest {

    private String usernameOrEmail;
    private String email;
    private String password;
}
