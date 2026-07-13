package com.example.hostelbackend.controller;

import com.example.hostelbackend.entity.Complaint;
import com.example.hostelbackend.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Save Complaint

    @PostMapping
    public Complaint saveComplaint(
            @RequestBody Complaint complaint
    ) {

        return complaintService.saveComplaint(
                complaint
        );
    }

    // Get All Complaints

    @GetMapping
    public List<Complaint> getAllComplaints() {

        return complaintService.getAllComplaints();
    }

    // Update Complaint

    @PutMapping("/{id}")
    public Complaint updateComplaint(

            @PathVariable Long id,

            @RequestBody Complaint complaint
    ) {

        return complaintService.updateComplaint(
                id,
                complaint
        );
    }
}