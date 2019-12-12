package io.sokolov.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "full_name")
    private String fullName;

    private String career;

    @Column(name = "working_number")
    private String workingNumber;

    private Integer experience;

    @Column(name = "cell_phone")
    private Long cellPhone;

    public Integer getId() {
        return id;
    }
}
