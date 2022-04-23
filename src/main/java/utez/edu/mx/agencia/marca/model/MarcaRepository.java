package utez.edu.mx.agencia.marca.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MarcaRepository extends JpaRepository<Marca,Long> {
    Optional<Marca> findByName(String name);
    boolean existsByid(long id);
    void deleteById(long id);
}
