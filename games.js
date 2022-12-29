// these are notes not neccesarily linked to anything but to be able to look back and see what I did step by step



var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];

//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});




//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
userClickedPattern = [];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);



  // create random random number
  var randomNumber = Math.floor(Math.random() * 4);
  // this will associate our random number with our button color and will allow it to randomize the color
  var randomChosenColour = buttonColours[randomNumber];
  // this will add to the array up top game pattern - it will add each randomChosenColour from the line of the code above which is what the .push does
  gamePattern.push(randomChosenColour);
  // this line of code is concatenating the # and the random color to select the id tags to give it animations when clicked
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // takes play sound function and then associates it with the randomChosenColour to play the sound from that color
  playSound(randomChosenColour);
}

//function that allows you to play sound and you refractor it in the code aboveso it plays in both instances
function playSound(name) {
  // this line of code concatenating the sound files associated with each random color in order to associate the color with the right sound file
  var audio = new Audio("sounds/" + name + ".mp3");
  // to play the audio
  audio.play();
}

function animatePress(currentColour) {
  // jQuery to ddd this pressed CSS class to the button that gets clicked inside animate pressed
  $("#" + currentColour).addClass("pressed");
  //remove animation after a certain amount of timeout
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")

  }, 100);
}



  // Reset every variable -------------

function startOver() {
  level = 0;
  gamePattern = [];
  pressed = false;
}
