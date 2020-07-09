//Declaração de variáveis globais
var altura = 0
var largura = 0
var vidas = 1
var tempo = 20
var velocidade = 1500
var mosquitosMortos = 0
var mosquitosVivos = 0

//Identifica o nível de dificuldade selecionado na página anterior
// e estabelece a velocidade do jogo.
var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
	velocidade = 1500
} else if (nivel === 'dificil') {
	velocidade = 1000
} else {
	velocidade = 750
}

//Pega as informações de largura e altura da tela
function ajustaTamanhoPalcoJogo () {
	altura = window.innerHeight
	largura = window.innerWidth
}
ajustaTamanhoPalcoJogo()

//Cria o cronômetro do jogo e executa a função de fim de jogo quando zera o tempo
var cronometro = setInterval (function () {
	
	tempo--

	if (tempo < 0) {
		fimDeJogo()
		isWinner()
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}	
	
}, 1000)

//Define a posição aleatória do mosquito
function posicaoRandomica () {

	//remove o mosquito anterior (caso exista)
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

		//remove as vidas e executa a função fim de jogo e game over
		if (vidas >= 4) {
			fimDeJogo()
			gameOver()
		} else {
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"	
			vidas++
			//conta os mosquitos que escaparam (vivos)
			mosquitosVivos++
			document.getElementById('contadorVivos').innerHTML = mosquitosVivos
		}
	}

	//cria posições aleatórias para o eixo x e y
	var posicaoX = Math.floor(Math.random() * (largura - 90))
	var posicaoY = Math.floor(Math.random() * (altura - 90))

	//Cria o mosquito e o associa às posições aleatórias
	//estabelecidas para o eixo x e y
	var mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio ()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	mosquito.onclick = function () {
		this.remove()//remove o mosquito no momento do clique
		mosquitosMortos++
		document.getElementById('contadorMortos').innerHTML = mosquitosMortos
	}

	document.body.appendChild(mosquito)
}

//Altera de modo randômico o tamanho do mosquito
function tamanhoAleatorio () {
	var classe = Math.floor(Math.random() * 3)

	switch(classe) {
		case 0:
			return 'mosquito1'
		case 1:
			return 'mosquito2'
		case 2:
			return 'mosquito3'
	}
}

//Altera de modo randômico o lado que o mosquito está virado
function ladoAleatorio () {
	var lado = Math.floor(Math.random() * 2)

	if (lado === 1) {
		return 'ladoB'
	}
} 

//Interrompe a execução do cronômetro e da criação dos mosquitos
//e limpa o painel da tela
function fimDeJogo () {
	clearInterval(cronometro)
	clearInterval(criaMosquito)
	document.getElementById('painel').style.display = "none"
}

//Imagem e som da vitória
function isWinner () {
	var y = document.createElement('audio')
	y.src = 'sons/vitoria.mp3'
	document.body.appendChild(y);
	y.play()
	var vitoria = document.getElementById('imgFinal')
	vitoria.src = 'imagens/vitoria1.png'
	vitoria.className = 'animation'
	infosFinais()
}

//Imagem e som da derrota
function gameOver () {
	var x = document.createElement('audio')
	x.src = 'sons/derrota.wav'
	document.body.appendChild(x);
	x.play()
	var derrota = document.getElementById('imgFinal')
	derrota.src = 'imagens/gameover.png'
	derrota.classList.add = 'animation'
	infosFinais()
}

//Mostra o quadro com as informações de fim de jogo e os botões
function infosFinais () {
	document.getElementById('totalMortos').innerHTML = mosquitosMortos
	document.getElementById('totalVivos').innerHTML = mosquitosVivos
	document.getElementById('painelFinal').style.display = "block"

	var btnJogarNovamente = document.getElementById('btn-jogar-novamente')
	btnJogarNovamente.style.display = "block"

	var btnOutroNivel = document.getElementById('btn-outro-nivel')
	btnOutroNivel.style.display = "block"
}

function jogarNovamente () {
	window.location.href = window.location.href
}

function outroNivel () {
	window.location.href = "index.html"
}