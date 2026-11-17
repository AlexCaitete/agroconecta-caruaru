package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.PropriedadeEmpresa;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PropriedadeEmpresaRepository extends JpaRepository<PropriedadeEmpresa, Long> {
    Optional<PropriedadeEmpresa> findByUsuarioId(Long usuarioId);
    List<PropriedadeEmpresa> findByComunidadeBairroIgnoreCase(String comunidadeBairro);
}