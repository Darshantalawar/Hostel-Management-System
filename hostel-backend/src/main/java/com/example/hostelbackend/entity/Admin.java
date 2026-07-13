package com.example.hostelbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Admin credentials live in their own table, completely separate from
 * the Student table. This guarantees a student account can never be
 * used to log into the admin panel and vice versa.
 */
@Entity
@Table(name = "admins")
@Data
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    // Stored as a BCrypt hash (see DataSeeder / SecurityConfig's PasswordEncoder bean)
    private String password;

    private String fullName;
}
