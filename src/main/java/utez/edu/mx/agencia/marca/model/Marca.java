package utez.edu.mx.agencia.marca.model;


import javax.persistence.*;

@Entity
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String name;

    public Marca() {
    }

    public Marca(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Marca(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
