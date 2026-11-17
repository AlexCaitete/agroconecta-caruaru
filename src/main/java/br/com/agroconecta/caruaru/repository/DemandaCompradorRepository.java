package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.DemandaComprador;
import br.com.agroconecta.caruaru.model.enums.StatusDemanda;
import br.com.agroconecta.caruaru.model.enums.TipoDemanda;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DemandaCompradorRepository extends JpaRepository<DemandaComprador, Long> {
    List<DemandaComprador> findByStatus(StatusDemanda status);
    List<DemandaComprador> findByTipoDemandaInAndStatus(List<TipoDemanda> tipos, StatusDemanda status);
    List<DemandaComprador> findByCompradorId(Long compradorId);
}