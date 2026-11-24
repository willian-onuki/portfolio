import { site } from '@/config/site';
import type { Content } from './types';

/**
 * Conteúdo em português. Fontes: currículo (public/curriculo-willian-onuki.pdf),
 * versão anterior do portfólio e os repositórios públicos no GitHub.
 * Nada aqui é inventado — ao atualizar, mantenha a mesma regra.
 */
export const pt: Content = {
  locale: 'pt',
  htmlLang: 'pt-BR',
  ogLocale: 'pt_BR',
  path: '/',

  meta: {
    title: 'Willian Onuki — Engenheiro de Software Full Stack | React, React Native e Node.js',
    description:
      'Portfólio de Willian Onuki, engenheiro de software e desenvolvedor full stack. Aplicações web e mobile de ponta a ponta com React, Next.js, React Native, Node.js, MySQL e PostgreSQL.',
    ogTitle: 'Willian Onuki — Software completo, do pixel ao banco de dados.',
    ogDescription:
      'Engenheiro de software full stack: interfaces em React e React Native, APIs em Node.js e bancos de dados relacionais.',
    keywords: [
      'Willian Onuki',
      'Engenheiro de Software',
      'Desenvolvedor Full Stack',
      'React',
      'Next.js',
      'React Native',
      'Node.js',
      'TypeScript',
      'MySQL',
      'PostgreSQL',
      'Cornélio Procópio',
      'Paraná',
    ],
    jobTitle: 'Engenheiro de Software · Desenvolvedor Full Stack',
  },

  a11y: {
    skip: 'Pular para o conteúdo',
    nav: 'Navegação principal',
    mobileNav: 'Navegação',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    home: 'Willian Onuki — voltar ao início',
    newTab: '(abre em nova aba)',
    sceneDescription:
      'Ilustração 3D: três camadas de vidro empilhadas — interface, API e dados — com pulsos de luz trafegando entre elas, como requisições atravessando uma aplicação.',
  },

  nav: {
    items: [
      { id: 'stack', label: 'Stack' },
      { id: 'experience', label: 'Trajetória' },
      { id: 'projects', label: 'Projetos' },
      { id: 'about', label: 'Sobre' },
      { id: 'contact', label: 'Contato' },
    ],
    cta: 'Vamos conversar',
    language: { label: 'Read in English', short: 'EN', href: '/en', hrefLang: 'en' },
  },

  hero: {
    status: 'Disponível para projetos e oportunidades',
    eyebrow: 'Willian Onuki · Engenheiro de Software Full Stack',
    title: [['Software completo,'], ['do ', { em: 'pixel' }, ' ao'], [{ em: 'banco de dados' }, '.']],
    lead: 'Projeto e desenvolvo aplicações web e mobile de ponta a ponta — interfaces em React e React Native, APIs em Node.js e bancos de dados relacionais — com foco em qualidade de código e na experiência de quem usa.',
    primaryCta: 'Ver projetos',
    secondaryCta: 'Conversar sobre um projeto',
    links: { github: 'GitHub', linkedin: 'LinkedIn', cv: 'Currículo (PDF)' },
    meta: [
      { label: 'Atualmente', value: 'Full Stack Pleno na FitoVision' },
      { label: 'Base', value: `${site.location.city}, ${site.location.region} — Brasil` },
    ],
    scrollHint: 'Role para explorar',
  },

  manifesto: {
    eyebrow: 'Em poucas palavras',
    text: [
      'Sou Willian, engenheiro de software. Desde 2021 transformo necessidades de negócio em aplicações web e mobile — da ',
      { em: 'interface' },
      ' que as pessoas tocam às ',
      { em: 'APIs' },
      ' e aos ',
      { em: 'dados' },
      ' que sustentam tudo. Qualidade não é etapa final: é parte de cada entrega.',
    ],
    facts: [
      { kicker: 'Desde', value: '2021', text: 'construindo software para empresas e clientes' },
      { kicker: 'Atuação', value: 'Web · Mobile · API', text: 'React, React Native e Node.js em projetos reais' },
      { kicker: 'Hoje', value: 'FitoVision', text: 'Full Stack Pleno em sistemas para o setor agronômico' },
    ],
  },

  stack: {
    eyebrow: 'Stack · Do pixel ao banco',
    title: ['Uma aplicação inteira, ', { em: 'camada por camada' }, '.'],
    lead: 'Atuo nas três camadas de um produto digital e entendo como uma decisão em uma delas repercute nas outras. É isso que torna uma entrega consistente.',
    layers: [
      {
        index: '01',
        name: 'Interface',
        title: 'Experiências web e mobile',
        text: 'Interfaces responsivas em React, Next.js e React Native: componentização, gerenciamento de estado, formulários validados, animações fluidas e integração com APIs.',
        tech: [
          'React',
          'Next.js',
          'React Native',
          'TypeScript',
          'Expo',
          'Ionic',
          'Redux',
          'React Query',
          'React Hook Form',
          'Reanimated',
          'Tailwind CSS',
          'Chakra UI',
          'styled-components',
          'Storybook',
        ],
      },
      {
        index: '02',
        name: 'API',
        title: 'Regras de negócio e integrações',
        text: 'Servidores em Node.js com endpoints REST, autenticação com JWT, comunicação em tempo real com Socket.io e integrações com serviços externos, como o envio de e-mails.',
        tech: ['Node.js', 'Express', 'TypeScript', 'Socket.io', 'JWT', 'Axios', 'Nodemailer', 'Firebase'],
      },
      {
        index: '03',
        name: 'Dados',
        title: 'Modelagem e persistência',
        text: 'Modelagem de bancos relacionais, ORMs e estratégias offline-first para apps que precisam continuar funcionando mesmo sem conexão.',
        tech: ['MySQL', 'PostgreSQL', 'Sequelize', 'Prisma', 'WatermelonDB', 'Async Storage', 'Firebase Realtime Database'],
      },
    ],
    crosscut: {
      title: 'Em todas as camadas',
      items: ['Princípios SOLID', 'Injeção de dependência', 'Testes unitários com Jest', 'Git', 'Deploy na Vercel e no Railway'],
    },
  },

  experience: {
    eyebrow: 'Trajetória',
    title: ['Experiência construída em ', { em: 'produtos reais' }, '.'],
    lead: 'De apps móveis para o setor alimentício a sistemas para o agronegócio — passando por uma plataforma de delivery e um jogo multiplayer em tempo real.',
    labels: { current: 'Atual', freelance: 'Freelancer', stack: 'Stack' },
    items: [
      {
        company: 'FitoVision',
        role: 'Desenvolvedor Full Stack Pleno',
        period: 'fev 2024 — atual',
        start: '2024-02',
        current: true,
        context: 'Desenvolvimento de novos módulos em sistemas especializados para o setor agronômico.',
        highlights: [
          'Desenvolvimento do sistema web em React e TypeScript.',
          'Servidores em Node.js com Sequelize para modelagem, consulta e manipulação dos dados.',
          'Estruturação e modelagem do banco de dados em MySQL.',
        ],
        stack: ['React', 'TypeScript', 'Node.js', 'Sequelize', 'MySQL'],
      },
      {
        company: 'Guenka Desenvolvimento de Software',
        role: 'Desenvolvedor Full Stack Júnior',
        period: 'jul 2021 — abr 2023',
        start: '2021-07',
        end: '2023-04',
        context:
          'Aplicativos móveis de gestão de estoque e de receitas culinárias para o setor alimentício, e aplicação web para gerenciar compras feitas pela Play Store.',
        highlights: [
          'Apps móveis em Ionic e React Native para gestão de estoque, melhorando a rastreabilidade e a movimentação dos produtos.',
          'Configuração de compras dentro do app (In-App Purchase) no front-end.',
          'Refatoração do painel de compras da Play Store, migrando de Vue para React com Vite e TypeScript.',
          'Manutenção dos servidores em Node.js e criação de endpoints, com Sequelize e PostgreSQL.',
        ],
        stack: ['React Native', 'Ionic', 'React', 'TypeScript', 'Node.js', 'Sequelize', 'PostgreSQL'],
      },
      {
        company: 'Well Delivery',
        role: 'Desenvolvedor Front-end',
        period: 'jul 2022 — out 2022',
        start: '2022-07',
        end: '2022-10',
        freelance: true,
        context: 'Plataforma de delivery com aplicativo para clientes e painel web para as empresas.',
        highlights: [
          'Painel administrativo em Next.js para as empresas gerenciarem os pedidos feitos pelo app.',
          'React Query com buscas automáticas: novos pedidos aparecem na tela sem recarregar a página.',
          'Integração de APIs com Axios e interceptors para gerenciar o token JWT.',
          'Desenvolvimento do aplicativo em React Native.',
        ],
        stack: ['Next.js', 'React', 'React Native', 'TypeScript', 'React Query', 'Axios'],
      },
      {
        company: 'Sport Player',
        role: 'Desenvolvedor Full Stack',
        period: 'mai 2022 — jun 2022',
        start: '2022-05',
        end: '2022-06',
        freelance: true,
        context: 'Jogo de cartas multiplayer para celular, com partidas e chat em tempo real.',
        highlights: [
          'Comunicação em tempo real entre jogadores — cartas e mensagens — com eventos do Socket.io.',
          'Interface do jogo em React Native, com animações de alta performance em Reanimated.',
          'Gerenciamento de estado com Redux, hooks e contextos.',
          'Rotas protegidas com JWT no servidor Node.js e interceptors do Axios no app.',
        ],
        stack: ['React Native', 'Reanimated', 'Redux', 'styled-components', 'Node.js', 'Socket.io', 'JWT'],
      },
      {
        company: 'CDS Informática',
        role: 'Suporte Técnico',
        period: 'abr 2021 — jun 2021',
        start: '2021-04',
        end: '2021-06',
        context: 'Suporte técnico (help desk).',
        highlights: ['Consultas e backups de banco de dados.'],
        stack: ['MySQL'],
      },
    ],
  },

  projects: {
    eyebrow: 'Projetos',
    title: ['Código aberto, ', { em: 'arquitetura à vista' }, '.'],
    lead: 'Projetos públicos no GitHub em que exploro arquiteturas, padrões e ferramentas — do widget ao servidor, do app offline ao login social.',
    labels: { highlights: 'Destaques', stack: 'Stack', architecture: 'Arquitetura' },
    featured: [
      {
        id: 'feedback-widget',
        name: 'Feedback Widget',
        kind: 'Full stack · Web, mobile e API',
        summary:
          'Sistema para coletar feedbacks de usuários — problemas, ideias e sugestões — com captura de tela, direto de dentro do produto.',
        highlights: [
          'Widget web em React, Vite e Tailwind CSS, com componentes documentados no Storybook.',
          'Captura de tela da página (html2canvas) e, no app, da tela do celular (view-shot).',
          'API em Node.js com Express, Prisma e PostgreSQL, organizada com princípios SOLID e testes unitários em Jest.',
          'Feedbacks enviados por e-mail com Nodemailer; deploy na Vercel e no Railway.',
        ],
        stack: ['React', 'Vite', 'Tailwind CSS', 'Storybook', 'React Native', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Jest'],
        links: [
          { label: 'Ver demo', href: 'https://feedback-widget-web-jade.vercel.app', kind: 'demo' },
          { label: 'Web', href: `${site.github}/feedbackWidget-web`, kind: 'repo' },
          { label: 'Mobile', href: `${site.github}/feedbackWIdget-mobile`, kind: 'repo' },
          { label: 'API', href: `${site.github}/feedbackWidget-server`, kind: 'repo' },
        ],
        diagramAlt:
          'Diagrama: o widget web (React) e o app mobile (React Native) enviam feedbacks para a API em Node.js, que grava no PostgreSQL via Prisma e envia um e-mail com Nodemailer.',
      },
      {
        id: 'college-management',
        name: 'CollegeManagement',
        kind: 'Full stack · Web e API',
        summary:
          'Painel para administradores gerenciarem escolas, professores e salas de aula, com controle de acesso e dashboard de indicadores.',
        highlights: [
          'Autenticação e autorização com JWT; senhas protegidas com hash (bcrypt).',
          'Dashboard com gráficos interativos em Chart.js.',
          'Formulários com React Hook Form e validação com Yup; interceptors do Axios para o token.',
          'API em Express com Sequelize e MySQL, injeção de dependência (tsyringe) e upload de arquivos.',
        ],
        stack: ['React', 'TypeScript', 'Chakra UI', 'Chart.js', 'React Hook Form', 'Express', 'Sequelize', 'MySQL', 'JWT'],
        links: [
          { label: 'Web', href: `${site.github}/collegeManagement`, kind: 'repo' },
          { label: 'API', href: `${site.github}/collegeManagement_server-`, kind: 'repo' },
        ],
        diagramAlt:
          'Diagrama: painel web em React autentica com JWT na API Express, que acessa o MySQL via Sequelize; o dashboard exibe gráficos em Chart.js.',
      },
      {
        id: 'rentx',
        name: 'RentX',
        kind: 'Mobile · Offline-first',
        summary:
          'App de aluguel de carros com experiência offline-first: os dados ficam no aparelho e são sincronizados com a API.',
        highlights: [
          'Banco local com WatermelonDB para uso offline-first.',
          'Navegação com React Navigation (pilha e abas) e animações com Reanimated e Lottie.',
          'Escolha do período de aluguel em calendário e validação de formulários com Yup.',
          'API simulada com JSON Server, consumida via Axios.',
        ],
        stack: ['React Native', 'Expo', 'TypeScript', 'WatermelonDB', 'Reanimated', 'styled-components', 'Axios'],
        links: [{ label: 'Código', href: `${site.github}/rentx`, kind: 'repo' }],
        diagramAlt:
          'Diagrama: o app React Native lê e grava no banco local WatermelonDB, que sincroniza com a API (JSON Server) quando há conexão.',
      },
      {
        id: 'gofinances',
        name: 'GoFinances',
        kind: 'Mobile · Finanças pessoais',
        summary: 'App de controle financeiro pessoal: cadastro de entradas e saídas, gráficos e login social com Google e Apple.',
        highlights: [
          'Login social com Google e Apple via OAuth (expo-auth-session e Apple Authentication).',
          'Formulários com React Hook Form e validação com Yup.',
          'Persistência local com Async Storage — os dados continuam lá depois de fechar o app.',
          'Testes com Jest e Testing Library.',
        ],
        stack: ['React Native', 'Expo', 'TypeScript', 'React Hook Form', 'Async Storage', 'OAuth', 'Jest'],
        links: [{ label: 'Código', href: `${site.github}/go-finances`, kind: 'repo' }],
        diagramAlt:
          'Diagrama: o app React Native autentica com Google e Apple via OAuth e persiste as transações no Async Storage.',
      },
    ],
    archiveTitle: 'Mais projetos',
    archive: [
      {
        name: 'LetMeAsk',
        text: 'Salas de perguntas e respostas em tempo real, com login pelo Google.',
        stack: ['React', 'TypeScript', 'Firebase'],
        href: `${site.github}/letmeask`,
      },
      {
        name: 'Podcastr',
        text: 'Player de podcasts sobre tecnologia, com fila de episódios e controles de reprodução.',
        stack: ['Next.js', 'TypeScript', 'Context API'],
        href: `${site.github}/podcastr`,
      },
      {
        name: 'Deliveroo Clone',
        text: 'Estudo de app de delivery com conteúdo gerenciado no Sanity e estado global com Redux.',
        stack: ['React Native', 'Redux', 'Tailwind', 'Sanity'],
        href: `${site.github}/deliveroo-clone`,
      },
      {
        name: 'MySkills',
        text: 'Lista de habilidades com alternância de tema e persistência local.',
        stack: ['React Native', 'TypeScript', 'Async Storage'],
        href: `${site.github}/To-do-list`,
      },
    ],
    viewAll: 'Ver todos no GitHub',
  },

  about: {
    eyebrow: 'Sobre',
    title: ['Engenharia com ', { em: 'atenção aos detalhes' }, '.'],
    paragraphs: [
      'Sou Willian Kiyoshi Onuki, desenvolvedor full stack em Cornélio Procópio (PR). Estudei Engenharia de Software na UTFPR e, em 2021, comecei a construir software profissionalmente — primeiro em apps móveis para o setor alimentício, depois em produtos web, mobile e de tempo real.',
      'Hoje desenvolvo novos módulos de sistemas para o setor agronômico na FitoVision, do front-end em React à modelagem do banco em MySQL. Meu foco é garantir entregas de qualidade, com uma experiência de uso que faça diferença para clientes e usuários finais.',
    ],
    principlesTitle: 'Como eu trabalho',
    principles: [
      {
        title: 'Qualidade faz parte da entrega',
        text: 'Código tipado, organizado e testável desde o início — e não como retrabalho depois.',
      },
      {
        title: 'Experiência do usuário é critério técnico',
        text: 'Desempenho, acessibilidade e fluidez entram nas decisões de arquitetura, não só no acabamento.',
      },
      {
        title: 'Aprendizado contínuo',
        text: 'Estudo constante de ferramentas e padrões, sempre a serviço do problema real.',
      },
    ],
    facts: [
      { label: 'Base', value: `${site.location.city}, ${site.location.region}` },
      { label: 'Foco', value: 'React · React Native · Node.js' },
      { label: 'Bancos', value: 'MySQL · PostgreSQL' },
    ],
    educationTitle: 'Formação',
    education: [
      {
        name: 'Bacharelado em Engenharia de Software',
        org: 'Universidade Tecnológica Federal do Paraná (UTFPR)',
        detail: 'Ingresso em 2019',
      },
      { name: 'Ignite', org: 'Rocketseat', detail: 'Programa de especialização' },
      { name: 'NLW #8 · Impulse', org: 'Rocketseat', detail: 'Projeto: Feedback Widget' },
    ],
    cv: 'Baixar currículo (PDF)',
    photoAlt: 'Willian Onuki sorrindo, de óculos e camiseta preta, em um jardim iluminado à noite.',
  },

  contact: {
    eyebrow: 'Contato',
    title: ['Tem um projeto ou uma ', { em: 'oportunidade' }, '?'],
    lead: 'Respondo pessoalmente. Escolha o canal que preferir — ou monte sua mensagem abaixo.',
    audiences: {
      clients: {
        kicker: 'Para empresas e clientes',
        title: 'Precisa de uma aplicação web, um app ou uma API?',
        text: 'Conte o contexto, o objetivo e o prazo. Eu ajudo a definir o escopo e o caminho técnico mais adequado.',
        cta: 'Conversar sobre um projeto',
      },
      recruiters: {
        kicker: 'Para recrutadores',
        title: 'Avaliando perfis full stack?',
        text: 'O currículo reúne experiência, stack e projetos. Também estou no LinkedIn e no GitHub.',
        cv: 'Ver currículo',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
    composer: {
      title: 'Monte sua mensagem',
      intentLabel: 'Assunto',
      intents: [
        { id: 'web', label: 'Aplicação web' },
        { id: 'mobile', label: 'App mobile' },
        { id: 'api', label: 'API / back-end' },
        { id: 'job', label: 'Vaga ou oportunidade' },
        { id: 'other', label: 'Outro assunto' },
      ],
      nameLabel: 'Seu nome',
      namePlaceholder: 'Como posso te chamar?',
      companyLabel: 'Empresa',
      companyPlaceholder: 'Opcional',
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Conte um pouco sobre o projeto, a vaga ou a ideia…',
      sendEmail: 'Enviar por e-mail',
      sendWhatsapp: 'Enviar pelo WhatsApp',
      hint: 'A mensagem abre no seu app de e-mail ou no WhatsApp — nada é armazenado neste site.',
      subject: 'Portfólio · {intent} — {name}',
      body: 'Olá, Willian! Meu nome é {name}{company}.\nAssunto: {intent}.\n\n{message}',
      companyFragment: ', da {company}',
      errors: { name: 'Informe seu nome.', message: 'Escreva uma mensagem.' },
    },
    channels: {
      title: 'Canais diretos',
      email: 'E-mail',
      copy: 'Copiar e-mail',
      copied: 'E-mail copiado',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      location: 'Localização',
    },
  },

  footer: {
    tagline: 'Engenheiro de Software · Full Stack',
    colophon: 'Desenvolvido com Next.js, React Three Fiber e GSAP.',
    rights: 'Todos os direitos reservados.',
    backToTop: 'Voltar ao topo',
  },

  notFound: {
    title: 'Página não encontrada',
    text: 'O endereço que você acessou não existe — mas o portfólio está a um clique.',
    cta: 'Voltar ao início',
  },
};
