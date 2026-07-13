package com.example.hostelbackend.repository;

import com.example.hostelbackend.entity.Fee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeRepository extends JpaRepository<Fee, Long> {
}