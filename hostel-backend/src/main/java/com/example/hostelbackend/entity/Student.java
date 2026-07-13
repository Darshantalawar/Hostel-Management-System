package com.example.hostelbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private String gender;
    private String collegeName;
    private String course;
    private String address;
    private String password;

    private Long roomId;
}