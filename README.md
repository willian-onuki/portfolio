# Willian Onuki — Portfólio

Portfólio de **Willian Onuki**, engenheiro de software e desenvolvedor full stack.
Página única, bilíngue (PT em `/`, EN em `/en`), com uma cena 3D autoral — **a Stack** —
que conta, enquanto se rola a página, o que significa trabalhar "do pixel ao banco de dados".

## Conceito

Três lâminas de vidro empilhadas representam as camadas de uma aplicação —
**Interface → API → Dados** —, cada uma com um padrão luminoso gravado (wireframe de UI,
rotas e middlewares, tabelas relacionais). Pulsos de luz sobem e descem entre as camadas,
como requisições atravessando o sistema.

- **Hero:** a stack montada ao lado do título.
- **Manifesto:** a stack recua e esmaece; o texto acende palavra a palavra.
- **Stack:** as camadas se separam e cada passo da rolagem destaca uma camada com as
  competências daquela camada.
- **Folha clara** (Trajetória, Projetos, Sobre) sobe sobre o palco 3D, que pausa.
- **Contato** no escuro, com caminhos separados para clientes e recrutadores.

Identidade: grafite + um único sinal em brasa (`#FF6A2B`); Geist / Geist Mono /
Instrument Serif itálico. Tokens em `src/styles/tokens.css`.

## Rodando

Requisitos: Node 20.9+ (testado com 22).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (todas as rotas estáticas)
npm run start      # serve o build
npm run lint       # ESLint (flat config do Next 16)
npm run typecheck  # tsc --noEmit
```

Deploy: Vercel, sem configuração extra (o projeto já estava lá).

## Stack técnica

| Pacote | Uso |
|---|---|
| Next.js 16 (App Router, Turbopack) + React 19 | SSG, metadados, OG/ícones gerados no build |
| three r187 + @react-three/fiber 9 | cena 3D (chunk separado, carregado sob demanda) |
| GSAP 3 (ScrollTrigger) | animações ligadas à rolagem |
| Lenis | rolagem suave sincronizada ao ticker do GSAP |
| CSS Modules + tokens CSS | estilos (sem framework de CSS) |

Sem bibliotecas de ícones, de UI ou de pós-processamento: ícones são SVG próprios, o
ambiente de reflexos é gerado em código (PMREM) e as texturas das camadas são desenhadas
em canvas — **nenhum asset 3D para baixar**.

## Estrutura

```
src/
├── app/
│   ├── (pt)/            # root layout + página em português ( / )
│   ├── (en)/en/         # root layout + página em inglês  ( /en )
│   ├── global-not-found.tsx, sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx
├── config/site.ts       # ★ dados pessoais e canais (fonte única de verdade)
├── content/
│   ├── pt.ts / en.ts    # ★ todos os textos (mesmos fatos nos dois idiomas)
│   ├── schematics.ts    # ★ diagramas de arquitetura dos projetos
│   └── types.ts
├── components/          # Portfolio, StageCanvas (palco 3D), Schematic, layout/, ui/, og/
├── sections/            # Hero, Manifesto, StackStory, Experience, Projects, About, Contact
├── three/               # Scene, Stack, Dust, patterns, environment, poses, quality
├── lib/                 # gsap, stage (estado DOM↔3D), device, fonts, metadata, format
├── providers/           # SmoothScroll (Lenis + GSAP)
├── hooks/  styles/  types/
public/
├── curriculo-willian-onuki.pdf
└── images/willian-onuki.jpg
```

## Onde editar

| O quê | Onde |
|---|---|
| E-mail, WhatsApp, links, cidade, domínio, selo "disponível" | `src/config/site.ts` |
| Textos, experiências, projetos, formação | `src/content/pt.ts` e `src/content/en.ts` |
| Diagrama de um projeto | `src/content/schematics.ts` |
| Cores, tipografia, espaçamentos | `src/styles/tokens.css` |
| Composição 3D por seção (posição, giro, separação) | `src/three/poses.ts` |
| Padrões gravados nas camadas | `src/three/patterns.ts` |
| Níveis de qualidade 3D | `src/three/quality.ts` |
| Currículo / foto | `public/` (mantenha os nomes ou ajuste `site.ts`) |

**Regra do conteúdo:** tudo vem do currículo, da versão anterior do portfólio e dos
repositórios públicos (package.json/schema). Ao atualizar, mantenha a regra — nada de
métricas, clientes ou tecnologias que não possam ser comprovados.

## Como funciona

### Palco 3D e coreografia
Um único `<Canvas>` fixo fica atrás do Hero, do Manifesto e da Stack (seções transparentes).
`lib/stage.ts` é um objeto mutável (sem React state) que o DOM alimenta — rolagem, ponteiro,
camada ativa — e que a cena lê a cada quadro. As poses-chave (`three/poses.ts`) são
interpoladas entre marcos de rolagem medidos só quando o layout muda; a composição
lateral (desktop) e a vertical (celular) se misturam pela proporção da tela.

### Desempenho
- O HTML é estático; o 3D é um chunk à parte, pedido quando o navegador fica ocioso. O
  conteúdo nunca espera o 3D (sem tela de carregamento); o canvas entra com fade.
- Inicialização em etapas curtas: ambiente de reflexos → texturas (uma por tarefa) →
  compilação dos shaders em paralelo (`compileAsync`) **antes** do primeiro quadro.
- Render pausado fora da tela e com a aba oculta; DPR com teto por nível; monitor de FPS
  baixa primeiro a resolução, depois o nível. GPU por software vai direto ao nível baixo.
- Título do Hero revelado em CSS puro (não depende de hidratação); o parágrafo principal
  pinta já na 1ª renderização (LCP = FCP medido localmente). CSS inline (sem requisição
  bloqueante), fontes auto-hospedadas pelo `next/font`.
- Lighthouse (build de produção, local): **Acessibilidade 100 · Boas práticas 100 ·
  SEO 100 · CLS 0**. Performance mobile 92 medida sem WebGL (custo da página). Com WebGL
  o ambiente de teste usa renderização por software (SwiftShader), que não representa uma
  GPU real — vale medir no PageSpeed Insights depois do deploy.

### Acessibilidade
Skip link, landmarks, um único `h1`, foco visível, `aria-current` na navegação, menu mobile
com Esc/foco gerenciado, formulário com erros anunciados, contraste AA conferido nos tokens,
canvas `aria-hidden` com descrição textual, diagramas como `role="img"` com título e
descrição. `prefers-reduced-motion`: sem Lenis, sem animações de entrada, cena 3D estática
redesenhada só sob demanda.

### SEO
Metadados por idioma com `canonical` e `hreflang`, Open Graph/Twitter com imagem gerada no
build (uma por idioma), JSON-LD (`Person`, `WebSite`, `ProfilePage`), sitemap com alternâncias
de idioma, robots, manifest e 404 global.

### Contato sem backend
O formulário monta a mensagem e a abre no app de e-mail (`mailto:`) ou no WhatsApp
(`wa.me`) — nada é enviado a servidor nem armazenado.

## Checklist antes de publicar

- [ ] **Domínio**: se houver domínio próprio, atualizar `site.url` em `src/config/site.ts`.
- [ ] **Formação**: o currículo prevê conclusão em ago/2024; o site diz "Ingresso em 2019".
      Se concluiu, atualizar `about.education` em `pt.ts`/`en.ts`.
- [ ] **Cargo atual** (FitoVision, "atual") e o selo **"Disponível"** (`availableForWork`).
- [ ] Revisar os textos de filosofia de trabalho (`about.principles`) — escritos a partir do
      resumo do currículo.
- [ ] Opcional: currículo em inglês (hoje o link em `/en` indica "PT-BR").
