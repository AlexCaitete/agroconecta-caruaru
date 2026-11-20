package br.com.agroconecta.caruaru;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class LotePlantioServico {
    private final LotePlantioRepository lotePlantioRepository;
    private static final Map<String, Integer> CICLO_CULTURAS_DIAS = Map.of(
            "MILHO", 90,
            "FEIJAO", 75,
            "MANDIOCA", 300,
            "PALMA", 365
    );

    public LotePlantioServico(LotePlantioRepository lotePlantioRepository) {
        this.lotePlantioRepository = lotePlantioRepository;
    }

    @Transactional
    public LotePlantio registrarLotePlantio(LotePlantio lote) {
        String nomeCultura = lote.getCultura() != null ? lote.getCultura().toUpperCase() : "";
        int cicloDias = CICLO_CULTURAS_DIAS.getOrDefault(nomeCultura, 90);

        if (lote.getDataPlantio() != null) {
            LocalDate dataPrevista = lote.getDataPlantio().plusDays(cicloDias);
            lote.setPrevisaoColheita(dataPrevista);
        }

        return lotePlantioRepository.save(lote);
    }

    public List<LotePlantio> listarTodos() {
        return lotePlantioRepository.findAll();
    }
}
