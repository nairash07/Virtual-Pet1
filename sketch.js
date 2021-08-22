var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,fedTime;
var foodObj;
var gameState=0;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  console.log(database);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedtheDog=createButton("Feed the Dog");
  feedtheDog.position(700,95);
  feedtheDog.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  

  fill(255,255,254);
  textSize(15);
  // text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
 
  //add styles here


  
  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
    console.log(lastFed)
  });

  //currentTime=hour();
  
    //game=new Game();
    //game.getState()
    //game.start() 
      
    
   //write code to display text lastFed time here
   
  if(lastFed>=12) {
    //show time in PM format when lastFed is greater than 12
      text("Last Feed : "+ lastFed%12 + " PM", 350,30);

    }else if(lastFed==0){
  
      text("Last Feed : 12 AM", 350,30);
  
    }else{

    //show time in Am format when lastFed is less than 12
      text("Last Feed : "+ lastFed + " AM", 350,30); 
    }
    drawSprites();
   
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//write code here to update food stock and last fed time
function feedDog(){
 
  var food_stock_val = foodObj.getFoodStock();
  dog.addImage(happyDog);
  if( food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0)
    
  }
  else 
    {
      foodObj.updateFoodStock(food_stock_val-1)
    }

    
  
  //foodobject.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
