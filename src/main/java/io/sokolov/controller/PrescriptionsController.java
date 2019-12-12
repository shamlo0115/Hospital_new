package io.sokolov.controller;

import io.sokolov.dao.PrescriptionRepository;
import io.sokolov.domain.Prescription;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/prescriptions")
public class PrescriptionsController {
    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionsController(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Prescription>> getAll() {
        return ResponseEntity.ok(prescriptionRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescription(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<Prescription> optional = prescriptionRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addPrescription(@RequestBody Prescription prescription) {
        Prescription save = prescriptionRepository.save(prescription);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updatePrescription(@RequestBody Prescription prescription) {
        Optional<Prescription> optional = prescriptionRepository.findById(prescription.getId());
        if (optional.isPresent()) {
            prescriptionRepository.save(prescription);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePrescription(@PathVariable(name = "id") Integer id) {
        this.prescriptionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
