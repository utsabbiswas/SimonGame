//Variable to store the level of the game.
var level=0;

//Creating an array to store user pattern.
var userClickedPattern=new Array();

// Creating an array to store all the results
var gamePattern=new Array();

// Array to store the button color sequence.
var buttonColours=['red','blue','green','yellow'];
var randomNumber;

$(document).keypress(function(){
  if(level===0)
  {
    $('h1').text("Level 0");
    nextSequence();
    cnt=1;
  }
});

var randomChosenColour;


// Random Function Generator
function nextSequence() {
  //Increasiing the Level
  level=level+1;
  $('h1').text('Level '+level);
  randomNumber=Math.floor(Math.random()*4);
  // Chosing a random color
  randomChosenColour=buttonColours[randomNumber];
  //Adding the new choosen color to the Array.
  gamePattern.push(randomChosenColour);
  //Selecting the button.
  $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  currentLevel=0;
  }

//playing the tune for the button.
function playSound(Colourbutton)
{
  switch (Colourbutton) {
    case 'red':
      var audio=new Audio("C:/Users/Lazr_us/Documents/Full Stack/Simon Game Challenge Starting Files/sounds/red.mp3");
      audio.play();
      break;
    case 'blue':
      var audio=new Audio("C:/Users/Lazr_us/Documents/Full Stack/Simon Game Challenge Starting Files/sounds/blue.mp3");
      audio.play();
      break;
    case 'yellow':
      var audio=new Audio("C:/Users/Lazr_us/Documents/Full Stack/Simon Game Challenge Starting Files/sounds/yellow.mp3");
      audio.play();
      break;
    case 'green':
      var audio=new Audio("C:/Users/Lazr_us/Documents/Full Stack/Simon Game Challenge Starting Files/sounds/green.mp3");
      audio.play();
      break;
    default:
  }
}
var currentLevel=0;

//jQuerry to spot a click in the buttons.
$('.btn').click(function() {
  var userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  currentLevel=currentLevel+1;
  checkAnswer(currentLevel);
});

//Animation for the clicked button.
function animatePress(currentColor)
{
  $('#'+currentColor).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColor).removeClass('pressed');
  },100);
}


//Function to check the sequence entered by the user.
function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel-1]!==userClickedPattern[currentLevel-1]) {
    var audio=new Audio("C:/Users/Lazr_us/Documents/Full Stack/Simon Game Challenge Starting Files/sounds/wrong.mp3");
    audio.play();
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $('h1').text("Game Over, Press Any Key to Restart");
    $(document).keypress(function(){
      window.location.reload(true);
    });
  }
  if(gamePattern.length===currentLevel)
  {
    userClickedPattern=[];
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
