var Knight = {};

Knight.Boot = function (game) {};

Knight.Boot.prototype = {
    preload: function(){
        this.load.image('preloaderBar','assets/sword.png');
        this.load.image('titleimage','assets/loader.png');
    },
    create: function(){
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 480;
        this.scale.minHeight = 270;
        this.scale.maxWidth = 1200;
        this.scale.maxHeight = 600;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.stage.forcePortrait = true;

        this.input.addPointer();
        this.stage.backgroundColor = '#1771642';

        this.state.start('Preloader');

    }
};