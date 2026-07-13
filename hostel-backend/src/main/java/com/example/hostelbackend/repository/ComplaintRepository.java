package com.example.hostelbackend.repository;

import com.example.hostelbackend.entity.Complaint;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {
}