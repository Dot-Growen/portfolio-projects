var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;
// FUNCTIONS TO LISTEN FOR STARTING KEY PRESS FOR THE FIRST TIME
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// FUNCTIONS TO LISTEN FOR BUTTON CLICKS, PLAY/ ANIMATE THOSE CLICK & SEND INDEX FOR THE LAST ANSWERED
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// FUNCTIONS TO CHECK FOR IF THE ARRAY LENGTH AND COLORS ARE EQUAL. ALSO TO PLAY/CHANGE THE SOUND,ANIMATION AND TITLE IF NOT
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    startOver();
  }

}
// FUNCTIONS TO CHANGE THE PARAMETERS BACK TO WHAT THEY WHERE INITIALLY
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// FUNCTIONS TO START UP THE NEXT SEQUENCE WITH A RANDOM OPTION
function nextSequence() {
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Simon SOUND AREA
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Simon ANIMATION AREA
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
