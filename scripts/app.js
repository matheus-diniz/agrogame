// Configuração do canvas e contexto 2D
const canvas = document.getElementById('appCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

// Estado da aplicação
let currentScreen = 'login';  // telas: login, home, activityDetail, rewards
let selectedActivity = null;

// Pontos atuais do pecuarista
let currentPoints = 1250;

let cadastroData = {
  tipoPessoa: "",
  cpfCnpj: "",
  nome: "",
  dataNascimento: "",
  email: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: ""
};


// Lista de recompensas disponíveis
const rewards = [
  { id: 1, title: "Desconto de R$50 na compra", cost: 1000 },
  { id: 2, title: "Kit de manejo de pasto", cost: 1800 },
  { id: 3, title: "Consultoria gratuita 1h", cost: 2500 },
  { id: 4, title: "Camiseta AgroGame", cost: 500 }
];

// Lista de atividades para o protótipo
const activities = [
  {
    id: 1,
    title: "Vacinar gado contra febre aftosa",
    description: "Envie foto comprovando a vacinação.",
    points: 200
  },
  {
    id: 2,
    title: "Enviar relatório de peso dos lotes",
    description: "Atualize os dados do peso dos lotes.",
    points: 150
  },
  {
    id: 3,
    title: "Foto do pasto e estrutura",
    description: "Envie foto do pasto e instalações da fazenda.",
    points: 100
  }
];

// Função para desenhar retângulo arredondado
function drawRoundedRect(x, y, w, h, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

// Função para desenhar texto no canvas
function drawText(text, x, y, fontSize = 16, color = '#000', fontFamily = 'Open Sans', align = 'start', fontWeight = 'normal') {
  ctx.fillStyle = color;
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

// Tela de Login
function drawLogin() {
  ctx.clearRect(0, 0, width, height);

  // Fundo
  drawRoundedRect(0, 0, width, height, 0, '#fff');

  drawText('AgroGame', width / 2, 80, 32, '#4CAF50', 'Poppins', 'center', 'bold');

  // Campo CPF/CNPJ
  drawRoundedRect(37, 200, 300, 48, 8, '#F5F5F5');
  drawText('CPF ou CNPJ', 50, 230, 16, '#999', 'Open Sans', 'start');

  // Campo Senha
  drawRoundedRect(37, 270, 300, 48, 8, '#F5F5F5');
  drawText('Senha', 50, 300, 16, '#999', 'Open Sans', 'start');

  // Botão Entrar
  drawRoundedRect(37, 340, 300, 48, 8, '#4CAF50');
  drawText('Entrar', width / 2, 370, 20, '#fff', 'Poppins', 'center', 'bold');

  // Botão Cadastrar
  drawRoundedRect(37, 400, 300, 48, 8, '#FFC107');
  drawText('Cadastrar', width / 2, 430, 20, '#fff', 'Poppins', 'center', 'bold');
}


// Tela Home com lista de atividades
function drawHome() {
  ctx.clearRect(0, 0, width, height);

  // Fundo branco
  drawRoundedRect(0, 0, width, height, 0, '#fff');

  // Barra topo verde
  drawRoundedRect(0, 0, width, 80, 0, '#4CAF50');
  drawText(`Pontos: 1250`, 20, 45, 18, '#fff', 'Poppins', 'start', 'bold');

  // Botão Sair (topo direito)
  drawRoundedRect(width - 90, 20, 70, 36, 8, '#E53935');
  drawText('Sair', width - 55, 45, 16, '#fff', 'Poppins', 'center', 'bold');

  // Lista atividades
  activities.forEach((act, index) => {
    let y = 120 + index * 80;
    drawRoundedRect(20, y, width - 40, 60, 8, '#EBF0F7');
    drawText(`${act.title} (+${act.points} pts)`, 30, y + 35, 16, '#000');
  });

  // Botão Recompensas
  drawRoundedRect(20, 700, width - 40, 48, 8, '#F8C22E');
  drawText('Recompensas', 20 + (width - 40) / 2, 730, 18, '#000', 'Poppins', 'center', 'bold');
}

// Tela de Detalhe da Atividade
function drawActivityDetail() {
  ctx.clearRect(0, 0, width, height);

  let act = selectedActivity;

  // Fundo branco
  drawRoundedRect(0, 0, width, height, 0, '#fff');

  // Título
  drawText(act.title, 20, 180, 24, '#4CAF50', 'Poppins', 'start', 'bold');

  // Descrição
  drawText(act.description, 20, 220, 18, '#000', 'Open Sans');

  // Botão Concluir
  drawRoundedRect(20, 280, width - 40, 48, 8, '#4CAF50');
  drawText('Enviar foto e concluir', width / 2, 315, 18, '#fff', 'Poppins', 'center', 'bold');
}

function drawRewards() {
    ctx.clearRect(0, 0, width, height);

    // Fundo branco
    drawRoundedRect(0, 0, width, height, 0, '#fff');

    // Cabeçalho
    drawText('Recompensas disponíveis', 20, 80, 24, '#4CAF50', 'Poppins', 'start', 'bold');
    drawText(`Seus pontos: ${currentPoints}`, 20, 110, 18, '#666', 'Open Sans');

    // Lista de recompensas
    rewards.forEach((reward, i) => {
        let y = 140 + i * 70;
        let canRedeem = currentPoints >= reward.cost;

        drawRoundedRect(20, y, width - 40, 60, 8, canRedeem ? '#C8E6C9' : '#F5F5F5');
        drawText(reward.title, 30, y + 30, 16, '#000');
        drawText(`${reward.cost} pts`, width - 60, y + 30, 16, canRedeem ? '#388E3C' : '#AAA', 'Poppins', 'end', 'bold');
    });

    // Botão Voltar
    drawRoundedRect(20, 700, width - 40, 48, 8, '#4CAF50');
    drawText('Voltar', width / 2, 730, 20, '#fff', 'Poppins', 'center', 'bold');
}

// Função para detectar cliques dentro de área
function isInside(x, y, rectX, rectY, rectW, rectH) {
  return x >= rectX && x <= rectX + rectW && y >= rectY && y <= rectY + rectH;
}

// Manipulação de cliques
canvas.addEventListener('click', (evt) => {
  const rect = canvas.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  const y = evt.clientY - rect.top;

  if (currentScreen === 'login') {
    // Botão Entrar
    if (isInside(x, y, 37, 340, 300, 48)) {
      currentScreen = 'home';
      drawHome();
      return;
    }
    // Botão Cadastrar
    if (isInside(x, y, 37, 400, 300, 48)) {
      currentScreen = 'register';
      drawRegister();
      return;
    }
  } else if (currentScreen === 'home') {
    // Botão Sair (topo direito)
    if (isInside(x, y, width - 90, 20, 70, 36)) {
      currentScreen = 'login';
      drawLogin();
      return;
    }
    // Clique nas atividades
    for (let i = 0; i < activities.length; i++) {
      let yStart = 120 + i * 80;
      if (isInside(x, y, 20, yStart, width - 40, 60)) {
        selectedActivity = activities[i];
        currentScreen = 'activityDetail';
        drawActivityDetail();
        return;
      }
    }
    // Botão Recompensas
    if (isInside(x, y, 20, 700, width - 40, 48)) {
      currentScreen = 'rewards';
      drawRewards();
      return;
    }
  } else if (currentScreen === 'activityDetail') {
    // Botão Concluir
    if (isInside(x, y, 20, 280, width - 40, 48)) {
      alert(`Atividade "${selectedActivity.title}" concluída!`);
      // Voltar para home
      currentScreen = 'home';
      drawHome();
    }
  } else if (currentScreen === 'rewards') {
    // Botão Voltar clicado
    if (isInside(x, y, 20, 700, width - 40, 48)) {
      currentScreen = 'home';
      drawHome();
    }
  }

  else if (currentScreen === 'login') {
  if (isInside(x, y, 37, 340, 300, 48)) {
    // Entrar
    currentScreen = 'home';
    drawHome();
  }
  if (isInside(x, y, 37, 400, 300, 48)) {
    // Ir para Cadastro
    currentScreen = 'register';
    drawRegister();
  }
}

else if (currentScreen === 'register') {
  if (isInside(x, y, 37, 640, 300, 48)) {
    // Botão Salvar Cadastro
    alert('Cadastro salvo com sucesso!');
    currentScreen = 'login';
    drawLogin();
    return;
  }
  // Botão Voltar
  if (isInside(x, y, 37, 700, 300, 48)) {
    currentScreen = 'login';
    drawLogin();
    return;
  }
}
});

function drawRegister() {
  ctx.clearRect(0, 0, width, height);

  // Fundo branco
  drawRoundedRect(0, 0, width, height, 0, '#fff');

  // Título
  drawText('Cadastro', width / 2, 80, 32, '#4CAF50', 'Poppins', 'center', 'bold');

  // Campos de exemplo
  drawRoundedRect(37, 150, 300, 48, 8, '#F5F5F5');
  drawText('Nome', 50, 180, 16, '#999', 'Open Sans', 'start');
  drawRoundedRect(37, 210, 300, 48, 8, '#F5F5F5');
  drawText('CPF ou CNPJ', 50, 240, 16, '#999', 'Open Sans', 'start');
  drawRoundedRect(37, 270, 300, 48, 8, '#F5F5F5');
  drawText('E-mail', 50, 300, 16, '#999', 'Open Sans', 'start');

  // Botão Salvar Cadastro (verde, acima do Voltar)
  drawRoundedRect(37, 640, 300, 48, 8, '#43A047'); // Green for primary action
  drawText('Salvar Cadastro', width / 2, 670, 20, '#fff', 'Poppins', 'center', 'bold');

  // Botão Voltar (cinza, na base)
  drawRoundedRect(37, 700, 300, 48, 8, '#BDBDBD'); // Gray for secondary action
  drawText('Voltar', width / 2, 730, 20, '#fff', 'Poppins', 'center', 'bold');
}

// Desenha a tela inicial
drawLogin();