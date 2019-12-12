package io.sokolov.dao;

import io.sokolov.domain.Doctor;
import io.sokolov.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}

