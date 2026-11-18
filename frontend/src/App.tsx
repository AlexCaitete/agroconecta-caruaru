import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import logo from "./assets/agroconecta-logo.png";

type Role = "produtor" | "comprador" | "ater";
type Page =
  | "dashboard"
  | "safras"
  | "plantio"
  | "oportunidades"
  | "oportunidade"
  | "chamadas"
  | "logistica"
  | "alertas"
  | "demandas"
  | "demanda"
  | "produtores"
  | "produtor"
  | "futuras"
  | "relatorios"
  | "acompanhados"
  | "regionais"
  | "emitir"
  | "acessibilidade"
  | "teclado"
  | "formulario-erros"
  | "offline"
  | "configuracoes"
  | "privacidade";

type TextScale = "small" | "default" | "large";
type ReadingState = "idle" | "playing" | "paused";
type AccessPrefs = {
  textScale: TextScale;
  contrast: boolean;
  simple: boolean;
  reducedMotion: boolean;
  highlightLinks: boolean;
  speed: number;
};

const defaultAccessPrefs: AccessPrefs = {
  textScale: "default",
  contrast: false,
  simple: false,
  reducedMotion: false,
  highlightLinks: false,
  speed: 1,
};

const heroPhoto =
  "https://images.unsplash.com/photo-1551649001-7a2482d98d05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1400";

const paths: Record<string, ReactNode> = {
  home: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  leaf: (
    <>
      <path d="M6 21c0-8 4-13 13-17 1 9-4 15-13 17Z" />
      <path d="M6 21c2-5 6-9 11-12" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  cloud: <path d="M6 19h12a4 4 0 0 0 .5-7.97A7 7 0 0 0 5.1 9.1 5 5 0 0 0 6 19Z" />,
  box: (
    <>
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="M4 7v10l8 4 8-4V7M12 11v10" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 15 6l-.4-2.5h-4L10 6a7 7 0 0 0-1.5 1.1l-2.4-1-2 3.4L6 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1A7 7 0 0 0 10 18l.5 2.5h4L15 18a7 7 0 0 0 1.5-1.1l2.4 1 2-3.4L18 13a7 7 0 0 0 .1-1Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-3Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  arrow: (
    <>
      <path d="m9 18 6-6-6-6" />
    </>
  ),
  back: (
    <>
      <path d="m15 18-6-6 6-6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <path d="M12 20h.01" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  speaker: (
    <>
      <path d="M5 9H2v6h3l5 4V5L5 9Z" />
      <path d="M14 9a4 4 0 0 1 0 6M17 6a8 8 0 0 1 0 12" />
    </>
  ),
  play: <path d="m8 5 11 7-11 7V5Z" />,
  pause: (
    <>
      <path d="M8 5v14M16 5v14" />
    </>
  ),
  stop: <rect x="6" y="6" width="12" height="12" rx="1" />,
  rewind: (
    <>
      <path d="m11 7-5 5 5 5V7ZM18 7l-5 5 5 5V7Z" />
    </>
  ),
  forward: (
    <>
      <path d="m13 7 5 5-5 5V7ZM6 7l5 5-5 5V7Z" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1" />
    </>
  ),
  keyboard: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10" />
    </>
  ),
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.leaf}
    </svg>
  );
}

function Button({
  children,
  onClick,
  kind = "primary",
  icon,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  kind?: "primary" | "secondary" | "ghost" | "danger";
  icon?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`btn btn-${kind}`}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

function Logo({ onClick, light = false }: { onClick?: () => void; light?: boolean }) {
  return (
    <button
      className={`logo-button ${light ? "logo-light" : ""}`}
      onClick={onClick}
      aria-label="Ir para o início"
    >
      <img src={logo} alt="AgroConecta Caruaru" />
    </button>
  );
}

function Home({ goAuth }: { goAuth: (mode: "login" | "register") => void }) {
  const [menu, setMenu] = useState(false);
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="public">
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <header className="public-header">
        <Logo onClick={() => scroll("inicio")} />
        <nav className={menu ? "open" : ""} aria-label="Navegação principal">
          <button onClick={() => scroll("inicio")}>Início</button>
          <button onClick={() => scroll("beneficios")}>Benefícios</button>
          <button onClick={() => scroll("como")}>Como funciona</button>
          <button onClick={() => scroll("acessibilidade")}>Acessibilidade</button>
          <button onClick={() => goAuth("login")}>Entrar</button>
          <Button onClick={() => goAuth("register")}>Criar conta</Button>
        </nav>
        <button className="menu-trigger" onClick={() => setMenu(!menu)} aria-label="Abrir menu">
          <Icon name={menu ? "close" : "menu"} />
        </button>
      </header>

      <main id="conteudo-principal">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow">Agricultura familiar de Caruaru</span>
            <h1>Do campo à mesa, conectamos oportunidades</h1>
            <p>
              Planeje colheitas, encontre parceiros e tome decisões melhores. Uma rede feita para
              produtores, compradores e assistência técnica do Agreste.
            </p>
            <div className="button-row">
              <Button onClick={() => goAuth("register")} icon="arrow">
                Começar agora
              </Button>
              <Button kind="secondary" onClick={() => scroll("como")}>
                Conhecer a plataforma
              </Button>
            </div>
            <div className="trust-line">
              <span>
                <Icon name="shield" /> Dados protegidos
              </span>
              <span>
                <Icon name="wifi" /> Funciona offline
              </span>
            </div>
          </div>
          <figure className="hero-visual">
            <img
              src={heroPhoto}
              alt="Agricultor segurando uma colheita de raízes frescas no campo"
            />
            <figcaption>
              <span className="live-dot"></span> Produção local conectada
            </figcaption>
          </figure>
        </section>

        <section className="metrics" aria-label="Indicadores da plataforma">
          {[
            ["480+", "produtores conectados"],
            ["1.280 t", "volume mapeado"],
            ["23", "comunidades atendidas"],
            ["860+", "conexões realizadas"],
          ].map(([n, l]) => (
            <div key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </section>

        <section className="section" id="beneficios">
          <div className="section-heading">
            <span className="eyebrow">Uma rede para todos</span>
            <h2>Quem cresce com a AgroConecta</h2>
            <p>Informação clara e ferramentas adequadas para cada papel na cadeia produtiva.</p>
          </div>
          <div className="profile-grid">
            {[
              [
                "leaf",
                "Produtor",
                "Organize suas safras, encontre compradores e compartilhe transporte.",
              ],
              ["box", "Comprador", "Encontre produção local confiável e planeje compras futuras."],
              [
                "chart",
                "Técnico ATER",
                "Acompanhe o território e oriente decisões com dados regionais.",
              ],
            ].map(([i, t, d]) => (
              <article className="profile-card" key={t}>
                <span className="icon-tile">
                  <Icon name={i} size={26} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
                <button onClick={() => goAuth("register")}>
                  Criar perfil <Icon name="arrow" size={16} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="benefit-band">
          <div>
            <span className="eyebrow">Inteligência que chega ao campo</span>
            <h2>Menos incerteza. Mais organização.</h2>
          </div>
          <div className="benefit-list">
            {[
              "Prever e organizar colheitas",
              "Encontrar oferta e demanda compatíveis",
              "Compartilhar transporte",
              "Receber alertas importantes",
              "Acompanhar indicadores regionais",
            ].map((x, i) => (
              <div key={x}>
                <span>0{i + 1}</span>
                <p>{x}</p>
                <Icon name="check" />
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="como">
          <div className="section-heading">
            <span className="eyebrow">Simples de começar</span>
            <h2>Como funciona</h2>
          </div>
          <div className="steps">
            {[
              ["01", "Crie seu perfil", "Conte quem você é e onde atua."],
              ["02", "Cadastre ou busque", "Registre uma safra ou publique sua necessidade."],
              ["03", "Conecte e negocie", "Converse diretamente, sem intermediários."],
            ].map(([n, t, d]) => (
              <article key={n}>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="access-band" id="acessibilidade">
          <div>
            <span className="aa-mark">Aa</span>
          </div>
          <div>
            <span className="eyebrow">Acesso para todas as pessoas</span>
            <h2>Uma plataforma que respeita seu jeito de usar</h2>
            <p>
              Textos legíveis, navegação por teclado, leitura em áudio, alto contraste e uma
              interface simplificada.
            </p>
          </div>
          <Button kind="secondary" onClick={() => goAuth("login")}>
            Conhecer recursos
          </Button>
        </section>

        <section className="final-cta">
          <div>
            <h2>Vamos fortalecer a agricultura de Caruaru?</h2>
            <p>Crie sua conta gratuitamente e faça parte desta rede.</p>
          </div>
          <Button onClick={() => goAuth("register")}>Criar minha conta</Button>
        </section>
      </main>
      <footer>
        <Logo light />
        <p>Conectando o campo às oportunidades em Caruaru, Pernambuco.</p>
        <div>
          <a href="#beneficios">Sobre</a>
          <a href="#acessibilidade">Acessibilidade</a>
          <button onClick={() => goAuth("login")}>Privacidade e LGPD</button>
        </div>
        <small>Protótipo acadêmico — dados demonstrativos.</small>
      </footer>
    </div>
  );
}

function Auth({
  mode,
  setMode,
  onEnter,
}: {
  mode: "login" | "register" | "recover";
  setMode: (x: "login" | "register" | "recover" | "home") => void;
  onEnter: (role: Role) => void;
}) {
  const [role, setRole] = useState<Role>("produtor");
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onEnter(role);
    }, 700);
  };
  const roles: [Role, string, string][] = [
    ["produtor", "Produtor", "Cultivo e comercializo"],
    ["comprador", "Comprador", "Busco produtos locais"],
    ["ater", "Técnico ATER", "Acompanho o território"],
  ];
  return (
    <div className="auth-page">
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <aside className="auth-aside">
        <Logo light onClick={() => setMode("home")} />
        <div>
          <span className="eyebrow">AgroConecta Caruaru</span>
          <h1>
            {mode === "register"
              ? "Faça parte desta rede que fortalece o campo."
              : "Sua produção, suas conexões, suas oportunidades."}
          </h1>
          <p>Uma plataforma pública e segura para a agricultura familiar do nosso município.</p>
        </div>
        <small>Caruaru, Pernambuco</small>
      </aside>
      <main className="auth-main" id="conteudo-principal">
        <button className="back-link" onClick={() => setMode("home")}>
          <Icon name="back" /> Voltar para a Home
        </button>
        <div className="auth-card">
          <Logo />
          {mode === "recover" ? (
            <Recover setMode={setMode} />
          ) : (
            <>
              <div className="auth-title">
                <span>{mode === "register" ? `Etapa ${step} de 4` : "Bem-vindo de volta"}</span>
                <h2>
                  {mode === "register"
                    ? [
                        "Escolha seu perfil",
                        "Seus dados de acesso",
                        "Conte sobre sua atuação",
                        "Revise seus dados",
                      ][step - 1]
                    : "Acesse sua conta"}
                </h2>
                <p>
                  {mode === "register"
                    ? "Escolha com atenção: o tipo de conta não poderá ser alterado após concluir o cadastro."
                    : "Informe seus dados para acessar sua conta."}
                </p>
              </div>
              {mode === "register" && (
                <div className="progress">
                  <i style={{ width: `${step * 25}%` }} />
                </div>
              )}
              <form onSubmit={submit}>
                {mode === "register" && step === 1 && (
                  <div className="role-choice">
                    {roles.map(([r, t, d]) => (
                      <button
                        type="button"
                        className={role === r ? "selected" : ""}
                        onClick={() => setRole(r)}
                        key={r}
                      >
                        <span className="radio" />
                        <span>
                          <strong>{t}</strong>
                          <small>{d}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {(mode === "login" || step === 2) && (
                  <>
                    {mode === "register" && (
                      <Field
                        label="Nome completo"
                        placeholder="Maria José da Silva"
                        required
                        help="Digite seu nome como aparece no documento."
                        example="Maria José da Silva"
                      />
                    )}
                    <Field
                      label="E-mail"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      required
                      help="Usaremos este endereço para o acesso."
                      example="maria@exemplo.com"
                    />
                    {mode === "register" && (
                      <Field
                        label="Telefone"
                        placeholder="(81) 99999-0000"
                        required
                        help="Inclua o código de área."
                        example="(81) 99999-0000"
                      />
                    )}
                    <div className="password-field">
                      <Field
                        label="Senha"
                        type={show ? "text" : "password"}
                        placeholder="Digite sua senha"
                        required
                        help="Use pelo menos oito caracteres."
                        example="uma frase segura"
                      />
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        aria-label="Mostrar senha"
                      >
                        <Icon name="eye" />
                      </button>
                    </div>
                    {mode === "register" && (
                      <Field
                        label="Confirmar senha"
                        type="password"
                        placeholder="Repita sua senha"
                        required
                        help="Digite exatamente a mesma senha."
                      />
                    )}
                  </>
                )}
                {mode === "register" && step === 3 && <ProfileFields role={role} />}
                {mode === "register" && step === 4 && (
                  <div className="review-box">
                    <div>
                      <span>Perfil</span>
                      <strong>{roles.find((x) => x[0] === role)?.[1]}</strong>
                    </div>
                    <div>
                      <span>Nome</span>
                      <strong>Maria José da Silva</strong>
                    </div>
                    <div>
                      <span>Município</span>
                      <strong>Caruaru — PE</strong>
                    </div>
                    <label className="check-row">
                      <input type="checkbox" defaultChecked /> Aceito os Termos de Uso
                    </label>
                    <label className="check-row">
                      <input type="checkbox" defaultChecked /> Concordo com o uso dos dados conforme
                      a LGPD
                    </label>
                  </div>
                )}
                {mode === "login" && (
                  <div className="form-between">
                    <label className="check-row">
                      <input type="checkbox" /> Lembrar meu acesso
                    </label>
                    <button type="button" onClick={() => setMode("recover")}>
                      Esqueci minha senha
                    </button>
                  </div>
                )}
                {message && (
                  <div className="form-error">
                    <Icon name="alert" />
                    {message}
                  </div>
                )}
                <div className="auth-actions">
                  {mode === "register" && step > 1 && (
                    <Button kind="secondary" onClick={() => setStep(step - 1)}>
                      Voltar
                    </Button>
                  )}
                  {mode === "register" && step < 4 ? (
                    <Button onClick={() => setStep(step + 1)}>Continuar</Button>
                  ) : (
                    <Button type="submit" disabled={loading}>
                      {loading
                        ? "Entrando..."
                        : mode === "register"
                          ? "Concluir cadastro"
                          : "Entrar"}
                    </Button>
                  )}
                </div>
              </form>
              <p className="auth-switch">
                {mode === "login" ? "Ainda não tem conta?" : "Já possui uma conta?"}{" "}
                <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
                  {mode === "login" ? "Criar conta" : "Entrar"}
                </button>
              </p>
              {mode === "login" && (
                <button
                  className="demo-error"
                  onClick={() =>
                    setMessage("E-mail ou senha incorretos. Confira os dados e tente novamente.")
                  }
                >
                  Demonstrar mensagem de erro
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  children,
  required = false,
  help,
  example,
  error,
  success,
  disabled = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  children?: ReactNode;
  required?: boolean;
  help?: string;
  example?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
}) {
  const id = useId();
  const fieldHint = help || "Preencha esta informação e revise antes de continuar.";
  const describedBy = [`${id}-help`, error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <label className={`field ${error ? "field-error" : ""} ${success ? "field-success" : ""}`}>
      <span>
        {label}
        {required && <b className="required-text"> Obrigatório</b>}
      </span>
      <small className="field-help" id={`${id}-help`}>
          {fieldHint}
          {example && " "}
          {example && <span>Exemplo: {example}</span>}
      </small>
      {children || (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
      )}
      {error && (
        <small className="field-message error-message" id={`${id}-error`}>
          <Icon name="alert" size={16} /> {error}
        </small>
      )}
      {success && (
        <small className="field-message success-message">
          <Icon name="check" size={16} /> {success}
        </small>
      )}
    </label>
  );
}

function ProfileFields({ role }: { role: Role }) {
  if (role === "produtor")
    return (
      <>
        <Field label="Nome da propriedade" placeholder="Ex.: Sítio Boa Esperança" />
        <Field label="CPF ou CNPJ" placeholder="Somente números" />
        <Field label="Comunidade ou bairro" placeholder="Ex.: Serrote dos Bois" />
        <Field label="Tipo de atuação">
          <select>
            <option>Produtor individual</option>
            <option>Cooperativa</option>
            <option>Associação</option>
          </select>
        </Field>
      </>
    );
  if (role === "comprador")
    return (
      <>
        <Field label="Empresa ou instituição" placeholder="Nome da organização" />
        <Field label="CPF ou CNPJ" placeholder="Somente números" />
        <Field label="Segmento">
          <select>
            <option>Restaurante</option>
            <option>Mercado</option>
            <option>Instituição pública</option>
          </select>
        </Field>
        <Field label="Bairro" placeholder="Bairro de atuação" />
      </>
    );
  return (
    <>
      <Field label="Órgão ou instituição" placeholder="Ex.: Secretaria de Desenvolvimento Rural" />
      <Field label="Registro funcional (opcional)" placeholder="Número do registro" />
      <Field label="Área de atuação" placeholder="Ex.: Horticultura" />
      <Field label="Comunidades acompanhadas" placeholder="Selecione ou digite" />
    </>
  );
}

function Recover({ setMode }: { setMode: (x: "login") => void }) {
  const [step, setStep] = useState(1);
  return (
    <div>
      <div className="auth-title">
        <span>Recuperar acesso</span>
        <h2>
          {
            ["Esqueceu sua senha?", "Confira seu e-mail", "Crie uma nova senha", "Senha alterada!"][
              step - 1
            ]
          }
        </h2>
        <p>
          {step === 1
            ? "Informe o e-mail da sua conta."
            : step === 2
              ? "Enviamos um código de 6 dígitos."
              : step === 3
                ? "Use uma senha forte e fácil de lembrar."
                : "Agora você já pode entrar novamente."}
        </p>
      </div>
      {step === 1 && <Field label="E-mail" type="email" placeholder="seuemail@exemplo.com" />}
      {step === 2 && <Field label="Código de verificação" placeholder="000 000" />}
      {step === 3 && (
        <>
          <Field label="Nova senha" type="password" placeholder="Mínimo de 8 caracteres" />
          <Field label="Confirmar nova senha" type="password" placeholder="Repita a nova senha" />
        </>
      )}
      {step === 4 ? (
        <Button onClick={() => setMode("login")}>Voltar para entrar</Button>
      ) : (
        <Button onClick={() => setStep(step + 1)}>
          {step === 1 ? "Enviar código" : step === 2 ? "Verificar código" : "Alterar senha"}
        </Button>
      )}
    </div>
  );
}

const menus: Record<Role, { page: Page; label: string; icon: string }[]> = {
  produtor: [
    { page: "dashboard", label: "Visão geral", icon: "home" },
    { page: "safras", label: "Minhas safras", icon: "leaf" },
    { page: "plantio", label: "Cadastrar plantio", icon: "plus" },
    { page: "oportunidades", label: "Oportunidades", icon: "search" },
    { page: "chamadas", label: "Chamadas públicas", icon: "file" },
    { page: "logistica", label: "Logística compartilhada", icon: "truck" },
    { page: "alertas", label: "Alertas", icon: "bell" },
  ],
  comprador: [
    { page: "dashboard", label: "Visão geral", icon: "home" },
    { page: "demandas", label: "Minhas demandas", icon: "file" },
    { page: "produtores", label: "Produtores compatíveis", icon: "users" },
    { page: "futuras", label: "Safras futuras", icon: "calendar" },
    { page: "logistica", label: "Logística", icon: "truck" },
    { page: "alertas", label: "Alertas", icon: "bell" },
  ],
  ater: [
    { page: "dashboard", label: "Visão geral", icon: "home" },
    { page: "relatorios", label: "Relatórios e dados", icon: "chart" },
    { page: "acompanhados", label: "Produtores", icon: "users" },
    { page: "regionais", label: "Alertas regionais", icon: "alert" },
    { page: "emitir", label: "Emitir alerta", icon: "plus" },
  ],
};

const roleNames: Record<Role, string> = {
  produtor: "Produtor",
  comprador: "Comprador",
  ater: "Técnico ATER",
};

function Shell({
  role,
  onLogout,
}: {
  role: Role;
  onLogout: () => void;
}) {
  const [page, setPage] = useState<Page>("dashboard");
  const [sideOpen, setSideOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [access, setAccess] = useState(false);
  const [profile, setProfile] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [reading, setReading] = useState<ReadingState>("idle");
  const [currentBlock, setCurrentBlock] = useState("Resumo da página");
  const [sync, setSync] = useState<
    "online" | "offline" | "saved" | "pending" | "syncing" | "success" | "error"
  >("online");
  const [prefs, setPrefs] = useState<AccessPrefs>(() => {
    try {
      const saved = localStorage.getItem("agroconecta-accessibility");
      return saved ? { ...defaultAccessPrefs, ...JSON.parse(saved) } : defaultAccessPrefs;
    } catch {
      return defaultAccessPrefs;
    }
  });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  useEffect(() => {
    localStorage.setItem("agroconecta-accessibility", JSON.stringify(prefs));
  }, [prefs]);
  useEffect(
    () => () => {
      window.speechSynthesis?.cancel();
    },
    [],
  );
  const updatePrefs = (next: Partial<AccessPrefs>) => setPrefs((current) => ({ ...current, ...next }));
  const readingText =
    role === "produtor" && page === "dashboard"
      ? "Bem-vindo ao AgroConecta. Você tem quatro safras ativas, sete oportunidades compatíveis e três alertas. A próxima colheita é de coentro em três dias."
      : `AgroConecta Caruaru. Página atual: ${page}. Use Tab para navegar pelos controles e Enter para ativar.`;
  const startReading = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readingText);
    utterance.lang = "pt-BR";
    utterance.rate = prefs.speed;
    utterance.onend = () => setReading("idle");
    utteranceRef.current = utterance;
    setCurrentBlock("Resumo da página");
    setReading("playing");
    setAudioOpen(true);
    window.speechSynthesis.speak(utterance);
  };
  const pauseReading = () => {
    window.speechSynthesis?.pause();
    setReading("paused");
  };
  const resumeReading = () => {
    window.speechSynthesis?.resume();
    setReading("playing");
  };
  const stopReading = () => {
    window.speechSynthesis?.cancel();
    setReading("idle");
  };
  const go = (p: Page) => {
    setPage(p);
    setSideOpen(false);
    window.scrollTo(0, 0);
  };
  const syncStates = [
    "online",
    "offline",
    "saved",
    "pending",
    "syncing",
    "success",
    "error",
  ] as const;
  const syncLabels = {
    online: "Conectado e sincronizado",
    offline: "Sem internet",
    saved: "Dados salvos neste aparelho",
    pending: "Envio pendente",
    syncing: "Sincronizando",
    success: "Dados enviados com sucesso",
    error: "Não foi possível sincronizar. Tentar novamente",
  };
  return (
    <div
      className={`app-shell text-${prefs.textScale} ${prefs.contrast ? "high-contrast" : ""} ${prefs.simple ? "simple-interface" : ""} ${prefs.reducedMotion ? "reduced-motion" : ""} ${prefs.highlightLinks ? "highlight-links" : ""} ${reading !== "idle" ? "reading-active" : ""}`}
    >
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo principal
      </a>
      <aside className={`sidebar ${sideOpen ? "open" : ""}`}>
        <div className="side-top">
          <Logo light onClick={onLogout} />
          <button
            className="side-close touch-target"
            onClick={() => setSideOpen(false)}
            aria-label="Fechar navegação"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="role-label">Área do {roleNames[role]}</div>
        <nav>
          {menus[role].map((item) => (
            <button
              key={item.page}
              className={page === item.page ? "active" : ""}
              onClick={() => go(item.page)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {item.label === "Alertas" && <b>3</b>}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <button
            onClick={() => go("acessibilidade")}
            className={page === "acessibilidade" ? "active" : ""}
          >
            <span aria-hidden="true">Aa</span>
            Acessibilidade
          </button>
          <button
            onClick={() => go("configuracoes")}
            className={page === "configuracoes" ? "active" : ""}
          >
            <Icon name="gear" />
            Configurações
          </button>
          <button
            onClick={() => go("privacidade")}
            className={page === "privacidade" ? "active" : ""}
          >
            <Icon name="shield" />
            Privacidade e LGPD
          </button>
          <button onClick={onLogout}>
            <Icon name="back" />
            Sair
          </button>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-header">
          <button
            className="menu-trigger"
            onClick={() => setSideOpen(true)}
            aria-label="Abrir navegação"
          >
            <Icon name="menu" />
          </button>
          <button
            className={`sync-state ${sync}`}
            onClick={() => setSync(syncStates[(syncStates.indexOf(sync) + 1) % syncStates.length])}
            aria-label={`Estado da conexão: ${syncLabels[sync]}. Ativar para demonstrar o próximo estado.`}
            aria-live="polite"
          >
            <span />
            <Icon name="wifi" />
            {syncLabels[sync]}
          </button>
          <div className="header-actions">
            <button
              className="listen-button"
              onClick={reading === "playing" ? pauseReading : startReading}
              aria-label={reading === "playing" ? "Pausar leitura da página" : "Ouvir esta página"}
            >
              <Icon name={reading === "playing" ? "pause" : "speaker"} />
              <span>{reading === "playing" ? "Pausar" : "Ouvir esta página"}</span>
            </button>
            <button
              className="aa-button"
              onClick={() => setAccess(true)}
              aria-label="Central de acessibilidade"
            >
              Aa
            </button>
            <button
              className="touch-target"
              onClick={() => setNotifications(true)}
              aria-label="Notificações, 3 não lidas"
            >
              <Icon name="bell" />
              <i>3</i>
            </button>
            <button className="profile-button" onClick={() => setProfile(!profile)}>
              <span>MJ</span>
              <div>
                <strong>Maria José</strong>
                <small>{roleNames[role]}</small>
              </div>
              <Icon name="arrow" size={16} />
            </button>
          </div>
          {profile && (
            <div className="profile-popover">
              <div className="profile-account">
                <span>Tipo de conta</span>
                <strong>{roleNames[role]}</strong>
                <small>Definido no cadastro</small>
              </div>
              <hr />
              <button
                onClick={() => {
                  go("configuracoes");
                  setProfile(false);
                }}
              >
                Configurações <Icon name="gear" size={17} />
              </button>
              <button onClick={onLogout}>Sair da conta</button>
            </div>
          )}
        </header>
        <main className="page-content" id="conteudo-principal" tabIndex={-1}>
          <PageRouter
            page={page}
            role={role}
            go={go}
            prefs={prefs}
            updatePrefs={updatePrefs}
            startReading={startReading}
          />
        </main>
        <nav className="mobile-nav">
          {menus[role].slice(0, 4).map((x) => (
            <button
              className={page === x.page ? "active" : ""}
              onClick={() => go(x.page)}
              key={x.page}
            >
              <Icon name={x.icon} />
              <span>{x.label.split(" ")[0]}</span>
            </button>
          ))}
          <button onClick={() => setSideOpen(true)}>
            <Icon name="menu" />
            <span>Menu</span>
          </button>
        </nav>
      </div>
      {notifications && (
        <Drawer title="Notificações" close={() => setNotifications(false)}>
          <AlertList compact />
          <Button
            kind="secondary"
            onClick={() => {
              setNotifications(false);
              go("alertas");
            }}
          >
            Ver todos os alertas
          </Button>
        </Drawer>
      )}
      {access && (
        <Drawer title="Acessibilidade" close={() => setAccess(false)}>
          <Accessibility
            prefs={prefs}
            updatePrefs={updatePrefs}
            reading={reading}
            startReading={startReading}
            pauseReading={pauseReading}
            resumeReading={resumeReading}
            stopReading={stopReading}
            go={(target) => {
              setAccess(false);
              go(target);
            }}
          />
        </Drawer>
      )}
      {audioOpen && reading !== "idle" && (
        <AudioControls
          reading={reading}
          currentBlock={currentBlock}
          speed={prefs.speed}
          setSpeed={(speed) => {
            updatePrefs({ speed });
            stopReading();
          }}
          pause={pauseReading}
          resume={resumeReading}
          stop={() => {
            stopReading();
            setAudioOpen(false);
          }}
          previous={() => setCurrentBlock("Início e saudação")}
          next={() => setCurrentBlock("Indicadores e alertas")}
        />
      )}
    </div>
  );
}

function PageRouter({
  page,
  role,
  go,
  prefs,
  updatePrefs,
  startReading,
}: {
  page: Page;
  role: Role;
  go: (p: Page) => void;
  prefs: AccessPrefs;
  updatePrefs: (next: Partial<AccessPrefs>) => void;
  startReading: () => void;
}) {
  if (page === "dashboard")
    return <Dashboard role={role} go={go} simple={prefs.simple} startReading={startReading} />;
  if (page === "safras") return <Crops go={go} />;
  if (page === "plantio") return <Planting go={go} />;
  if (page === "oportunidades") return <Opportunities go={go} />;
  if (page === "oportunidade") return <Opportunity go={go} />;
  if (page === "chamadas") return <Calls />;
  if (page === "logistica") return <Logistics />;
  if (page === "alertas") return <Alerts role={role} />;
  if (page === "demandas") return <Demands go={go} />;
  if (page === "demanda") return <DemandForm go={go} />;
  if (page === "produtores") return <Producers go={go} />;
  if (page === "produtor") return <ProducerProfile go={go} />;
  if (page === "futuras") return <FutureCrops />;
  if (page === "relatorios") return <Reports />;
  if (page === "acompanhados") return <Tracked />;
  if (page === "regionais") return <RegionalAlerts go={go} />;
  if (page === "emitir") return <IssueAlert go={go} />;
  if (page === "acessibilidade") return <AccessibilityResources go={go} />;
  if (page === "teclado") return <KeyboardDemo />;
  if (page === "formulario-erros") return <AccessibleErrorForm />;
  if (page === "offline") return <OfflineDemo go={go} />;
  if (page === "configuracoes")
    return <Settings role={role} prefs={prefs} updatePrefs={updatePrefs} />;
  return <Privacy />;
}

function PageHead({
  eyebrow,
  title,
  description,
  action,
  back,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  back?: () => void;
}) {
  return (
    <div className="page-head">
      <div>
        {back && (
          <button className="back-link" onClick={back}>
            <Icon name="back" /> Voltar
          </button>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
  tone = "green",
}: {
  icon: string;
  label: string;
  value: string;
  detail: string;
  tone?: string;
}) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon name={icon} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function StatusBadge({
  text,
  icon,
  tone = "neutral",
}: {
  text: string;
  icon: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
}) {
  return (
    <span className={`status-badge ${tone}`}>
      <Icon name={icon} size={15} />
      {text}
    </span>
  );
}

function Dashboard({
  role,
  go,
  simple,
  startReading,
}: {
  role: Role;
  go: (p: Page) => void;
  simple: boolean;
  startReading: () => void;
}) {
  if (role === "comprador")
    return (
      <>
        <PageHead
          eyebrow="Visão geral"
          title="Bom dia, Paulo"
          description="Acompanhe suas demandas e encontre produção local em Caruaru."
          action={
            <Button icon="plus" onClick={() => go("demanda")}>
              Publicar demanda
            </Button>
          }
        />
        <div className="stats-grid">
          <Stat icon="file" label="Demandas ativas" value="6" detail="+2 neste mês" />
          <Stat
            icon="users"
            label="Produtores compatíveis"
            value="34"
            detail="8 novos esta semana"
          />
          <Stat icon="box" label="Volume em negociação" value="8,4 t" detail="4 produtos" />
          <Stat
            icon="bell"
            label="Novas respostas"
            value="12"
            detail="Requer atenção"
            tone="yellow"
          />
        </div>
        <div className="dashboard-grid">
          <Panel
            title="Suas demandas recentes"
            action={<button onClick={() => go("demandas")}>Ver todas</button>}
          >
            <SimpleRows
              rows={[
                ["Tomate", "1.200 kg • Entrega 20 jun", "8 interessados"],
                ["Feijão carioca", "800 kg • Entrega 28 jun", "5 interessados"],
                ["Coentro", "300 maços • Entrega semanal", "3 interessados"],
              ]}
            />
          </Panel>
          <Panel
            title="Produtores recomendados"
            action={<button onClick={() => go("produtores")}>Ver todos</button>}
          >
            <Match name="Cooperativa Serra Verde" crop="Tomate, coentro e alface" percent="96%" />
            <Match name="José Antônio da Silva" crop="Feijão e milho" percent="91%" />
          </Panel>
        </div>
        <div className="quick-actions">
          <button onClick={() => go("demanda")}>
            <Icon name="plus" />
            <span>
              <strong>Publicar demanda</strong>
              <small>Informe o que precisa comprar</small>
            </span>
          </button>
          <button onClick={() => go("logistica")}>
            <Icon name="truck" />
            <span>
              <strong>Planejar transporte</strong>
              <small>Encontre rotas compartilhadas</small>
            </span>
          </button>
        </div>
      </>
    );
  if (role === "ater")
    return (
      <>
        <PageHead
          eyebrow="Painel territorial"
          title="Olá, Ana Clara"
          description="Dados consolidados da agricultura familiar de Caruaru."
          action={<Button icon="file">Exportar relatório</Button>}
        />
        <div className="stats-grid">
          <Stat icon="users" label="Produtores mapeados" value="482" detail="+18 neste trimestre" />
          <Stat icon="leaf" label="Culturas mapeadas" value="17" detail="7 em colheita" />
          <Stat icon="box" label="Volume previsto" value="1.280 t" detail="Próximos 90 dias" />
          <Stat icon="home" label="Comunidades ativas" value="23" detail="8 regiões rurais" />
        </div>
        <div className="dashboard-grid">
          <Panel title="Oferta x demanda por cultura">
            <BarChart />
          </Panel>
          <Panel title="Riscos e oportunidades">
            <div className="risk-item danger">
              <Icon name="alert" />
              <div>
                <strong>Risco hídrico</strong>
                <p>4 comunidades • 68 produtores</p>
              </div>
            </div>
            <div className="risk-item warning">
              <Icon name="calendar" />
              <div>
                <strong>Concentração de colheita</strong>
                <p>Tomate • Próximas 3 semanas</p>
              </div>
            </div>
            <div className="risk-item success">
              <Icon name="chart" />
              <div>
                <strong>Oportunidade comercial</strong>
                <p>Demanda de 12 t de macaxeira</p>
              </div>
            </div>
          </Panel>
        </div>
        <div className="dashboard-grid">
          <Panel title="Produção por cultura">
            <Donut />
          </Panel>
          <Panel title="Próximas colheitas">
            <SimpleRows
              rows={[
                ["Tomate", "342 t", "jun — jul"],
                ["Milho", "289 t", "jul — ago"],
                ["Macaxeira", "214 t", "contínua"],
                ["Feijão", "176 t", "ago — set"],
              ]}
            />
          </Panel>
        </div>
      </>
    );
  if (simple) return <SimpleProducerDashboard go={go} startReading={startReading} />;
  return (
    <>
      <PageHead
        eyebrow="Visão geral"
        title="Bom dia, Maria José"
        description="Veja como estão suas safras e as oportunidades desta semana."
        action={
          <Button icon="plus" onClick={() => go("plantio")}>
            Cadastrar plantio
          </Button>
        }
      />
      <div className="weather-card">
        <div>
          <span className="weather-icon">
            <Icon name="cloud" size={32} />
          </span>
          <div>
            <span>Clima agora em Caruaru</span>
            <strong>24°C</strong>
            <small>Parcialmente nublado • 72% de umidade</small>
          </div>
        </div>
        <div className="handling">
          <span>Condição para manejo</span>
          <strong>
            <Icon name="check" /> Favorável
          </strong>
          <small>Boa janela até as 16h</small>
        </div>
      </div>
      <div className="stats-grid">
        <Stat icon="leaf" label="Safras ativas" value="4" detail="2 colheitas próximas" />
        <Stat icon="box" label="Volume estimado" value="6,8 t" detail="Total das safras" />
        <Stat icon="search" label="Oportunidades" value="12" detail="5 com alto encaixe" />
        <Stat icon="bell" label="Alertas" value="3" detail="1 requer atenção" tone="yellow" />
      </div>
      <div className="dashboard-grid">
        <Panel
          title="Progresso das safras"
          action={<button onClick={() => go("safras")}>Ver todas</button>}
        >
          <CropProgress
            crop="Tomate cereja"
            place="Sítio Boa Esperança"
            percent={78}
            date="Colheita em 12 dias"
          />
          <CropProgress
            crop="Feijão carioca"
            place="Sítio Boa Esperança"
            percent={52}
            date="Colheita em 38 dias"
          />
          <CropProgress
            crop="Coentro"
            place="Horta da Várzea"
            percent={90}
            date="Pronto para colher"
          />
        </Panel>
        <Panel
          title="Oportunidades recomendadas"
          action={<button onClick={() => go("oportunidades")}>Ver todas</button>}
        >
          <Match name="Restaurante Sabor do Agreste" crop="Tomate • 600 kg" percent="96%" />
          <Match name="Programa PNAE Caruaru" crop="Feijão • 1.200 kg" percent="91%" />
          <Match name="Mercado São João" crop="Coentro • 180 maços" percent="87%" />
        </Panel>
      </div>
      <div className="quick-actions">
        <button onClick={() => go("plantio")}>
          <Icon name="plus" />
          <span>
            <strong>Cadastrar plantio</strong>
            <small>Registre uma nova safra</small>
          </span>
        </button>
        <button onClick={() => go("oportunidades")}>
          <Icon name="search" />
          <span>
            <strong>Ver compradores</strong>
            <small>12 oportunidades para você</small>
          </span>
        </button>
        <button onClick={() => go("logistica")}>
          <Icon name="truck" />
          <span>
            <strong>Buscar transporte</strong>
            <small>Compartilhe uma rota</small>
          </span>
        </button>
      </div>
    </>
  );
}

function SimpleProducerDashboard({
  go,
  startReading,
}: {
  go: (p: Page) => void;
  startReading: () => void;
}) {
  const actions: [string, string, string, Page | "audio"][] = [
    ["plus", "Cadastrar plantio", "Conte o que você plantou.", "plantio"],
    ["leaf", "Ver minhas safras", "Acompanhe o que está crescendo.", "safras"],
    ["search", "Encontrar compradores", "Veja quem procura seus produtos.", "oportunidades"],
    ["bell", "Ver alertas", "Confira três avisos importantes.", "alertas"],
    ["truck", "Buscar transporte", "Encontre uma viagem compartilhada.", "logistica"],
    ["speaker", "Ouvir informações", "Escute o resumo desta página.", "audio"],
  ];
  return (
    <div className="simple-dashboard">
      <PageHead
        eyebrow="Modo simples"
        title="Olá, Maria José"
        description="Escolha o que você quer fazer."
      />
      <div className="simple-summary" aria-label="Resumo da sua conta">
        <Icon name="leaf" size={34} />
        <div>
          <strong>Você tem 4 safras ativas</strong>
          <p>O coentro estará pronto para colher em 3 dias.</p>
        </div>
      </div>
      <div className="simple-action-grid">
        {actions.map(([icon, title, text, target]) => (
          <article key={title}>
            <Icon name={icon} size={34} />
            <h2>{title}</h2>
            <p>{text}</p>
            <Button onClick={() => (target === "audio" ? startReading() : go(target))}>
              {title}
            </Button>
          </article>
        ))}
      </div>
      <div className="plain-language-note">
        <Icon name="wifi" />
        <strong>Sem internet?</strong>
        <span>Os dados serão enviados quando a internet voltar.</span>
      </div>
    </div>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="panel">
      <header>
        <h2>{title}</h2>
        {action}
      </header>
      <div className="panel-body">{children}</div>
    </section>
  );
}
function CropProgress({
  crop,
  place,
  percent,
  date,
}: {
  crop: string;
  place: string;
  percent: number;
  date: string;
}) {
  return (
    <div className="crop-progress">
      <span className="crop-symbol">
        <Icon name="leaf" />
      </span>
      <div>
        <strong>{crop}</strong>
        <small>{place}</small>
        <div className="progress-line">
          <i style={{ width: `${percent}%` }} />
        </div>
        <p>
          <span>{percent}% do ciclo</span>
          <b>{date}</b>
        </p>
      </div>
    </div>
  );
}
function Match({ name, crop, percent }: { name: string; crop: string; percent: string }) {
  return (
    <div className="match-row">
      <span className="match-score">
        {percent}
        <small>compatível</small>
      </span>
      <div>
        <strong>{name}</strong>
        <small>{crop}</small>
        <span>
          <Icon name="shield" size={14} /> Perfil verificado
        </span>
      </div>
      <Icon name="arrow" />
    </div>
  );
}
function SimpleRows({ rows }: { rows: string[][] }) {
  return (
    <div className="simple-rows">
      {rows.map((r, i) => (
        <div key={i}>
          <span className="row-icon">{i + 1}</span>
          <div>
            <strong>{r[0]}</strong>
            <small>{r[1]}</small>
          </div>
          <b>{r[2]}</b>
        </div>
      ))}
    </div>
  );
}
function BarChart() {
  const [showTable, setShowTable] = useState(false);
  const data = [
    ["Tomate", 70, 92, -22, "Demanda acima da oferta"],
    ["Milho", 82, 74, 8, "Oferta disponível"],
    ["Feijão", 55, 68, -13, "Demanda acima da oferta"],
    ["Macaxeira", 84, 66, 18, "Oferta disponível"],
    ["Hortaliças", 56, 72, -16, "Demanda acima da oferta"],
  ];
  return (
    <div className="accessible-chart">
      <p id="bar-chart-description">
        Comparação em toneladas entre a oferta cadastrada e a demanda prevista para cinco culturas.
      </p>
      <div className="bar-chart" role="img" aria-describedby="bar-chart-description bar-chart-summary">
        {data.map(([culture, offer, demand]) => (
          <div key={culture as string}>
            <span>{culture}</span>
            <i>
              <b style={{ width: `${offer}%` }}>
                <span>{offer} t</span>
              </b>
              <em style={{ width: `${demand}%` }}>
                <span>{demand} t</span>
              </em>
            </i>
          </div>
        ))}
        <footer>
          <span>
            <i className="legend offer" /> Oferta — preenchimento sólido
          </span>
          <span>
            <i className="legend demand" /> Demanda — padrão listrado
          </span>
        </footer>
      </div>
      <div className="chart-summary" id="bar-chart-summary">
        <Icon name="chart" />
        <strong>Principal conclusão:</strong>
        <span>A demanda de tomate está acima da oferta. Milho apresenta maior oferta disponível.</span>
      </div>
      <Button kind="secondary" onClick={() => setShowTable(!showTable)}>
        {showTable ? "Ocultar dados em tabela" : "Ver dados em tabela"}
      </Button>
      {showTable && (
        <div className="chart-table">
          <table>
            <caption>Dados equivalentes do gráfico Oferta x demanda por cultura</caption>
            <thead>
              <tr>
                <th scope="col">Cultura</th>
                <th scope="col">Oferta</th>
                <th scope="col">Demanda</th>
                <th scope="col">Diferença</th>
                <th scope="col">Situação</th>
              </tr>
            </thead>
            <tbody>
              {data.map(([culture, offer, demand, difference, situation]) => (
                <tr key={culture as string}>
                  <th scope="row">{culture}</th>
                  <td>{offer} t</td>
                  <td>{demand} t</td>
                  <td>{Number(difference) > 0 ? "+" : ""}{difference} t</td>
                  <td>{situation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
function Donut() {
  const [showTable, setShowTable] = useState(false);
  const data = [
    ["Tomate", "342 t", "27%"],
    ["Milho", "289 t", "23%"],
    ["Macaxeira", "230 t", "18%"],
    ["Outras culturas", "419 t", "32%"],
  ];
  return (
    <div className="accessible-chart">
      <p id="donut-description">
        Distribuição das 1.280 toneladas previstas entre as principais culturas.
      </p>
      <div className="donut-wrap" role="img" aria-describedby="donut-description donut-summary">
        <div className="donut">
          <span>
            <strong>1.280</strong>toneladas
          </span>
        </div>
        <ul>
          {data.map(([culture, , percent]) => (
            <li key={culture}>
              {culture} <b>{percent}</b>
            </li>
          ))}
        </ul>
      </div>
      <p className="chart-summary" id="donut-summary">
        <Icon name="chart" /> <strong>Principal conclusão:</strong> tomate é a cultura individual
        com maior produção prevista.
      </p>
      <Button kind="secondary" onClick={() => setShowTable(!showTable)}>
        {showTable ? "Ocultar dados em tabela" : "Ver dados em tabela"}
      </Button>
      {showTable && (
        <div className="chart-table">
          <table>
            <caption>Produção prevista por cultura</caption>
            <thead>
              <tr>
                <th scope="col">Cultura</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Participação</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Filters({ search = "Buscar por cultura ou palavra-chave" }: { search?: string }) {
  return (
    <div className="filters">
      <label>
        <Icon name="search" />
        <input placeholder={search} />
      </label>
      <select aria-label="Filtrar cultura">
        <option>Todas as culturas</option>
        <option>Milho</option>
        <option>Feijão</option>
        <option>Macaxeira</option>
        <option>Tomate</option>
      </select>
      <select aria-label="Filtrar período">
        <option>Todos os prazos</option>
        <option>Próximos 30 dias</option>
      </select>
      <Button kind="secondary">Mais filtros</Button>
    </div>
  );
}
function Tabs({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="tabs" role="tablist">
      {items.map((x, i) => (
        <button className={i === active ? "active" : ""} onClick={() => setActive(i)} key={x}>
          {x}
          {i === 0 && <span>{i + 4}</span>}
        </button>
      ))}
    </div>
  );
}

function Crops({ go }: { go: (p: Page) => void }) {
  const [empty, setEmpty] = useState(false);
  const [deleteCrop, setDeleteCrop] = useState<string | null>(null);
  return (
    <>
      <PageHead
        eyebrow="Produção"
        title="Minhas safras"
        description="Acompanhe seus plantios e organize as próximas colheitas."
        action={
          <Button icon="plus" onClick={() => go("plantio")}>
            Novo plantio
          </Button>
        }
      />
      <Filters search="Buscar por cultura" />
      <Tabs items={["Todas", "Em andamento", "Prontas para colher", "Finalizadas"]} />
      {empty ? (
        <Empty
          icon="leaf"
          title="Nenhuma safra por aqui"
          text="Cadastre seu primeiro plantio para acompanhar o ciclo e encontrar oportunidades."
          action={<Button onClick={() => go("plantio")}>Cadastrar plantio</Button>}
        />
      ) : (
        <div className="card-grid">
          {[
            [
              "Tomate cereja",
              "Híbrido BRS Zamir",
              "78",
              "1,8 t",
              "18 jun 2025",
              "Sítio Boa Esperança",
            ],
            ["Feijão carioca", "BRS Estilo", "52", "2,4 t", "14 jul 2025", "Sítio Boa Esperança"],
            ["Coentro", "Verdão", "90", "480 maços", "06 jun 2025", "Horta da Várzea"],
            ["Milho", "BRS Gorutuba", "35", "2,1 t", "22 ago 2025", "Sítio Lagoa"],
          ].map((c, i) => (
            <article className="crop-card" key={c[0]}>
              <header>
                <span className="crop-symbol">
                  <Icon name="leaf" />
                </span>
                <div>
                  <h3>{c[0]}</h3>
                  <p>{c[1]}</p>
                </div>
                <StatusBadge
                  tone={i === 2 ? "warning" : "success"}
                  icon={i === 2 ? "calendar" : "check"}
                  text={i === 2 ? "Prazo próximo" : "Ativa"}
                />
              </header>
              <div className="crop-meta">
                <span>
                  <small>Localização</small>
                  {c[5]}
                </span>
                <span>
                  <small>Quantidade prevista</small>
                  {c[3]}
                </span>
                <span>
                  <small>Colheita prevista</small>
                  {c[4]}
                </span>
                <span>
                  <small>Área plantada</small>
                  {i === 2 ? "0,2 ha" : "0,8 ha"}
                </span>
              </div>
              <div className="progress-label">
                <span>Progresso do ciclo</span>
                <b>{c[2]}%</b>
              </div>
              <div className="progress-line">
                <i style={{ width: `${c[2]}%` }} />
              </div>
              <footer>
                <Button kind="secondary">Ver detalhes</Button>
                <button onClick={() => go("oportunidades")}>Ver oportunidades</button>
                <button>Editar</button>
                <button className="danger-link" onClick={() => setDeleteCrop(c[0])}>
                  Excluir
                </button>
              </footer>
            </article>
          ))}
        </div>
      )}
      <button className="state-demo" onClick={() => setEmpty(!empty)}>
        Alternar estado {empty ? "com dados" : "vazio"}
      </button>
      {deleteCrop && (
        <Modal close={() => setDeleteCrop(null)} initialFocusSelector=".confirm-dialog .btn-secondary">
          <div className="confirm-dialog">
            <span>
              <Icon name="alert" />
            </span>
            <h2 id="modal-title">Excluir safra?</h2>
            <p>
              A safra de {deleteCrop} e todo o histórico de acompanhamento serão removidos. Esta ação
              não poderá ser desfeita.
            </p>
            <small className="keyboard-hint">Pressione Esc para fechar este modal.</small>
            <div>
              <Button kind="secondary" onClick={() => setDeleteCrop(null)}>
                Cancelar
              </Button>
              <Button kind="danger" onClick={() => setDeleteCrop(null)}>
                Sim, excluir safra
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function Planting({ go }: { go: (p: Page) => void }) {
  const [step, setStep] = useState(1),
    [done, setDone] = useState(false),
    [offline, setOffline] = useState(false);
  if (done)
    return (
      <Success
        title="Plantio cadastrado!"
        text={
          offline
            ? "Os dados foram salvos no aparelho e serão sincronizados quando a internet voltar."
            : "Sua safra de tomate já está sendo acompanhada."
        }
        action={<Button onClick={() => go("safras")}>Ver minhas safras</Button>}
      />
    );
  return (
    <>
      <PageHead
        title="Cadastrar novo plantio"
        description="Informe os dados da produção. Você pode salvar e continuar depois."
        back={() => go("safras")}
      />
      <div className="stepper">
        {["Cultura e área", "Produção", "Localização"].map((x, i) => (
          <div className={step >= i + 1 ? "active" : ""} key={x}>
            <span>{step > i + 1 ? <Icon name="check" /> : i + 1}</span>
            <p>
              <small>Etapa {i + 1}</small>
              {x}
            </p>
          </div>
        ))}
      </div>
      <div className="form-layout">
        <section className="form-card">
          {offline && (
            <div className="offline-form-banner" role="status">
              <Icon name="wifi" />
              <div>
                <strong>Sem internet. Você pode continuar.</strong>
                <span>
                  Dados salvos neste aparelho. O envio será feito quando a conexão voltar.
                </span>
              </div>
            </div>
          )}
          <h2>{["Cultura e área", "Dados da produção", "Onde fica o plantio?"][step - 1]}</h2>
          <p>
            {
              [
                "Conte o que está cultivando e o tamanho da área.",
                "Esses dados ajudam a prever sua colheita.",
                "Sua localização exata nunca será exibida publicamente.",
              ][step - 1]
            }
          </p>
          <div className="form-grid">
            {step === 1 && (
              <>
                <Field label="Cultura" required help="Escolha o principal produto deste plantio.">
                  <select>
                    <option>Tomate</option>
                    <option>Milho</option>
                    <option>Feijão</option>
                    <option>Macaxeira</option>
                  </select>
                </Field>
                <Field label="Variedade" placeholder="Ex.: Cereja" example="Cereja" />
                <Field
                  label="Área plantada"
                  placeholder="Ex.: 0,8"
                  required
                  help="Digite apenas números."
                  example="0,8"
                />
                <Field label="Unidade da área" required>
                  <select>
                    <option>Hectare (ha)</option>
                    <option>Tarefa</option>
                  </select>
                </Field>
                <Field label="Sistema de cultivo" required>
                  <select>
                    <option>Convencional</option>
                    <option>Agroecológico</option>
                    <option>Orgânico certificado</option>
                  </select>
                </Field>
              </>
            )}
            {step === 2 && (
              <>
                <Field
                  label="Quantidade prevista"
                  placeholder="Ex.: 1800"
                  required
                  help="Informe quanto espera colher."
                  example="1800 quilogramas"
                />
                <Field label="Unidade" required>
                  <select>
                    <option>Quilogramas (kg)</option>
                    <option>Toneladas (t)</option>
                    <option>Maços</option>
                  </select>
                </Field>
                <Field label="Data do plantio" required>
                  <input type="date" defaultValue="2025-04-08" />
                </Field>
                <Field label="Ciclo médio">
                  <input value="75 dias" readOnly />
                </Field>
                <Field label="Previsão automática da colheita">
                  <input value="22 de junho de 2025" readOnly />
                </Field>
                <Field label="Situação atual">
                  <select>
                    <option>Em desenvolvimento</option>
                    <option>Plantio iniciado</option>
                  </select>
                </Field>
              </>
            )}
            {step === 3 && (
              <>
                <Field label="Propriedade" required>
                  <select>
                    <option>Sítio Boa Esperança</option>
                  </select>
                </Field>
                <Field label="Comunidade">
                  <input value="Serrote dos Bois" readOnly />
                </Field>
                <Field label="Município">
                  <input value="Caruaru — PE" readOnly />
                </Field>
                <Field label="Ponto de referência" placeholder="Ex.: Próximo à associação" />
              </>
            )}
          </div>
          <div className="form-actions">
            <Button kind="ghost" onClick={() => setOffline(!offline)} icon="wifi">
              {offline ? "Modo offline ligado" : "Demonstrar modo offline"}
            </Button>
            <div>
              {step > 1 && (
                <Button kind="secondary" onClick={() => setStep(step - 1)}>
                  Voltar
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={() => setStep(step + 1)}>Continuar</Button>
              ) : (
                <Button onClick={() => setDone(true)}>Cadastrar plantio</Button>
              )}
            </div>
          </div>
        </section>
        <aside className="tip-card">
          <span>
            <Icon name="leaf" />
          </span>
          <h3>Dica simples</h3>
          <p>
            {step === 1
              ? "Se não souber a variedade, você pode escrever “não sei” e completar depois."
              : step === 2
                ? "Use uma estimativa aproximada. Ela poderá ser atualizada durante o ciclo."
                : "Informe apenas um ponto de referência, nunca dados que exponham sua propriedade."}
          </p>
          {step === 3 && (
            <div className="summary">
              <strong>Resumo</strong>
              <span>Tomate cereja</span>
              <span>0,8 ha</span>
              <span>1.800 kg previstos</span>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

function Opportunities({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHead
        eyebrow="Conexões comerciais"
        title="Oportunidades"
        description="Demandas que combinam com suas safras e região."
      />
      <Filters />
      <Tabs items={["Recomendadas", "Salvas", "Em negociação"]} />
      <div className="list-cards">
        {[
          [
            "96%",
            "Tomate cereja para restaurante",
            "Restaurante Sabor do Agreste",
            "600 kg",
            "Até 20 jun",
            "12 km",
            "Comprador retira na propriedade",
          ],
          [
            "91%",
            "Feijão carioca para PNAE",
            "Programa PNAE Caruaru",
            "1.200 kg",
            "Até 08 jul",
            "18 km",
            "Transporte a combinar",
          ],
          [
            "87%",
            "Coentro fresco semanal",
            "Mercado São João",
            "180 maços",
            "Toda terça-feira",
            "8 km",
            "Entrega no comprador",
          ],
        ].map((x, i) => (
          <article className="opportunity-card" key={x[1]}>
            <div className="match-big">
              <strong>{x[0]}</strong>
              <span>compatível</span>
            </div>
            <div className="op-main">
              <span className="verified">
                <Icon name="shield" /> Comprador verificado
              </span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
              <div>
                <span>
                  <small>Quantidade</small>
                  {x[3]}
                </span>
                <span>
                  <small>Prazo</small>
                  {x[4]}
                </span>
                <span>
                  <small>Distância aprox.</small>
                  {x[5]}
                </span>
                <span>
                  <small>Transporte</small>
                  {x[6]}
                </span>
              </div>
            </div>
            <Button kind={i === 0 ? "primary" : "secondary"} onClick={() => go("oportunidade")}>
              Ver detalhes
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}

function Opportunity({ go }: { go: (p: Page) => void }) {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <PageHead
        title="Tomate cereja para restaurante"
        description="Oportunidade recomendada para sua safra."
        back={() => go("oportunidades")}
      />
      <div className="detail-layout">
        <section className="detail-card">
          <div className="detail-top">
            <span className="match-score">
              96%<small>compatível</small>
            </span>
            <div>
              <span className="verified">
                <Icon name="shield" /> Comprador verificado
              </span>
              <h2>Restaurante Sabor do Agreste</h2>
              <p>Alto do Moura, Caruaru • distância aproximada de 12 km</p>
            </div>
          </div>
          <div className="detail-stats">
            <span>
              <small>Quantidade</small>
              <strong>600 kg</strong>
            </span>
            <span>
              <small>Prazo de entrega</small>
              <strong>Até 20 de junho</strong>
            </span>
            <span>
              <small>Transporte</small>
              <strong>Comprador retira</strong>
            </span>
          </div>
          <h3>Requisitos do produto</h3>
          <ul className="check-list">
            <li>
              <Icon name="check" />
              Tomate cereja maduro e firme
            </li>
            <li>
              <Icon name="check" />
              Entrega em caixas retornáveis
            </li>
            <li>
              <Icon name="check" />
              Produção da agricultura familiar
            </li>
          </ul>
          <h3>Por que combina com você?</h3>
          <div className="match-reasons">
            <span>
              <Icon name="leaf" /> Cultura disponível
            </span>
            <span>
              <Icon name="box" /> Volume suficiente
            </span>
            <span>
              <Icon name="calendar" /> Colheita no prazo
            </span>
          </div>
        </section>
        <aside>
          <div className="linked-crop">
            <span>Sua safra vinculada</span>
            <h3>Tomate cereja</h3>
            <p>1.800 kg previstos • colheita em 12 dias</p>
          </div>
          <Button onClick={() => setSuccess(true)}>Tenho interesse</Button>
          <Button kind="secondary" onClick={() => setSuccess(true)}>
            Solicitar contato
          </Button>
          <Button kind="ghost">Salvar oportunidade</Button>
          <small>
            Não há pagamentos na plataforma. A negociação ocorre diretamente entre os participantes.
          </small>
        </aside>
      </div>
      {success && (
        <Modal close={() => setSuccess(false)}>
          <Success
            title="Interesse enviado!"
            text="O comprador recebeu sua manifestação. Seus dados de contato só serão compartilhados após a aprovação."
            action={
              <Button
                onClick={() => {
                  setSuccess(false);
                  go("logistica");
                }}
              >
                Planejar logística
              </Button>
            }
          />
        </Modal>
      )}
    </>
  );
}

function Calls() {
  return (
    <>
      <PageHead
        eyebrow="Compras institucionais"
        title="Chamadas públicas"
        description="Oportunidades do PAA, PNAE e de órgãos locais."
      />
      <Filters search="Buscar edital ou órgão" />
      <div className="list-cards">
        {[
          [
            "PNAE",
            "Aquisição de hortaliças para escolas municipais",
            "Prefeitura de Caruaru",
            "28 jun 2025",
          ],
          [
            "PAA",
            "Compra de feijão, milho e macaxeira",
            "CONAB — Unidade Pernambuco",
            "12 jul 2025",
          ],
          [
            "Edital local",
            "Fornecimento para cozinhas comunitárias",
            "Secretaria de Desenvolvimento Social",
            "05 jul 2025",
          ],
        ].map((x, i) => (
          <article className="call-card" key={x[1]}>
            <span className={`call-type type-${i}`}>{x[0]}</span>
            <div>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
              <span>
                <Icon name="calendar" /> Inscrições até {x[3]}
              </span>
              <span>
                <Icon name="file" /> DAP/CAF, certidões e proposta
              </span>
            </div>
            <Button kind="secondary">Ver chamada</Button>
          </article>
        ))}
      </div>
    </>
  );
}

function Logistics() {
  const [joined, setJoined] = useState(false);
  return (
    <>
      <PageHead
        eyebrow="Transporte colaborativo"
        title="Logística compartilhada"
        description="Encontre rotas próximas e reduza o custo do transporte."
      />
      <section className="route-search">
        <Field label="Origem" placeholder="Serrote dos Bois, Caruaru" />
        <Field label="Destino" placeholder="Centro, Caruaru" />
        <Field label="Data">
          <input type="date" defaultValue="2025-06-18" />
        </Field>
        <Field label="Carga necessária" placeholder="600 kg" />
        <Button icon="search">Buscar rotas</Button>
      </section>
      <div className="saving-banner">
        <Icon name="truck" />
        <div>
          <strong>Economia estimada de até 32%</strong>
          <span>Compartilhando uma rota com produtores próximos</span>
        </div>
      </div>
      <div className="route-grid">
        {[
          [
            "18 jun • 06:30",
            "Serrote dos Bois → Centro",
            "Caminhão leve",
            "1.200 kg",
            "3 participantes",
          ],
          [
            "20 jun • 07:00",
            "Riacho Doce → Alto do Moura",
            "Utilitário refrigerado",
            "480 kg",
            "2 participantes",
          ],
        ].map((x, i) => (
          <article className="route-card" key={x[0]}>
            <header>
              <span>
                <Icon name="truck" />
              </span>
              <div>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </div>
              <StatusBadge text="Concluída" icon="check" tone="success" />
            </header>
            <div>
              <span>
                <small>Veículo</small>
                {x[2]}
              </span>
              <span>
                <small>Capacidade livre</small>
                {x[3]}
              </span>
              <span>
                <small>Grupo</small>
                {x[4]}
              </span>
            </div>
            <Button kind={i ? "secondary" : "primary"} onClick={() => setJoined(true)}>
              Participar da rota
            </Button>
          </article>
        ))}
      </div>
      <Panel title="Histórico de participações">
        <SimpleRows
          rows={[
            ["12 maio — Centro", "Coentro • 160 maços", "Concluída"],
            ["28 abril — Ceaca", "Tomate • 800 kg", "Concluída"],
          ]}
        />
      </Panel>
      {joined && (
        <Modal close={() => setJoined(false)}>
          <Success
            title="Participação solicitada"
            text="O organizador da rota foi avisado. Você receberá os detalhes após a confirmação."
            action={<Button onClick={() => setJoined(false)}>Entendi</Button>}
          />
        </Modal>
      )}
    </>
  );
}

function AlertList({ compact = false }: { compact?: boolean }) {
  const data = [
    ["alert", "Atenção à baixa umidade", "Hoje, 08:20", "Alta", "Evite manejo entre 11h e 15h."],
    [
      "leaf",
      "Colheita de coentro próxima",
      "Ontem, 17:40",
      "Média",
      "Organize caixas e transporte.",
    ],
    [
      "search",
      "Nova oportunidade compatível",
      "Ontem, 10:15",
      "Média",
      "Demanda por 600 kg de tomate.",
    ],
  ];
  return (
    <div className={`alert-list ${compact ? "compact" : ""}`}>
      {data.map((x, i) => (
        <article key={x[1]}>
          <span className={`alert-icon alert-${i}`}>
            <Icon name={x[0]} />
          </span>
          <div>
            <span>
              <b>{x[3]}</b>
              {x[2]}
            </span>
            <h3>{x[1]}</h3>
            <p>{x[4]}</p>
            {!compact && (
              <strong>
                Ação recomendada:{" "}
                <button>
                  {i === 0 ? "Ver orientação" : i === 1 ? "Organizar colheita" : "Ver oportunidade"}
                </button>
              </strong>
            )}
          </div>
          <button className="read-dot" aria-label="Marcar como lido" />
        </article>
      ))}
    </div>
  );
}
function Alerts({ role }: { role: Role }) {
  return (
    <>
      <PageHead
        eyebrow="Central de avisos"
        title={role === "ater" ? "Alertas do território" : "Seus alertas"}
        description="Informações importantes para agir no momento certo."
      />
      <Tabs
        items={["Todos", "Clima", "Produção", "Oportunidades", "Logística", "Chamadas públicas"]}
      />
      <AlertList />
    </>
  );
}

function Demands({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHead
        title="Minhas demandas"
        description="Publique e acompanhe suas necessidades de compra."
        action={
          <Button icon="plus" onClick={() => go("demanda")}>
            Criar demanda
          </Button>
        }
      />
      <Filters search="Buscar produto" />
      <Tabs items={["Ativas", "Em negociação", "Concluídas"]} />
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Entrega</th>
              <th>Interessados</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Tomate", "1.200 kg", "20 jun", "8", "Ativa"],
              ["Feijão carioca", "800 kg", "28 jun", "5", "Em negociação"],
              ["Coentro", "300 maços/semana", "Toda terça", "3", "Ativa"],
            ].map((r) => (
              <tr key={r[0]}>
                <td>
                  <strong>{r[0]}</strong>
                </td>
                {r.slice(1, 4).map((x) => (
                  <td key={x}>{x}</td>
                ))}
                <td>
                  <StatusBadge
                    text={r[4]}
                    icon={r[4] === "Ativa" ? "check" : r[4] === "Encerrada" ? "close" : "calendar"}
                    tone={r[4] === "Ativa" ? "success" : r[4] === "Encerrada" ? "danger" : "warning"}
                  />
                </td>
                <td>
                  <button>Visualizar</button>
                  <button>Editar</button>
                  <button className="danger-link">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function DemandForm({ go }: { go: (p: Page) => void }) {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <Success
        title="Demanda publicada!"
        text="Produtores compatíveis já podem demonstrar interesse."
        action={<Button onClick={() => go("produtores")}>Ver produtores compatíveis</Button>}
      />
    );
  return (
    <>
      <PageHead
        title="Publicar nova demanda"
        description="Informe o que sua organização precisa comprar."
        back={() => go("demandas")}
      />
      <section className="form-card narrow">
        <div className="form-grid">
          <Field label="Produto" required help="Escolha o alimento que deseja comprar.">
            <select>
              <option>Tomate</option>
              <option>Feijão</option>
              <option>Milho</option>
            </select>
          </Field>
          <Field
            label="Quantidade"
            placeholder="Ex.: 1200"
            required
            help="Digite um número maior que zero."
            example="3 toneladas"
          />
          <Field label="Unidade" required>
            <select>
              <option>Quilogramas</option>
              <option>Toneladas</option>
              <option>Maços</option>
            </select>
          </Field>
          <Field label="Prazo" required help="Informe a data limite para receber o produto.">
            <input type="date" />
          </Field>
          <Field
            label="Local de entrega"
            placeholder="Bairro e município"
            required
            example="Centro, Caruaru"
          />
          <Field label="Modalidade de transporte" required>
            <select>
              <option>Comprador retira</option>
              <option>Entrega pelo produtor</option>
              <option>A combinar</option>
            </select>
          </Field>
          <Field label="Tipo" required>
            <select>
              <option>Comercial</option>
              <option>PAA</option>
              <option>PNAE</option>
            </select>
          </Field>
          <Field label="Requisitos do produto" help="Descreva qualidade, embalagem e frequência.">
            <textarea placeholder="Descreva qualidade, embalagem e frequência" />
          </Field>
        </div>
        <div className="form-actions">
          <Button kind="secondary" onClick={() => go("demandas")}>
            Cancelar
          </Button>
          <Button onClick={() => setDone(true)}>Revisar e publicar</Button>
        </div>
      </section>
    </>
  );
}

function Producers({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHead
        title="Produtores compatíveis"
        description="Perfis com produção prevista para suas demandas."
      />
      <Filters search="Buscar produtor ou cultura" />
      <div className="card-grid">
        {[
          [
            "96%",
            "Cooperativa Serra Verde",
            "Riacho Doce • Caruaru",
            "Tomate, coentro, alface",
            "4,8 t",
          ],
          ["91%", "José Antônio da Silva", "Serrote dos Bois • Caruaru", "Feijão, milho", "3,2 t"],
          [
            "88%",
            "Associação Horta Viva",
            "Lajedo do Cedro • Caruaru",
            "Macaxeira, inhame",
            "6,1 t",
          ],
        ].map((x) => (
          <article className="producer-card" key={x[1]}>
            <header>
              <span className="avatar">
                <Icon name="leaf" />
              </span>
              <span className="match-score">
                {x[0]}
                <small>compatível</small>
              </span>
            </header>
            <h3>{x[1]}</h3>
            <span className="verified">
              <Icon name="shield" /> Perfil verificado
            </span>
            <p>{x[2]}</p>
            <div>
              <small>Culturas disponíveis</small>
              <strong>{x[3]}</strong>
              <small>Volume previsto</small>
              <strong>{x[4]}</strong>
            </div>
            <Button kind="secondary" onClick={() => go("produtor")}>
              Ver detalhes
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}
function ProducerProfile({ go }: { go: (p: Page) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHead
        title="Cooperativa Serra Verde"
        description="Perfil produtivo verificado • dados pessoais protegidos"
        back={() => go("produtores")}
      />
      <div className="detail-layout">
        <section className="detail-card">
          <div className="detail-top">
            <span className="avatar large">
              <Icon name="leaf" size={32} />
            </span>
            <div>
              <span className="verified">
                <Icon name="shield" /> Perfil verificado
              </span>
              <h2>Cooperativa Serra Verde</h2>
              <p>Região de Riacho Doce, Caruaru • localização aproximada</p>
            </div>
          </div>
          <div className="detail-stats">
            <span>
              <small>Compatibilidade</small>
              <strong>96%</strong>
            </span>
            <span>
              <small>Produtores associados</small>
              <strong>18</strong>
            </span>
            <span>
              <small>Volume previsto</small>
              <strong>4,8 t</strong>
            </span>
          </div>
          <h3>Culturas e próximas colheitas</h3>
          <SimpleRows
            rows={[
              ["Tomate cereja", "1.800 kg", "18—28 jun"],
              ["Coentro", "920 maços", "semanal"],
              ["Alface", "1.200 unidades", "25 jun—05 jul"],
            ]}
          />
        </section>
        <aside>
          <div className="privacy-note">
            <Icon name="shield" />
            <p>Telefone e dados pessoais só serão compartilhados após a aprovação do contato.</p>
          </div>
          <Button onClick={() => setSent(true)}>Solicitar contato</Button>
          <Button kind="secondary">Vincular à demanda</Button>
        </aside>
      </div>
      {sent && (
        <Modal close={() => setSent(false)}>
          <Success
            title="Solicitação enviada"
            text="A cooperativa poderá aprovar o compartilhamento dos dados de contato."
            action={<Button onClick={() => setSent(false)}>Entendi</Button>}
          />
        </Modal>
      )}
    </>
  );
}
function FutureCrops() {
  const [view, setView] = useState("cards");
  return (
    <>
      <PageHead
        title="Safras futuras"
        description="Antecipe suas compras com base nas janelas de colheita."
        action={
          <div className="view-toggle">
            <button className={view === "cards" ? "active" : ""} onClick={() => setView("cards")}>
              Cards
            </button>
            <button
              className={view === "calendar" ? "active" : ""}
              onClick={() => setView("calendar")}
            >
              Calendário
            </button>
          </div>
        }
      />
      <Filters />
      {view === "cards" ? (
        <div className="card-grid">
          {[
            "Tomate • Riacho Doce • 4,2 t • 18—30 jun",
            "Milho • Serrote dos Bois • 8,6 t • jul—ago",
            "Feijão • Lajedo do Cedro • 6,1 t • ago—set",
          ].map((x) => (
            <article className="future-card" key={x}>
              <Icon name="calendar" />
              <h3>{x.split(" • ")[0]}</h3>
              {x
                .split(" • ")
                .slice(1)
                .map((y) => (
                  <p key={y}>{y}</p>
                ))}
              <StatusBadge text="Oportunidade" icon="chart" tone="success" />
            </article>
          ))}
        </div>
      ) : (
        <div className="calendar-view">
          <header>
            <button>Anterior</button>
            <h2>Junho de 2025</h2>
            <button>Próximo</button>
          </header>
          <div>
            {Array.from({ length: 30 }, (_, i) => (
              <span className={[18, 22, 25, 28].includes(i + 1) ? "has-crop" : ""} key={i}>
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function Reports() {
  return (
    <>
      <PageHead
        title="Relatórios e dados"
        description="Visão regional para apoiar o planejamento e a assistência técnica."
        action={
          <div className="button-row">
            <Button kind="secondary">Exportar CSV</Button>
            <Button icon="file">Exportar PDF</Button>
          </div>
        }
      />
      <Filters search="Buscar indicador" />
      <div className="update-note">
        <Icon name="wifi" /> Última atualização: hoje, 08:42 • Todos os dados sincronizados
      </div>
      <div className="dashboard-grid">
        <Panel title="Oferta x demanda — próximas 12 semanas">
          <BarChart />
        </Panel>
        <Panel title="Cobertura da demanda">
          <div className="coverage">
            <strong>74%</strong>
            <span>da demanda regional pode ser atendida pela oferta cadastrada</span>
            <div className="progress-line">
              <i style={{ width: "74%" }} />
            </div>
          </div>
          <SimpleRows
            rows={[
              ["Tomate", "92%", "Cobertura alta"],
              ["Feijão", "68%", "Atenção"],
              ["Milho", "81%", "Estável"],
            ]}
          />
        </Panel>
      </div>
      <Panel title="Detalhamento regional">
        <div className="table-card flat">
          <table>
            <thead>
              <tr>
                <th>Região</th>
                <th>Produtores</th>
                <th>Oferta prevista</th>
                <th>Principal cultura</th>
                <th>Risco</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Zona Norte", "128", "342 t", "Tomate", "Médio"],
                ["Zona Leste", "96", "284 t", "Milho", "Baixo"],
                ["Zona Sul", "142", "398 t", "Macaxeira", "Médio"],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.map((x) => (
                    <td key={x}>{x}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
function Tracked() {
  return (
    <>
      <PageHead
        title="Produtores acompanhados"
        description="Ficha produtiva e alertas técnicos sem exposição indevida de dados."
      />
      <Filters search="Buscar produtor" />
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Produtor</th>
              <th>Culturas</th>
              <th>Volume</th>
              <th>Localização aproximada</th>
              <th>Alertas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Maria José S.", "Tomate, feijão", "4,2 t", "Serrote dos Bois", "1"],
              ["José Antônio S.", "Milho, feijão", "3,2 t", "Riacho Doce", "0"],
              ["Coop. Serra Verde", "Hortaliças", "8,4 t", "Zona Norte", "2"],
            ].map((r) => (
              <tr key={r[0]}>
                {r.map((x) => (
                  <td key={x}>{x}</td>
                ))}
                <td>
                  <Button kind="ghost">Ver detalhes</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function RegionalAlerts({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHead
        title="Alertas regionais"
        description="Riscos e oportunidades que requerem acompanhamento."
        action={
          <Button icon="plus" onClick={() => go("emitir")}>
            Emitir alerta
          </Button>
        }
      />
      <div className="region-alerts">
        {[
          [
            "Risco hídrico",
            "Alta prioridade",
            "Serrote dos Bois e Riacho Doce",
            "68 produtores",
            "Orientar irrigação nos horários de menor evaporação.",
          ],
          [
            "Concentração de colheita de tomate",
            "Média prioridade",
            "Zona Norte",
            "42 produtores",
            "Articular compradores e rotas compartilhadas.",
          ],
          [
            "Baixa cobertura de demanda para milho",
            "Atenção",
            "Zona Leste",
            "31 produtores",
            "Buscar demanda institucional e cooperativas.",
          ],
          [
            "Oportunidade comercial — macaxeira",
            "Oportunidade",
            "Todo o município",
            "86 produtores",
            "Divulgar demanda de 12 toneladas.",
          ],
        ].map((x, i) => (
          <article key={x[0]} className={`region-alert r${i}`}>
            <span>
              <Icon name={i === 3 ? "chart" : "alert"} />
            </span>
            <div>
              <b>{x[1]}</b>
              <h3>{x[0]}</h3>
              <p>
                <strong>Regiões:</strong> {x[2]} • <strong>Afetados:</strong> {x[3]}
              </p>
              <p>{x[4]}</p>
            </div>
            <Button kind="secondary">Ver detalhes</Button>
          </article>
        ))}
      </div>
    </>
  );
}
function IssueAlert({ go }: { go: (p: Page) => void }) {
  const [preview, setPreview] = useState(false),
    [sent, setSent] = useState(false);
  if (sent)
    return (
      <Success
        title="Alerta enviado!"
        text="A orientação foi registrada e será entregue pelos canais selecionados."
        action={<Button onClick={() => go("regionais")}>Voltar aos alertas</Button>}
      />
    );
  return (
    <>
      <PageHead
        title="Emitir alerta regional"
        description="Envie uma orientação clara para produtores das áreas selecionadas."
        back={() => go("regionais")}
      />
      <div className="form-layout">
        <section className="form-card">
          <div className="form-grid">
            <Field label="Tipo">
              <select>
                <option>Clima</option>
                <option>Produção</option>
                <option>Oportunidade</option>
              </select>
            </Field>
            <Field label="Prioridade">
              <select>
                <option>Alta</option>
                <option>Média</option>
                <option>Informativa</option>
              </select>
            </Field>
            <Field label="Título" placeholder="Ex.: Atenção à baixa umidade" />
            <Field label="Comunidades" placeholder="Selecione uma ou mais" />
            <Field label="Culturas" placeholder="Todas ou culturas específicas" />
            <Field label="Orientação">
              <textarea placeholder="Escreva uma ação simples e objetiva" />
            </Field>
          </div>
          <div className="channel-row">
            <label>
              <input type="checkbox" defaultChecked /> Notificação na plataforma
            </label>
            <label>
              <input type="checkbox" defaultChecked /> SMS
            </label>
            <label>
              <input type="checkbox" /> E-mail
            </label>
          </div>
          <div className="form-actions">
            <Button kind="secondary" onClick={() => setPreview(true)}>
              Pré-visualizar
            </Button>
            <Button onClick={() => setSent(true)}>Confirmar envio</Button>
          </div>
        </section>
        <aside className="tip-card">
          <Icon name="alert" />
          <h3>Escreva de forma simples</h3>
          <p>Explique o que está acontecendo, quem é afetado e qual ação deve ser tomada.</p>
        </aside>
      </div>
      {preview && (
        <Modal close={() => setPreview(false)}>
          <div className="notification-preview">
            <span>PRÉ-VISUALIZAÇÃO</span>
            <h2>Atenção à baixa umidade</h2>
            <p>Evite manejo entre 11h e 15h. Dê preferência ao início da manhã.</p>
            <small>Clima • Alta prioridade • Agora</small>
            <Button onClick={() => setPreview(false)}>Fechar prévia</Button>
          </div>
        </Modal>
      )}
    </>
  );
}

function ToggleRow({
  title,
  text,
  defaultOn = false,
  danger = false,
}: {
  title: string;
  text: string;
  defaultOn?: boolean;
  danger?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className={`toggle-row ${danger ? "danger-row" : ""}`}>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <button
        className={`toggle ${on ? "on" : ""}`}
        onClick={() => setOn(!on)}
        aria-label={`${on ? "Desativar" : "Ativar"} ${title}`}
      >
        <i />
      </button>
    </div>
  );
}
function Settings({
  role,
  prefs,
  updatePrefs,
}: {
  role: Role;
  prefs: AccessPrefs;
  updatePrefs: (next: Partial<AccessPrefs>) => void;
}) {
  return (
    <>
      <PageHead title="Configurações" description="Ajuste a plataforma ao seu jeito de usar." />
      <div className="settings-layout">
        <nav>
          <a href="#notif">Notificações</a>
          <a href="#access">Acessibilidade</a>
          <a href="#sync">Sincronização</a>
          <a href="#security">Segurança</a>
        </nav>
        <div>
          <Panel title="Notificações">
            <div id="notif">
              <ToggleRow
                title="Alertas de clima"
                text="Avisos de chuva, seca e condição para manejo"
                defaultOn
              />
              <ToggleRow
                title="Novas oportunidades"
                text="Demandas compatíveis com suas safras"
                defaultOn
              />
              <ToggleRow title="Novidades por e-mail" text="Resumo semanal da AgroConecta" />
            </div>
          </Panel>
          <Panel title="Acessibilidade">
            <div id="access">
              <AccessToggle
                icon="user"
                title="Textos maiores"
                text="Aumenta todo o conteúdo para 200%."
                on={prefs.textScale === "large"}
                toggle={() =>
                  updatePrefs({ textScale: prefs.textScale === "large" ? "default" : "large" })
                }
              />
              <AccessToggle
                icon="eye"
                title="Contraste reforçado"
                text="Usa fundo escuro e controles destacados."
                on={prefs.contrast}
                toggle={() => updatePrefs({ contrast: !prefs.contrast })}
              />
              <AccessToggle
                icon="home"
                title="Interface simplificada"
                text="Usa cards maiores, frases curtas e navegação guiada."
                on={prefs.simple}
                toggle={() => updatePrefs({ simple: !prefs.simple })}
              />
            </div>
          </Panel>
          <Panel title="Sincronização">
            <div id="sync">
              <ToggleRow
                title="Sincronização automática"
                text="Envia dados quando a internet estiver disponível"
                defaultOn
              />
              <div className="sync-info">
                <Icon name="check" /> Última sincronização concluída hoje, às 08:42
              </div>
            </div>
          </Panel>
          <Panel title="Conta e segurança">
            <div id="security">
              <div className="account-type-row">
                <div>
                  <small>Tipo de conta</small>
                  <strong>{roleNames[role]}</strong>
                  <p>Definido durante o cadastro e não pode ser alterado.</p>
                </div>
                <Icon name="shield" />
              </div>
              <button className="settings-link">
                Alterar senha <Icon name="arrow" />
              </button>
              <button className="settings-link">
                Baixar meus dados <Icon name="arrow" />
              </button>
              <button className="settings-link danger-link">
                Desativar minha conta <Icon name="arrow" />
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function AccessibilityResources({ go }: { go: (page: Page) => void }) {
  const demos: [string, string, string, Page][] = [
    ["keyboard", "Navegação por teclado", "Veja foco visível e instruções de navegação.", "teclado"],
    [
      "alert",
      "Formulário com erros",
      "Confira mensagens que explicam o problema e como corrigir.",
      "formulario-erros",
    ],
    ["wifi", "Modo offline", "Continue trabalhando mesmo quando a conexão cair.", "offline"],
    ["chart", "Gráficos acessíveis", "Abra o Painel ATER para ver resumo e tabela.", "dashboard"],
  ];
  return (
    <>
      <PageHead
        eyebrow="WCAG 2.2 AA e eMAG"
        title="Recursos de acessibilidade"
        description="A versão padrão já foi criada para funcionar com teclado, leitores de tela e ampliação."
      />
      <section className="access-intro">
        <div>
          <Icon name="shield" size={32} />
          <h2>Acesso para todas as pessoas</h2>
          <p>
            Os recursos adicionais ajudam a personalizar a experiência, mas não substituem a
            acessibilidade presente em todas as páginas.
          </p>
        </div>
        <div className="keyboard-instructions">
          <strong>Atalhos principais</strong>
          <span>
            <kbd>Tab</kbd> avançar
          </span>
          <span>
            <kbd>Shift</kbd> + <kbd>Tab</kbd> voltar
          </span>
          <span>
            <kbd>Enter</kbd> ou <kbd>Espaço</kbd> ativar
          </span>
          <span>
            <kbd>Esc</kbd> fechar janelas
          </span>
        </div>
      </section>
      <div className="access-demo-grid">
        {demos.map(([icon, title, text, target]) => (
          <article key={title}>
            <span>
              <Icon name={icon} size={28} />
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
            <Button kind="secondary" onClick={() => go(target)}>
              Abrir demonstração
            </Button>
          </article>
        ))}
      </div>
      <Panel title="Status identificados por ícone, texto e cor">
        <div className="status-showcase">
          <StatusBadge text="Ativa" icon="check" tone="success" />
          <StatusBadge text="Prazo próximo" icon="calendar" tone="warning" />
          <StatusBadge text="Concluída" icon="check" tone="info" />
          <StatusBadge text="Cancelada" icon="close" tone="danger" />
          <StatusBadge text="Alta prioridade" icon="alert" tone="danger" />
          <StatusBadge text="Oportunidade" icon="chart" tone="success" />
          <StatusBadge text="Sem internet" icon="wifi" tone="warning" />
          <StatusBadge text="Sincronização pendente" icon="wifi" tone="info" />
        </div>
      </Panel>
      <div className="implementation-notes">
        <h2>Notas de implementação</h2>
        <ul>
          <li>A logo mantém o texto alternativo “AgroConecta Caruaru” e não foi alterada.</li>
          <li>Imagens informativas possuem descrição; imagens decorativas devem usar alt vazio.</li>
          <li>Gráficos incluem descrição, valores, resumo e tabela equivalente.</li>
          <li>O idioma da página está definido como português do Brasil.</li>
          <li>Os títulos seguem ordem lógica e a estrutura usa HTML semântico.</li>
          <li>Compatível para testes com NVDA, JAWS, TalkBack e VoiceOver.</li>
        </ul>
      </div>
      <section className="vlibras-card">
        <Icon name="users" size={28} />
        <div>
          <h2>Conteúdo em Libras</h2>
          <p>
            A integração futura com VLibras complementará os demais recursos, sem ser a única
            solução de acessibilidade.
          </p>
        </div>
        <Button kind="secondary">Conhecer opção em Libras</Button>
      </section>
    </>
  );
}

function KeyboardDemo() {
  const [message, setMessage] = useState("Use Tab para iniciar a demonstração.");
  return (
    <>
      <PageHead
        eyebrow="Demonstração"
        title="Navegação por teclado"
        description="A ordem de foco acompanha a leitura visual, do topo para baixo e da esquerda para a direita."
      />
      <div className="keyboard-demo">
        <div className="keyboard-guide" role="note">
          <Icon name="keyboard" />
          <p>
            <strong>Tab</strong> para avançar, <strong>Shift + Tab</strong> para voltar,{" "}
            <strong>Enter ou Espaço</strong> para ativar e <strong>Esc</strong> para fechar modais.
          </p>
        </div>
        <div className="focus-demo-row">
          <button className="visual-focus" onClick={() => setMessage("Menu ativado.")}>
            <Icon name="menu" /> Menu principal
          </button>
          <button onClick={() => setMessage("Filtro ativado.")}>
            <Icon name="search" /> Filtrar safras
          </button>
          <a href="#resultado-foco" onClick={() => setMessage("Link ativado.")}>
            Ver oportunidades
          </a>
          <label>
            Cultura
            <select onChange={() => setMessage("Cultura selecionada.")}>
              <option>Tomate</option>
              <option>Milho</option>
            </select>
          </label>
        </div>
        <p id="resultado-foco" className="focus-result" aria-live="polite">
          {message}
        </p>
      </div>
    </>
  );
}

function AccessibleErrorForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHead
        eyebrow="Exemplo acessível"
        title="Cadastrar quantidade da colheita"
        description="Os dados preenchidos permanecem no formulário quando há um erro."
      />
      <section className="form-card narrow accessible-error-form">
        <div className="error-summary" role="alert" tabIndex={-1}>
          <Icon name="alert" />
          <div>
            <h2>Encontramos 2 campos que precisam de correção</h2>
            <a href="#quantidade-erro">Quantidade: digite um número maior que zero.</a>
            <a href="#data-erro">Data prevista: informe uma data válida.</a>
          </div>
        </div>
        <Field
          label="Cultura"
          required
          help="Campo preenchido corretamente."
          success="Informação válida."
        >
          <input value="Tomate cereja" readOnly aria-label="Cultura" />
        </Field>
        <div id="quantidade-erro">
          <Field
            label="Quantidade"
            required
            help="Digite apenas números."
            example="3 toneladas"
            error="Quantidade obrigatória. Digite um número maior que zero. Exemplo: 3 toneladas."
          >
            <input value="0" readOnly aria-invalid="true" aria-label="Quantidade" />
          </Field>
        </div>
        <div id="data-erro">
          <Field
            label="Data prevista da colheita"
            required
            error="Data inválida. Escolha uma data posterior a hoje."
          >
            <input type="date" defaultValue="2024-01-01" aria-invalid="true" />
          </Field>
        </div>
        <Field label="Código de referência" disabled help="Exemplo de campo desabilitado.">
          <input value="Gerado automaticamente" disabled readOnly />
        </Field>
        <Button onClick={() => setSubmitted(true)}>Corrigir e continuar</Button>
        {submitted && (
          <p className="form-status" role="status">
            <Icon name="check" /> Seus dados foram mantidos. Corrija os campos indicados.
          </p>
        )}
      </section>
    </>
  );
}

function OfflineDemo({ go }: { go: (page: Page) => void }) {
  const states: [string, string, string, "success" | "warning" | "danger" | "info"][] = [
    ["wifi", "Conectado e sincronizado", "Todos os dados estão atualizados.", "success"],
    ["wifi", "Sem internet", "Você ainda pode cadastrar seu plantio.", "warning"],
    ["file", "Dados salvos neste aparelho", "Nada será perdido.", "info"],
    ["calendar", "Envio pendente", "Os dados serão enviados quando a internet voltar.", "warning"],
    ["wifi", "Sincronizando", "Enviando as alterações salvas.", "info"],
    ["check", "Dados enviados com sucesso", "A plataforma está atualizada.", "success"],
    ["alert", "Não foi possível sincronizar", "Verifique a conexão e tente novamente.", "danger"],
  ];
  return (
    <>
      <PageHead
        eyebrow="Trabalho no campo"
        title="Modo offline e sincronização"
        description="Continue o cadastro mesmo em locais com conexão instável."
        action={<Button onClick={() => go("plantio")}>Continuar cadastro do plantio</Button>}
      />
      <div className="offline-hero">
        <Icon name="wifi" size={38} />
        <div>
          <StatusBadge text="Sem internet" icon="wifi" tone="warning" />
          <h2>Seu trabalho pode continuar</h2>
          <p>
            Preencha os dados normalmente. Eles ficam salvos neste aparelho e serão enviados quando
            a conexão voltar.
          </p>
        </div>
      </div>
      <div className="sync-state-grid">
        {states.map(([icon, title, text, tone]) => (
          <article className={`sync-card ${tone}`} key={title}>
            <Icon name={icon} />
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
            {tone === "danger" && <Button kind="secondary">Tentar novamente</Button>}
          </article>
        ))}
      </div>
    </>
  );
}

function Privacy() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <PageHead title="Privacidade e LGPD" description="Você decide como seus dados são usados." />
      <div className="privacy-hero">
        <Icon name="shield" size={34} />
        <div>
          <h2>Seus dados pertencem a você</h2>
          <p>
            Usamos apenas as informações necessárias para conectar oportunidades e gerar
            inteligência regional de forma protegida.
          </p>
        </div>
      </div>
      <div className="settings-layout">
        <nav>
          <a href="#consent">Consentimentos</a>
          <a href="#rights">Seus direitos</a>
          <a href="#delete">Excluir dados</a>
        </nav>
        <div>
          <Panel title="Consentimentos">
            <div id="consent">
              <ToggleRow
                title="Uso de dados produtivos"
                text="Para recomendar oportunidades e prever oferta regional"
                defaultOn
              />
              <ToggleRow
                title="Comunicações da plataforma"
                text="Para enviar alertas e informações de interesse"
                defaultOn
              />
              <ToggleRow
                title="Dados anonimizados para indicadores"
                text="Nunca identificam você ou sua propriedade"
                defaultOn
              />
            </div>
          </Panel>
          <Panel title="Seus direitos">
            <div id="rights">
              <button className="settings-link">
                Baixar uma cópia dos meus dados <Icon name="arrow" />
              </button>
              <button className="settings-link">
                Solicitar correção dos dados <Icon name="arrow" />
              </button>
              <button className="settings-link">
                Revogar consentimentos <Icon name="arrow" />
              </button>
            </div>
          </Panel>
          <Panel title="Exclusão ou anonimização">
            <div id="delete">
              <p>
                Você pode solicitar a exclusão dos dados pessoais. Alguns registros poderão ser
                anonimizados para atender obrigações legais.
              </p>
              <Button kind="danger" onClick={() => setModal(true)}>
                Solicitar exclusão
              </Button>
            </div>
          </Panel>
        </div>
      </div>
      {modal && (
        <Modal close={() => setModal(false)}>
          <div className="confirm-dialog">
            <span>
              <Icon name="alert" />
            </span>
            <h2>Solicitar exclusão dos dados?</h2>
            <p>
              Esta ação pode impedir seu acesso à plataforma. A equipe analisará a solicitação antes
              de concluir.
            </p>
            <div>
              <Button kind="secondary" onClick={() => setModal(false)}>
                Cancelar
              </Button>
              <Button kind="danger" onClick={() => setModal(false)}>
                Confirmar solicitação
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function Drawer({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const focusable = Array.from(
          drawerRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) || [],
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);
  return (
    <div className="overlay" onMouseDown={close}>
      <aside
        className="drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header>
          <h2>{title}</h2>
          <button ref={closeRef} onClick={close} aria-label={`Fechar ${title}`}>
            <Icon name="close" />
          </button>
        </header>
        {children}
      </aside>
    </div>
  );
}
function Modal({
  close,
  children,
  initialFocusSelector,
}: {
  close: () => void;
  children: ReactNode;
  initialFocusSelector?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const origin = document.activeElement as HTMLElement | null;
    const target = initialFocusSelector
      ? modalRef.current?.querySelector<HTMLElement>(initialFocusSelector)
      : modalRef.current?.querySelector<HTMLElement>(".modal-close");
    target?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const focusable = Array.from(
          modalRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) || [],
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      origin?.focus();
    };
  }, [close, initialFocusSelector]);
  return (
    <div className="overlay modal-overlay" onMouseDown={close}>
      <div
        className="modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Janela de diálogo"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-close touch-target" onClick={close} aria-label="Fechar modal">
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>
  );
}
function Success({ title, text, action }: { title: string; text: string; action: ReactNode }) {
  return (
    <div className="success-state">
      <span>
        <Icon name="check" size={34} />
      </span>
      <h1>{title}</h1>
      <p>{text}</p>
      {action}
    </div>
  );
}
function Empty({
  icon,
  title,
  text,
  action,
}: {
  icon: string;
  title: string;
  text: string;
  action: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span>
        <Icon name={icon} size={32} />
      </span>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
function AccessToggle({
  icon,
  title,
  text,
  on,
  toggle,
}: {
  icon: string;
  title: string;
  text: string;
  on: boolean;
  toggle: () => void;
}) {
  return (
    <div className="access-toggle-row">
      <span className="access-icon">
        <Icon name={icon} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
        <small>{on ? "Ligado" : "Desligado"}</small>
      </div>
      <button
        className={`toggle ${on ? "on" : ""}`}
        onClick={toggle}
        role="switch"
        aria-checked={on}
        aria-label={`${title}: ${on ? "ligado" : "desligado"}`}
      >
        <i />
      </button>
    </div>
  );
}

function Accessibility({
  prefs,
  updatePrefs,
  reading,
  startReading,
  pauseReading,
  resumeReading,
  stopReading,
  go,
}: {
  prefs: AccessPrefs;
  updatePrefs: (next: Partial<AccessPrefs>) => void;
  reading: ReadingState;
  startReading: () => void;
  pauseReading: () => void;
  resumeReading: () => void;
  stopReading: () => void;
  go: (page: Page) => void;
}) {
  return (
    <div className="access-settings">
      <p>Escolha os recursos que deixam a plataforma mais confortável para você.</p>
      <div className="access-control">
        <span className="access-icon">
          <span aria-hidden="true">Aa</span>
        </span>
        <div className="access-control-copy">
          <strong>Tamanho do texto</strong>
          <p>Reduza, restaure ou amplie para 200%.</p>
        </div>
        <div className="text-size-controls" aria-label="Tamanho do texto">
          <button
            onClick={() => updatePrefs({ textScale: "small" })}
            className={prefs.textScale === "small" ? "active" : ""}
            aria-label="Diminuir texto"
          >
            A−
          </button>
          <button
            onClick={() => updatePrefs({ textScale: "default" })}
            className={prefs.textScale === "default" ? "active" : ""}
            aria-label="Tamanho padrão"
          >
            A
          </button>
          <button
            onClick={() => updatePrefs({ textScale: "large" })}
            className={prefs.textScale === "large" ? "active" : ""}
            aria-label="Aumentar texto para 200 por cento"
          >
            A+
          </button>
        </div>
      </div>
      <AccessToggle
        icon="eye"
        title="Contraste reforçado"
        text="Fundo escuro, texto branco e controles destacados."
        on={prefs.contrast}
        toggle={() => updatePrefs({ contrast: !prefs.contrast })}
      />
      <AccessToggle
        icon="home"
        title="Interface simplificada"
        text="Exibe cards maiores, frases curtas e ações guiadas."
        on={prefs.simple}
        toggle={() => updatePrefs({ simple: !prefs.simple })}
      />
      <AccessToggle
        icon="pause"
        title="Reduzir animações"
        text="Remove transições e movimentos não essenciais."
        on={prefs.reducedMotion}
        toggle={() => updatePrefs({ reducedMotion: !prefs.reducedMotion })}
      />
      <AccessToggle
        icon="link"
        title="Destacar links"
        text="Sublinha links e aumenta a identificação visual."
        on={prefs.highlightLinks}
        toggle={() => updatePrefs({ highlightLinks: !prefs.highlightLinks })}
      />
      <div className="audio-box">
        <Icon name="speaker" />
        <div>
          <strong>Ouvir esta página</strong>
          <p>A leitura nunca começa automaticamente.</p>
        </div>
        <Button onClick={reading === "idle" ? startReading : pauseReading}>
          {reading === "idle" ? "Ouvir" : reading === "playing" ? "Pausar" : "Pausada"}
        </Button>
        {reading !== "idle" && (
          <div className="audio-progress">
            <i style={{ width: "42%" }} />
            <span>Conteúdo: resumo da página</span>
            <div className="inline-audio-actions">
              {reading === "paused" && (
                <button onClick={resumeReading}>
                  <Icon name="play" /> Continuar
                </button>
              )}
              <button onClick={stopReading}>
                <Icon name="stop" /> Encerrar
              </button>
            </div>
          </div>
        )}
        <div className="speed-control">
          <span>Velocidade da leitura</span>
          {[0.75, 1, 1.25, 1.5].map((speed) => (
            <button
              key={speed}
              className={prefs.speed === speed ? "active" : ""}
              onClick={() => updatePrefs({ speed })}
            >
              {String(speed).replace(".", ",")}x
            </button>
          ))}
        </div>
      </div>
      <Button
        kind="secondary"
        onClick={() => updatePrefs(defaultAccessPrefs)}
        icon="back"
      >
        Restaurar configurações padrão
      </Button>
      <button className="access-resources-link" onClick={() => go("acessibilidade")}>
        Ver todos os recursos de acessibilidade <Icon name="arrow" />
      </button>
    </div>
  );
}

function AudioControls({
  reading,
  currentBlock,
  speed,
  setSpeed,
  pause,
  resume,
  stop,
  previous,
  next,
}: {
  reading: ReadingState;
  currentBlock: string;
  speed: number;
  setSpeed: (speed: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  previous: () => void;
  next: () => void;
}) {
  return (
    <section className="floating-audio" aria-label="Controle de leitura por áudio">
      <div className="reading-now" aria-live="polite">
        <span>Narrando agora</span>
        <strong>{currentBlock}</strong>
      </div>
      <div className="audio-buttons">
        <button onClick={previous} aria-label="Voltar trecho">
          <Icon name="rewind" />
        </button>
        <button
          className="audio-primary"
          onClick={reading === "playing" ? pause : resume}
          aria-label={reading === "playing" ? "Pausar leitura" : "Continuar leitura"}
        >
          <Icon name={reading === "playing" ? "pause" : "play"} />
        </button>
        <button onClick={next} aria-label="Avançar trecho">
          <Icon name="forward" />
        </button>
        <button onClick={stop} aria-label="Encerrar leitura">
          <Icon name="stop" />
        </button>
      </div>
      <label>
        Velocidade
        <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
          <option value={0.75}>0,75x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1,25x</option>
          <option value={1.5}>1,5x</option>
        </select>
      </label>
    </section>
  );
}

export default function App() {
  const [screen, setScreen] = useState<"home" | "login" | "register" | "recover" | "app">("home");
  const [role, setRole] = useState<Role>("produtor");
  const authMode = useMemo(
    () => (screen === "home" || screen === "app" ? "login" : screen),
    [screen],
  );
  if (screen === "home") return <Home goAuth={setScreen} />;
  if (screen === "app")
    return <Shell role={role} onLogout={() => setScreen("home")} />;
  return (
    <Auth
      mode={authMode}
      setMode={setScreen}
      onEnter={(r) => {
        setRole(r);
        setScreen("app");
      }}
    />
  );
}
