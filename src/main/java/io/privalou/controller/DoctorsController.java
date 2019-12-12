package io.privalou.controller;

import io.privalou.dao.DoctorRepository;
import io.privalou.domain.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/doctors")
public class DoctorsController {

    private final DoctorRepository doctorRepository;

    public DoctorsController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Doctor>> getAll() {
        return ResponseEntity.ok(doctorRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(
            int id
    ) {
        return ResponseEntity.ok(doctorRepository.getOne(id));
    }
}
