// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -2;
var player;

var LS;
var step = 3;
var count = 0;
var pipes;
var hscore = 0;
var GS;


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("BL", "assets/Ballon_2.0.01.jpg");
game.load.audio("BS", "assets/Clash_of_Clans_-_54_Balloon_Attack_ogg_mp3cut.foxcom.su_.mp3");
    game.load.image("Pib", "assets/pipe_red.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    game.stage.setBackgroundColor("#1BF5F5");
    game.add.text(100, 200, "Play the Game!!!!", {font: "30px Blackoak Std", fill: "#FF0000"});
    game.add.sprite(20, 20, "BL");
    game.add.sprite(620, 20, "BL");
    game.add.sprite(20, 300, "BL");
    game.add.sprite(620, 300, "BL");



    LS = game.add.text(350,300, "Your Score: "+(score-2).toString());
    GS = game.add.text(350,15,"High Score: "+hscore.toString());
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    pipes = game.add.group();
game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(80, 200, "BL");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 170;
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
generate_pipe();
    var pipe_interval = 1.75;
    game.time.events.loop(pipe_interval * Phaser.Timer.SECOND, generate_pipe);
    score = -1
    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(game_over);




}

function update() {
    game.physics.arcade.overlap(player, pipes, game_over)

}





function moveRight() {
    player.x +=step
}

function moveLeft() {
    player.x -=step
}

function moveUp() {
    player.y -= step
}

function moveDown() {
    player.y +=step
}
function generate_pipe(){
    var gap_start = game.rnd.integerInRange(1, 5);
    for(var count = 0; count < 8; count++){
        if(count != gap_start && count != gap_start+1 && count != gap_start+2){
            add_pipe_block(800, 50 *count);
        }
    }
    changeScore();
}

function changeScore(){
    score+=1;
    LS.setText("Your Score: "+score.toString());
}

function player_jump(){
    player.body.velocity.y=-150;
    game.sound.play("BS")

}
function add_pipe_block(x, y){
    var pipe = pipes.create(x,y,"Pib");
    game.physics.arcade.enable(pipe)
    pipe.body.velocity.x = -200
}
function game_over(){
    if (score > hscore){
        hscore = score;
        GS.setText(score.toString());
    }
    game.state.restart();
}