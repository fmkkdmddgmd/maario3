var backgroundimage; 
var marioback ; 
var mario , marioimage, mariojump; 
var invground , mrjm ; 
var ob , obb ; 
var gameState="play" ; 
var obGroup ; 
var lives= 3; 
var score= 0; 
var  mariofall ; 
var endob ; 
var restart,  restartimage; 
var gameoverimage , gameover ;
var fallsound , gameoversound , jumpsound ; 

function preload() {
    marioback = loadImage("b2.png");
    marioimage = loadAnimation("mario1.png","mario2.png","mario3.png") ; 
    mrjm = loadAnimation("mariojump.png"); 
    ob = loadAnimation("ob1.png","ob2.png","ob3.png") ; 
    mariofall = loadAnimation("endstate.png"); 
     endob = loadAnimation("ob1.png"); 
      restartimage = loadImage("restartspr.png"); 
      gameoverimage = loadImage("gameover.png") ;
      gameoversound = loadSound("gameoversound.mp3");
      fallsound = loadSound("mariofallsound.mp3");
      jumpsound = loadSound("mariojumpsound.mp3");





}

function setup(){
createCanvas(1200,600);
backgroundimage = createSprite(0,0,600);
backgroundimage.addImage(marioback); 
gameover = createSprite(600,300) ; 


backgroundimage.x = backgroundimage.width/2 ; 
mario = createSprite(50,530,50,50);
mario.addAnimation("mario",marioimage);
mario.addAnimation("fall",mariofall);
mario.addAnimation("jump",mrjm);
restart = createSprite (600,300,50,30);
restart.addImage(restartimage);
gameover.addImage(gameoverimage) ; 




mario.scale = 1
 ;
invground = createSprite(300,560,600,20);
invground.visible = false ; 
//mario.debug = true ; 

obGroup = new Group();

}

function draw(){
       background("black");
       if(gameState==="play"){
        backgroundimage.velocityX = -2 ; 
        score = score+Math.round(frameRate()/10) ; 
        if(backgroundimage.x<481){
            backgroundimage.x = backgroundimage.width/2 ; 
          }
          if(keyDown("SPACE")&&mario.y>500){
            mario.velocityY = -16  ;
            mario.changeAnimation("jump",mrjm);
            jumpsound.play();
          
             
         }
    else if(mario.y>500){
  
         mario.changeAnimation("mario",marioimage); 
          
         }
         mario.velocityY = mario.velocityY+0.8 ; 
       mario.collide(invground); 
       spawnOb();
       

if(obGroup.isTouching(mario)){

    lives= lives-1 ;
    obGroup.destroyEach();               
    gameState= "end";
    fallsound.play();
   
}
restart.visible = false ; 
gameover.visible = false ; 

       }
       else if(gameState==="end") {
        restart.visible = true ; 
       mario.velocityY= 0;
       obGroup.setVelocityXEach(0) ;
       mario.changeAnimation("fall",mariofall); 
       backgroundimage.velocityX = 0 ; 
       mario.y = 535 ;
       obGroup.setLifetimeEach(-1) ; 
       if(lives>0){if(mousePressedOver(restart)){
         gameState = "play" ; 

       }}
       if(lives===0){
         restart.visible = false; 
         gameover.visible = true ; 
         

       }
      
       
      
    
    }
       console.log(mario.y);
       
       
       

       

       
       
       drawSprites(); 
       textSize(26); 
       fill("black")
       text("Lives =  "+lives,20,50) ;

       textSize(26); 
       fill("black")
       text("score =  "+score,1000,50) ;
}
function spawnOb(){
    if(frameCount%100===0){
     obb = createSprite(Math.round(random(300,1200)),530,50,50);
      
     obb.scale = 1.5 ; 
     obb.velocityX = - 6 
     obb.lifetime = 200;
     obGroup.add(obb) ; 
     obb.addAnimation("OBSTACLE",ob); 
    }


}



