package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.CulturaCatalogo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CulturaCatalogoRepository extends JpaRepository<CulturaCatalogo, Long> {
    Optional<CulturaCatalogo> findByNomeIgnoreCase(String nome);
}