function statReset(){
    $(".btn").removeClass("player");
    $(".btn").removeClass("defender");
    $(".heroList").append($(".btn"));
    $(".btn").show();
    $('.combatLog').prepend('Begin.<br>');
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
        hitPoints: 80,
        attackValue: 0,
        attackPoints: 8,
        counterAttack: 16
    }

    game.pearl = {
        name: "Pearl",
        hitPoints: 70,
        attackValue: 0,
        attackPoints: 7,
        counterAttack: 14
    }

    game.amethyst = {
        name:"Amethyst",
        hitPoints: 60,
        attackValue: 0,
        attackPoints: 6,
        counterAttack: 12
    }

    game.steven = {
        name: "Steven",
        hitPoints: 50,
        attackValue: 0,
        attackPoints: 5,
        counterAttack: 10
    }
}

statReset();

$(".btn").on("click", function (){
console.log("tis attr class", $(this).attr("class"));
    // pick char
    if (game.playerPicked == false){

        $(this).addClass("player");
        game.thisPlayer = this;
        console.log(game.thisPlayer);

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
        $('.combatLog').prepend('Your hero is ' + game.player.name + '.<br>');
        game.playerPicked = true;
        return;
        }
        // pick enemy 1
        else if (game.defenderPicked == false && $(this).attr("class") != "btn player"){
            // unsure if class defender will be nessisary
            $(this).addClass("defender");   
            game.thisDefender = this;
            console.log(game.thisDefender);
    
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
            $('.combatLog').prepend('Your opponent is ' + game.defender.name + '.<br>');
            game.defenderPicked = true;
            return;
        }
        else {
            // if player and defender are set, button does nothing
            console.log("this attr id=", $(this).attr("id"));
            console.log("player is=", game.player);
            console.log("defender is=", game.defender);
        }
    
});

    // attack
$(".atkBtn").on("click", function (){

    if (game.playerPicked == true && game.defenderPicked == true){
        game.player.attackValue += game.player.attackPoints;
        game.defender.hitPoints -= game.player.attackValue;
        $('.combatLog').prepend('Your hero did ' + game.player.attackValue + ' damage to ' + game.defender.name + '(' + game.defender.hitPoints + 'hp).<br>');

        console.log(game.player);
        console.log(game.defender);
        if (game.defender.hitPoints < 1 && game.round == 3){
            $('.combatLog').prepend("you defeated " + game.defender.name + '!<br>');
            alert("You win!\nPress Ok to restart.");
            return statReset();
        }
        if (game.defender.hitPoints < 1){
            $('.combatLog').prepend("you defeated " + game.defender.name + "! Pick your next opponent.<br>");
            game.round++;
            $(game.thisDefender).fadeOut(500);
            game.defenderPicked = false;
        }
    }
    else {
        $('.combatLog').prepend("Pick your character and opponent first, you silly goose.<br>");
    }

});
// restart button or pick enemy 2


// attack

// restart button or pick enemy 3

// log win/loss and restart button