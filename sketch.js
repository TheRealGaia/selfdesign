var dogWalkingImg, dogStandingImg, dog;
var bgImg, bg;
var fireImg, fire, fireGroup, fireAnimation;
var stoneImg, stone, stoneGroup;
var logImg, log, logGroup;
var shrubImg, shrub, shrubGroup;
var invisibleGround;
var treatImg1, treatImg2, treatGroup, treat;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
	bgImg = loadImage("Images/bg6.jpg");

	dogWalkingImg = loadAnimation("Images/dog1-2.png","Images/dog1-3.png","Images/dog1-4.png","Images/dog1-5.png",
	"Images/dog1-6.png","Images/dog1-7.png","Images/dog1-8.png")
	dogStandingImg = loadImage("Images/dog1-1.png");

	fireImg = loadAnimation("Images/fire1-1.png", "Images/fire1-2.png","Images/fire1-3.png","Images/fire1-4.png","Images/fire1-5.png",
	"Images/fire1-6.png","Images/fire1-7.png","Images/fire1-8.png","Images/fire1-9.png","Images/fire1-10.png");

	logImg = loadImage("Images/log.png");

	stoneImg = loadImage("Images/rock.png");

	fireAnimation = loadAnimation("Images/fireAnimation1.png", "Images/fireAnimation2.png");

	shrubImg = loadImage("Images/shrub.png")

	treatImg1 = loadImage("Images/dogTreat1.png");

	treatImg2 = loadImage("Images/dogTreat2.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	bg = createSprite(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
	bg.addImage(bgImg);
	bg.scale = 1.6;
	bg.x = bg.width/2;

	dog = createSprite(200, height-150, 50, 50);
	dog.addAnimation("walking", dogWalkingImg);
	dog.addImage("standing", dogStandingImg);
	dog.scale = 0.6;
	dog.debug = true;
	dog.setCollider("circle",0 ,0, 70);

	invisibleGround = createSprite(width/2, height-120, width, 20);
	invisibleGround.visible = false;

	fireGroup = new Group();
	logGroup = new Group();
	stoneGroup = new Group();
	shrubGroup = new Group();
	treatGroup = new Group();

}


function draw() {
  rectMode(CENTER);
  background(0);

  if(gameState === PLAY){

	bg.velocityX = -1.5;
	if(bg.x < 240){
		bg.x = bg.width/2;
	}

	dog.collide(invisibleGround);
	if(keyDown("space")){
		dog.velocityY = -10;
	}
	dog.velocityY = dog.velocityY + 0.8;

	var rand = Math.round(random(1,3))

	if(frameCount %230 === 0){
		if(rand === 1){
			spawnStone()
		}
		else if(rand === 2){
			spawnLog()
		}
		else if(rand === 3){
			spawnShrub()
		}
	}

	if(dog.isTouching(logGroup) || dog.isTouching(shrubGroup) || dog.isTouching(stoneGroup)){
		gameState = END;
	}

  }
  else if(gameState === END){
	dog.velocityY = 0;
	bg.velocityX = 0;
	stoneGroup.setVelocityXEach(0);
	shrubGroup.setVelocityXEach(0);
	logGroup.setVelocityXEach(0);
  }

  drawSprites();
 
}

function spawnStone(){
	stone = createSprite(width, height-150, 50, 50);
	stone.velocityX = -5;
	stone.addImage(stoneImg);
	stone.lifetime = width;
	stoneGroup.add(stone);
	stone.scale = 0.4;
	stone.debug = true;
	stone.setCollider("circle", 0, 0, 100);

}

function spawnFire(){
	fire = createSprite(width, height-200, 50, 50);
	fire.velocityX = -4;
	fire.addAnimation(fireAnimation);
	fire.lifetime = width;
	fireGroup.add(fire);
	fire.scale = 0.4;
}

function spawnLog(){
	log = createSprite(width, height-150, 50, 50);
	log.velocityX = -4;
	log.addImage(logImg);
	log.liftime = width;
	logGroup.add(log);
	log.scale = 0.3;
	log.debug = true;
	log.setCollider("rectangle", 0, 0, log.width, log.height-60);
}

function spawnShrub(){
	shrub = createSprite(width, height-150, 50, 50);
	shrub.velocityX = -4;
	shrub.addImage(shrubImg);
	shrub.liftime = width;
	shrubGroup.add(shrub);
	shrub.scale = 0.3;
	shrub.debug = true;
	shrub.setCollider("circle", 0, 0, 100);
}

function spawnTreat(){
	treat = createSprite(width, height-140, 50, 50);
	treat.velocityX = -4;
	var rand = Math.round(random(1,2));
	if(rand === 1){
		treat.addImage(treatImg1)
		treat.scale = 0.15
	}
	else if(rand === 2){
		treat.addImage(treatImg2)
		treat.scale = 0.3
	}
	treat.liftime = width;
	treatGroup.add(treat);
}