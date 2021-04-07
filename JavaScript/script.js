var audio = new Audio();
audio.src = '../Src/start.wav';

var audio2 = new Audio();
audio2.src = '../Src/confirm.wav';

var audio3 = new Audio();
audio3.src = '../Src/coins.wav';

const btnComecar = document.getElementById('btnComecar')
const btnProximo = document.getElementById('btnProximo')
const quardradoPerguntaElement = document.getElementById('quadradoPergunta')
const perguntaElement = document.getElementById('pergunta')
const botoesRespostaElement = document.getElementById('btnsResposta')
let perguntaEmbaralhada, perguntaAtualIndex

btnComecar.addEventListener('click', comecarJogo)
btnProximo.addEventListener('click', () => {
    perguntaAtualIndex++
    inserirProximaPergunta()
})

function comecarJogo(){
    console.log('começou')
    btnComecar.classList.add('hide')
    //pontuacao = 0
    perguntaEmbaralhada = perguntas.sort(() => Math.random() - .5)
    perguntaAtualIndex = 0
    quardradoPerguntaElement.classList.remove('hide')
    inserirProximaPergunta()
}

function inserirProximaPergunta(){
    resetState()
    mostrarPergunta(perguntaEmbaralhada[perguntaAtualIndex])
}

function mostrarPergunta(pergunta){
    perguntaElement.innerHTML = pergunta.pergunta
    pergunta.resposta.forEach(resposta => {
        const botao = document.createElement('botao')
        botao.innerText = resposta.text
        botao.classList.add('btn')
        if(resposta.correto){
            botao.dataset.correto = resposta.correto
        }
        botao.addEventListener('click', respostaSelecionada)
        botoesRespostaElement.appendChild(botao)
    });
}

function resetState() {
    clearStateClass(document.body)
    btnProximo.classList.add('hide')
    while(botoesRespostaElement.firstChild){
        botoesRespostaElement.removeChild(botoesRespostaElement.firstChild)
    }
}

function respostaSelecionada(e){
    const botaoSelecionado = e.target
    const correto = botaoSelecionado.dataset.correto
    setStatusClass(document.body, correto)
    Array.from(botoesRespostaElement.children).forEach(botao => {
        setStatusClass(botao, botao.dataset.correto)
    })
    if(perguntaEmbaralhada.length > perguntaAtualIndex + 1){
        btnProximo.classList.remove('hide')
    }else{
        btnComecar.innerText = 'Recomecar'
        btnComecar.classList.remove('hide')
        //pontuar()
    }
}

function setStatusClass(element, correto) {
    clearStateClass(element)
    if(correto){
        element.classList.add('correto')
    }else{
        element.classList.add('errado')
    }
}

function clearStateClass(element){
    element.classList.remove('correto')
    element.classList.remove('errado')
}

/*function pontuar(){
    acertos = 0
    erros = 0
    if(respostaSelecionada.correto){
        acertos++
    }else{
        erros++
    }

    if(acertos > erros){
        alert('Você venceu!'+'\n'+'Sua pontuação foi: '+ pontuacao+'acertos'+acertos+'erros'+erros);
    }else{
	
        alert('Você perdeu!'+'\n'+'Sua pontuação foi: '+ pontuacao+'acertos'+acertos+'erros'+erros);
    }    
}*/

const perguntas = [
    {
        pergunta: "Quanto é 2+2?",
        resposta:[
            {text: '4', correto: true, audio: audio2},
            {text: '8', correto: false, audio: audio3},
            {text: '6', correto: false, audio: audio3},
            {text: '10', correto: false, audio: audio3}
        ]
    },
    {
        pergunta: 'Quanto é 5 * 8?',
        resposta:[
            {text: '45', correto: false},
            {text: '42', correto: false},
            {text: '40', correto: true},
            {text: '23', correto: false}
        ]
    },
    {
        pergunta: 'Quanto é 13 - 7?',
        resposta:[
            {text: '17', correto: false},
            {text: '20', correto: false},
            {text: '1', correto: false},
            {text: '6', correto: true}
        ]
    },
    {
        pergunta: 'Quanto é 9 / 3?',
        resposta:[
            {text: '3', correto: true},
            {text: '6', correto: false},
            {text: '9', correto: false},
            {text: '1', correto: false}
        ]
    }
]

