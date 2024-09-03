//variáveis da bolinha
let xBolinha = 100;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variáveis do oponente 
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente; 

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

// chance de errar
let chanceDeErrar = 0 

let ball;
let player1;
let player2;
let isMultiplayer = false;
let gameStarted = false;


function setup() {
  createCanvas(600, 400);
  trilha.loop();
  ball = new Ball();
  player1 = new Paddle (10);
  player2 = new Paddle(width - 20);
}

function draw() {
  background(200);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  movimentaBolinha();
  
 if (!gameStarted){
   showMenu();
 } else {
   ball.show();
   ball.update();
   
   player1.show();
   player1.move();
   
   if (isMultiplayer){
     player2.show();
     player2.move();
   } else {
     // Controlar a segunda raquete automaticamente
     player2.autoMove(ball);
     player2.show();
   }
   
   ball.checkPaddleCollision(player1);
   ball.checkPaddleCollision(player2);
 }
}

function mostraBolinha() {
circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio  > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= - 1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
   
  }
  if(keyIsDown(DOWN_ARROW)) {
     yRaquete += 10;
     
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio  < yRaquete + raqueteAltura && yBolinha + raio  > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
 }

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
  
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  yRaqueteOponente += 10;
  yRaqueteOponente += 10;
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
  meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
  if (chanceDeErrar >= 39){
    chanceDeErrar = 40
  }
} else {
  chanceDeErrar -= 1 
  if (chanceDeErrar <= 35){
    chanceDeErrar = 35
  }
}
}

function bolinhanaoFicaPresa(){
  if (XBolinha - raio < 0){
  XBolinha = 23
  }
}

function showMenu(){
  textAlign(CENTER);
  fill(255);
  textSize(20);
  text("Pressione 1 para Singleplayer", width / 2, height / 2 - 20);
  text("Pressione 2 para Multiplayer", width / 2, height / 2 + 20);
}

function keyPressed(){
  if (!gameStarted){
    if (key === '1'){
      isMultiplayer = false;
      gameStarted = true;
    } else if (key === '2'){
      isMultiplayer = true;
      gameStarted = true;
    }
  } else {
    player1.keyPressed();
    
    if (isMultiplayer) {
      player2.keyPressed();
    }
  }
}

function keyReleased() {
  if (gameStarted) {
    player1.keyReleased();
    
    if (isMultiplayer) {
      player2.keyReleased();
    }
  }
}

class Ball{
  constructor(){
    this.reset();
  }
  
  reset(){
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = random( [-1, 1 ] ) * 5;
    this.yspeed = random( [-1, 1] ) * 3;
    this.radius = 12;
  }
  
  show(){
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    
    if(this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
    if (this.x < 0 || this.x > width) {
      this.reset();
    }
  }
  
  checkPaddleCollision(paddle){
    if(
    this.x - this.radius < paddle.x + paddle.w &&
    this.x + this.radius > paddle.x &&
    this.y - this.radius < paddle.y + paddle.h &&
    this.y + this.radius > paddle.y 
    ) {
      this.xspeed *= -1;
    }
  }
}

class Paddle {
  constructor(x) {
    this.x = x;
    this.y = height / 2 - 30;
    this.w = 10;
    this.h = 60;
    this.yspeed = 0;
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
  
  move() {
    this.y += this.yspeed;
    
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y > height - this.h) {
      this.y = height - this.h;
    }
  }
  
  autoMove(ball) {
    // Controle automático da raquete no modo singleplayer
    this.y = constrain(ball.y - this.h / 2, 0, height - this.h);
  }
  
  keyPressed() {
    if (this.x < width / 2) {
      // Controle para o primeiro jogador
      if (keyCode === UP_ARROW) {
        this.yspeed = -5;
      } else if (keyCode === DOWN_ARROW){
        this.yspeed = 5;
      }
    } else {
      // Controle para o segundo jogador no modo multiplayer
      if (key === 'w') {
        this.yspeed = -5;
      } else if (key === 's') {
        this.yspeed = 5;
      }
    }
  }
  
  keyReleased() {
    if (this.x < width / 2) {
      // Controle para o primeiro jogador 
      if (keyCode === UP_ARROW || keyCode === DOWN_ARROW){
        this.yspeed = 0;
      }
    } else {
      // Controlepra o segundo jogador no modo multiplayer
      if (key === 'w' || key === 's'){
        this.yspeed = 0;
      }
    }
  }
}
