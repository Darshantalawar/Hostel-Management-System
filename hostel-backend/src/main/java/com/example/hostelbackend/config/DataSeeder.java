package com.example.hostelbackend.config;

import com.example.hostelbackend.entity.Admin;
import com.example.hostelbackend.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Creates one default admin row the first time the app starts against an
 * empty admins table, so there is always a way to log into the admin panel.
 * Safe to run on every startup: it only inserts when no admin exists yet.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.default-username}")
    private String defaultUsername;

    @Value("${app.admin.default-email}")
    private String defaultEmail;

    @Value("${app.admin.default-password}")
    private String defaultPassword;

    public DataSeeder(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (adminRepository.count() == 0) {

            Admin admin = new Admin();
            admin.setUsername(defaultUsername);
            admin.setEmail(defaultEmail);
            admin.setFullName("Hostel Administrator");
            admin.setPassword(passwordEncoder.encode(defaultPassword));

            adminRepository.save(admin);

            System.out.println(
                "Seeded default admin -> username: " + defaultUsername +
                " | password: " + defaultPassword +
                " (change this after first login)"
            );
        }
    }
}
