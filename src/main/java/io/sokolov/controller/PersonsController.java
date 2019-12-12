package io.sokolov.controller;

import io.sokolov.dao.PersonRepository;
import io.sokolov.domain.Person;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/persons")
public class PersonsController {

    private final PersonRepository personRepository;

    public PersonsController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Person>> getAll() {
        return ResponseEntity.ok(personRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPerson(
            @PathVariable(name = "id") Integer id
    ) {
        Optional<Person> optional = personRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseEntity.ok(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity addPerson(@RequestBody Person person) {
        Person save = personRepository.save(person);
        return save == null ? ResponseEntity.badRequest().build() : ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity updatePerson(@RequestBody Person person) {
        Optional<Person> optional = personRepository.findById(person.getId());
        if (optional.isPresent()) {
            personRepository.save(person);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePerson(@PathVariable(name = "id") Integer id) {
        this.personRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
