package io.privalou.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "theatre")
@Table(name = "theatre")
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany(mappedBy = "theatres")
    private List<Cinema> cinemas = new ArrayList<>();


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
        return "Theatre{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cinemas=" + cinemas +
                '}';
    }
}
