import { site } from '@/config/site';
import type { Content } from './types';

/** English content — mirrors pt.ts (same facts, same sources). */
export const en: Content = {
  locale: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  path: '/en',

  meta: {
    title: 'Willian Onuki — Full Stack Software Engineer | React, React Native & Node.js',
    description:
      'Portfolio of Willian Onuki, software engineer and full stack developer. End-to-end web and mobile applications with React, Next.js, React Native, Node.js, MySQL and PostgreSQL.',
    ogTitle: 'Willian Onuki — Full-stack software, from pixel to database.',
    ogDescription:
      'Full stack software engineer: React and React Native interfaces, Node.js APIs and relational databases.',
    keywords: [
      'Willian Onuki',
      'Software Engineer',
      'Full Stack Developer',
      'React',
      'Next.js',
      'React Native',
      'Node.js',
      'TypeScript',
      'MySQL',
      'PostgreSQL',
      'Brazil',
    ],
    jobTitle: 'Software Engineer · Full Stack Developer',
  },

  a11y: {
    skip: 'Skip to content',
    nav: 'Main navigation',
    mobileNav: 'Navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    home: 'Willian Onuki — back to top',
    newTab: '(opens in a new tab)',
    sceneDescription:
      '3D illustration: three stacked glass layers — interface, API and data — with pulses of light travelling between them, like requests crossing an application.',
  },

  nav: {
    items: [
      { id: 'stack', label: 'Stack' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: "Let's talk",
    language: { label: 'Ler em português', short: 'PT', href: '/', hrefLang: 'pt-BR' },
  },

  hero: {
    status: 'Available for projects and opportunities',
    eyebrow: 'Willian Onuki · Full Stack Software Engineer',
    title: [['Full-stack software,'], ['from ', { em: 'pixel' }], ['to ', { em: 'database' }, '.']],
    lead: 'I design and build web and mobile applications end to end — React and React Native interfaces, Node.js APIs and relational databases — with a focus on code quality and on the people who use them.',
    primaryCta: 'See projects',
    secondaryCta: 'Discuss a project',
    links: { github: 'GitHub', linkedin: 'LinkedIn', cv: 'Résumé (PDF, PT-BR)' },
    meta: [
      { label: 'Currently', value: 'Full Stack Developer at FitoVision' },
      { label: 'Based in', value: `${site.location.city}, ${site.location.region} — Brazil` },
    ],
    scrollHint: 'Scroll to explore',
  },

  manifesto: {
    eyebrow: 'In a few words',
    text: [
      "I'm Willian, a software engineer. Since 2021 I've been turning business needs into web and mobile applications — from the ",
      { em: 'interface' },
      ' people touch to the ',
      { em: 'APIs' },
      ' and ',
      { em: 'data' },
      " that hold everything together. Quality isn't a final step: it's part of every delivery.",
    ],
    facts: [
      { kicker: 'Since', value: '2021', text: 'building software for companies and clients' },
      { kicker: 'Scope', value: 'Web · Mobile · API', text: 'React, React Native and Node.js on real-world projects' },
      { kicker: 'Now', value: 'FitoVision', text: 'mid-level full stack developer building systems for agribusiness' },
    ],
  },

  stack: {
    eyebrow: 'Stack · From pixel to database',
    title: ['A whole application, ', { em: 'layer by layer' }, '.'],
    lead: 'I work across all three layers of a digital product and understand how a decision in one of them ripples into the others. That is what makes a delivery consistent.',
    layers: [
      {
        index: '01',
        name: 'Interface',
        title: 'Web and mobile experiences',
        text: 'Responsive interfaces in React, Next.js and React Native: componentization, state management, validated forms, fluid animations and API integration.',
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
        title: 'Business rules and integrations',
        text: 'Node.js servers with REST endpoints, JWT authentication, real-time communication with Socket.io and integrations with external services such as email delivery.',
        tech: ['Node.js', 'Express', 'TypeScript', 'Socket.io', 'JWT', 'Axios', 'Nodemailer', 'Firebase'],
      },
      {
        index: '03',
        name: 'Data',
        title: 'Modeling and persistence',
        text: 'Relational database modeling, ORMs and offline-first strategies for apps that need to keep working without a connection.',
        tech: ['MySQL', 'PostgreSQL', 'Sequelize', 'Prisma', 'WatermelonDB', 'Async Storage', 'Firebase Realtime Database'],
      },
    ],
    crosscut: {
      title: 'Across every layer',
      items: ['SOLID principles', 'Dependency injection', 'Unit tests with Jest', 'Git', 'Deploys on Vercel and Railway'],
    },
  },

  experience: {
    eyebrow: 'Experience',
    title: ['Experience built on ', { em: 'real products' }, '.'],
    lead: 'From mobile apps for the food industry to agribusiness systems — by way of a delivery platform and a real-time multiplayer game.',
    labels: { current: 'Current', freelance: 'Freelance', stack: 'Stack' },
    items: [
      {
        company: 'FitoVision',
        role: 'Mid-level Full Stack Developer',
        period: 'Feb 2024 — present',
        start: '2024-02',
        current: true,
        context: 'Building new modules for specialized systems in the agronomy sector.',
        highlights: [
          'Web system development with React and TypeScript.',
          'Node.js servers with Sequelize for data modeling, querying and manipulation.',
          'MySQL database design and modeling.',
        ],
        stack: ['React', 'TypeScript', 'Node.js', 'Sequelize', 'MySQL'],
      },
      {
        company: 'Guenka Desenvolvimento de Software',
        role: 'Junior Full Stack Developer',
        period: 'Jul 2021 — Apr 2023',
        start: '2021-07',
        end: '2023-04',
        context:
          'Inventory and recipe management mobile apps for the food industry, plus a web application to manage Play Store purchases.',
        highlights: [
          'Mobile apps in Ionic and React Native for inventory management, improving product traceability and stock movement.',
          'Front-end setup of In-App Purchases.',
          'Refactored the Play Store purchases dashboard, migrating from Vue to React with Vite and TypeScript.',
          'Maintained Node.js servers and built endpoints, with Sequelize and PostgreSQL.',
        ],
        stack: ['React Native', 'Ionic', 'React', 'TypeScript', 'Node.js', 'Sequelize', 'PostgreSQL'],
      },
      {
        company: 'Well Delivery',
        role: 'Front-end Developer',
        period: 'Jul 2022 — Oct 2022',
        start: '2022-07',
        end: '2022-10',
        freelance: true,
        context: 'Delivery platform with a customer app and a web dashboard for businesses.',
        highlights: [
          'Next.js admin dashboard for businesses to manage orders placed through the app.',
          'React Query with automatic refetching: new orders show up without reloading the page.',
          'API integration with Axios and interceptors to handle the JWT token.',
          'React Native app development.',
        ],
        stack: ['Next.js', 'React', 'React Native', 'TypeScript', 'React Query', 'Axios'],
      },
      {
        company: 'Sport Player',
        role: 'Full Stack Developer',
        period: 'May 2022 — Jun 2022',
        start: '2022-05',
        end: '2022-06',
        freelance: true,
        context: 'Multiplayer mobile card game with real-time matches and chat.',
        highlights: [
          'Real-time communication between players — cards and messages — with Socket.io events.',
          'Game interface in React Native with high-performance animations in Reanimated.',
          'State management with Redux, hooks and contexts.',
          'JWT-protected routes on the Node.js server and Axios interceptors in the app.',
        ],
        stack: ['React Native', 'Reanimated', 'Redux', 'styled-components', 'Node.js', 'Socket.io', 'JWT'],
      },
      {
        company: 'CDS Informática',
        role: 'Technical Support',
        period: 'Apr 2021 — Jun 2021',
        start: '2021-04',
        end: '2021-06',
        context: 'Technical support (help desk).',
        highlights: ['Database queries and backups.'],
        stack: ['MySQL'],
      },
    ],
  },

  projects: {
    eyebrow: 'Projects',
    title: ['Open source, ', { em: 'architecture in sight' }, '.'],
    lead: 'Public projects on GitHub where I explore architectures, patterns and tools — from widget to server, from offline app to social login.',
    labels: { highlights: 'Highlights', stack: 'Stack', architecture: 'Architecture' },
    featured: [
      {
        id: 'feedback-widget',
        name: 'Feedback Widget',
        kind: 'Full stack · Web, mobile & API',
        summary:
          'A system to collect user feedback — bugs, ideas and suggestions — with a screenshot attached, right inside the product.',
        highlights: [
          'Web widget in React, Vite and Tailwind CSS, with components documented in Storybook.',
          'Page screenshots (html2canvas) and, on mobile, device screenshots (view-shot).',
          'Node.js API with Express, Prisma and PostgreSQL, structured with SOLID principles and unit-tested with Jest.',
          'Feedback delivered by email with Nodemailer; deployed on Vercel and Railway.',
        ],
        stack: ['React', 'Vite', 'Tailwind CSS', 'Storybook', 'React Native', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Jest'],
        links: [
          { label: 'Live demo', href: 'https://feedback-widget-web-jade.vercel.app', kind: 'demo' },
          { label: 'Web', href: `${site.github}/feedbackWidget-web`, kind: 'repo' },
          { label: 'Mobile', href: `${site.github}/feedbackWIdget-mobile`, kind: 'repo' },
          { label: 'API', href: `${site.github}/feedbackWidget-server`, kind: 'repo' },
        ],
        diagramAlt:
          'Diagram: the web widget (React) and the mobile app (React Native) send feedback to the Node.js API, which stores it in PostgreSQL through Prisma and sends an email with Nodemailer.',
      },
      {
        id: 'college-management',
        name: 'CollegeManagement',
        kind: 'Full stack · Web & API',
        summary: 'Admin dashboard to manage schools, teachers and classrooms, with access control and charts.',
        highlights: [
          'JWT authentication and authorization; passwords hashed with bcrypt.',
          'Dashboard with interactive Chart.js charts.',
          'Forms with React Hook Form and Yup validation; Axios interceptors for the token.',
          'Express API with Sequelize and MySQL, dependency injection (tsyringe) and file uploads.',
        ],
        stack: ['React', 'TypeScript', 'Chakra UI', 'Chart.js', 'React Hook Form', 'Express', 'Sequelize', 'MySQL', 'JWT'],
        links: [
          { label: 'Web', href: `${site.github}/collegeManagement`, kind: 'repo' },
          { label: 'API', href: `${site.github}/collegeManagement_server-`, kind: 'repo' },
        ],
        diagramAlt:
          'Diagram: a React web dashboard authenticates with JWT against the Express API, which reaches MySQL through Sequelize; the dashboard renders Chart.js charts.',
      },
      {
        id: 'rentx',
        name: 'RentX',
        kind: 'Mobile · Offline-first',
        summary: 'Car rental app with an offline-first experience: data lives on the device and syncs with the API.',
        highlights: [
          'Local database with WatermelonDB for offline-first usage.',
          'React Navigation (stack and tabs) with Reanimated and Lottie animations.',
          'Rental period picked on a calendar and forms validated with Yup.',
          'Mock API with JSON Server, consumed via Axios.',
        ],
        stack: ['React Native', 'Expo', 'TypeScript', 'WatermelonDB', 'Reanimated', 'styled-components', 'Axios'],
        links: [{ label: 'Code', href: `${site.github}/rentx`, kind: 'repo' }],
        diagramAlt:
          'Diagram: the React Native app reads and writes to the local WatermelonDB database, which syncs with the API (JSON Server) when online.',
      },
      {
        id: 'gofinances',
        name: 'GoFinances',
        kind: 'Mobile · Personal finance',
        summary: 'Personal finance app: income and expense tracking, charts and social login with Google and Apple.',
        highlights: [
          'Google and Apple social login via OAuth (expo-auth-session and Apple Authentication).',
          'Forms with React Hook Form and Yup validation.',
          'Local persistence with Async Storage — data survives closing the app.',
          'Tests with Jest and Testing Library.',
        ],
        stack: ['React Native', 'Expo', 'TypeScript', 'React Hook Form', 'Async Storage', 'OAuth', 'Jest'],
        links: [{ label: 'Code', href: `${site.github}/go-finances`, kind: 'repo' }],
        diagramAlt:
          'Diagram: the React Native app authenticates with Google and Apple via OAuth and persists transactions in Async Storage.',
      },
    ],
    archiveTitle: 'More projects',
    archive: [
      {
        name: 'LetMeAsk',
        text: 'Real-time Q&A rooms with Google sign-in.',
        stack: ['React', 'TypeScript', 'Firebase'],
        href: `${site.github}/letmeask`,
      },
      {
        name: 'Podcastr',
        text: 'Tech podcast player with an episode queue and playback controls.',
        stack: ['Next.js', 'TypeScript', 'Context API'],
        href: `${site.github}/podcastr`,
      },
      {
        name: 'Deliveroo Clone',
        text: 'Delivery app study with content managed in Sanity and global state with Redux.',
        stack: ['React Native', 'Redux', 'Tailwind', 'Sanity'],
        href: `${site.github}/deliveroo-clone`,
      },
      {
        name: 'MySkills',
        text: 'Skills list with a theme switcher and local persistence.',
        stack: ['React Native', 'TypeScript', 'Async Storage'],
        href: `${site.github}/To-do-list`,
      },
    ],
    viewAll: 'See everything on GitHub',
  },

  about: {
    eyebrow: 'About',
    title: ['Engineering with ', { em: 'attention to detail' }, '.'],
    paragraphs: [
      "I'm Willian Kiyoshi Onuki, a full stack developer based in Cornélio Procópio, Brazil. I studied Software Engineering at UTFPR (Federal University of Technology – Paraná) and started building software professionally in 2021 — first mobile apps for the food industry, then web, mobile and real-time products.",
      'Today I build new modules for agronomy systems at FitoVision, from the React front end to the MySQL data model. My focus is on delivering quality work, with a user experience that makes a difference for clients and end users.',
    ],
    principlesTitle: 'How I work',
    principles: [
      {
        title: 'Quality is part of the delivery',
        text: 'Typed, organized and testable code from day one — not as rework later.',
      },
      {
        title: 'User experience is a technical criterion',
        text: 'Performance, accessibility and fluidity shape architecture decisions, not just the finish.',
      },
      {
        title: 'Continuous learning',
        text: 'Constantly studying tools and patterns, always in service of the real problem.',
      },
    ],
    facts: [
      { label: 'Based in', value: `${site.location.city}, ${site.location.region}` },
      { label: 'Focus', value: 'React · React Native · Node.js' },
      { label: 'Databases', value: 'MySQL · PostgreSQL' },
    ],
    educationTitle: 'Education',
    education: [
      {
        name: "Bachelor's in Software Engineering",
        org: 'Federal University of Technology – Paraná (UTFPR)',
        detail: 'Enrolled in 2019',
      },
      { name: 'Ignite', org: 'Rocketseat', detail: 'Specialization program' },
      { name: 'NLW #8 · Impulse', org: 'Rocketseat', detail: 'Project: Feedback Widget' },
    ],
    cv: 'Download résumé (PDF, PT-BR)',
    photoAlt: 'Willian Onuki smiling, wearing glasses and a black t-shirt, in a garden lit at night.',
  },

  contact: {
    eyebrow: 'Contact',
    title: ['Have a project or an ', { em: 'opportunity' }, '?'],
    lead: 'I reply personally. Pick the channel you prefer — or put your message together below.',
    audiences: {
      clients: {
        kicker: 'For companies and clients',
        title: 'Need a web application, an app or an API?',
        text: 'Share the context, the goal and the timeline. I’ll help shape the scope and the right technical path.',
        cta: 'Discuss a project',
      },
      recruiters: {
        kicker: 'For recruiters',
        title: 'Evaluating full stack profiles?',
        text: 'My résumé covers experience, stack and projects. You can also find me on LinkedIn and GitHub.',
        cv: 'View résumé',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
    composer: {
      title: 'Write your message',
      intentLabel: 'Subject',
      intents: [
        { id: 'web', label: 'Web application' },
        { id: 'mobile', label: 'Mobile app' },
        { id: 'api', label: 'API / back end' },
        { id: 'job', label: 'Job or opportunity' },
        { id: 'other', label: 'Something else' },
      ],
      nameLabel: 'Your name',
      namePlaceholder: 'What should I call you?',
      companyLabel: 'Company',
      companyPlaceholder: 'Optional',
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me a bit about the project, the role or the idea…',
      sendEmail: 'Send by email',
      sendWhatsapp: 'Send on WhatsApp',
      hint: 'Your message opens in your email app or in WhatsApp — nothing is stored on this site.',
      subject: 'Portfolio · {intent} — {name}',
      body: 'Hi Willian! My name is {name}{company}.\nSubject: {intent}.\n\n{message}',
      companyFragment: ' from {company}',
      errors: { name: 'Please enter your name.', message: 'Please write a message.' },
    },
    channels: {
      title: 'Direct channels',
      email: 'Email',
      copy: 'Copy email',
      copied: 'Email copied',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      location: 'Location',
    },
  },

  footer: {
    tagline: 'Software Engineer · Full Stack',
    colophon: 'Built with Next.js, React Three Fiber and GSAP.',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },

  notFound: {
    title: 'Page not found',
    text: 'The address you tried doesn’t exist — but the portfolio is one click away.',
    cta: 'Back to home',
  },
};
