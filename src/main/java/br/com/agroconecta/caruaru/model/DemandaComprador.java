package br.com.agroconecta.caruaru.model;

import br.com.agroconecta.caruaru.model.enums.StatusDemanda;
import br.com.agroconecta.caruaru.model.enums.TipoDemanda;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "demandas_compradores")
public class DemandaComprador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "comprador_id", nullable = false)
    private Usuario comprador;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cultura_id", nullable = false)
    private CulturaCatalogo cultura;

    @Column(name = "volume_necessario", nullable = false)
    private Double volumeNecessario;

    @Column(name = "data_limite_entrega", nullable = false)
    private LocalDate dataLimiteEntrega;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_demanda", nullable = false, length = 30)
    private TipoDemanda tipoDemanda;

    @Column(name = "titulo_edital", length = 150)
    private String tituloEdital;

    @Column(length = 500)
    private String observacoes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private StatusDemanda status = StatusDemanda.ABERTA;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getComprador() { return comprador; }
    public void setComprador(Usuario comprador) { this.comprador = comprador; }

    public CulturaCatalogo getCultura() { return cultura; }
    public void setCultura(CulturaCatalogo cultura) { this.cultura = cultura; }

    public Double getVolumeNecessario() { return volumeNecessario; }
    public void setVolumeNecessario(Double volumeNecessario) { this.volumeNecessario = volumeNecessario; }

    public LocalDate getDataLimiteEntrega() { return dataLimiteEntrega; }
    public void setDataLimiteEntrega(LocalDate dataLimiteEntrega) { this.dataLimiteEntrega = dataLimiteEntrega; }

    public TipoDemanda getTipoDemanda() { return tipoDemanda; }
    public void setTipoDemanda(TipoDemanda tipoDemanda) { this.tipoDemanda = tipoDemanda; }

    public String getTituloEdital() { return tituloEdital; }
    public void setTituloEdital(String tituloEdital) { this.tituloEdital = tituloEdital; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public StatusDemanda getStatus() { return status; }
    public void setStatus(StatusDemanda status) { this.status = status; }
}