package com.example.hostelbackend.service;

import com.example.hostelbackend.repository.RoomRepository;
import com.example.hostelbackend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Map<String, Object> getDashboardData() {

        Map<String, Object> data = new HashMap<>();

        long totalStudents = studentRepository.count();

        long totalRooms = roomRepository.count();

        int occupiedRooms = roomRepository.findAll()
                .stream()
                .mapToInt(room -> room.getOccupied())
                .sum();

        int totalCapacity = roomRepository.findAll()
                .stream()
                .mapToInt(room -> room.getCapacity())
                .sum();

        int vacantRooms = totalCapacity - occupiedRooms;

        data.put("totalStudents", totalStudents);
        data.put("totalRooms", totalRooms);
        data.put("occupiedRooms", occupiedRooms);
        data.put("vacantRooms", vacantRooms);

        return data;
    }
}