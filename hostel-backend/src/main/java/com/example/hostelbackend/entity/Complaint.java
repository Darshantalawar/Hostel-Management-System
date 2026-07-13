package com.example.hostelbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "complaints")
@Data
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private String complaintType;

    private String description;

    private String assignedStaff;

    private String status;

    private LocalDate complaintDate;
}