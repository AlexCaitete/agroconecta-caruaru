package br.com.agroconecta.caruaru;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lotes-plantio")
public class LotePlantioControlador {
    private final LotePlantioServico lotePlantioServico;

    public LotePlantioControlador(LotePlantioServico lotePlantioServico) {
        this.lotePlantioServico = lotePlantioServico;
    }

    @PostMapping
    public ResponseEntity<LotePlantio> cadastrar(@RequestBody LotePlantio lote) {
        LotePlantio loteSalvo = lotePlantioServico.registrarLotePlantio(lote);
        return ResponseEntity.status(HttpStatus.CREATED).body(loteSalvo);

    }
    @GetMapping
    public ResponseEntity<List<LotePlantio>> listar() {
        List<LotePlantio> lotes = lotePlantioServico.listarTodos();
        return ResponseEntity.ok(lotes);

    }
}


