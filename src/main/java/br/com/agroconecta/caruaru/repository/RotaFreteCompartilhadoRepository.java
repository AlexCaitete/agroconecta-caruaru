package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.RotaFreteCompartilhado;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface RotaFreteCompartilhadoRepository extends JpaRepository<RotaFreteCompartilhado, Long> {
    List<RotaFreteCompartilhado> findByComunidadeOrigemIgnoreCaseAndDataPrevistaTransporteGreaterThanEqual(
        String comunidadeOrigem,
        LocalDate dataAtual
    );
}