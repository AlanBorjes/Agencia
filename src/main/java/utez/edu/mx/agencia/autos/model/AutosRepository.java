package utez.edu.mx.agencia.autos.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AutosRepository extends JpaRepository<Autos,Long> {
    boolean existsById(long id);
    void deleteById(long id);
    Optional<Autos> findByMatricula(String matricula);
}
