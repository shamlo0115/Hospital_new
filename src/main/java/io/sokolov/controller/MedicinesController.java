package io.sokolov.controller;

import io.sokolov.dao.MedicineRepository;
import io.sokolov.domain.Medicine;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/medicines")
public class MedicinesController {

    private final MedicineRepository MedicineRepository;

    public MedicinesController(MedicineRepository MedicineRepository) {
        this.MedicineRepository = MedicineRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Medicine>> getAll() {
        return ResponseEntity.ok(MedicineRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicine(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<Medicine> optional = MedicineRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addMedicine(@RequestBody Medicine Medicine) {
        Medicine save = MedicineRepository.save(Medicine);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updateMedicine(@RequestBody Medicine Medicine) {
        Optional<Medicine> optional = MedicineRepository.findById(Medicine.getId());
        if (optional.isPresent()) {
            MedicineRepository.save(Medicine);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMedicine(@PathVariable(name = "id") Integer id) {
        this.MedicineRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
