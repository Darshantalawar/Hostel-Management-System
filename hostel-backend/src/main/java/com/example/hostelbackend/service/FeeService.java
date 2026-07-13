package com.example.hostelbackend.service;

import com.example.hostelbackend.entity.Fee;
import com.example.hostelbackend.repository.FeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FeeService {

    @Autowired
    private FeeRepository feeRepository;

    public Fee addFee(Fee fee) {

        fee.setPaymentDate(LocalDate.now());

        return feeRepository.save(fee);
    }

    public List<Fee> getAllFees() {

        return feeRepository.findAll();
    }

    public Fee clearPendingFee(Long id) {

        Fee fee = feeRepository
                .findById(id)
                .orElseThrow();

        fee.setStatus("PAID");

        return feeRepository.save(fee);
    }
}