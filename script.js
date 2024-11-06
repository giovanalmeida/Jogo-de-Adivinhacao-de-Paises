let correctCountry;
let options = [];
let timer;
let timeLeft = 10;

function getCountryNameInPortuguese(country) {
    // Verifica se há tradução para português
    return country.translations && country.translations.por ? 
        country.translations.por.common : country.name.common;
}

function getRandomCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            // Seleciona um país aleatório como o correto
            const randomIndex = Math.floor(Math.random() * data.length);
            correctCountry = data[randomIndex];
            options = [correctCountry];

            // Adiciona mais 3 opções aleatórias de países
            while (options.length < 4) {
                const randomOption = data[Math.floor(Math.random() * data.length)];
                if (!options.includes(randomOption)) {
                    options.push(randomOption);
                }
            }

            // Embaralha as opções
            options.sort(() => Math.random() - 0.5);

            displayQuestion();
            startTimer(); // Reinicia o timer ao carregar uma nova pergunta
        })
        .catch(error => console.error('Erro:', error));
}

function displayQuestion() {
    // Exibe a bandeira do país correto
    document.getElementById('flagImage').src = correctCountry.flags.png;
    document.getElementById('flagImage').style.display = 'block';

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Limpa as opções anteriores

    // Cria botões para as opções de países
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add("btns");
        button.innerText = getCountryNameInPortuguese(option);
        button.onclick = () => checkAnswer(option); // Verifica a resposta ao clicar no botão
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    clearInterval(timer); // Para o temporizador assim que o jogador clica em uma opção

    const resultDiv = document.getElementById('result');

    if (selected.name.common === correctCountry.name.common) {
        resultDiv.innerHTML = '<p>Correto!</p>';
    } else {
        resultDiv.innerHTML = `<p>Incorreto! O país correto era: ${getCountryNameInPortuguese(correctCountry)}</p>`;
    }

    document.getElementById('nextButton').style.display = 'block'; // Exibe o botão "Próximo"
}

document.getElementById('nextButton').onclick = () => {
    document.getElementById('result').innerHTML = ''; // Limpa o resultado anterior
    document.getElementById('nextButton').style.display = 'none'; // Esconde o botão "Próximo"
    getRandomCountries(); // Carrega uma nova bandeira
    clearInterval(timer); // Limpa o temporizador antigo
};

// Função para iniciar o temporizador
function startTimer() {
    timeLeft = 10; // Reseta o tempo para 10 segundos
    document.getElementById('timer').innerText = `Tempo restante: ${timeLeft}s`;

    // Inicia o temporizador
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerText = `Tempo restante: ${timeLeft}s`;

        // Se o tempo acabar, o jogador perdeu
        if (timeLeft <= 0) {
            clearInterval(timer); // Para o temporizador
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p>Tempo esgotado! O país correto era: ' + getCountryNameInPortuguese(correctCountry) + '</p>';
            document.getElementById('nextButton').style.display = 'block'; // Exibe o botão "Próximo"
        }
    }, 1000);
}

getRandomCountries(); // Inicia o jogo com a primeira pergunta

 // Inicia o jogo com a primeira pergunta

/*let tempo = 0; // Variável para armazenar o tempo
        let intervalo; // Variável para armazenar o ID do intervalo

        // Função para iniciar o temporizador
        function iniciarTemporizador() {
            intervalo = setInterval(() => {
                tempo++; // Aumenta o tempo em 1 a cada segundo
                document.getElementById('tempo').textContent = tempo;
            }, 1000); // A cada 1000 milissegundos (1 segundo)
        }

        // Adicionar eventos aos botões
        document.getElementById('startBtn').addEventListener('click', iniciarTemporizador);*/

       