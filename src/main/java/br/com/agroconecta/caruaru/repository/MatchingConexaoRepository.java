package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.MatchingConexao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MatchingConexaoRepository extends JpaRepository<MatchingConexao, Long> {
    List<MatchingConexao> findByLotePlantioPropriedadeUsuarioId(Long produtorId);
    List<MatchingConexao> findByDemandaCompradorCompradorId(Long compradorId);
}
