package io.sokolov.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table
public class Medicine implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "med_name")
    private String name;

    @Column(name = "med_rate")
    private String rate;

    @Column(name = "contr")
    private String contr;

    @JsonIgnore
    @OneToOne(mappedBy = "medicine")
    private Prescription prescription;

    public Integer getId() {
        return id;
    }
}
