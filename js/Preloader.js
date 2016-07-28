Knight.Preloader = function(game){
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

Knight.Preloader.prototype = {
  preload: function(){

      this.titleText = this.add.image(this.world.centerX,this.world.centerY,'titleimage');
      this.titleText.anchor.setTo(0.5,0.5);
      this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY+200,'preloaderBar');
      this.preloadBar.anchor.setTo(0.5,0.5);
      this.load.setPreloadSprite(this.preloadBar);

      this.load.bitmapFont('font','assets/fonts/font.png','assets/fonts/font.fnt');

      this.load.tilemap('map', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);

      this.load.image('background', 'assets/sky.jpg');
      this.load.image('moon', 'assets/moon.png');
      this.load.image('intro', 'assets/Preloader.jpg');
      this.load.image('leveltile', 'assets/level2.png');
      this.load.image('bonus', 'assets/bonus.png');

      this.load.atlasJSONHash('player','assets/player/player.png','assets/player/player.json');
      this.load.atlasJSONHash('zombie','assets/Monsters/Zombie/zombie.png','assets/Monsters/Zombie/zombie.json');
      this.load.atlasJSONHash('dracula','assets/Monsters/Dracula/Dracula.png','assets/Monsters/Dracula/Dracula.json');
      this.load.atlasJSONHash('golem','assets/Monsters/Golem/Golem.png','assets/Monsters/Golem/Golem.json');
      this.load.atlasJSONHash('skeleton','assets/Monsters/Skeleton/Skeleton.png','assets/Monsters/Skeleton/Skeleton.json');
      this.load.atlasJSONHash('skeleton2','assets/Monsters/Skeleton2/Skeleton2.png','assets/Monsters/Skeleton2/Skeleton2.json');

      this.load.audio('zombie_appear', 'assets/Monsters/Zombie/audio/appear.mp3');
      this.load.audio('zombie_attack', 'assets/Monsters/Zombie/audio/attack.mp3');
      this.load.audio('zombie_dead', 'assets/Monsters/Zombie/audio/dead.mp3');
      this.load.audio('zombie_damaged', 'assets/Monsters/Zombie/audio/damaged.mp3');

      this.load.audio('dracula_appear', 'assets/Monsters/Dracula/audio/appear.mp3');
      this.load.audio('dracula_attack', 'assets/Monsters/Dracula/audio/attack.mp3');
      this.load.audio('dracula_dead', 'assets/Monsters/Dracula/audio/dead.mp3');
      this.load.audio('dracula_damaged', 'assets/Monsters/Dracula/audio/damaged.mp3');

      this.load.audio('golem_appear', 'assets/Monsters/Golem/audio/appear.mp3');
      this.load.audio('golem_attack', 'assets/Monsters/Golem/audio/attack.mp3');
      this.load.audio('golem_dead', 'assets/Monsters/Golem/audio/dead.mp3');
      this.load.audio('golem_damaged', 'assets/Monsters/Golem/audio/damaged.mp3');

      this.load.audio('skeleton_appear', 'assets/Monsters/Skeleton/audio/appear.mp3');
      this.load.audio('skeleton_attack', 'assets/Monsters/Skeleton/audio/attack.mp3');
      this.load.audio('skeleton_dead', 'assets/Monsters/Skeleton/audio/dead.mp3');
      this.load.audio('skeleton_damaged', 'assets/Monsters/Skeleton/audio/damaged.mp3');

      this.load.audio('skeleton2_appear', 'assets/Monsters/Skeleton2/audio/appear.mp3');
      this.load.audio('skeleton2_attack', 'assets/Monsters/Skeleton2/audio/attack.mp3');
      this.load.audio('skeleton2_dead', 'assets/Monsters/Skeleton2/audio/dead.mp3');
      this.load.audio('skeleton2_damaged', 'assets/Monsters/Skeleton2/audio/damaged.mp3');

      this.load.audio('player_attack', 'assets/player/audio/attack.mp3');
      this.load.audio('player_dead', 'assets/player/audio/dead.mp3');
      this.load.audio('player_damaged', 'assets/player/audio/damaged.mp3');

      this.load.audio('bonus', 'assets/audio/bonus.mp3');
      this.load.audio('game_over', 'assets/audio/game_over.mp3');
      this.load.audio('level_start', 'assets/audio/levelstart.mp3');
      this.load.audio('win', 'assets/audio/win.mp3');


  },
    create: function(){
        this.preloadBar.cropEnabled = false;

    },
    update: function(){
        this.ready = true;
        this.state.start('StartMenu');
    }
};