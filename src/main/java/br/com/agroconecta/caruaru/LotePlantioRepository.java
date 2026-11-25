package br.com.agroconecta.caruaru;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LotePlantioRepository extends JpaRepository<LotePlantio, Long> {
    boolean existsByNomeProdutorAndCulturaAndDataPlantioAndAreaHectares(
            String nomeProdutor,
            String cultura,
            LocalDate dataPlantio,
            Double areaHectares
    );

}
