package br.com.agroconecta.caruaru.repository;

import br.com.agroconecta.caruaru.model.Usuario;
import br.com.agroconecta.caruaru.model.enums.PerfilUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Usuario> findByPerfilAndAtivoTrue(PerfilUsuario perfil);
}