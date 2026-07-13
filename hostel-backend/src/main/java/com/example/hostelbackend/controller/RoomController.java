package com.example.hostelbackend.controller;

import com.example.hostelbackend.entity.Room;
import com.example.hostelbackend.entity.Student;
import com.example.hostelbackend.service.RoomService;
import com.example.hostelbackend.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private StudentService studentService;

    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return roomService.addRoom(room);
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    // OCCUPANTS — the students currently in a given room. Scoped to just
    // that room (not the full roster), so it's safe for a student to call
    // when showing their own roommates on the Room Details page.
    @GetMapping("/{id}/occupants")
    public List<Student> getOccupants(@PathVariable Long id) {
        return studentService.getStudentsByRoomId(id);
    }

    @PostMapping("/allocate")
    public String allocateRoom(
            @RequestParam Long studentId,
            @RequestParam Long roomId
    ) {

        return roomService.allocateRoom(
                studentId,
                roomId
        );
    }
}