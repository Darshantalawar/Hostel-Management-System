package com.example.hostelbackend.controller;

import com.example.hostelbackend.entity.Student;
import com.example.hostelbackend.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // MY PROFILE — a student's own record, resolved from their JWT
    // (Authentication#getName() is the email set as the token subject in
    // JwtAuthenticationFilter). Unlike GET /api/students, this never lets
    // a student see anyone else's data, so it is safe to open to STUDENT.

    @GetMapping("/me")
    public Student getMyProfile(Authentication authentication) {

        Student student = studentService.getByEmail(authentication.getName());

        if (student == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found");
        }

        return student;
    }

    // REGISTER

    @PostMapping("/register")
    public Student registerStudent(
            @RequestBody Student student
    ) {

        return studentService.registerStudent(
                student
        );
    }

    // LOGIN

    @PostMapping("/login")
    public Student loginStudent(
            @RequestBody Student student
    ) {

        return studentService.loginStudent(

                student.getEmail(),

                student.getPassword()
        );
    }

    // GET ALL STUDENTS

    @GetMapping
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();
    }

    // DELETE STUDENT

    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id
    ) {

        studentService.deleteStudent(id);

        return "Student Deleted Successfully";
    }

    // UPDATE STUDENT

    @PutMapping("/{id}")
    public Student updateStudent(

            @PathVariable Long id,

            @RequestBody Student student
    ) {

        return studentService.updateStudent(
                id,
                student
        );
    }
}