const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const allBt = document.querySelectorAll('button.app__card-button')
const playBt = document.getElementById('start-pause')
const playBtImg = document.querySelector('img.app__card-primary-butto-icon')
const playBtText = document.getElementById('start-pause-text')
const bannerImg = document.querySelector('img.app__image')
const title = document.querySelector('h1.app__title')
const timer = document.getElementById('timer')
const musicImputBtn = document.getElementById('alternar-musica')
const musica = new Audio(`sons/luna-rise-part-one.mp3`)
const pauseSong = new Audio(`sons/pause.mp3`)
const playSong = new Audio(`sons/play.wav`)
const beepSong = new Audio(`sons/beep.mp3`)
let interval;
let temporizador = null
let tempo
musica.loop = true
alterContext('foco', focoBt, '25:00')

musicImputBtn.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterContext('foco', focoBt, '25:00')
})

curtoBt.addEventListener('click', () => {
    alterContext('descanso-curto', curtoBt, '5:00')
})

longoBt.addEventListener('click', () => {
    alterContext('descanso-longo', longoBt, '15:00')
})

playBt.addEventListener('click', () => {
    startOrPause();
})

function alterContext(contexto, button, timerText) {

    allBt.forEach(btn => {
        btn.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    bannerImg.setAttribute('src', `imagens/${contexto}.png`)
    button.classList.add('active')
    timer.innerText = timerText
    switch (contexto){
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            tempo = 1500;
            temporizador = null;
            break;
        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            tempo = 300;
            temporizador = null;
            break;
        case "descanso-longo":
            title.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            tempo = 900;
            temporizador = null;
            break;
        default:
            break;
    }
    clearInterval(interval);
    interval = null
    playBtText.innerText = 'Começar'
    playBtImg.setAttribute('src', `imagens/play_arrow.png`)
}

function updateDisplay() {

    const tempoNaTela = new Date(temporizador * 1000)
    const tempoFormatado = tempoNaTela.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'} ) 

    timer.textContent = tempoFormatado
}

function startOrPause(){

    if(interval){
        clearInterval(interval);
        interval = null
        pauseSong.play()
        playBtText.innerText = 'Começar'
        playBtImg.setAttribute('src', `imagens/play_arrow.png`)
        return
    }
    
    playSong.play()
    playBtText.innerText = 'Pausar'
    playBtImg.setAttribute('src', `imagens/pause.png`)
    interval = setInterval(function(){
        if (temporizador === null){
            temporizador = tempo
        }
        if (temporizador > 0) {
            temporizador--;
            updateDisplay();
        } else {
            beepSong.play()
            clearInterval(interval);
        }
    }, 1000);
}