import type { Messages } from '../types';

export const enUS: Messages = {
  meta: {
    title: 'Matheus Rodrigues · Full Stack Web Developer',
    description:
      'Portfolio of Matheus Rodrigues, a mid-level full stack web developer working with C#/.NET, React and Next.js. Projects, experience, education and contact.',
  },
  common: {
    until: 'to',
    present: 'present',
    newTab: '(opens in a new tab)',
    close: 'Close',
    loading: 'Loading…',
  },
  skipLink: 'Skip to content',
  header: {
    home: 'Matheus Rodrigues, back to top',
    navLabel: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    nav: {
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact',
    },
    language: {
      label: 'Language',
      pt: 'Português',
      en: 'English',
    },
    theme: {
      toDark: 'Switch to dark theme',
      toLight: 'Switch to light theme',
    },
  },
  hero: {
    eyebrow: 'Mid-level Web Developer · Full stack',
    lead: 'I build complete web applications with C#/.NET, React and Next.js: from the interface to the API, from business rules to the database.',
    body: 'I currently work on a legal management platform at Nexus and teach frontend development at Cosmos Educa. On my own, I maintain two live projects: {concord} and {deepwokendle}.',
    facts: [
      { label: 'Now', value: 'Mid-level Developer at Nexus' },
      { label: 'Alongside', value: 'Frontend Instructor at Cosmos Educa' },
      { label: 'Main stack', value: 'C#/.NET · React · Next.js · PostgreSQL' },
    ],
    factsLabel: 'Professional summary',
    ctaProjects: 'See projects',
    spriteAlt: 'Matheus in pixel art: curly hair, glasses, beard, black shirt, black trousers and white sneakers, hands in his pockets.',
  },
  cv: {
    download: 'Download résumé',
    preview: 'Preview résumé',
    modalTitle: 'Résumé in English',
    previewAlt:
      'First page of the résumé of Matheus Kauan Rodrigues de Souza, with summary, experience, projects, technical skills, education and languages.',
    downloadPdf: 'Download PDF',
    openPdf: 'Open PDF in a new tab',
  },
  about: {
    kicker: 'About',
    title: 'I take a feature from the interface all the way to the database.',
    paragraphs: [
      'I am a web developer working mainly with C#/.NET on the backend and React and Next.js on the frontend. With time and dedication, I can build every part of a feature! The screen and the form, validation, the endpoint, the business rule, the migration and the test.',
      'I started as an intern at UPPER Consultoria in December 2024 and was hired as a junior developer in June 2025. During that time, I began supporting new interns through onboarding and teaching the backend and frontend tracks of FDevs.',
      'Since June 2026 I have been a mid-level developer at Nexus and, since August, a frontend instructor at Cosmos Educa.',
    ],
    photoAlt: 'Photo of Matheus Rodrigues with a slight smile, wearing glasses and a black shirt, in front of a light wall.',
    photoCaption: 'Matheus Kauan Rodrigues de Souza',
    facts: [
      { label: 'Degree', value: 'Computer Science at UNISAGRADO, expected to graduate in 2029' },
      { label: 'Languages', value: 'Native Portuguese, fluent English (C1) and intermediate Spanish' },
    ],
  },
  projects: {
    kicker: 'Projects',
    title: 'Three projects, three kinds of problem.',
    intro:
      'Real-time media streaming, management with roles and permissions, and a daily game with a community around it. All three are live.',
    indexLabel: 'Project index',
    labels: {
      need: 'The problem',
      features: 'What it does',
      role: 'My role',
      stack: 'Technologies',
      decisions: 'Technical decisions',
      visit: 'Visit the site',
      repo: 'Code on GitHub',
      gallery: 'Screenshots',
      expand: 'Enlarge image: {alt}',
    },
    concord: {
      kicker: 'Personal project · 2026',
      tagline: 'Several people sharing their screens at the same time, in the same room.',
      need: 'A group wants to watch more than one person’s screen at once, with each stream’s audio, signing in with the Discord account they already use. Everyone picks which screen to watch up close.',
      features: [
        'Open or private rooms, with passwords, invitations and join approval.',
        'Owner, admin and member roles, with kicking and banning.',
        'Several simultaneous streams, with quality selection and a choice between sharpness and smoothness.',
        'A Windows desktop app that shares only the audio of the chosen application.',
      ],
      role: 'Solo project. I built the whole product: frontend, API, database, Docker infrastructure and the desktop app.',
      decisions: [
        {
          title: 'Media never goes through the API',
          body: 'The ASP.NET Core backend handles sign-in, permissions, presence and signaling. Video travels over WebRTC directly between participants or to the SFU, without crossing the application server.',
        },
        {
          title: 'Secrets stay on the server',
          body: 'Cloudflare Realtime credentials never reach the browser. The API brokers the SDP negotiation and checks that the person can access the room before opening a media session. The user session lives in an HttpOnly cookie, out of reach of the page’s JavaScript.',
        },
        {
          title: 'A connection that recovers',
          body: 'On a long-lived connection, the browser sometimes rejects a renegotiation. When that happens, the client drops the connection and rebuilds it, restoring streams and subscriptions without a page reload.',
        },
        {
          title: 'Per-application audio',
          body: 'When sharing a window in the desktop app, capture includes only that process’s audio (WASAPI process loopback). A parallel voice call is not echoed back through the stream.',
        },
      ],
      moreTitle: 'More technical details',
      more: [
        'Room presence lives in memory, behind an interface designed to be swapped for Redis if the API ever needs to run on more than one instance.',
        'A TURN relay (coturn), capped at 720p, is the last resort when a direct connection cannot be established.',
        'Each client uses a single WebRTC connection to both stream and watch, with negotiations queued one at a time.',
        'The frontend build fails if it finds circular imports.',
      ],
      sim: {
        title: 'How video reaches the viewers',
        modeLabel: 'Streaming path',
        direct: 'Direct (P2P)',
        sfu: 'Through the SFU',
        peopleLabel: 'People in the room',
        decrease: 'Remove a person',
        increase: 'Add a person',
        uploadsDirect: 'Each person streaming sends {count} copies of the video, one per viewer.',
        uploadsDirectOne: 'Each person streaming sends 1 copy of the video.',
        uploadsSfu: 'Each person streaming sends 1 copy. The SFU delivers it to the other {count} people.',
        uploadsSfuOne: 'Each person streaming sends 1 copy. The SFU delivers it to the other person.',
        captionDirect:
          'On the direct path, video goes through no server at all, but the streamer’s upload grows with the number of viewers.',
        captionSfu: 'Through the SFU, the streamer’s upload stays constant and distribution happens on Cloudflare’s network.',
        diagramLabel: 'Diagram: {count} people connected through the {mode} path.',
      },
    },
    sinlabs: {
      kicker: 'Project for UNESP · 2026',
      tagline: 'Managing labs, systems and access.',
      need: 'Bring the management of users, labs and systems into a single dashboard and control what each role can access, with lookups for active sessions and login and download history.',
      features: [
        'Access roles with permissions defined per screen.',
        'Records for users, labs and systems, and the associations between them.',
        'Active sessions and login and download history.',
        'Search, status filters and paginated tables.',
        'An announcements feed with threaded comments and filters by lab and type. In this version, the feed uses demo data inside the frontend.',
      ],
      role: 'I built the React interfaces and integrated them with the ASP.NET Core API.',
      decisions: [
        {
          title: 'One HTTP layer for every screen',
          body: 'A single client attaches the JWT, ends the session and returns to the login page when the API answers 401, turns a 403 into a clear message and reuses the error detail sent by the API. Pages talk to domain services instead of calling endpoints directly.',
        },
        {
          title: 'Pages loaded on demand',
          body: 'Each route is loaded with React.lazy, and the login area and the authenticated area have separate layouts.',
        },
      ],
      annotationsTitle: 'On the access roles screen',
      annotations: [
        'Side navigation across the areas of the system.',
        'Search by role name.',
        'Status filter.',
        'Edit and delete on every row.',
        'Status spelled out in words, not only in color.',
        'Pagination with a rows-per-page choice.',
      ],
      dataNote: 'All screenshots use fictional data.',
    },
    deepwokendle: {
      kicker: 'Personal project · since 2024',
      tagline: 'A daily guessing game for the Deepwoken community.',
      need: 'Inspired by Pokedle, the game picks a monster from Deepwoken every day. With each guess, every attribute shows whether it is right, partially right or wrong, until the player reaches the answer.',
      features: [
        'A daily challenge shared by everyone, plus an {infinite|infinite mode} with win streaks.',
        'User accounts, daily, monthly and all-time leaderboards, and streak history.',
        'Real-time global chat for signed-in players.',
        'Community suggestions for new monsters, with votes and admin approval.',
        'A monster index and result sharing.',
      ],
      role: 'Solo project, from the database to deployment. The frontend started in jQuery and, in 2026, was rewritten in React and TypeScript on top of the same API.',
      decisions: [
        {
          title: 'The answer never reaches the browser',
          body: 'Guesses are compared in the API, which returns only the result for each attribute. Inspecting the page’s traffic does not reveal the monster of the day.',
        },
        {
          title: 'The same challenge for everyone',
          body: 'The monster of the day is drawn on the first request of the day (based on UTC time) and stored in the database (if you are the first one in, you are the one who draws the monster, and then everyone else enjoys your draw). And of course, suggested monsters that have not been approved never enter the draw; only I (an admin) can approve them.',
        },
        {
          title: 'Chat rate-limited on the server',
          body: 'On top of the cooldown in the interface, the API accepts at most 3 messages every 3 seconds per user, using an in-memory sliding window.',
        },
      ],
      tour: {
        play: 'Play recording (30 s)',
        pause: 'Pause recording',
        posterAlt:
          'Deepwokendle board with one guess: each attribute sits in its own tile, red when wrong and green when right.',
        animationAlt:
          'Screen recording of Deepwokendle: a guess on the board, streak history, the leaderboard and the community suggestions page.',
        caption: 'Recording of the live game.',
      },
      demo: {
        title: 'Guess the technology',
        disclaimer:
          'Curious to know how Deepwokendle worked? Try it out!',
        inputLabel: 'Your guess',
        placeholder: 'Type a technology',
        submit: 'Guess',
        newRound: 'New round',
        reveal: 'Show answer',
        attempts: 'Attempts: {count}',
        empty: 'No guesses from you yet. Start with a technology you would use yourself!',
        columns: {
          name: 'Technology',
          area: 'Area',
          kind: 'Type',
          usedIn: 'Where I used it',
          released: 'Released',
        },
        result: {
          correct: 'right',
          partial: 'partially right',
          wrong: 'wrong',
          higher: 'the answer is newer',
          lower: 'the answer is older',
        },
        won: 'Solved in {count} attempts: it was {name}.',
        wonFirst: 'First try: it was {name}.',
        revealed: 'The answer was {name}.',
        noUsage: 'General experience',
        emotes: {
          neutral: 'Character waiting for a guess.',
          excited: 'Character celebrating the right answer.',
          confused: 'Confused character: some attributes match.',
          angry: 'Annoyed character: no attribute matches.',
        },
      },
    },
    shots: {
      'concord-room': {
        alt: 'A Concord room: room name, quality selector set to 1080p at 60 fps, a central area reading "No screen being shared" in Portuguese and, below, the participant list.',
        caption: 'An open room, before anyone starts streaming.',
      },
      'concord-landing': {
        alt: 'Concord home page, in Portuguese, with the headline "Your screen, live, only for who you let in." and the buttons Sign in with Discord and Download for Windows.',
        caption: 'Public home page.',
      },
      'sinlabs-profiles': {
        alt: 'Sinlabs Access Roles screen, in Portuguese: search, status filter, a New role button and a table with roles such as Administrator, Coordinator and Technician, each with a permission count, creation date and Active or Inactive status.',
        caption: 'Access roles with search, filters and pagination.',
      },
      'sinlabs-feed': {
        alt: 'Sinlabs news feed, in Portuguese, with a post about the downloads module and filters by lab and type on the side.',
        caption: 'Announcements feed with filters.',
      },
      'sinlabs-feed-thread': {
        alt: 'An open Sinlabs feed post, in Portuguese, with a comment field and threaded replies between three people.',
        caption: 'Comments with threaded replies.',
      },
      'sinlabs-login': {
        alt: 'Sinlabs login screen with the IntegraLab brand, email and password fields, a Remember me option and the UNESP support contact.',
        caption: 'The live login screen.',
      },
    },
  },
  experience: {
    kicker: 'Experience',
    title: 'From intern to mid-level!',
    ladderLabel: 'Career progression',
    lanes: {
      main: 'Main track',
      parallel: 'Alongside',
    },
    roles: {
      intern: 'Software Development Intern',
      junior: 'Junior Software Developer',
      mid: 'Mid-level Full Stack Developer',
      teacher: 'Frontend Instructor',
    },
    ladder: {
      intern: 'Intern',
      junior: 'Junior',
      mid: 'Mid-level',
    },
    stackLabel: 'Stack',
    highlightsLabel: 'Highlights',
    entries: {
      nexus: {
        summary:
          'Full stack development of a legal management platform. The code lives in a monorepo, with the API organized as a modular monolith in Clean Architecture layers.',
        highlights: [
          'Access approval flow: the administrator assigns a role when granting access, and the API checks for a pending request before approving it.',
          'Case and contract screens with filters, validation including Brazilian tax IDs (CPF and CNPJ), CSV export and reusable Ant Design components.',
          'User administration and an audit log screen, with automatic sign-out when the token expires.',
          'Fixed date handling that made contract due dates show up one day early.',
          'Persistence changes with Entity Framework Core, covered by unit tests with xUnit.',
        ],
      },
      upper: {
        summary: 'Work during my time at UPPER, first as an intern and then as a junior developer.',
        highlights: [
          'End-to-end features in C#/.NET, JavaScript and SQL Server, such as payment integrations with triggers and stored procedures, one-time password (OTP) sign-in and sign-up, and workflow features from the API to the interface.',
          'Bug fixes across the company’s systems, based on team priorities.',
          'Mentored new interns during onboarding, walking them through the stack, the architecture and the development workflow.',
          'Taught the backend and frontend tracks of FDevs, guiding students through hands-on projects.',
        ],
      },
      cosmos: {
        summary: 'Here I teach frontend classes at the Cosmos project, alongside my work at Nexus.',
        highlights: [],
      },
    },
  },
  skills: {
    kicker: 'Skills',
    title: 'What I use, and where I used it.',
    intro:
      'Grouped by area. Each technology shows where it appears in my experience or projects. The ones marked as main are the core of my current work.',
    filterLabel: 'Highlight technologies by context',
    all: 'All',
    core: 'Main',
    general: 'General experience',
    usedInLabel: 'Used at',
    matchLabel: 'Used at {context}',
    areas: {
      backend: 'Backend',
      frontend: 'Frontend',
      data: 'Data and infrastructure',
      realtime: 'Real time and desktop',
      architecture: 'Architecture and quality',
      ai: 'Complementary',
    },
    names: {
      rest: 'REST APIs',
      oop: 'OOP and SOLID',
      htmlcss: 'HTML5 and CSS3',
      git: 'Git and GitHub',
      modular: 'Modular monolith',
      microservices: 'Microservices',
      xunit: 'Unit testing with xUnit',
      ai: 'AI API integration',
    },
    notes: {
      ai: 'With guardrails, input and output validation and careful handling of sensitive data.',
    },
    kinds: {
      language: 'Language',
      platform: 'Platform',
      framework: 'Framework',
      library: 'Library',
      database: 'Database',
      tool: 'Tool',
      standard: 'Web standard',
    },
    contexts: {
      nexus: 'Nexus',
      upper: 'UPPER',
      concord: 'Concord',
      sinlabs: 'Sinlabs',
      deepwokendle: 'Deepwokendle',
    },
  },
  education: {
    kicker: 'Education',
    title: 'Degree, technical school and training.',
    groups: {
      academic: 'Academic education',
      complementary: 'Complementary training',
    },
    kinds: {
      degree: 'Bachelor’s degree',
      technical: 'Technical degree',
      course: 'Course',
      training: 'Training',
    },
    expected: 'expected',
    items: {
      unisagrado: { title: 'Bachelor’s Degree in Computer Science', note: 'In progress, expected to finish in 2029.' },
      etec: { title: 'Technical Degree in Systems Development', note: '' },
      fdevs: { title: 'FDevs, Backend track', note: 'A course by UPPER Consultoria, taken as a student.' },
      barracred: { title: 'Professional Training in Technology', note: '' },
    },
    languagesTitle: 'Languages',
    languages: {
      pt: { name: 'Portuguese', level: 'Native' },
      en: { name: 'English', level: 'Fluent, C1 certified' },
      es: { name: 'Spanish', level: 'Intermediate' },
    },
  },
  beyond: {
    kicker: 'Beyond code',
    title: 'Programming and games.',
    paragraphs: [
      'Outside of work, my main interests are programming and games, and my own projects show a bit of that.',
      'Deepwokendle is the most direct example in practice! It was a game made for a community of players, with leaderboards, chat and monsters suggested by the players themselves. It was my first hosted project with real users, and it lives in my heart.',
    ],
    bustAlt: 'Matheus in pixel art, with glasses and a black shirt, smiling sideways.',
    emotesLabel: 'Character reactions',
    emotes: {
      neutral: 'Neutral',
      excited: 'Excited',
      confused: 'Confused',
      angry: 'Annoyed',
    },
    emoteSelected: 'Selected reaction: {name}.',
  },
  contact: {
    kicker: 'Contact',
    title: 'Want to talk, have a role, or a project in mind?',
    body: 'Email is the most direct way! I am also on LinkedIn and GitHub.',
    emailLabel: 'Email',
    copy: 'Copy email',
    send: 'Write an email',
    copied: 'Email copied.',
    copyFailed: 'Could not copy. The address is {email}.',
    phone: 'Phone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Résumé',
    linksLabel: 'Other ways to get in touch',
  },
  footer: {
    rights: '© {year} Matheus Rodrigues',
    source: 'Source code of this site on GitHub',
    backToTop: 'Back to top',
  },
  buddy: {
    label: 'Mini Matheus. Click to learn what he does; drag to move him around.',
    intro:
      'Hey! If you find something about me on this site that makes you curious and it is highlighted, just click it and I will tell you what I know!',
    close: 'Close speech bubble',
    comeBack: 'Bring Matheus back',
    askSuffix: '(ask Matheus)',
    tooltip: 'Ask?',
    lines: {
      ouch: 'Ouch!',
      engaged: 'I am engaged and have been in a relationship for 4 years! I love my lady.',
      mom: 'I love my mom. She is one of the most important pillars of my life.',
      barracred: 'I am very grateful to Barracred Conecta.',
      tryYourBest: 'Don\'t you agree it is better to have tried your best and not made it than to never have tried at all? Go on, give it a try!',
      missUpper: 'I miss Upper..!',
      sleepEarly: 'You are going to bed early tonight!!',
      aiWorld: 'Do you think AI is going to take over the world?',
      gameDev: 'Did you know I also make games? I did not put them here, but I have built projects in Luau and Unity!',
      pineapple: 'If you are the first to see this, send me a message saying "Abacaxi" and I will send you 5 reais!',
      throwMe: 'Did you know you can drag me around? Throw me fast and I will go flying!',
      darkMode: 'Have you tried the dark theme? The button is up top, next to the language switch.',
      crystalBall: 'My crystal ball says: yes!',
      crystalBallNo: 'My crystal ball says: no!',
      myMachine: 'It works on my machine!',
      bugOrFeature: 'You found a bug...? Are you sure it is not a feature..?',
      testsFirst: 'Hmm... have you tried restarting your machine?',
      survived: 'You have already survived days you once thought you could not bear. Can you look back and remember them?',
      pastSelf: 'The you from a few years ago would probably be proud of things you now consider normal.',
      ownTime: 'Maybe you are not behind. Maybe you are just living on your own time.',
      futureYou: 'There are future versions of you that will only exist because you decided to keep going today.',
      missNormal: 'One day you will miss things that feel completely ordinary today.',
      weird: 'Sometimes I say some poetic stuff, right? I am a bit weird, I know, but I like it that way!',
    },
    titles: {
      infinite: 'Infinite mode',
      barracred: 'Barracred Conecta',
      intern: 'Internship',
      junior: 'Junior',
      mid: 'Mid-level',
    },
    terms: {
      infinite: 'Can you believe one player reached 1,000 correct guesses in a row without missing a single one!?',
      barracred:
        'This course was amazing for me. It introduced me to programming in a way that made me fall in love with it. The people I met there are amazing, and they are still part of my life today.',
      intern:
        'This internship was one of the best experiences I have had, because that is where I proved my worth and kept improving. Facing challenges from huge clients, I learned the hard way how to write code with quality and efficiency. And of course, I made friends there for life.',
      junior:
        'By then I was more experienced with the environment, the system and the code, so I passed my knowledge on to people joining the team, while working on even more complex tasks.',
      mid:
        'This is my current and biggest challenge. As a full stack developer, I build tasks from start to finish, implementing complex and optimized processes and logic. Even architecture decisions are part of it. And when I have questions, I ask the masters!',
      concord:
        'Working on Concord is a lot of fun, because it is the project where I have the most users and real problems: there are about 4,400 accounts today. That is rewarding!',
      deepwokendle:
        'I built Deepwokendle, and as my code got better, I kept improving it too. It is almost a gauge of my skills that grew along with me!',
      csharp:
        'C# is the language I use most on the backend: it is in the Nexus API, in the systems I worked on at UPPER, in Concord and in Deepwokendle.',
      aspnetcore:
        'I built the Concord and Deepwokendle APIs with ASP.NET Core. At Nexus, the API is a modular monolith organized in Clean Architecture layers.',
      react:
        'React is in almost everything I do on the frontend: the Nexus screens, Concord, the Sinlabs interfaces and Deepwokendle, which I rewrote moving away from jQuery.',
      nextjs: 'I use Next.js on the legal management platform at Nexus, together with TypeScript and Ant Design.',
      typescript:
        'TypeScript is at Nexus, in Concord and in the current version of Deepwokendle, which I rewrote from JavaScript with jQuery.',
      postgresql:
        'PostgreSQL stores the data for Nexus, Concord and Deepwokendle. In Deepwokendle, it is where the monster of the day is recorded, the same for everyone.',
      sqlserver: 'At UPPER, I worked with SQL Server writing triggers and stored procedures for payment integrations and reports.',
      redis:
        'I have used Redis in professional projects. In Concord, room presence still lives in memory, but behind an interface designed to be swapped for Redis.',
      signalr:
        'I use SignalR for anything that has to arrive in real time: presence and room events in Concord and the global chat in Deepwokendle.',
      webrtc:
        'WebRTC is what carries the screens in Concord, directly between people or through the SFU. The API only handles signaling and permissions.',
      electron: 'The Concord desktop app is built with Electron. That is where the audio capture of only the shared application lives.',
      antd: 'At Nexus, I standardized forms, filters, dropdowns and grids with Ant Design. This site also uses a few of its components.',
      docker: 'Concord runs in Docker containers, alongside Nginx and a TURN relay.',
      xunit: 'At Nexus, persistence and business rule changes come with unit tests in xUnit.',
      clean: 'The Nexus API is organized in Clean Architecture layers, inside a modular monolith in a monorepo.',
      ai: 'When I integrate AI APIs, I do it with guardrails: I validate inputs and outputs and handle sensitive data carefully.',
    },
  },
  viewer: {
    label: 'Image viewer',
    close: 'Close viewer',
    previous: 'Previous image',
    next: 'Next image',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    reset: 'Original size',
    counter: 'Image {current} of {total}',
  },
};
