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

    @GetMapping("/{id}")
    public ResponseEntity<LotePlantio> buscarLotePorId(@PathVariable Long id) {
        return lotePlantioServico.buscarLotePorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LotePlantio> atualizarLotePlantio(
            @PathVariable Long id,
            @RequestBody LotePlantio lote
    ) {
        return lotePlantioServico.atualizarLotePlantio(id, lote)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerLotePlantio(@PathVariable Long id) {
        if (!lotePlantioServico.removerLotePlantio(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/sincronizar-offline")
    public ResponseEntity<List<LotePlantio>> sincronizarDadosOffline(
            @RequestBody List<LotePlantio> lotes
    ) {
        return ResponseEntity.ok(lotePlantioServico.sincronizarDadosOffline(lotes));
    }
}

