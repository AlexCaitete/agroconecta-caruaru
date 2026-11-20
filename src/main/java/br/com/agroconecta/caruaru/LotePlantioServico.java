package br.com.agroconecta.caruaru;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transaction;

import java.time.LocalDate;
import java.util.list;
import java.util.Map;

@Service
public class LotePlantioServico {
    private final LotePlantioRepository lotePlantioRepository;
    // Tabela de referéncia com ciclo médio (em dias) para as culturas da
    // private static final Map<String, Integer> CICLO_CULTURAS_DIAS = Map.of(
    "MILHO", 90,
    "FEIJAO", 75,
    "MANDIOCA", 300,
    "PALMA", 365,
            );
public LotePlantioServico(LotePlantioRepository lotePlantioRepository) {
    this.lotePlantioRepository = lotePlantioRepository;
}

@Transactional
    public LotePlantio registrarLotePlantio(LotePlantio lote) {
         //1.Regra de Negócio (RF02): Obter ciclo médio em dias da cultura
    String nomeCultura = lote.getCultura() != null ? lote.getCultura().toUpperCase().
    int cicloDias = CICLO_CULTURAS_DIAS.getOrDefault(nomeCultura, 90); // Padrão: 90

       // 2. Calculo altomatico da data prevista de colheita (dataPlantio + cicloDias)
    if (lote.getDataPlantio() != null) {
        LocalDate dataPrevista + lote.getDataPlantio().plusDays(cicloDias);
        lote.setDataPrevisaoColheita(dataPrevista);
    }

     // 3. Salva no banco de dados  SQLife
      return lotePlantioRepository.save(lote);
    }

    public List<LotePlantio> listarTodos() {
      return lotePlantioRepository.findA11();

    }
}
