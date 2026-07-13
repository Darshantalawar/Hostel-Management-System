package com.example.hostelbackend.service;

import com.example.hostelbackend.entity.Student;
import com.example.hostelbackend.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // REGISTER

    public Student registerStudent(
            Student student
    ) {

        return studentRepository.save(student);
    }

    // LOGIN

    public Student loginStudent(
            String email,
            String password
    ) {

        Student student = studentRepository
                .findByEmail(email)
                .orElse(null);

        if (student != null &&
                student.getPassword().equals(password)) {

            return student;
        }

        return null;
    }

    // GET ALL STUDENTS

    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }

    // GET SINGLE STUDENT BY EMAIL (used by /api/students/me — a student
    // fetching their OWN profile, resolved from their JWT identity rather
    // than a client-supplied id)

    public Student getByEmail(String email) {

        return studentRepository
                .findByEmail(email)
                .orElse(null);
    }

    // GET ALL STUDENTS IN A GIVEN ROOM (used for the student-facing
    // "roommates" list — deliberately narrower than exposing the full
    // student roster to non-admins)

    public List<Student> getStudentsByRoomId(Long roomId) {

        return studentRepository.findAll()
                .stream()
                .filter(s -> roomId.equals(s.getRoomId()))
                .toList();
    }

    // DELETE STUDENT

    public void deleteStudent(Long id) {

        studentRepository.deleteById(id);
    }

    // UPDATE STUDENT

    public Student updateStudent(
            Long id,
            Student updatedStudent
    ) {

        Student student = studentRepository
                .findById(id)
                .orElseThrow();

        student.setFullName(
                updatedStudent.getFullName()
        );

        student.setEmail(
                updatedStudent.getEmail()
        );

        student.setPhone(
                updatedStudent.getPhone()
        );

        student.setGender(
                updatedStudent.getGender()
        );

        student.setCollegeName(
                updatedStudent.getCollegeName()
        );

        student.setCourse(
                updatedStudent.getCourse()
        );

        student.setAddress(
                updatedStudent.getAddress()
        );

        return studentRepository.save(student);
    }
}