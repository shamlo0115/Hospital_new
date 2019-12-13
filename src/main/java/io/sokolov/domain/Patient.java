package io.sokolov.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table
public class Patient implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="hospitalization_date")
            private String hospitalizationDate;

    private String illness;

    @Column(name="health_state")
    private String healthState;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id")
    private Person person;

    @OneToOne(mappedBy = "patient")
    private Prescription prescription;

    public Integer getId() {
        return id;
    }
}
