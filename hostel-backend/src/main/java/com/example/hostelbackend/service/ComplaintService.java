package com.example.hostelbackend.service;

import com.example.hostelbackend.entity.Complaint;
import com.example.hostelbackend.repository.ComplaintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    // Save Complaint

    public Complaint saveComplaint(
            Complaint complaint
    ) {

        return complaintRepository.save(
                complaint
        );
    }

    // Get All Complaints

    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }

    // Update Complaint

    public Complaint updateComplaint(

            Long id,

            Complaint updatedComplaint
    ) {

        Complaint complaint =
                complaintRepository.findById(id)
                        .orElseThrow();

        complaint.setStatus(
                updatedComplaint.getStatus()
        );

        complaint.setAssignedStaff(
                updatedComplaint.getAssignedStaff()
        );

        return complaintRepository.save(
                complaint
        );
    }
}