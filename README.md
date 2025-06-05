# Sistema de Irrigação Automatizado

Sistema de monitoramento e controle de irrigação usando ESP32 e Angular.

## Funcionalidades

- 🌱 Monitoramento em tempo real da umidade do solo
- 💧 Controle automático e manual da bomba de irrigação
- 📱 Interface responsiva acessível via web e mobile
- 📊 Dashboard intuitivo com indicadores visuais
- ⚙️ Configurações personalizáveis
- 🔄 Atualização automática dos dados
- 📱 Acesso via QR Code

## Requisitos

- Node.js 18.x ou superior
- Angular CLI 17.x
- ESP32 com firmware atualizado

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sistema-irrigacao.git
cd sistema-irrigacao
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse a aplicação em `http://localhost:4200`

## Configuração do ESP32

1. Carregue o firmware no ESP32 usando a Arduino IDE
2. Configure o WiFi do ESP32 para se conectar à sua rede
3. Anote o IP atribuído ao ESP32
4. Atualize o IP nas configurações da aplicação web

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── config/        # Configurações do sistema
│   │   └── home/          # Página inicial
│   ├── services/
│   │   └── irrigacao.service.ts  # Serviço de comunicação com ESP32
│   └── app.component.ts   # Componente raiz
└── assets/               # Recursos estáticos
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.


