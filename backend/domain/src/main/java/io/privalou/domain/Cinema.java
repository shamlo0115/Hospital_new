package io.privalou.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name = "cinema")
@Table(name = "cinema")
public class Cinema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String name;
    @Column
    private String language;
    @Column
    private int runningTime;

    @OneToMany(mappedBy = "cinema")
    private List<Role> roles;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    private Director director;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cinematographer_id", referencedColumnName = "id")
    private Cinematographer cinematographer;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "cinema_theatre",
            joinColumns = @JoinColumn(name = "cinema_id"),
            inverseJoinColumns = @JoinColumn(name = "theatre_id"))
    private List<Theatre> theatres = new ArrayList<>();

}
