

  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var rocket,rocket_img,background,backgroundImg;
  var meteor,meteorImg,meteorGroup,laser,laserImage;
  var laserGroup,meteorGroup,score;
  var gameOver,gameOverImg;
  var restart,resetImg



  function preload(){
    rocket_img = loadImage("rocket.png");
     laserImage = loadImage("laser.png");
    backgroundImg = loadImage("background.png");
    meteorImg = loadImage("meteor.png");
    gameOverImg = loadImage("gameOver.png");
     resetImg = loadImage("reset.png");
  }

  function setup(){
    createCanvas(550,500);

    backGround  = createSprite(275,250,550,500);
    backGround.addImage("background",backgroundImg)
    backGround.scale = 11;


    rocket = createSprite(275,430,20,20);
    rocket.addImage("rocket",rocket_img);
    rocket.scale = 0.3;
    rocket.debug = false;
    rocket.setCollider("circle",5,10,130);

    gameOver = createSprite(275,250,20,20);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.3;

    restart = createSprite(275,320,20,20);
    restart.addImage(resetImg);
    restart.scale = 0.2;


    meteorGroup = new Group();
    laserGroup = new Group()

    score = 0;

  }

  function draw() {
    background("white");
    
    
  if (gameState === PLAY){
      
    gameOver.visible = false;
  restart.visible = false; 
    
    if (keyDown("space")) {
      createlaser();
        }
    backGround.velocityY = +4;
    
    edges= createEdgeSprites();
    
    rocket.collide(edges);
    
    if (backGround.y > 500){
        backGround.y = backGround.height/2;
      }

    rocket.x  = World.mouseX;
    
    if (meteorGroup.isTouching(laserGroup)) {
       meteorGroup.destroyEach();
       laserGroup.destroyEach();
      score = score + 2 
  }
    
    if (meteorGroup.isTouching(rocket)) {
       gameState = END;
  }

      spawnMeteor();
    
    
 text("Score: "+ score, 500,50);
    }
    else if (gameState === END) {
       
      gameOver.visible = true;
  restart.visible = true; 
      
      meteorGroup.destroyEach();
      
       laserGroup.destroyEach();
      
      backGround.velocityY = 0
    }
    
     if(mousePressedOver(restart)) {
      reset();
    }
    
    drawSprites();
    
stroke("white");
textSize(20); 
fill("white");
text("Score :"+ score ,300,50)

  }

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false; 
  meteorGroup.destroyEach();
  laserGroup.destroyEach();
  rocket.changeAnimation(rocket_img);
  score = 0;
}

  function spawnMeteor() {
    //write code here to spawn the meteor
    if (frameCount % 60 === 0) {
      var meteor = createSprite(250,-50,20);
      meteor.x = Math.round(random(400,0));
      meteor.addImage(meteorImg);
      meteor.scale = 0.3;
      meteor.velocityY = 10;
      meteor.lifetime = 50;
      meteor.debug =false;
      meteorGroup.add(meteor);



    }
  }

  function createlaser() {
    var laser= createSprite(275,0, 60, 10);
    laser.addImage(laserImage);
    laser.x= rocket.x;
    laser.velocityY = -4;
    laser.lifetime = 100;
    laser.scale = 0.3;
    laser.y= rocket.y;
    laserGroup.add(laser);


  }


