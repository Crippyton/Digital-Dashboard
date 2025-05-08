// Relógio
function updateClock() {
    const now = new Date();
    const time = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const monthEl = document.getElementById('current-month');
    const yearEl = document.getElementById('current-year');
    const calendarDays = document.getElementById('calendar-days');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    time.textContent = `${hours}:${minutes}:${seconds}`;

    const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const day = now.getDate();

    dateEl.textContent = `${dayName}, ${day} de ${monthName}`;
    monthEl.textContent = monthName;
    yearEl.textContent = now.getFullYear();
}
updateClock();
setInterval(updateClock, 1000);

// Calendário
class DigitalCalendar {
    constructor() {
        this.currentDate = new Date();
        this.calendarDays = document.getElementById('calendar-days');
        this.monthEl = document.getElementById('current-month');
        this.yearEl = document.getElementById('current-year');
        this.months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 
            'Maio', 'Junho', 'Julho', 'Agosto', 
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        this.setupEventListeners();
        this.renderCalendar();
    }
    setupEventListeners() {
        document.getElementById('prev-month').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('next-month').addEventListener('click', () => this.changeMonth(1));
        document.getElementById('prev-year').addEventListener('click', () => this.changeYear(-1));
        document.getElementById('next-year').addEventListener('click', () => this.changeYear(1));
    }
    renderCalendar() {
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        this.monthEl.textContent = this.months[this.currentDate.getMonth()];
        this.yearEl.textContent = this.currentDate.getFullYear();
        this.calendarDays.innerHTML = '';
        for (let i = 0; i < firstDay.getDay(); i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day', 'other-month');
            this.calendarDays.appendChild(dayEl);
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = i;
            const today = new Date();
            if (
                i === today.getDate() &&
                this.currentDate.getMonth() === today.getMonth() &&
                this.currentDate.getFullYear() === today.getFullYear()
            ) {
                dayEl.classList.add('current-day');
            }
            this.calendarDays.appendChild(dayEl);
        }
    }
    changeMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendar();
    }
    changeYear(direction) {
        this.currentDate.setFullYear(this.currentDate.getFullYear() + direction);
        this.renderCalendar();
    }
}
window.addEventListener('DOMContentLoaded', () => {
    // Alternância de tema claro/escuro
    const toggleThemeBtn = document.getElementById('toggle-theme');
    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // DigitalCalendar já está aqui
    new DigitalCalendar();

    // Modal de Playlist
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const savePlaylistBtn = document.getElementById('save-playlist');
    const playlistModal = document.getElementById('playlist-modal');
    const playlistEmbedInput = document.getElementById('playlist-embed');
    const playlistEmbedWrapper = document.getElementById('playlist-embed-wrapper');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            playlistModal.style.display = 'flex';
            playlistEmbedInput.value = '';
            playlistEmbedInput.focus();
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            playlistModal.style.display = 'none';
        });
    }
    if (savePlaylistBtn) {
        savePlaylistBtn.addEventListener('click', () => {
            const embed = playlistEmbedInput.value.trim();
            if (!embed) {
                alert('Cole o embed da playlist!');
                return;
            }
            // Extrai apenas o iframe do embed
            const iframeMatch = embed.match(/<iframe.*?src=["'](.*?)["'].*?><\/iframe>/);
            if (!iframeMatch) {
                alert('Embed inválido! Cole o código completo do iframe do YouTube.');
                return;
            }
            playlistEmbedWrapper.innerHTML = `<div class='video-responsive'><iframe src='${iframeMatch[1]}' allow='autoplay; encrypted-media' allowfullscreen frameborder='0'></iframe></div>`;
            playlistModal.style.display = 'none';
            if (openModalBtn) openModalBtn.classList.add('hide');
            const musicTitleSpan = document.getElementById('music-title');
            if (musicTitleSpan) musicTitleSpan.style.display = 'none';
        });
    }
    if (playlistModal) {
        playlistModal.addEventListener('click', (e) => {
            if (e.target === playlistModal) playlistModal.style.display = 'none';
        });
    }

    // Tooltips animados (acessibilidade extra)
    document.querySelectorAll('[data-tooltip]').forEach(btn => {
        btn.addEventListener('focus', function() {
            this.classList.add('show-tooltip');
        });
        btn.addEventListener('blur', function() {
            this.classList.remove('show-tooltip');
        });
    });
});

//Clima 
const apiKey = '1a632f06ca84d6aeb403c9b98b25f63e'; // Substitua pela sua chave da API
        const weatherInfo = document.getElementById('weather-info');
        const loading = document.getElementById('loading');
        const errorMessage = document.getElementById('error-message');

        async function searchWeather() {
            const searchInput = document.getElementById('search-input');
            const city = searchInput.value.trim();
            
            if (!city) {
                showError('Por favor, digite uma cidade');
                return;
            }

            showLoading();
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`);
                const data = await response.json();

                if (data.cod === '404') {
                    showError('Cidade não encontrada');
                    return;
                }

                updateWeatherInfo(data);
            } catch (error) {
                showError('Erro ao buscar dados do clima');
            }
        }

        function updateWeatherInfo(data) {
            // Adiciona classe para animação de atualização
            weatherInfo.classList.add('weather-update');
            
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
            document.getElementById('condition').textContent = data.weather[0].description;
            
            // Atualizar ícone do clima (usando placeholder)
            document.getElementById('weather-icon').src = `/api/placeholder/140/140`;

            // Remove a classe de animação após a atualização
            setTimeout(() => {
                weatherInfo.classList.remove('weather-update');
            }, 500);

            hideLoading();
            weatherInfo.classList.add('active');
        }

        function showLoading() {
            const loading = document.getElementById('loading');
            loading.innerHTML = `<div class='spinner'></div>`;
            loading.style.display = 'block';
            const weatherInfo = document.getElementById('weather-info');
            if (weatherInfo) weatherInfo.classList.remove('active');
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) errorMessage.style.display = 'none';
        }

        function hideLoading() {
            loading.style.display = 'none';
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            hideLoading();
            weatherInfo.classList.remove('active');
        }

        // Pesquisa ao pressionar Enter
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });

        // Efeito de hover nos cards de detalhes
        document.querySelectorAll('.detail-item').forEach(item => {
            item.addEventListener('mouseover', () => {
                item.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseout', () => {
                item.style.transform = 'translateY(0)';
            });
        });

        // Função para buscar clima por coordenadas
        async function searchWeatherByCoords(lat, lon) {
            showLoading();
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`);
                const data = await response.json();
                if (data.cod === '404') {
                    showError('Localização não encontrada');
                    return;
                }
                updateWeatherInfo(data);
            } catch (error) {
                showError('Erro ao buscar dados do clima');
            }
        }

        // Ao carregar a página, tenta buscar o clima pela localização do usuário
        window.addEventListener('DOMContentLoaded', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        searchWeatherByCoords(lat, lon);
                    },
                    (error) => {
                        // Se o usuário negar, não faz nada, mantém busca manual
                    }
                );
            }
        });

// PLAYER DE MÚSICA
const playlist = [
    {
        title: 'Chillhop - Jazzhop',
        src: 'https://cdn.pixabay.com/audio/2022/10/16/audio_12b6b9b6b2.mp3'
    },
    {
        title: 'Lo-Fi Vibes',
        src: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7b2.mp3'
    },
    {
        title: 'Night City Drive',
        src: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7b2.mp3'
    }
];
let currentTrack = 0;
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const musicTitle = document.getElementById('music-title');

function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.src;
    musicTitle.textContent = track.title;
    progressBar.value = 0;
}
function playTrack() {
    audioPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}
function pauseTrack() {
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function togglePlay() {
    if (audioPlayer.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
}
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    playTrack();
}
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    playTrack();
}
audioPlayer.addEventListener('ended', nextTrack);
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});
progressBar.addEventListener('input', () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    }
});
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
// Autoplay ao iniciar
window.addEventListener('DOMContentLoaded', () => {
    loadTrack(currentTrack);
    playTrack();
});

// Lógica para playlist do YouTube
const youtubeLinkInput = document.getElementById('youtube-link');
const loadYoutubeBtn = document.getElementById('load-youtube');
const youtubeEmbedWrapper = document.getElementById('youtube-embed-wrapper');
const musicPlayerDiv = document.getElementById('music-player');
const audioPlayerDivs = [playBtn, prevBtn, nextBtn, progressBar, musicTitle, audioPlayer];

function getYoutubeEmbed(url) {
    // Aceita links de vídeo e playlist
    let videoId = null;
    let playlistId = null;
    // Playlist
    const playlistMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (playlistMatch) playlistId = playlistMatch[1];
    // Vídeo
    const videoMatch = url.match(/(?:v=|youtu.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoMatch) videoId = videoMatch[1];
    if (playlistId && videoId) {
        // Vídeo dentro de playlist
        return `<iframe width='100%' height='180' src='https://www.youtube.com/embed/${videoId}?list=${playlistId}&autoplay=1' allow='autoplay; encrypted-media' allowfullscreen></iframe>`;
    } else if (playlistId) {
        // Só playlist
        return `<iframe width='100%' height='180' src='https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1' allow='autoplay; encrypted-media' allowfullscreen></iframe>`;
    } else if (videoId) {
        // Só vídeo
        return `<iframe width='100%' height='180' src='https://www.youtube.com/embed/${videoId}?autoplay=1' allow='autoplay; encrypted-media' allowfullscreen></iframe>`;
    }
    return null;
}

loadYoutubeBtn.addEventListener('click', () => {
    const url = youtubeLinkInput.value.trim();
    const embed = getYoutubeEmbed(url);
    if (embed) {
        youtubeEmbedWrapper.innerHTML = embed;
        youtubeEmbedWrapper.style.display = 'block';
        // Oculta controles do player local
        audioPlayer.style.display = 'none';
        playBtn.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        progressBar.style.display = 'none';
        musicTitle.style.display = 'none';
    } else {
        alert('Link de vídeo ou playlist do YouTube inválido!');
    }
});

youtubeLinkInput.addEventListener('input', () => {
    if (!youtubeLinkInput.value.trim()) {
        youtubeEmbedWrapper.innerHTML = '';
        youtubeEmbedWrapper.style.display = 'none';
        // Mostra controles do player local
        audioPlayer.style.display = '';
        playBtn.style.display = '';
        prevBtn.style.display = '';
        nextBtn.style.display = '';
        progressBar.style.display = '';
        musicTitle.style.display = '';
    }
});

// Spinner CSS
const style = document.createElement('style');
style.innerHTML = `
.spinner {
  border: 4px solid #00ffff33;
  border-top: 4px solid #00ffff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style);