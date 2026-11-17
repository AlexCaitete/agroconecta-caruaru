package br.com.agroconecta.caruaru.model;

import br.com.agroconecta.caruaru.model.enums.StatusLotePlantio;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lotes_plantio")
public class LotePlantio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "propriedade_id", nullable = false)
    private PropriedadeEmpresa propriedade;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cultura_id", nullable = false)
    private CulturaCatalogo cultura;

    @Column(name = "data_plantio", nullable = false)
    private LocalDate dataPlantio;

    @Column(name = "data_estimada_colheita", nullable = false)
    private LocalDate dataEstimadaColheita;

    @Column(name = "volume_estimado", nullable = false)
    private Double volumeEstimado;

    @Column(name = "volume_disponivel", nullable = false)
    private Double volumeDisponivel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private StatusLotePlantio status = StatusLotePlantio.EM_CRESCIMENTO;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PropriedadeEmpresa getPropriedade() { return propriedade; }
    public void setPropriedade(PropriedadeEmpresa propriedade) { this.propriedade = propriedade; }

    public CulturaCatalogo getCultura() { return cultura; }
    public void setCultura(CulturaCatalogo cultura) { this.cultura = cultura; }

    public LocalDate getDataPlantio() { return dataPlantio; }
    public void setDataPlantio(LocalDate dataPlantio) { this.dataPlantio = dataPlantio; }

    public LocalDate getDataEstimadaColheita() { return dataEstimadaColheita; }
    public void setDataEstimadaColheita(LocalDate dataEstimadaColheita) { this.dataEstimadaColheita = dataEstimadaColheita; }

    public Double getVolumeEstimado() { return volumeEstimado; }
    public void setVolumeEstimado(Double volumeEstimado) { this.volumeEstimado = volumeEstimado; }

    public Double getVolumeDisponivel() { return volumeDisponivel; }
    public void setVolumeDisponivel(Double volumeDisponivel) { this.volumeDisponivel = volumeDisponivel; }

    public StatusLotePlantio getStatus() { return status; }
    public void setStatus(StatusLotePlantio status) { this.status = status; }
}