package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.LotePlantio;
import br.com.agroconecta.caruaru.model.enums.StatusLotePlantio;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface LotePlantioRepository extends JpaRepository<LotePlantio, Long> {
    List<LotePlantio> findByPropriedadeUsuarioId(Long usuarioId);
    List<LotePlantio> findByCulturaIdAndStatusInAndVolumeDisponivelGreaterThanAndDataEstimadaColheitaLessThanEqual(
        Long culturaId,
        List<StatusLotePlantio> status,
        Double volumeMinimo,
        LocalDate dataLimiteEntrega
    );
}