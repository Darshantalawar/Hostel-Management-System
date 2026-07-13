package com.example.hostelbackend.controller;

import com.example.hostelbackend.dto.AuthResponse;
import com.example.hostelbackend.dto.LoginRequest;
import com.example.hostelbackend.entity.Admin;
import com.example.hostelbackend.entity.Student;
import com.example.hostelbackend.repository.AdminRepository;
import com.example.hostelbackend.security.JwtUtil;
import com.example.hostelbackend.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * Dedicated, completely separate authentication endpoints for admins and
 * students. Neither method will accept the other role's credentials:
 * loginAdmin() only ever looks in AdminRepository, loginStudent() only
 * ever looks in StudentRepository (via StudentService).
 */
@RestController
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/admin/login")
    public AuthResponse loginAdmin(@RequestBody LoginRequest request) {

        String identifier = request.getUsernameOrEmail() != null
                ? request.getUsernameOrEmail()
                : request.getEmail();

        Admin admin = adminRepository.findByUsername(identifier)
                .or(() -> adminRepository.findByEmail(identifier))
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Invalid admin credentials"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin credentials");
        }

        String token = jwtUtil.generateToken(admin.getEmail(), admin.getId(), "ADMIN", admin.getFullName());

        return new AuthResponse(token, "ADMIN", admin.getId(), admin.getFullName(), admin.getEmail());
    }

    @PostMapping("/api/student/login")
    public AuthResponse loginStudent(@RequestBody LoginRequest request) {

        Student student = studentService.loginStudent(request.getEmail(), request.getPassword());

        if (student == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid student credentials");
        }

        String token = jwtUtil.generateToken(
                student.getEmail(), student.getId(), "STUDENT", student.getFullName());

        return new AuthResponse(token, "STUDENT", student.getId(), student.getFullName(), student.getEmail());
    }
}
