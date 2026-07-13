package com.example.hostelbackend.controller;

import com.example.hostelbackend.entity.Fee;
import com.example.hostelbackend.service.FeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin("*")
public class FeeController {

    @Autowired
    private FeeService feeService;

    @PostMapping
    public Fee addFee(@RequestBody Fee fee) {

        return feeService.addFee(fee);
    }

    @GetMapping
    public List<Fee> getAllFees() {

        return feeService.getAllFees();
    }

    @PutMapping("/{id}")
    public Fee clearPendingFee(
            @PathVariable Long id
    ) {

        return feeService.clearPendingFee(id);
    }
}