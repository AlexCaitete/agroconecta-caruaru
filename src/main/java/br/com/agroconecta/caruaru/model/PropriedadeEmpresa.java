package br.com.agroconecta.caruaru.model;

import jakarta.persistence.*;

@Entity
@Table(name = "propriedades_empresas")
public class PropriedadeEmpresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @Column(name = "nome_entidade", nullable = false, length = 150)
    private String nomeEntidade;

    @Column(name = "cpf_cnpj", length = 20)
    private String cpfCnpj;

    @Column(name = "comunidade_bairro", nullable = false, length = 100)
    private String comunidadeBairro;

    @Column(nullable = false, length = 100)
    private String municipio = "Caruaru";

    @Column(name = "ponto_referencia", length = 200)
    private String pontoReferencia;

    @Column(name = "tipo_atuacao", nullable = false, length = 80)
    private String tipoAtuacao;

    private Double latitude;
    private Double longitude;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getNomeEntidade() { return nomeEntidade; }
    public void setNomeEntidade(String nomeEntidade) { this.nomeEntidade = nomeEntidade; }

    public String getCpfCnpj() { return cpfCnpj; }
    public void setCpfCnpj(String cpfCnpj) { this.cpfCnpj = cpfCnpj; }

    public String getComunidadeBairro() { return comunidadeBairro; }
    public void setComunidadeBairro(String comunidadeBairro) { this.comunidadeBairro = comunidadeBairro; }

    public String getMunicipio() { return municipio; }
    public void setMunicipio(String municipio) { this.municipio = municipio; }

    public String getPontoReferencia() { return pontoReferencia; }
    public void setPontoReferencia(String pontoReferencia) { this.pontoReferencia = pontoReferencia; }

    public String getTipoAtuacao() { return tipoAtuacao; }
    public void setTipoAtuacao(String tipoAtuacao) { this.tipoAtuacao = tipoAtuacao; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}