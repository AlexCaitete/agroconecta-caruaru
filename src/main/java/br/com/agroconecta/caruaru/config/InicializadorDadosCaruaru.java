package br.com.agroconecta.caruaru.config;

import br.com.agroconecta.caruaru.model.CulturaCatalogo;
import br.com.agroconecta.caruaru.repository.CulturaCatalogoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class InicializadorDadosCaruaru {

    @Bean
    CommandLineRunner popularCulturasIniciais(CulturaCatalogoRepository culturaRepository) {
        return args -> {
            if (culturaRepository.count() == 0) {
                List<CulturaCatalogo> culturasCaruaru = List.of(
                    criarCultura("Macaxeira", 240, "kg", "icone-raiz"),
                    criarCultura("Milho Verde", 90, "espiga", "icone-milho"),
                    criarCultura("Feijão Carioca", 85, "kg", "icone-grao"),
                    criarCultura("Tomate", 100, "caixa", "icone-tomate"),
                    criarCultura("Coentro", 35, "maço", "icone-folha"),
                    criarCultura("Alface", 45, "unidade", "icone-folha"),
                    criarCultura("Inhame", 210, "kg", "icone-raiz"),
                    criarCultura("Batata-doce", 120, "kg", "icone-raiz")
                );
                culturaRepository.saveAll(culturasCaruaru);
            }
        };
    }

    private CulturaCatalogo criarCultura(String nome, int cicloDias, String unidade, String icone) {
        CulturaCatalogo cultura = new CulturaCatalogo();
        cultura.setNome(nome);
        cultura.setCicloMedioDias(cicloDias);
        cultura.setUnidadeMedida(unidade);
        cultura.setIconeIdentificador(icone);
        return cultura;
    }
}