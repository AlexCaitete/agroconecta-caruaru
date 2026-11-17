package br.com.agroconecta.caruaru.model;

import jakarta.persistence.*;

@Entity
@Table(name = "culturas_catalogo")
public class CulturaCatalogo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String nome;

    @Column(name = "ciclo_medio_dias", nullable = false)
    private Integer cicloMedioDias;

    @Column(name = "unidade_medida", nullable = false, length = 30)
    private String unidadeMedida;

    @Column(name = "icone_identificador", length = 60)
    private String iconeIdentificador;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Integer getCicloMedioDias() { return cicloMedioDias; }
    public void setCicloMedioDias(Integer cicloMedioDias) { this.cicloMedioDias = cicloMedioDias; }

    public String getUnidadeMedida() { return unidadeMedida; }
    public void setUnidadeMedida(String unidadeMedida) { this.unidadeMedida = unidadeMedida; }

    public String getIconeIdentificador() { return iconeIdentificador; }
    public void setIconeIdentificador(String iconeIdentificador) { this.iconeIdentificador = iconeIdentificador; }
}