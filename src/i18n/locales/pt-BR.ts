export const ptBR = {
  meta: {
    title: 'Matheus Rodrigues · Desenvolvedor Web Full Stack',
    description:
      'Portfólio de Matheus Rodrigues, desenvolvedor web pleno com atuação full stack em C#/.NET, React e Next.js. Projetos, experiência, formação e contato.',
  },
  common: {
    until: 'até',
    present: 'atual',
    newTab: '(abre em nova aba)',
    close: 'Fechar',
    loading: 'Carregando…',
  },
  skipLink: 'Pular para o conteúdo',
  header: {
    home: 'Matheus Rodrigues, voltar ao início',
    navLabel: 'Navegação principal',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      experience: 'Experiência',
      skills: 'Tecnologias',
      education: 'Formação',
      contact: 'Contato',
    },
    language: {
      label: 'Idioma',
      pt: 'Português',
      en: 'English',
    },
    theme: {
      toDark: 'Ativar tema escuro',
      toLight: 'Ativar tema claro',
    },
  },
  hero: {
    eyebrow: 'Desenvolvedor Web Pleno · Full stack',
    lead: 'Desenvolvo aplicações web completas com C#/.NET, React e Next.js: da interface à API, das regras de negócio ao banco de dados.',
    body: 'Hoje trabalho num sistema de gestão jurídica na Nexus e dou aulas de frontend na Cosmos Educa. Por conta própria, mantenho dois projetos publicados: o Concord e o Deepwokendle.',
    facts: [
      { label: 'Agora', value: 'Desenvolvedor Pleno na Nexus' },
      { label: 'Em paralelo', value: 'Professor de Frontend na Cosmos Educa' },
      { label: 'Stack principal', value: 'C#/.NET · React · Next.js · PostgreSQL' },
    ],
    factsLabel: 'Resumo profissional',
    ctaProjects: 'Ver projetos',
    spriteAlt: 'Matheus em pixel art: cabelo cacheado, óculos, barba, camisa preta, calça preta e tênis brancos, com as mãos nos bolsos.',
  },
  cv: {
    download: 'Baixar currículo',
    preview: 'Pré-visualizar currículo',
    modalTitle: 'Currículo em português',
    previewAlt:
      'Primeira página do currículo de Matheus Kauan Rodrigues de Souza, com resumo, experiência, projetos, competências técnicas, formação e idiomas.',
    downloadPdf: 'Baixar PDF',
    openPdf: 'Abrir PDF em nova aba',
  },
  about: {
    kicker: 'Sobre',
    title: 'Levo uma funcionalidade da interface até o banco de dados.',
    paragraphs: [
      'Sou desenvolvedor web e trabalho principalmente com C#/.NET no backend e React e Next.js no frontend. Com tempo e dedicação, eu posso desenvolver todas as partes de uma funcionalidade! A tela e o formulário, a validação, o endpoint, a regra de negócio, a migração e o teste.',
      'Comecei como estagiário na UPPER Consultoria em dezembro de 2024 e fui efetivado como desenvolvedor júnior em junho de 2025. Nesse período, passei a acompanhar novos estagiários no onboarding e a dar aulas nas trilhas de backend e frontend do FDevs.',
      'Desde junho de 2026 sou desenvolvedor pleno na Nexus e, desde agosto, professor de frontend na Cosmos Educa.',
    ],
    photoAlt: 'Foto de Matheus Rodrigues com um leve sorriso, de óculos e camisa preta, em frente a uma parede clara.',
    photoCaption: 'Matheus Kauan Rodrigues de Souza',
    facts: [
      { label: 'Graduação', value: 'Ciência da Computação na UNISAGRADO, com conclusão prevista para 2029' },
      { label: 'Idiomas', value: 'Português nativo, inglês fluente (C1) e espanhol intermediário' },
    ],
  },
  projects: {
    kicker: 'Projetos',
    title: 'Três projetos, três tipos de problema.',
    intro:
      'Transmissão de mídia em tempo real, gestão com perfis e permissões, e um jogo diário com comunidade. Os três estão publicados.',
    indexLabel: 'Índice de projetos',
    labels: {
      need: 'O problema',
      features: 'O que dá para fazer',
      role: 'Minha participação',
      stack: 'Tecnologias',
      decisions: 'Decisões técnicas',
      visit: 'Visitar o site',
      repo: 'Código no GitHub',
      gallery: 'Capturas de tela',
      expand: 'Ampliar imagem: {alt}',
    },
    concord: {
      kicker: 'Projeto próprio · 2026',
      tagline: 'Várias pessoas compartilhando a tela ao mesmo tempo, na mesma sala.',
      need: 'Um grupo quer ver a tela de mais de uma pessoa ao mesmo tempo, com o som de cada transmissão, entrando com a conta do Discord que já usa. Cada pessoa escolhe qual tela quer ver em destaque.',
      features: [
        'Salas abertas ou privadas, com senha, convites e aprovação de entrada.',
        'Papéis de dono, administrador e membro, com expulsão e banimento.',
        'Várias transmissões simultâneas, com escolha de qualidade e de preferência entre nitidez e fluidez.',
        'App desktop para Windows que compartilha apenas o áudio do aplicativo escolhido.',
      ],
      role: 'Projeto individual. Fiz o produto inteiro: frontend, API, banco de dados, infraestrutura com Docker e o app desktop.',
      decisions: [
        {
          title: 'A mídia não passa pela API',
          body: 'O backend em ASP.NET Core cuida de login, permissões, presença e sinalização. O vídeo segue por WebRTC diretamente entre os participantes ou até o SFU, sem atravessar o servidor da aplicação.',
        },
        {
          title: 'Segredos ficam no servidor',
          body: 'As credenciais da Cloudflare Realtime nunca chegam ao navegador. A API intermedia a negociação SDP e confere se a pessoa tem acesso à sala antes de abrir uma sessão de mídia. A sessão do usuário fica num cookie HttpOnly, fora do alcance do JavaScript da página.',
        },
        {
          title: 'Conexão que se recupera',
          body: 'Numa conexão de longa duração, o navegador às vezes recusa uma renegociação. Quando isso acontece, o cliente descarta a conexão e a reconstrói, refazendo transmissões e assinaturas sem recarregar a página.',
        },
        {
          title: 'Áudio por aplicativo',
          body: 'Ao compartilhar uma janela no app desktop, a captura inclui só o áudio daquele processo (WASAPI process loopback). Assim, a voz de uma chamada paralela não volta pela transmissão.',
        },
      ],
      moreTitle: 'Mais detalhes técnicos',
      more: [
        'A presença nas salas fica em memória, atrás de uma interface pensada para ser trocada por Redis se a API precisar rodar em mais de uma instância.',
        'Um relay TURN (coturn), limitado a 720p, serve de último recurso quando a conexão direta não se estabelece.',
        'Cada cliente usa uma única conexão WebRTC para transmitir e assistir, com as negociações executadas em fila.',
        'O build do frontend falha se encontrar imports circulares.',
      ],
      sim: {
        title: 'Como o vídeo chega a quem assiste',
        disclaimer: 'Simulação ilustrativa. Não usa câmera, tela nem rede.',
        modeLabel: 'Caminho da transmissão',
        direct: 'Direto (P2P)',
        sfu: 'Via SFU',
        peopleLabel: 'Pessoas na sala',
        decrease: 'Remover uma pessoa',
        increase: 'Adicionar uma pessoa',
        uploadsDirect: 'Cada pessoa que transmite envia {count} cópias do vídeo, uma para cada espectador.',
        uploadsDirectOne: 'Cada pessoa que transmite envia 1 cópia do vídeo.',
        uploadsSfu: 'Cada pessoa que transmite envia 1 cópia. O SFU entrega às outras {count} pessoas.',
        uploadsSfuOne: 'Cada pessoa que transmite envia 1 cópia. O SFU entrega à outra pessoa.',
        captionDirect:
          'No caminho direto, o vídeo não passa por servidor nenhum, mas o upload de quem transmite cresce com o número de espectadores.',
        captionSfu:
          'Via SFU, o upload de quem transmite fica constante e a distribuição acontece na rede da Cloudflare.',
        diagramLabel: 'Diagrama: {count} pessoas conectadas pelo caminho {mode}.',
      },
    },
    sinlabs: {
      kicker: 'Projeto para a UNESP · 2026',
      tagline: 'Gestão de laboratórios, sistemas e acessos.',
      need: 'Reunir num só painel a gestão de usuários, laboratórios e sistemas, e controlar o que cada perfil pode acessar, com consulta a sessões ativas e históricos de login e download.',
      features: [
        'Perfis de acesso com permissões definidas por tela.',
        'Cadastro de usuários, laboratórios e sistemas, e as associações entre eles.',
        'Consulta de sessões ativas e históricos de login e download.',
        'Buscas, filtros por status e tabelas paginadas.',
        'Feed de comunicados com comentários encadeados e filtros por laboratório e tipo. Nesta versão, o feed usa dados de demonstração no próprio frontend.',
      ],
      role: 'Desenvolvi as interfaces em React e a integração delas com a API em ASP.NET Core.',
      decisions: [
        {
          title: 'Uma camada HTTP para todas as telas',
          body: 'Um único cliente anexa o token JWT, encerra a sessão e volta ao login quando a API responde 401, transforma o 403 numa mensagem clara e aproveita o detalhe de erro enviado pela API. As páginas usam serviços por domínio em vez de chamar endpoints soltos.',
        },
        {
          title: 'Páginas carregadas sob demanda',
          body: 'Cada rota é carregada com React.lazy, e a área de login e a área autenticada têm layouts separados.',
        },
      ],
      annotationsTitle: 'Na tela de perfis de acesso',
      annotations: [
        'Navegação lateral entre as áreas do sistema.',
        'Busca pelo nome do perfil.',
        'Filtro por status.',
        'Editar e excluir em cada linha.',
        'Status escrito por extenso, além da cor.',
        'Paginação com escolha de linhas por página.',
      ],
      dataNote: 'Todas as capturas usam dados fictícios.',
    },
    deepwokendle: {
      kicker: 'Projeto próprio · desde 2024',
      tagline: 'Um jogo diário de adivinhação para a comunidade de Deepwoken.',
      need: 'Inspirado no Pokedle, o jogo sorteia um monstro de Deepwoken, um jogo do Roblox, a cada dia. A cada palpite, cada atributo mostra se está certo, parcialmente certo ou errado, até a pessoa chegar à resposta.',
      features: [
        'Desafio diário igual para todos e modo infinito com sequência de acertos.',
        'Contas de usuário, placares diário, mensal e geral, e histórico de sequências.',
        'Chat global em tempo real para quem está logado.',
        'Sugestões de novos monstros pela comunidade, com votos e aprovação de administradores.',
        'Índice de monstros e compartilhamento do resultado.',
      ],
      role: 'Projeto individual, do banco de dados ao deploy. O frontend começou em jQuery e, em 2026, foi reescrito em React e TypeScript sobre a mesma API.',
      decisions: [
        {
          title: 'A resposta nunca vai para o navegador',
          body: 'O palpite é comparado na API, que devolve apenas o resultado de cada atributo. Inspecionar o tráfego da página não revela o monstro do dia.',
        },
        {
          title: 'O mesmo desafio para todo mundo',
          body: 'O monstro do dia é sorteado na primeira requisição do dia (com base no horário UTC) e registrado no Banco de dados (se você é o primeiro a entrar, você é quem randomiza o primeiro monstro, depois, todos aproveitam o seu sorteio). E claro, monstros sugeridos que não foram aprovados nunca entram no sorteio, apenas eu (um admin) pode aprovar.',
        },
        {
          title: 'Chat com limite no servidor',
          body: 'Além do intervalo aplicado na interface, a API aceita no máximo 3 mensagens a cada 3 segundos por usuário, numa janela deslizante em memória.',
        },
      ],
      tour: {
        play: 'Reproduzir gravação (30 s)',
        pause: 'Pausar gravação',
        posterAlt:
          'Tabuleiro do Deepwokendle com uma tentativa: cada atributo aparece num quadro, em vermelho quando está errado e em verde quando está certo.',
        animationAlt:
          'Gravação de tela do Deepwokendle: um palpite no tabuleiro, o histórico de streaks, o placar e a página de sugestões da comunidade.',
        caption: 'Gravação do jogo publicado.',
      },
      demo: {
        title: 'Adivinhe a tecnologia',
        disclaimer:
          'Curioso pra saber como o Deepwokendle funcionava? Teste aqui!',
        inputLabel: 'Seu palpite',
        placeholder: 'Digite uma tecnologia',
        submit: 'Chutar',
        newRound: 'Nova rodada',
        reveal: 'Mostrar resposta',
        attempts: 'Tentativas: {count}',
        empty: 'Sem palpites seus ainda. Comece por uma tecnologia que você mesmo usaria!',
        columns: {
          name: 'Tecnologia',
          area: 'Área',
          kind: 'Tipo',
          usedIn: 'Onde usei',
          released: 'Lançamento',
        },
        result: {
          correct: 'certo',
          partial: 'parcialmente certo',
          wrong: 'errado',
          higher: 'a resposta é mais recente',
          lower: 'a resposta é mais antiga',
        },
        won: 'Acertou em {count} tentativas: era {name}.',
        wonFirst: 'Acertou de primeira: era {name}.',
        revealed: 'A resposta era {name}.',
        noUsage: 'Experiência geral',
        emotes: {
          neutral: 'Personagem esperando o palpite.',
          excited: 'Personagem comemorando o acerto.',
          confused: 'Personagem confuso: alguns atributos batem.',
          angry: 'Personagem contrariado: nenhum atributo bate.',
        },
      },
    },
    shots: {
      'concord-room': {
        alt: 'Sala do Concord: nome da sala, seletor de qualidade em 1080p a 60 fps, área central com a mensagem "Nenhuma tela sendo compartilhada" e, abaixo, a lista de participantes.',
        caption: 'Uma sala aberta, antes de alguém começar a transmitir.',
      },
      'concord-landing': {
        alt: 'Página inicial do Concord com o título "Sua tela, ao vivo, só para quem você deixar entrar." e os botões Entrar com Discord e Baixar para Windows.',
        caption: 'Página inicial pública. A janela à direita é uma ilustração da própria página.',
      },
      'sinlabs-profiles': {
        alt: 'Tela Perfis de Acesso do Sinlabs: busca, filtro de status, botão Novo perfil e tabela com perfis como Administrador, Coordenador e Técnico, cada um com quantidade de permissões, data de criação e status Ativo ou Inativo.',
        caption: 'Perfis de acesso com busca, filtro e paginação.',
      },
      'sinlabs-feed': {
        alt: 'Feed de notícias do Sinlabs com uma publicação sobre o módulo de downloads e, ao lado, filtros por laboratório e por tipo.',
        caption: 'Feed de comunicados com filtros.',
      },
      'sinlabs-feed-thread': {
        alt: 'Publicação do feed do Sinlabs aberta, com campo de comentário e respostas encadeadas entre três pessoas.',
        caption: 'Comentários com respostas encadeadas.',
      },
      'sinlabs-login': {
        alt: 'Tela de login do Sinlabs com a marca IntegraLab, campos de e-mail e senha, opção Lembrar-me e o contato de suporte da UNESP.',
        caption: 'Tela de login publicada.',
      },
    },
  },
  experience: {
    kicker: 'Experiência',
    title: 'De estagiário a pleno!',
    ladderLabel: 'Progressão de cargo',
    lanes: {
      main: 'Trajetória principal',
      parallel: 'Em paralelo',
    },
    roles: {
      intern: 'Estagiário em Desenvolvimento de Sistemas',
      junior: 'Desenvolvedor de Sistemas Júnior I',
      mid: 'Desenvolvedor Pleno',
      teacher: 'Professor de Frontend',
    },
    ladder: {
      intern: 'Estágio',
      junior: 'Júnior',
      mid: 'Pleno',
    },
    stackLabel: 'Stack',
    highlightsLabel: 'Destaques',
    entries: {
      nexus: {
        summary:
          'Desenvolvimento full stack de um sistema de gestão jurídica. O código fica num monorepositório, com a API organizada como monólito modular em camadas de Clean Architecture.',
        highlights: [
          'Fluxo de liberação de acesso: o administrador define o perfil ao liberar, e a API confere se existe uma solicitação pendente antes de conceder o acesso.',
          'Telas de processos e contratos com filtros, validações, incluindo CPF e CNPJ, exportação CSV e componentes reutilizáveis em Ant Design.',
          'Administração de usuários e tela de auditoria, com encerramento automático da sessão quando o token expira.',
          'Correção no tratamento de datas que fazia vencimentos de contratos aparecerem um dia antes.',
          'Alterações de persistência com Entity Framework Core, cobertas por testes unitários com xUnit.',
        ],
      },
      upper: {
        summary: 'Atuação durante o período na UPPER, como estagiário e depois como desenvolvedor júnior.',
        highlights: [
          'Funcionalidades de ponta a ponta em C#/.NET, JavaScript e SQL Server, como integrações de pagamento com triggers e procedures, login e cadastro por código de uso único (OTP) e fluxos de workflow da API à interface.',
          'Correção de falhas nos sistemas da empresa, conforme as demandas da equipe.',
          'Mentoria de novos estagiários no onboarding, com orientação sobre a stack, a arquitetura e o fluxo de desenvolvimento.',
          'Instrutor nas trilhas de backend e frontend do FDevs, orientando alunos em projetos práticos.',
        ],
      },
      cosmos: {
        summary: 'Aqui eu dou aulas de frontend no projeto da Cosmos, em paralelo ao trabalho na Nexus.',
        highlights: [],
      },
    },
  },
  skills: {
    kicker: 'Tecnologias',
    title: 'O que uso, e onde usei.',
    intro:
      'Organizado por área. Cada tecnologia mostra onde aparece na minha experiência ou nos projetos. As destacadas como principais são a base do meu trabalho atual.',
    filterLabel: 'Destacar tecnologias por contexto',
    all: 'Tudo',
    core: 'Principal',
    general: 'Experiência geral',
    usedInLabel: 'Usado em',
    matchLabel: 'Usado em {context}',
    areas: {
      backend: 'Backend',
      frontend: 'Frontend',
      data: 'Dados e infraestrutura',
      realtime: 'Tempo real e desktop',
      architecture: 'Arquitetura e qualidade',
      ai: 'Complementar',
    },
    names: {
      rest: 'APIs REST',
      oop: 'POO e SOLID',
      htmlcss: 'HTML5 e CSS3',
      git: 'Git e GitHub',
      modular: 'Monólito modular',
      microservices: 'Microsserviços',
      xunit: 'Testes unitários com xUnit',
      ai: 'Integração com APIs de IA',
    } as Record<string, string>,
    notes: {
      ai: 'Com guardrails, validação de entradas e saídas e cuidado com dados sensíveis.',
    } as Record<string, string>,
    kinds: {
      language: 'Linguagem',
      platform: 'Plataforma',
      framework: 'Framework',
      library: 'Biblioteca',
      database: 'Banco de dados',
      tool: 'Ferramenta',
      standard: 'Padrão web',
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
    kicker: 'Formação',
    title: 'Graduação, ensino técnico e capacitação.',
    groups: {
      academic: 'Formação acadêmica',
      complementary: 'Capacitação complementar',
    },
    kinds: {
      degree: 'Graduação',
      technical: 'Ensino técnico',
      course: 'Curso',
      training: 'Capacitação',
    },
    expected: 'previsão',
    items: {
      unisagrado: { title: 'Bacharelado em Ciência da Computação', note: 'Em andamento, com conclusão prevista para 2029.' },
      etec: { title: 'Técnico em Desenvolvimento de Sistemas', note: '' },
      fdevs: { title: 'FDevs, trilha Backend', note: 'Curso da UPPER Consultoria, feito como aluno.' },
      barracred: { title: 'Capacitação profissional em tecnologia', note: '' },
    },
    languagesTitle: 'Idiomas',
    languages: {
      pt: { name: 'Português', level: 'Nativo' },
      en: { name: 'Inglês', level: 'Fluente, C1 com certificado' },
      es: { name: 'Espanhol', level: 'Intermediário' },
    },
  },
  beyond: {
    kicker: 'Além do código',
    title: 'Programação e jogos.',
    paragraphs: [
      'Fora do trabalho, meus principais interesses são programação e jogos, e os próprios projetos mostram um pouco disso.',
      'O Deepwokendle é o exemplo mais direto na prática! Foi um jogo feito para uma comunidade de jogadores, com placar, chat e monstros sugeridos pelas próprias pessoas que jogam. Foi meu primeiro projeto hospedado e com usuários reais, ele vive no meu coração.',
    ],
    bustAlt: 'Matheus em pixel art, de óculos e camisa preta, sorrindo de lado.',
    emotesLabel: 'Reações do personagem',
    emotes: {
      neutral: 'Neutro',
      excited: 'Animado',
      confused: 'Confuso',
      angry: 'Bravo',
    },
    emoteSelected: 'Reação escolhida: {name}.',
  },
  contact: {
    kicker: 'Contato',
    title: 'Quer conversar, tem uma vaga, ou um projeto em mente?',
    body: 'O caminho mais direto é o e-mail! Também estou pelo LinkedIn e no GitHub.',
    emailLabel: 'E-mail',
    copy: 'Copiar e-mail',
    send: 'Escrever um e-mail',
    copied: 'E-mail copiado.',
    copyFailed: 'Não foi possível copiar. O endereço é {email}.',
    phone: 'Telefone',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    cv: 'Currículo',
    linksLabel: 'Outras formas de contato',
  },
  footer: {
    rights: '© {year} Matheus Rodrigues',
    source: 'Código deste site no GitHub',
    backToTop: 'Voltar ao topo',
  },
  buddy: {
    label: 'Mini Matheus. Clique para saber o que ele faz; arraste para mudar de lugar.',
    intro:
      'Opa! Se você encontrar no site alguma coisa sobre mim que te deixe curioso e ela estiver destacada, é só clicar nela que eu respondo o que sei!',
    close: 'Fechar balão',
    comeBack: 'Chamar o Matheus de volta',
    askSuffix: '(perguntar ao Matheus)',
    terms: {
      csharp:
        'C# é a linguagem que mais uso no backend: está na API da Nexus, nos sistemas em que trabalhei na UPPER, no Concord e no Deepwokendle.',
      aspnetcore:
        'Montei as APIs do Concord e do Deepwokendle com ASP.NET Core. Na Nexus, a API é um monólito modular organizado em camadas de Clean Architecture.',
      react:
        'React está em quase tudo que faço no frontend: nas telas da Nexus, no Concord, nas interfaces do Sinlabs e no Deepwokendle, que reescrevi saindo do jQuery.',
      nextjs: 'Uso Next.js no sistema de gestão jurídica da Nexus, junto com TypeScript e Ant Design.',
      typescript:
        'TypeScript está na Nexus, no Concord e na versão atual do Deepwokendle, que reescrevi a partir de JavaScript com jQuery.',
      postgresql:
        'PostgreSQL guarda os dados da Nexus, do Concord e do Deepwokendle. No Deepwokendle, é nele que fica registrado o monstro do dia, igual para todo mundo.',
      sqlserver:
        'Na UPPER, trabalhei com SQL Server escrevendo triggers e procedures para integrações de pagamento e relatórios.',
      redis:
        'Já usei Redis em projetos profissionais. No Concord, a presença nas salas ainda fica em memória, mas atrás de uma interface pensada para trocar por Redis.',
      signalr:
        'Uso SignalR no que precisa chegar em tempo real: presença e eventos de sala no Concord e o chat global do Deepwokendle.',
      webrtc:
        'É o WebRTC que leva as telas no Concord, direto entre as pessoas ou pelo SFU. A API cuida só da sinalização e das permissões.',
      electron: 'O app desktop do Concord é feito em Electron. É nele que fica a captura de áudio só do aplicativo compartilhado.',
      antd: 'Na Nexus, padronizei formulários, filtros, dropdowns e grids com Ant Design. Este site também usa alguns componentes dele.',
      docker: 'O Concord roda em contêineres Docker, junto com o Nginx e um relay TURN.',
      xunit: 'Na Nexus, as alterações de persistência e de regras de negócio vêm com testes unitários em xUnit.',
      clean: 'A API da Nexus é organizada em camadas de Clean Architecture, dentro de um monólito modular num monorepositório.',
      ai: 'Quando integro APIs de IA, trato com guardrails: valido entradas e saídas e tomo cuidado com dados sensíveis.',
    } as Record<string, string>,
  },
  viewer: {
    label: 'Visualizador de imagens',
    close: 'Fechar visualizador',
    previous: 'Imagem anterior',
    next: 'Próxima imagem',
    zoomIn: 'Aproximar',
    zoomOut: 'Afastar',
    reset: 'Tamanho original',
    counter: 'Imagem {current} de {total}',
  },
};
