package io.privalou.domain;

import javax.persistence.*;
import java.util.List;

@Entity(name = "cinematographer")
@Table(name = "cinematographer")
public class Cinematographer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column
    private String name;

    @OneToMany(mappedBy = "cinematographer")
    private List<Cinema> cinemas;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Cinema> getCinemas() {
        return cinemas;
    }

    public void setCinemas(List<Cinema> cinemas) {
        this.cinemas = cinemas;
    }

    @Override
    public String toString() {
        return "Cinematographer{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cinemas=" + cinemas +
                '}';
    }
}
