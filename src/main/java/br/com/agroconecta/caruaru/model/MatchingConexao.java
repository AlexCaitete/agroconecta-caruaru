package br.com.agroconecta.caruaru.model;

import br.com.agroconecta.caruaru.model.enums.StatusMatching;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "matching_conexoes")
public class MatchingConexao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "lote_plantio_id", nullable = false)
    private LotePlantio lotePlantio;

    @ManyToOne(optional = false)
    @JoinColumn(name = "demanda_comprador_id", nullable = false)
    private DemandaComprador demandaComprador;

    @Column(name = "volume_atendido", nullable = false)
    private Double volumeAtendido;

    @Column(name = "percentual_compatibilidade", nullable = false)
    private Double percentualCompatibilidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private StatusMatching status = StatusMatching.PENDENTE;

    @Column(name = "data_conexao", nullable = false)
    private LocalDateTime dataConexao = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LotePlantio getLotePlantio() { return lotePlantio; }
    public void setLotePlantio(LotePlantio lotePlantio) { this.lotePlantio = lotePlantio; }

    public DemandaComprador getDemandaComprador() { return demandaComprador; }
    public void setDemandaComprador(DemandaComprador demandaComprador) { this.demandaComprador = demandaComprador; }

    public Double getVolumeAtendido() { return volumeAtendido; }
    public void setVolumeAtendido(Double volumeAtendido) { this.volumeAtendido = volumeAtendido; }

    public Double getPercentualCompatibilidade() { return percentualCompatibilidade; }
    public void setPercentualCompatibilidade(Double percentualCompatibilidade) { this.percentualCompatibilidade = percentualCompatibilidade; }

    public StatusMatching getStatus() { return status; }
    public void setStatus(StatusMatching status) { this.status = status; }

    public LocalDateTime getDataConexao() { return dataConexao; }
    public void setDataConexao(LocalDateTime dataConexao) { this.dataConexao = dataConexao; }
}