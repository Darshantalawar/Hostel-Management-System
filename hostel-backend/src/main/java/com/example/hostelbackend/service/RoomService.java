package com.example.hostelbackend.service;

import com.example.hostelbackend.entity.Room;
import com.example.hostelbackend.entity.Student;

import com.example.hostelbackend.repository.RoomRepository;
import com.example.hostelbackend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Room addRoom(Room room) {

        room.setAvailableBeds(
                room.getCapacity() - room.getOccupied()
        );

        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public String allocateRoom(Long studentId, Long roomId) {

        Student student = studentRepository
                .findById(studentId)
                .orElseThrow();

        Room room = roomRepository
                .findById(roomId)
                .orElseThrow();

        if (room.getAvailableBeds() <= 0) {
            return "Room Full";
        }

        room.setOccupied(room.getOccupied() + 1);

        room.setAvailableBeds(
                room.getCapacity() - room.getOccupied()
        );

        student.setRoomId(roomId);

        roomRepository.save(room);

        studentRepository.save(student);

        return "Room Allocated Successfully";
    }
}