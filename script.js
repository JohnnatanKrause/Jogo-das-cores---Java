document.addEventListener('DOMContentLoaded', () => {
    const btnRegras = document.getElementById('btnRegras');
    const btnIniciar = document.getElementById('btnIniciar');
    const jogoDiv = document.getElementById('jogo');
    const perguntaDiv = document.getElementById('pergunta');
    const opcoesDiv = document.getElementById('opcoes');
    const feedbackDiv = document.getElementById('feedback');
    const resultadoDiv = document.getElementById('resultado');
    const pontuacaoFinalSpan = document.getElementById('pontuacaoFinal');
    const resumoCoresUl = document.getElementById('resumoCores');
    const regrasModal = document.getElementById('regras');
    const regrasCloseButton = document.querySelector('.close-button');

    let perguntas = [
        { familiar: 'Avó Janne', cores: ['Rosa', 'Preto', 'Azul'], resposta: 'Preto' },
        { familiar: 'Avô Adailton', cores: ['Vermelho', 'Verde', 'Amarelo'], resposta: 'Verde' },
        { familiar: 'Tia Jennifer', cores: ['Cinza', 'Branco', 'Rosa'], resposta: 'Branco' },
        { familiar: 'Tia Jaynne', cores: ['Laranja', 'Preto', 'Verde'], resposta: 'Preto' },
        { familiar: 'Tio David', cores: ['Azul', 'Preto', 'Roxo'], resposta: 'Preto' },
        { familiar: 'Primo Bernardo', cores: ['Amarelo', 'Preto', 'Branco'], resposta: 'Preto' },
        { familiar: 'Primo Miguel', cores: ['Rosa', 'Preto', 'Verde'], resposta: 'Preto' },
        { familiar: 'Tio Jannderson', cores: ['Branco', 'Preto', 'Azul'], resposta: 'Preto' },
        { familiar: 'Avó Ester', cores: ['Rosa', 'Branco', 'Verde'], resposta: 'Branco' },
        { familiar: 'Tia Amanda', cores: ['Azul', 'Rosa', 'Amarelo'], resposta: 'Rosa' },
        { familiar: 'Tia Evellyn', cores: ['Verde Oliva', 'Azul Celeste', 'Roxo'], resposta: 'Verde Oliva' },
        { familiar: 'Avô Wilson', cores: ['Amarelo', 'Azul Celeste', 'Branco'], resposta: 'Azul Celeste' },
        { familiar: 'Pai Johnnatan', cores: ['Amarelo', 'Verde', 'Roxo'], resposta: 'Amarelo' },
        { familiar: 'Mãe Érika', cores: ['Rosa', 'Verde', 'Azul'], resposta: 'Verde' },
        { familiar: 'Prima Giovanna', cores: ['Roxo', 'Amarelo', 'Laranja'], resposta: 'Roxo' }
    ];

    let perguntaAtual = 0;
    let pontuacao = 0;
    let tentativas = 0;
    let coresResumo = {};

    function mostrarPergunta() {
        if (perguntaAtual < perguntas.length) {
            const pergunta = perguntas[perguntaAtual];
            perguntaDiv.textContent = `Qual a cor favorita da(o) ${pergunta.familiar}?`;
            opcoesDiv.innerHTML = ''; // Limpa as opções anteriores
            tentativas = 0; // Reinicia as tentativas para cada pergunta

            pergunta.cores.forEach(cor => {
                const button = document.createElement('button');
                button.textContent = cor;
                button.addEventListener('click', () => verificarResposta(cor, pergunta.resposta));
                opcoesDiv.appendChild(button);
            });
        } else {
            mostrarResultado();
        }
    }

    function verificarResposta(escolha, respostaCorreta) {
        tentativas++;

        if (escolha === respostaCorreta) {
            let pontosGanhos = 0;

            if (tentativas === 1) {
                pontosGanhos = 3;
            } else if (tentativas === 2) {
                pontosGanhos = 2;
            } else {
                pontosGanhos = 1;
            }

            pontuacao += pontosGanhos;
            feedbackDiv.textContent = `Parabéns, Lorena! Você acertou e ganhou ${pontosGanhos} ponto(s)!`;
            atualizarResumoCores(respostaCorreta);
            perguntaAtual++;
            setTimeout(mostrarPergunta, 1500);
        } else {
            feedbackDiv.textContent = `Resposta incorreta. Tente novamente!`;
            if (tentativas >= 3) {
                feedbackDiv.textContent = `Você não conseguiu acertar a cor favorita da(o) ${perguntas[perguntaAtual].familiar}. A resposta correta era ${respostaCorreta}.`;
                atualizarResumoCores(respostaCorreta);
                perguntaAtual++;
                setTimeout(mostrarPergunta, 2500);
            }
        }
    }

    function atualizarResumoCores(cor) {
        coresResumo[cor] = (coresResumo[cor] || 0) + 1;
    }

    function mostrarResultado() {
        jogoDiv.style.display = 'none';
        resultadoDiv.style.display = 'block';
        pontuacaoFinalSpan.textContent = pontuacao;

        resumoCoresUl.innerHTML = '';
        for (const cor in coresResumo) {
            const li = document.createElement('li');
            li.textContent = `${cor}: ${coresResumo[cor]} pessoa(s)`;
            resumoCoresUl.appendChild(li);
        }
    }

    btnIniciar.addEventListener('click', () => {
        jogoDiv.style.display = 'block';
        resultadoDiv.style.display = 'none';
        perguntaAtual = 0;
        pontuacao = 0;
        feedbackDiv.textContent = '';
        mostrarPergunta();
    });

    // Modal de Regras
    btnRegras.addEventListener('click', () => {
        regrasModal.style.display = "block";
    });

    regrasCloseButton.addEventListener('click', () => {
        regrasModal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target == regrasModal) {
            regrasModal.style.display = "none";
        }
    });
});