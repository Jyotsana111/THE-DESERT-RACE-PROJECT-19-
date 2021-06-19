var PLAY=1;
var END=0;
var gameState=PLAY;

var desert,desertImage;
var man,manImage;
var ground;
var cactus,cactusImage;
var water1,water,waterImage;
var crow,crowImage;
var snake,snakeImage;
var snakeGroup,waterGroup,crowGroup,cactusGroup;
var magic1=3;
var magic,stick;
var water2 = 0;

function preload(){
  desertImage = loadImage("deserforest.jpg")
  manImage = loadImage("oldman.png")
  cactusImage = loadImage("55555.png")
  waterImage = loadImage("waterbottle.png")
  crowImage = loadImage("crow-clipart-evil-3.png")
  snakeImage = loadImage("snake 22.png")
  stick = loadImage("magicstick.png")
}
function setup(){
  createCanvas(600,600);
  desert = createSprite(300,300);
  desert.addImage(desertImage)
  man = createSprite(50,480);
  man.addImage(manImage)
  man.scale = 0.15
  ground = createSprite(300,510,600,5)
  ground.visible = false;
  
  cactusGroup = createGroup();
  crowGroup = createGroup();
  waterGroup = createGroup();
  snakeGroup = createGroup();
  
  magic = createSprite(50,60)
  magic.addImage(stick)
  magic.scale = 0.1;
  
  water1 = createSprite(400,60)
  water1.addImage(waterImage)
  water1.scale = 0.2;

}
function draw(){
 
 
  man.collide(ground)
  cactus();
  water();
  crow();
  snake();
  
  
   if(gameState == PLAY){
 
  if(keyDown("space")){
    man.velocityY = -12;
  }
     
     if(water2 == 0 && frameCount == 500){
       gameState = END;
     }
  
  man.velocityY = man.velocityY+0.5
  
 desert.velocityX = -5;
  if(desert.x<0){
    desert.x = desert.width/2
  }
  
  if(waterGroup.isTouching(man)){
    waterGroup[0].destroy();
    water2 = water2+1;
  }
  
    if(cactusGroup.isTouching(man)){
      cactusGroup[0].destroy();
      magic1 = magic1-1;
    }
    
    if(crowGroup.isTouching(man)){
      crowGroup[0].destroy();
      magic1 = magic1-1;
    }
    
    if(snakeGroup.isTouching(man)){
      snakeGroup[0].destroy();
      magic1 = magic1-1;
    }
    
    if(magic1 == 0){
      gameState = END;
    }
    if(water2 == 0 && frameCount% 500 == 0){
      gameState = END
    
    }
    
    
    
    
  
    if(gameState == END){
      desert.velocityX = 0;
      cactusGroup.lifetime = -1;
      waterGroup.lifetime = -1;
      snakeGroup.lifetime = -1;
      crowGroup.lifetime = -1;
      man.scale = 1
      man.x = 300;
      man.y = 300;
      magic.destroy();
      water1.destroy();
      fill("white")
      text("GAMEOVER",300,300)
    }
  drawSprites();
      fill("black")
  textSize(15)
  text(magic1,100,60)
  text(water2,450,60)
  
     if(gameState == END){
       textSize(40)
       fill("black")
       text("GAMEOVER",250,350)
     }
    
 
}

function cactus(){
  if(World.frameCount% 100 == 0){
    var cactus = createSprite(560,460);
    cactus.scale = 0.18;
    cactus.addImage(cactusImage)
    cactus.velocityX = -8
    cactus.lifetime = 100;
    cactusGroup.add(cactus);
  }
}

function water(){
  if(World.frameCount% 300 == 0){
    var water = createSprite(560,330);
    water.scale = 0.18;
    water.addImage(waterImage)
    water.velocityX = -10
    water.lifetime = 100;
    waterGroup.add(water);
  }
}

function crow(){
  if(World.frameCount==500){
    if(World.frameCount% 200){
    var crow = createSprite(560,330);
    crow.scale = 0.1;
    crow.addImage(crowImage)
    crow.velocityX = -10
    crow.lifetime = 100;
    
    crowGroup.add(crow)
    }
  }
}

function snake(){
  if(World.frameCount% 400 == 0){
    var snake = createSprite(560,570);
    snake.scale = 0.1;
    snake.addImage(snakeImage)
    snake.velocityX = -6
    snake.lifetime = 100;
    
    snakeGroup.add(snake)
  }
}
}