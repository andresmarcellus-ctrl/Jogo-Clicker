// =========================
// CONFIGURAÇÕES
// =========================

const TEMPO_TOTAL = 60;

const RESISTENCIA_INICIAL = 20;

const DANO_POR_GOLPE = 1;

const MOEDAS_POR_GOLPE = 1;


// =========================
// VARIÁVEIS DO JOGO
// =========================

let tempo = TEMPO_TOTAL;

let moedas = 0;

let fase = 1;

let resistencia = RESISTENCIA_INICIAL;

let resistenciaMaxima = RESISTENCIA_INICIAL;

let martelando = false;

let jogoComecou = false;

let intervaloMartelo = null;

let intervaloTempo = null;


// =========================
// ELEMENTOS DO HTML
// =========================

const tempoElemento =
    document.getElementById("tempo");

const moedasElemento =
    document.getElementById("moedas");

const faseElemento =
    document.getElementById("fase");

const resistenciaElemento =
    document.getElementById("resistencia");

const vidaElemento =
    document.getElementById("vida");

const pedraElemento =
    document.getElementById("pedra");

const marteloElemento =
    document.getElementById("martelo");

const mensagemElemento =
    document.getElementById("mensagem");


// =========================
// ATUALIZAR TELA
// =========================

function atualizarTela() {

    tempoElemento.textContent = tempo;

    moedasElemento.textContent = moedas;

    faseElemento.textContent = fase;

    resistenciaElemento.textContent =
        Math.max(0, resistencia);


    // Calcula porcentagem da vida

    const porcentagem =
        (resistencia / resistenciaMaxima) * 100;


    vidaElemento.style.width =
        Math.max(0, porcentagem) + "%";


    // Muda a cor da barra

    if (porcentagem > 50) {

        vidaElemento.style.backgroundColor =
            "#22c55e";

    } else if (porcentagem > 25) {

        vidaElemento.style.backgroundColor =
            "#eab308";

    } else {

        vidaElemento.style.backgroundColor =
            "#ef4444";
    }
}


// =========================
// INICIAR JOGO
// =========================

function iniciarJogo() {

    if (jogoComecou) {
        return;
    }

    jogoComecou = true;

    mensagemElemento.textContent =
        "🔨 Clique no martelo para atacar!";


    // Contador de tempo

    intervaloTempo = setInterval(() => {

        tempo--;

        atualizarTela();


        // Quando chegar a zero

        if (tempo <= 0) {

            terminarJogo();
        }

    }, 1000);
}


// =========================
// DAR UM GOLPE
// =========================

function golpear() {

    if (tempo <= 0) {
        return;
    }


    // Diminui a resistência

    resistencia -= DANO_POR_GOLPE;


    // Ganha moedas

    moedas += MOEDAS_POR_GOLPE;


    // Animação da pedra

    pedraElemento.classList.remove(
        "batendo"
    );

    void pedraElemento.offsetWidth;

    pedraElemento.classList.add(
        "batendo"
    );


    setTimeout(() => {

        pedraElemento.classList.remove(
            "batendo"
        );

    }, 80);


    atualizarTela();


    // Verifica se quebrou

    if (resistencia <= 0) {

        quebrarPedra();
    }
}


// =========================
// COMEÇAR A MARTELAR
// =========================

function iniciarMartelada() {

    if (martelando) {
        return;
    }

    if (tempo <= 0) {
        return;
    }


    // Começa o contador

    iniciarJogo();


    martelando = true;


    mensagemElemento.textContent =
        "🔨 Martelando!";


    // Primeiro golpe

    golpear();


    // Golpes repetidos

    intervaloMartelo = setInterval(() => {

        if (tempo <= 0) {

            pararMartelo();

            return;
        }

        golpear();

    }, 150);
}


// =========================
// PARAR MARTELO
// =========================

function pararMartelo() {

    martelando = false;


    if (intervaloMartelo !== null) {

        clearInterval(intervaloMartelo);

        intervaloMartelo = null;
    }
}


// =========================
// QUEBRAR PEDRA
// =========================

function quebrarPedra() {

    pararMartelo();


    pedraElemento.classList.add(
        "quebrada"
    );


    // Bônus da fase

    const bonus =
        10 + (fase * 5);


    moedas += bonus;


    mensagemElemento.textContent =
        "💥 Pedra quebrada! +" +
        bonus +
        " moedas!";


    atualizarTela();


    // Criar próxima pedra

    setTimeout(() => {

        if (tempo <= 0) {
            return;
        }

        proximaFase();

    }, 700);
}


// =========================
// PRÓXIMA FASE
// =========================

function proximaFase() {

    fase++;


    // A cada fase a pedra fica
    // mais resistente

    resistenciaMaxima =
        RESISTENCIA_INICIAL +
        ((fase - 1) * 10);


    resistencia =
        resistenciaMaxima;


    // Mostra a pedra novamente

    pedraElemento.classList.remove(
        "quebrada"
    );


    mensagemElemento.textContent =
        "🪨 Nova pedra! Fase " +
        fase;


    atualizarTela();
}


// =========================
// TERMINAR JOGO
// =========================

function terminarJogo() {

    tempo = 0;


    // Para o martelo

    pararMartelo();


    // Para o contador

    if (intervaloTempo !== null) {

        clearInterval(intervaloTempo);

        intervaloTempo = null;
    }


    // Desativa botão

    marteloElemento.disabled = true;


    mensagemElemento.textContent =
        "⏰ Fim de jogo! Você conseguiu " +
        moedas +
        " moedas!";


    atualizarTela();
}


// =========================
// BOTÃO
// =========================

marteloElemento.addEventListener(
    "click",
    iniciarMartelada
);


// =========================
// INICIAR TELA
// =========================

atualizarTela();

