package io.sokolov.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "med_name")
    private String name;

    @Column(name = "med_rate")
    private String rate;

    @Column(name = "contr")
    private String contr;

    @OneToOne(mappedBy = "medicine")
    private Prescription prescription;

    public Integer getId() {
        return id;
    }
}
