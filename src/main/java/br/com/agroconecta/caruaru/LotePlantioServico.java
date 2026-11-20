package br.com.agroconecta.caruaru;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

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
        calcularPrevisaoColheita(lote);
        return lotePlantioRepository.save(lote);
    }

    public List<LotePlantio> listarTodos() {
        return lotePlantioRepository.findAll();
    }

    public Optional<LotePlantio> buscarLotePorId(Long id) {
        return lotePlantioRepository.findById(id);
    }

    @Transactional
    public Optional<LotePlantio> atualizarLotePlantio(Long id, LotePlantio loteAtualizado) {
        return lotePlantioRepository.findById(id).map(loteExistente -> {
            loteExistente.setNomeLote(loteAtualizado.getNomeLote());
            loteExistente.setNomeProdutor(loteAtualizado.getNomeProdutor());
            loteExistente.setCultura(loteAtualizado.getCultura());
            loteExistente.setAreaHectares(loteAtualizado.getAreaHectares());
            loteExistente.setDataPlantio(loteAtualizado.getDataPlantio());
            calcularPrevisaoColheita(loteExistente);
            return lotePlantioRepository.save(loteExistente);
        });
    }

    @Transactional
    public boolean removerLotePlantio(Long id) {
        if (!lotePlantioRepository.existsById(id)) {
            return false;
        }
        lotePlantioRepository.deleteById(id);
        return true;
    }

    @Transactional
    public List<LotePlantio> sincronizarDadosOffline(List<LotePlantio> lotes) {
        List<LotePlantio> lotesSalvos = new ArrayList<>();
        for (LotePlantio lote : lotes) {
            calcularPrevisaoColheita(lote);
            boolean loteDuplicado = lotePlantioRepository
                    .existsByNomeProdutorAndCulturaAndDataPlantioAndAreaHectares(
                            lote.getNomeProdutor(),
                            lote.getCultura(),
                            lote.getDataPlantio(),
                            lote.getAreaHectares()
                    );
            if (!loteDuplicado) {
                lotesSalvos.add(lotePlantioRepository.save(lote));
            }
        }
        return lotesSalvos;
    }

    private void calcularPrevisaoColheita(LotePlantio lote) {
        String nomeCultura = lote.getCultura() != null
                ? lote.getCultura().toUpperCase(Locale.ROOT)
                : "";
        int cicloDias = CICLO_CULTURAS_DIAS.getOrDefault(nomeCultura, 90);
        LocalDate dataPlantio = lote.getDataPlantio();
        lote.setPrevisaoColheita(dataPlantio != null ? dataPlantio.plusDays(cicloDias) : null);
    }
}
