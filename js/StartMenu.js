Knight.StartMenu = function(game){
    this.startPrompt;
};

Knight.StartMenu.prototype = {
    create: function(){
        this.introImage = this.add.image(this.world.centerX,this.world.centerY,'intro');
        this.introImage.anchor.setTo(0.5,0.5);
        this.startPrompt = this.add.bitmapText(this.world.centerX-80,this.world.centerY,'font','Start',50);
        this.startPrompt.inputEnabled = true;
        this.startPrompt.events.onInputDown.addOnce(this.startGame,this);
    },
    startGame: function(pointer){
        this.state.start('Game');
    }
}
