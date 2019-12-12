package io.sokolov.controller;

import io.sokolov.dao.PatientRepository;
import io.sokolov.domain.Patient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/patients")
public class PatientsController {

    private final PatientRepository patientRepository;

    public PatientsController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Patient>> getAll() {
        return ResponseEntity.ok(patientRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<Patient> optional = patientRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addPatient(@RequestBody Patient patient) {
        Patient save = patientRepository.save(patient);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updatePatient(@RequestBody Patient patient) {
        Optional<Patient> optional = patientRepository.findById(patient.getId());
        if (optional.isPresent()) {
            patientRepository.save(patient);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePatient(@PathVariable(name = "id") Integer id) {
        this.patientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
