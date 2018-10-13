function statReset(){
    $(".btn").removeClass("player");
    $(".heroList").append($(".btn"));
    $(".btn").show();
    $('.combatLog').prepend('Pick a hero.<br>');
    $('#atkHP').html("<h1>Player</h1>");
    $('#defHP').html("<h1>Defender</h1>");



    game = {
        thisPlayer: "",
        thisDefender: 0,
        player: {},
        defender: {},
        playerPicked: false,
        defenderPicked: false,
        round: 1
    }

    game.garnet = {
        name: "Garnet",
        hitPoints: 40,
        attackValue: 0,
        attackPoints: 13,
        counterAttack: 16
    }

    game.pearl = {
        name: "Pearl",
        hitPoints: 50,
        attackValue: 0,
        attackPoints: 12,
        counterAttack: 17
    }

    game.amethyst = {
        name:"Amethyst",
        hitPoints: 60,
        attackValue: 0,
        attackPoints: 11,
        counterAttack: 8
    }

    game.steven = {
        name: "Steven",
        hitPoints: 70,
        attackValue: 0,
        attackPoints: 10,
        counterAttack: 4
    }
}

statReset();

$(".btn").on("click", function (){
console.log("this class", $(this).attr("class"));
    // pick char
    if (game.playerPicked == false){

        $(this).addClass("player");
        game.thisPlayer = this;
        console.log("this player", game.thisPlayer);

        if ($(this).attr("id") == "bGarnet"){
            game.player = game.garnet;
        }
        else if ($(this).attr("id") == "bPearl"){
            game.player = game.pearl;
        }
        else if ($(this).attr("id") == "bAmethyst"){
            game.player = game.amethyst;
        }
        else if ($(this).attr("id") == "bSteven"){
            game.player = game.steven;
        }
        
        $('#atkHP').html("<h1>" + game.player.hitPoints + " HP</h1>");
        $("#atkSlot").append(this);
        $('.combatLog').prepend('Pick an opponent.<br>Your hero is ' + game.player.name + '.<br>');
        game.playerPicked = true;
        return;
        }

        else if (game.defenderPicked == false && $(this).attr("class") != "btn player"){
            game.thisDefender = this;
            console.log("this defender", game.thisDefender);
    
            if ($(this).attr("id") == "bGarnet"){
                game.defender = game.garnet;
            }
            else if ($(this).attr("id") == "bPearl"){
                game.defender = game.pearl;
            }
            else if ($(this).attr("id") == "bAmethyst"){
                game.defender = game.amethyst;
            }
            else if ($(this).attr("id") == "bSteven"){
                game.defender = game.steven;
            }

            $('#defHP').html("<h1>" + game.defender.hitPoints + " HP</h1>");
            $("#defSlot").append(this);
            $('.combatLog').prepend('Click Attack to fight.<br>Your opponent is ' + game.defender.name + '.<br>');
            game.defenderPicked = true;
            return;
        }
        else {
            // if player and defender are set, .btn elements do nothing
            console.log("this attr id=", $(this).attr("id"));
        }
    
});

$(".atkBtn").on("click", function (){

    if (game.playerPicked == true && game.defenderPicked == true){
        game.player.attackValue += game.player.attackPoints;
        game.defender.hitPoints -= game.player.attackValue;
        $('#defHP').html("<h1>" + game.defender.hitPoints + " HP</h1>");
        $('.combatLog').prepend('You hit ' + game.defender.name + ' for ' + game.player.attackValue + ' damage.<br>');

        if (game.defender.hitPoints < 1 && game.round == 3){
            $('.combatLog').prepend("You win!<br>You defeated " + game.defender.name + '<br>');
            alert("You win!\nPress Ok to restart.");
            return statReset();
        }

        if (game.defender.hitPoints < 1){
            $('.combatLog').prepend("You defeated " + game.defender.name + "! Pick your next opponent.<br>");
            game.round++;
            $(game.thisDefender).hide();
            game.defenderPicked = false;
            }

        game.player.hitPoints -= game.defender.counterAttack;
        $('#atkHP').html("<h1>" + game.player.hitPoints + " HP</h1>");
        $('.combatLog').prepend(game.defender.name + ' counter attacked for ' + game.defender.counterAttack + ' damage.<br>');

        if (game.player.hitPoints < 1){
            $('.combatLog').prepend("You are defeated!<br>");
            alert("You lose!\nPress Ok to restart.");
            return statReset();
        } 
    }
    else {
        if (game.playerPicked == true){
        $('.combatLog').prepend("Pick your opponent first, you silly goose.<br>");
        }
        else {
        $('.combatLog').prepend("Pick your character and opponent first, you dink.<br>");
        }
    }

});