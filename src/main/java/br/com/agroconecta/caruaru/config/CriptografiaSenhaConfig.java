package br.com.agroconecta.caruaru.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class CriptografiaSenhaConfig {

    @Bean
    public PasswordEncoder criarCodificadorSenha() {
        return new BCryptPasswordEncoder();
    }
}