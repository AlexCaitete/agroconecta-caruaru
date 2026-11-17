package br.com.agroconecta.caruaru.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rotas_frete_compartilhado")
public class RotaFreteCompartilhado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comunidade_origem", nullable = false, length = 100)
    private String comunidadeOrigem;

    @Column(nullable = false, length = 150)
    private String destino;

    @Column(name = "data_prevista_transporte", nullable = false)
    private LocalDate dataPrevistaTransporte;

    @Column(name = "capacidade_total_kg", nullable = false)
    private Double capacidadeTotalKg;

    @Column(name = "capacidade_ocupada_kg", nullable = false)
    private Double capacidadeOcupadaKg = 0.0;

    @ManyToMany
    @JoinTable(
        name = "frete_produtores_participantes",
        joinColumns = @JoinColumn(name = "rota_frete_id"),
        inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> produtoresParticipantes = new ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getComunidadeOrigem() { return comunidadeOrigem; }
    public void setComunidadeOrigem(String comunidadeOrigem) { this.comunidadeOrigem = comunidadeOrigem; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }

    public LocalDate getDataPrevistaTransporte() { return dataPrevistaTransporte; }
    public void setDataPrevistaTransporte(LocalDate dataPrevistaTransporte) { this.dataPrevistaTransporte = dataPrevistaTransporte; }

    public Double getCapacidadeTotalKg() { return capacidadeTotalKg; }
    public void setCapacidadeTotalKg(Double capacidadeTotalKg) { this.capacidadeTotalKg = capacidadeTotalKg; }

    public Double getCapacidadeOcupadaKg() { return capacidadeOcupadaKg; }
    public void setCapacidadeOcupadaKg(Double capacidadeOcupadaKg) { this.capacidadeOcupadaKg = capacidadeOcupadaKg; }

    public List<Usuario> getProdutoresParticipantes() { return produtoresParticipantes; }
    public void setProdutoresParticipantes(List<Usuario> produtoresParticipantes) { this.produtoresParticipantes = produtoresParticipantes; }
}