var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var level = 0




var modal = $("#myModal");
var span = $(".close");


function showModal() {
    modal.show();
}


span.click(function() {
    modal.hide();
});


$(window).click(function(event) {
    if ($(event.target).is(modal)) {
        modal.hide();
    }
});


showModal();






var started_game = false;

$("body").on("keypress", function () {
    $("#level-title").text("Level " + level);
    if (!started_game) {
        started_game = true;
        nextSequence();

    }
});


function nextSequence() {
    $("#level-title").text("Level " + level);
    userClickPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    flash(".", buttonColors[randomNumber])
    level += 1
}

function flash(dot, randomColor) {
    gamePattern.push(randomColor);
    $(dot + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}


$(".btn").off("click").on("click", function () {
    var userChosenColor = this.id;

    userClickPattern.push(userChosenColor);
    playSound(userChosenColor)
    checker()
    animatePress(userChosenColor);
});



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $(`.${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
    }, 100)

}

function startOver() {
    level = 0
    gamePattern = []
    started_game = false;

}

function checker() {
    for (var i = 0; i < userClickPattern.length; i++) {
        console.log(gamePattern[i])
        console.log(userClickPattern[i])
        if (gamePattern[i] != userClickPattern[i]) {

            var audio = new Audio("sounds/wrong_new.mp3");
            audio.play();
            $("#level-title").text("Game over, press A to start")
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 100)

            startOver()


        }
    }
    if (userClickPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
    }
}


















