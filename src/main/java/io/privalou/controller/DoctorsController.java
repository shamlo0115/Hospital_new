package io.privalou.controller;

import io.privalou.dao.DoctorRepository;
import io.privalou.domain.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
            @PathVariable(name = "id") Integer id
    ) {
        Optional<Doctor> optional = doctorRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addDoctor(@RequestBody Doctor doctor) {
        Doctor save = doctorRepository.save(doctor);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updateDoctor(@RequestBody Doctor doctor) {
        Optional<Doctor> optional = doctorRepository.findById(doctor.getId());
        if (optional.isPresent()) {
            doctorRepository.save(doctor);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteDoctor(@PathVariable(name = "id") Integer id) {
        this.doctorRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
