package com.example.hostelbackend.controller;

import com.example.hostelbackend.entity.Attendance;
import com.example.hostelbackend.service.AttendanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public Attendance markAttendance(
            @RequestBody Attendance attendance
    ) {

        return attendanceService
                .markAttendance(attendance);
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {

        return attendanceService
                .getAllAttendance();
    }
}