package io.sokolov.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table
public class Person implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "passport_number")
    private Long passportNumber;

    @Column(name = "passport_series")
    private Long passportSeries;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "health_insurance_number")
    private String healthInsuranceNumber;

    @Column(name = "cell_phone")
    private Long cellPhone;

    @JsonIgnore
    @OneToOne(mappedBy = "person")
    private Patient patient;

    public Integer getId() {
        return id;
    }
}
