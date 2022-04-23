package utez.edu.mx.agencia.autos.model;

import org.springframework.lang.NonNull;
import utez.edu.mx.agencia.marca.model.Marca;

import javax.persistence.*;

@Entity
public class Autos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String matricula;
    private String yearVerification;
    private String dateCreacion;
    private String dateUpdate;
    private int status;
    @ManyToOne
    @JoinColumn(name = "marca_id", nullable = false)
    @NonNull
    private Marca marca;

    public Autos() {
    }

    public Autos(long id, String name, String matricula, String yearVerification, String dateCreacion, String dateUpdate, int status, @NonNull Marca marca) {
        this.id = id;
        this.name = name;
        this.matricula = matricula;
        this.yearVerification = yearVerification;
        this.dateCreacion = dateCreacion;
        this.dateUpdate = dateUpdate;
        this.status = status;
        this.marca = marca;
    }

    public Autos(String name, String matricula, String yearVerification, String dateCreacion, String dateUpdate, int status, @NonNull Marca marca) {
        this.name = name;
        this.matricula = matricula;
        this.yearVerification = yearVerification;
        this.dateCreacion = dateCreacion;
        this.dateUpdate = dateUpdate;
        this.status = status;
        this.marca = marca;
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

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getYearVerification() {
        return yearVerification;
    }

    public void setYearVerification(String yearVerification) {
        this.yearVerification = yearVerification;
    }

    public String getDateCreacion() {
        return dateCreacion;
    }

    public void setDateCreacion(String dateCreacion) {
        this.dateCreacion = dateCreacion;
    }

    public String getDateUpdate() {
        return dateUpdate;
    }

    public void setDateUpdate(String dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @NonNull
    public Marca getMarca() {
        return marca;
    }

    public void setMarca(@NonNull Marca marca) {
        this.marca = marca;
    }
}
