package com.example.hostelbackend.service;

import com.example.hostelbackend.entity.Attendance;
import com.example.hostelbackend.repository.AttendanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance markAttendance(
            Attendance attendance
    ) {

        attendance.setAttendanceDate(
                LocalDate.now()
        );

        return attendanceRepository.save(
                attendance
        );
    }

    public List<Attendance> getAllAttendance() {

        return attendanceRepository.findAll();
    }
}