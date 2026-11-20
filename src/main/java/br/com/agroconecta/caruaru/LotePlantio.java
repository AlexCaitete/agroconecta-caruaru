package br.com.agroconecta.caruaru;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lote_plantio")
public class LotePlantio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeLote;
    private String nomeProdutor;
    private String cultura;
    private Double areaHectares;
    private LocalDate dataPlantio;
    private LocalDate previsaoColheita;

    public LotePlantio() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeLote() {
        return nomeLote;
    }

    public void setNomeLote(String nomeLote) {
        this.nomeLote = nomeLote;
    }

    public String getNomeProdutor() {
        return nomeProdutor;
    }

    public void setNomeProdutor(String nomeProdutor) {
        this.nomeProdutor = nomeProdutor;
    }

    public String getCultura() {
        return cultura;
    }

    public void setCultura(String cultura) {
        this.cultura = cultura;
    }

    public Double getAreaHectares() {
        return areaHectares;
    }

    public void setAreaHectares(Double areaHectares) {
        this.areaHectares = areaHectares;
    }

    public LocalDate getDataPlantio() {
        return dataPlantio;
    }

    public void setDataPlantio(LocalDate dataPlantio) {
        this.dataPlantio = dataPlantio;
    }

    public LocalDate getPrevisaoColheita() {
        return previsaoColheita;
    }

    public void setPrevisaoColheita(LocalDate previsaoColheita) {
        this.previsaoColheita = previsaoColheita;
    }

    public LocalDate getDataPrevisaoColheita() {
        return previsaoColheita;
    }

    public void setDataPrevisaoColheita(LocalDate dataPrevisaoColheita) {
        this.previsaoColheita = dataPrevisaoColheita;
    }

}
