package io.sokolov.config;

import io.sokolov.dao.*;
import io.sokolov.domain.*;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class DataFiller implements ApplicationRunner {

    private final DoctorRepository doctorRepository;

    private final MedicineRepository medicineRepository;

    private final PatientRepository patientRepository;

    private final PersonRepository personRepository;

    private final PrescriptionRepository prescriptionRepository;

    private final UserRoleRepository userRoleRepository;

    private final UserRepository userRepository;

    public DataFiller(
            DoctorRepository doctorRepository,
            MedicineRepository medicineRepository,
            PatientRepository patientRepository,
            PersonRepository personRepository,
            PrescriptionRepository prescriptionRepository,
            UserRoleRepository userRoleRepository,
            UserRepository userRepository
    ) {
        this.doctorRepository = doctorRepository;
        this.medicineRepository = medicineRepository;
        this.patientRepository = patientRepository;
        this.personRepository = personRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void run(ApplicationArguments args) {
        Random random = new Random();

        List<Doctor> doctors = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Doctor doctor = new Doctor();
                    doctor.setFullName("Doctor #" + element);
                    doctor.setCareer("postgresCareer #" + element);
                    doctor.setExperience(random.nextInt(80));
                    doctor.setWorkingNumber("random-number" + random.nextInt(80));
                    doctor.setCellPhone(88005553535L);
                    return doctor;
                })
                .collect(Collectors.toList());

        doctorRepository.saveAll(doctors);

        List<Person> people = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Person person = new Person();
                    person.setBirthDate("22.09.1996");
                    person.setCellPhone(88005553536L);
                    person.setFullName("Person #" + element);
                    person.setHealthInsuranceNumber("" + random.nextInt(Integer.MAX_VALUE));
                    person.setPassportSeries(random.nextLong() * 3616L);
                    person.setPassportNumber(random.nextLong() * 999999L);
                    return person;
                })
                .collect(Collectors.toList());

        personRepository.saveAll(people);

        List<Medicine> medicineList = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Medicine medicine = new Medicine();
                    medicine.setContr("Contr # " + element);
                    medicine.setName("Medicine name #" + element);
                    medicine.setRate("Rate #" + element);
                    return medicine;
                })
                .collect(Collectors.toList());

        medicineRepository.saveAll(medicineList);

        List<Patient> patients = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Patient patient = new Patient();
                    patient.setHealthState("Almost dead");
                    patient.setHospitalizationDate("31.12.1990");
                    patient.setPerson(people.get(element));
                    patient.setIllness("SLE");
                    return patient;
                })
                .collect(Collectors.toList());
        patientRepository.saveAll(patients);

        List<Prescription> prescriptions = IntStream.range(0, 50)
                .mapToObj(element -> {
                    Prescription prescription = new Prescription();
                    prescription.setDescription("Description #" + element);
                    prescription.setMedicine(medicineList.get(element));
                    prescription.setPatient(patients.get(element));
                    prescription.setVolume(random.nextInt(500));
                    return prescription;
                })
                .collect(Collectors.toList());

        prescriptionRepository.saveAll(prescriptions);

        UserRole admin = new UserRole();
        admin.setName(UserRoleType.ROLE_ADMIN);
        userRoleRepository.save(admin);

        UserRole user = new UserRole();
        user.setName(UserRoleType.ROLE_USER);
        userRoleRepository.save(user);

        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(admin);
        userRoles.add(user);

        User sokol = new User();
        sokol.setUsername("sokolove");
        // hashed pass 123123
        sokol.setPassword("$2a$10$qistJBEGilidVNFwUFumZuA8R4JZJ15e2kehLqq9D8uHhkrZMOo1a");
        sokol.setName("Ilya Sokolov");
        sokol.setEmail("ilyasokolov@gmail.com");
        sokol.setRoles(userRoles);
        userRepository.save(sokol);
    }
}
