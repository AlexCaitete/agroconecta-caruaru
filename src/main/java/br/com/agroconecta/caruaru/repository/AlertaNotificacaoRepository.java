package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.AlertaNotificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlertaNotificacaoRepository extends JpaRepository<AlertaNotificacao, Long> {
    List<AlertaNotificacao> findByDestinatarioIdOrderByDataEnvioDesc(Long destinatarioId);
}