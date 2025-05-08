![Painel](/src/img/DigitalDashboard.png)

# Relógio e Calendário Digital

Um aplicativo web moderno que combina um relógio digital, calendário, player de música e previsão do tempo em uma interface elegante e responsiva.

## 🚀 Funcionalidades

- **Relógio Digital**: Exibe hora e data atual em tempo real
- **Calendário Interativo**: Navegação entre meses e anos
- **Player de Música**: Suporte para playlists do YouTube
- **Previsão do Tempo**: Consulta de clima por cidade
- **Tema Claro/Escuro**: Alternância entre modos de visualização
- **Design Responsivo**: Adaptável a diferentes tamanhos de tela

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome (ícones)
- API OpenWeatherMap (previsão do tempo)
- YouTube Embed API

## 📋 Pré-requisitos

- Navegador web moderno
- Conexão com internet
- Chave de API do OpenWeatherMap (para funcionalidade de clima)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Crippyton/Digital-Dashboard.git
```

2. Navegue até o diretório do projeto:
```bash
cd Digital-Dashboard
```

3. Abra o arquivo `index.html` em seu navegador ou configure um servidor local.

## ⚙️ Configuração

1. Obtenha uma chave de API do OpenWeatherMap:
   - Acesse [OpenWeatherMap](https://openweathermap.org/api)
   - Crie uma conta gratuita
   - Gere uma chave de API

2. Substitua a chave de API no arquivo `src/js/scripts.js`:
```javascript
const apiKey = 'SUA_CHAVE_API_AQUI';
```

## 💻 Como Usar

### Relógio Digital
- O relógio atualiza automaticamente a cada segundo
- Exibe a hora atual e a data completa

### Calendário
- Use os botões de navegação para mudar entre meses e anos
- O dia atual é destacado automaticamente
- Visualize dias de outros meses com opacidade reduzida

### Player de Música
1. Clique em "Adicionar Playlist"
2. Cole o link ou código de incorporação do YouTube
3. Clique em "Salvar" para carregar a playlist

### Previsão do Tempo
1. Digite o nome da cidade no campo de busca
2. Pressione Enter ou clique no ícone de busca
3. Visualize temperatura, umidade, vento e condições climáticas

### Tema Claro/Escuro
- Clique no botão de tema no canto superior direito para alternar entre os modos

## 📱 Responsividade

O aplicativo é totalmente responsivo e se adapta a:
- Desktops
- Tablets
- Smartphones

## 🎨 Personalização

Você pode personalizar o aplicativo modificando as variáveis CSS em `src/css/styles.css`:
```css
:root {
    --primary-color: #00ffff;
    --background-color: #121212;
    --secondary-color: #1e1e1e;
    --max-width: 500px;
    --border-radius: 25px;
    --shadow: 0 10px 30px rgba(0,0,0,0.2);
}
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

- **Washington Rocha**
  - GitHub: [@Crippyton](https://github.com/Crippyton)

## 🙏 Agradecimentos

- OpenWeatherMap pela API de previsão do tempo
- Font Awesome pelos ícones
- YouTube pela API de incorporação de vídeos 
