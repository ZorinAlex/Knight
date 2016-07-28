var enemies = [];
var bonuses = [];

function animationStopped(){
    this.isAppear = true;
}
function attackStopped(){
    setTimeout(function(){
        this.inAttack = false;
    }.bind(this),this.attackDelay);
}
//ENEMY-PARENT OBJECT

function Enemy(game,x,y,spriteName,health,attackDelay,appearDistance,goDistance,attackDistance,speed,hitForce,hitFrame,orient){

    this.enemy = game.add.sprite(x,y,spriteName);

    this.soundAppear = game.add.audio(spriteName+'_appear');
    this.soundAttack = game.add.audio(spriteName+'_attack');
    this.soundDead = game.add.audio(spriteName+'_dead');
    this.soundDamaged = game.add.audio(spriteName+'_damaged');

    this.attackDelay = attackDelay;
    this.attackDistance = attackDistance;
    this.isAppear = false;
    this.isDead = false;
    this.enemy.enemyAppear = false;
    this.enemy.enemyAttack = false;
    this.appearDistance = appearDistance;
    this.facing = "left";
    this.inAttack = false;
    this.hit = false;
    this.prevFrame = 0;
    this.health = health;
    this.maxhealth = health;
    this.hitForce = hitForce;
    this.hitFrame = hitFrame;
    this.orient = orient;

    this.enemy.anchor.setTo(0.5,1);

    this.healthlineX = this.enemy.x;
    this.healthlineY = this.enemy.y-this.enemy.height-20;

    ///lifeline
    this.bmdb = game.add.bitmapData(104, 8);

    this.bmdb.ctx.beginPath();
    this.bmdb.ctx.rect(0, 0, 350, 176);
    this.bmdb.ctx.fillStyle = '#00685e';
    this.bmdb.ctx.fill();

    this.bglife = game.add.sprite(this.healthlineX, this.healthlineY, this.bmdb);
    this.bglife.anchor.set(0.5);

    this.bmd = game.add.bitmapData(100, 5);
    this.bmd.ctx.beginPath();
    this.bmd.ctx.rect(0, 0, 300, 80);
    this.bmd.ctx.fillStyle = '#00f910';
    this.bmd.ctx.fill();

    this.widthLife = new Phaser.Rectangle(0, 0, this.bmd.width, this.bmd.height);
    this.totalLife = this.bmd.width;

    this.life = game.add.sprite(this.healthlineX-this.bglife.width/2+2, this.healthlineY, this.bmd);
    this.life.anchor.y = 0.5;
    this.life.cropEnabled = true;
    this.life.crop(this.widthLife);

    this.bglife.visible = false;
    this.life.visible = false;
    ///

    this.create = function(){

    };
    this.updateLifeLine = function(){
        this.widthLife.width =(100*this.health)/this.maxhealth;
        this.life.updateCrop();

    };
    this.redrawHealthLine = function(){

        this.bglife.x = this.enemy.x;
        this.bglife.y = this.enemy.y-this.enemy.height-20;

        this.life.x = this.enemy.x-this.bglife.width+54;
        this.life.y = this.enemy.y-this.enemy.height-20;

    };
    this.start = function(){

        if(!this.isAppear){

            this.enemy.animations.play('appear');
            this.soundAppear.play();

            this.bglife.visible = true;
            this.life.visible = true;
        }
        this.enemy.enemyAppear.onComplete.add(animationStopped,this);
        this.enemy.enemyAttack.onComplete.add(attackStopped, this);

        if(this.enemy.enemyAttack.currentFrame.index==this.hitFrame&&this.prevFrame==this.hitFrame-1){
            this.hit = true;
        }else{
            this.hit = false;
        }

        this.prevFrame = this.enemy.enemyAttack.currentFrame.index;

        if(this.isAppear&&!this.isDead){
            if(Math.abs(this.enemy.x - player.x)<=goDistance){
                if(Math.abs(this.enemy.x - player.x)<=this.attackDistance){

                    if(!this.inAttack){
                        this.enemy.animations.play('attack');
                        this.soundAttack.play();
                        this.inAttack = true;
                    }
                }else{
                    this.inAttack = false;
                    if(!this.orient){
                        if(this.enemy.x - player.x>0){
                            if(this.facing!="left"){
                                this.facing = "left";
                                this.enemy.scale.setTo(1,1);
                            }
                            this.enemy.animations.play('walk');
                            this.redrawHealthLine();
                            this.enemy.x-=speed;

                        }else{
                            if(this.facing=="left"){
                                this.facing="right";
                                this.enemy.scale.setTo(-1,1);
                            }
                            this.enemy.animations.play('walk');
                            this.redrawHealthLine();
                            this.enemy.x+=speed;
                        }
                    }else{
                        if(this.enemy.x - player.x>0){
                            if(this.facing!="right"){
                                this.facing = "right";
                                this.enemy.scale.setTo(-1,1);
                            }
                            this.enemy.animations.play('walk');
                            this.redrawHealthLine();
                            this.enemy.x-=speed;

                        }else{
                            if(this.facing=="right"){
                                this.facing="left";
                                this.enemy.scale.setTo(1,1);
                            }
                            this.enemy.animations.play('walk');
                            this.redrawHealthLine();
                            this.enemy.x+=speed;
                        }
                    }

                }


            }else{
                this.enemy.animations.play('idle');
            }
        }
        if(this.health<=0&&!this.isDead){
            this.isDead = true;
            this.bglife.visible = false;
            this.life.visible = false;
            this.enemy.animations.play('dead');
            this.soundDead.play();

            enemies.forEach(function(item, i){
                if(item===this){
                    enemies.splice(i,1);
                }
            }.bind(this));
            setTimeout(function(){
                this.enemy.kill();

            }.bind(this),1000);

        }

    };

}

function Zombie(){

    Enemy.apply(this,arguments);

    this.create = function(){
        this.enemy.animations.add('idle', [
            'idle_1.png',
            'idle_2.png',
            'idle_3.png',
            'idle_4.png',
            'idle_5.png',
            'idle_6.png'
        ], 6, true, false);
        this.enemy.animations.add('walk', [
            'go_1.png',
            'go_2.png',
            'go_3.png',
            'go_4.png',
            'go_5.png',
            'go_6.png',
            'go_7.png',
            'go_8.png',
            'go_9.png',
            'go_10.png'
        ], 10, true, false);
        this.enemy.enemyAppear=this.enemy.animations.add('appear', [
            'appear_1.png',
            'appear_2.png',
            'appear_3.png',
            'appear_4.png',
            'appear_5.png',
            'appear_6.png',
            'appear_7.png',
            'appear_8.png',
            'appear_9.png',
            'appear_10.png',
            'appear_11.png'
        ], 10, false, false);
        this.enemy.enemyAttack=this.enemy.animations.add('attack', [
            'hit_1.png',
            'hit_2.png',
            'hit_3.png',
            'hit_4.png',
            'hit_5.png',
            'hit_6.png',
            'hit_7.png'
        ], 10, false, false);
        this.enemy.animations.add('dead', [
            'die_1.png',
            'die_2.png',
            'die_3.png',
            'die_4.png',
            'die_5.png',
            'die_6.png',
            'die_7.png',
            'die_8.png'
        ], 10, false, false);
        enemies.push(this);
    };
    return this;
}
function Dracula(){

    Enemy.apply(this,arguments);

    this.create = function(){
        this.enemy.animations.add('idle', [
            'go_1.png',
            'go_2.png',
            'go_3.png',
            'go_4.png',
            'go_5.png',
            'go_6.png',
            'go_7.png',
            'go_8.png'
        ], 6, true, false);
        this.enemy.animations.add('walk', [
            'go_1.png',
            'go_2.png',
            'go_3.png',
            'go_4.png',
            'go_5.png',
            'go_6.png',
            'go_7.png',
            'go_8.png'
        ], 10, true, false);
        this.enemy.enemyAppear=this.enemy.animations.add('appear', [
            'appear_12.png',
            'appear_11.png',
            'appear_10.png',
            'appear_9.png',
            'appear_8.png',
            'appear_7.png',
            'appear_6.png',
            'appear_5.png',
            'appear_4.png',
            'appear_3.png',
            'appear_2.png',
            'appear_1.png'
        ], 10, false, false);
        this.enemy.enemyAttack=this.enemy.animations.add('attack', [
            'hit_1.png',
            'hit_2.png',
            'hit_3.png',
            'hit_4.png',
            'hit_5.png',
            'hit_6.png',
            'hit_7.png',
            'hit_8.png',
            'hit_9.png',
            'hit_10.png',
            'hit_11.png',
            'hit_12.png',
            'hit_13.png'
        ], 10, false, false);
        this.enemy.animations.add('dead', [
            'appear_1.png',
            'appear_2.png',
            'appear_3.png',
            'appear_4.png',
            'appear_5.png',
            'appear_6.png',
            'appear_7.png',
            'appear_8.png',
            'appear_9.png',
            'appear_10.png',
            'appear_11.png',
            'appear_12.png'
        ], 10, false, false);
        enemies.push(this);
    };
    return this;
}
function Golem(){

    Enemy.apply(this,arguments);

    this.create = function(){
        this.enemy.animations.add('idle', [
            'idle_1.png',
            'idle_2.png',
            'idle_3.png',
            'idle_4.png',
            'idle_5.png',
            'idle_6.png'
        ], 6, true, false);
        this.enemy.animations.add('walk', [
            'idle_1.png',
            'idle_2.png',
            'idle_3.png',
            'idle_4.png',
            'idle_5.png',
            'idle_6.png'
        ], 10, true, false);
        this.enemy.enemyAppear=this.enemy.animations.add('appear', [
            'appear_1.png',
            'appear_2.png',
            'appear_3.png',
            'appear_4.png',
            'appear_5.png',
            'appear_6.png',
            'appear_7.png',
            'appear_8.png',
            'appear_9.png',
            'appear_10.png',
            'appear_11.png',
            'appear_12.png'
        ], 10, false, false);
        this.enemy.enemyAttack=this.enemy.animations.add('attack', [
            'hit_1.png',
            'hit_2.png',
            'hit_3.png',
            'hit_4.png',
            'hit_5.png',
            'hit_6.png'
        ], 10, false, false);
        this.enemy.animations.add('dead', [
            'die_1.png',
            'die_2.png',
            'die_3.png',
            'die_4.png',
            'die_5.png',
            'die_6.png',
            'die_7.png'
        ], 10, false, false);
        enemies.push(this);
    };
    return this;
}
function Skeleton(){

    Enemy.apply(this,arguments);

    this.create = function(){
        this.enemy.animations.add('idle', [
            'idle_1.png',
            'idle_2.png',
            'idle_3.png',
            'idle_4.png',
            'idle_5.png',
            'idle_6.png'
        ], 6, true, false);
        this.enemy.animations.add('walk', [
            'go_1.png',
            'go_2.png',
            'go_3.png',
            'go_4.png',
            'go_5.png',
            'go_6.png',
            'go_7.png',
            'go_8.png'
        ], 10, true, false);
        this.enemy.enemyAppear=this.enemy.animations.add('appear', [
            'appear_1.png',
            'appear_2.png',
            'appear_3.png',
            'appear_4.png',
            'appear_5.png',
            'appear_6.png',
            'appear_7.png',
            'appear_8.png',
            'appear_9.png',
            'appear_10.png'
        ], 10, false, false);
        this.enemy.enemyAttack=this.enemy.animations.add('attack', [
            'hit_1.png',
            'hit_2.png',
            'hit_3.png',
            'hit_4.png',
            'hit_5.png',
            'hit_6.png',
            'hit_7.png',
            'hit_8.png'
        ], 10, false, false);
        this.enemy.animations.add('dead', [
            'die_1.png',
            'die_2.png',
            'die_3.png',
            'die_4.png',
            'die_5.png',
            'die_6.png',
            'die_7.png',
            'die_8.png'
        ], 10, false, false);
        enemies.push(this);
    };
    return this;
}
function Skeleton2(){

    Enemy.apply(this,arguments);

    this.create = function(){
        this.enemy.animations.add('idle', [
            'idle_1.png',
            'idle_2.png',
            'idle_3.png',
            'idle_4.png',
            'idle_5.png',
            'idle_6.png',
            'idle_7.png',
            'idle_8.png',
            'idle_9.png',
            'idle_10.png'
        ], 6, true, false);
        this.enemy.animations.add('walk', [
            'walk_1.png',
            'walk_2.png',
            'walk_3.png',
            'walk_4.png',
            'walk_5.png',
            'walk_7.png',
            'walk_8.png'

        ], 10, true, false);
        this.enemy.enemyAppear=this.enemy.animations.add('appear', [
            'idle_1.png',
            'idle_2.png',
            'idle_3.png',
            'idle_4.png',
            'idle_5.png',
            'idle_6.png',
            'idle_7.png',
            'idle_8.png',
            'idle_9.png',
            'idle_10.png'
        ], 10, false, false);
        this.enemy.enemyAttack=this.enemy.animations.add('attack', [
            'attack_1.png',
            'attack_2.png',
            'attack_3.png',
            'attack_4.png',
            'attack_5.png',
            'attack_6.png',
            'attack_7.png',
            'attack_8.png',
            'attack_9.png',
            'attack_10.png'
        ], 10, false, false);
        this.enemy.animations.add('dead', [
            'dead_1.png',
            'dead_2.png',
            'dead_3.png',
            'dead_4.png',
            'dead_5.png',
            'dead_6.png',
            'dead_7.png'
        ], 10, false, false);
        enemies.push(this);
    };
    return this;
}
function Darksaber(){

    Enemy.apply(this,arguments);

    this.create = function(){
        //this.facing = "right";
        this.enemy.animations.add('idle', [
            'stand_10.png',
            'stand_11.png',
            'stand_12.png',
            'stand_13.png',
            'stand_14.png',
            'stand_15.png',
            'stand_16.png',
            'stand_17.png',
            'stand_18.png',
            'stand_19.png',
            'stand_20.png',
            'stand_21.png',
            'stand_22.png',
            'stand_23.png',
            'stand_24.png'
        ], 30, true, false);
        this.enemy.animations.add('walk', [
            'walk_01.png',
            'walk_02.png',
            'walk_03.png',
            'walk_04.png',
            'walk_05.png',
            'walk_06.png',
            'walk_07.png',
            'walk_08.png',
            'walk_09.png',
            'walk_10.png'
        ], 30, true, false);
        this.enemy.enemyAppear=this.enemy.animations.add('appear', [
            'stand_10.png'
        ], 30, false, false);
        this.enemy.enemyAttack=this.enemy.animations.add('attack', [
            'attack_1.png',
            'attack_2.png',
            'attack_3.png',
            'attack_4.png',
            'attack_5.png',
            'attack_6.png',
            'attack_7.png',
            'attack_8.png',
            'attack_9.png',
            'attack_10.png',
            'attack_11.png',
            'attack_12.png',
            'attack_13.png',
            'attack_14.png',
            'attack_15.png',
            'attack_16.png',
            'attack_17.png',
            'attack_18.png',
            'attack_19.png',
            'attack_20.png',
            'attack_21.png',
            'attack_22.png',
            'attack_23.png',
            'attack_24.png',
            'attack_25.png',
            'attack_26.png',
            'attack_27.png',
            'attack_28.png',
            'attack_29.png',
            'attack_30.png',
            'attack_31.png',
            'attack_32.png',
            'attack_33.png'
        ], 30, false, false);
        this.enemy.animations.add('dead', [
            'death_30.png',
            'death_31.png',
            'death_32.png',
            'death_33.png',
            'death_34.png',
            'death_35.png',
            'death_36.png',
            'death_37.png',
            'death_38.png',
            'death_39.png',
            'death_40.png',
            'death_41.png',
            'death_42.png',
            'death_43.png',
            'death_44.png',
            'death_45.png',
            'death_46.png',
            'death_47.png',
            'death_48.png',
            'death_49.png',
            'death_50.png',
            'death_51.png',
            'death_52.png',
            'death_53.png',
            'death_54.png',
            'death_55.png',
            'death_56.png',
            'death_57.png',
            'death_58.png',
            'death_59.png',
            'death_60.png',
            'death_61.png',
            'death_62.png',
            'death_63.png',
            'death_64.png',
            'death_65.png',
            'death_66.png',
            'death_67.png',
            'death_68.png',
            'death_69.png',
            'death_70.png',
            'death_71.png',
            'death_72.png',
            'death_73.png',
            'death_74.png',
            'death_75.png',
            'death_76.png',
            'death_77.png',
            'death_78.png',
            'death_79.png',
            'death_80.png',
            'death_81.png',
            'death_82.png',
            'death_83.png',
            'death_84.png',
            'death_85.png',
            'death_86.png',
            'death_87.png',
            'death_88.png',
            'death_89.png',
            'death_90.png',
            'death_91.png',
            'death_92.png',
            'death_93.png',
            'death_94.png',
            'death_95.png',
            'death_96.png',
            'death_97.png',
            'death_98.png',
            'death_99.png',
            'death_100.png',
            'death_101.png'
        ], 40, false, false);
        enemies.push(this);
    };
    return this;
}

var player;
var jumpHorVelocity = 0;
var inAttack = false;
var Hit = false;
var JumpHit = false;
var inJumpAttack = false;
var facing = 'left';
var jumpTimer = 0;
var layer;
var bg;
var map;

var zombie;
var golem;
var skeleton;
var skeleton2;
var dracula;
var darksaber;

var playerDead;
var playerAttack;
var playerJumpAttack;
var playerIsDead = false;
var prevFrame;
var prevJumpFrame;

function Bonus(x,y,power,image){
    this.x = x;
    this.y = y;
    this.power = power;
    this.image = image
}

function createBonus(game,x,y,power){
    var image = game.add.image(x, y, 'bonus');
    var bonus = new Bonus(x,y,power,image);

    bonuses.push(bonus);
}

Knight.Game = function(game){

};

Knight.Game.prototype = {

    create:function(){

        this.buildWorld();
        this.buildEnemies();
        this.buildPlayer();

        bmd = this.add.bitmapData(300, 40);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 300, 80);
        bmd.ctx.fillStyle = '#00685e';
        bmd.ctx.fill();

        bglife = this.add.sprite(this.camera.x+200, this.camera.y+50, bmd);
        bglife.anchor.set(0.5);
        bglife.fixedToCamera = true;

        bmd = this.add.bitmapData(280, 30);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 300, 80);
        bmd.ctx.fillStyle = '#00f910';
        bmd.ctx.fill();
        bmd.fixedToCamera = true;

        this.widthLife = new Phaser.Rectangle(0, 0, bmd.width, bmd.height);
        this.totalLife = bmd.width;

        this.life = this.add.sprite(this.camera.x+200 - bglife.width/2 + 10, this.camera.y+50, bmd);
        this.life.anchor.y = 0.5;
        this.life.cropEnabled = true;
        this.life.crop(this.widthLife);
        this.life.fixedToCamera = true;

    },

    buildWorld: function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.setBounds(0, 0, 10240, 896);

        this.soundBonus = this.add.audio('bonus');
        this.soundGame_over = this.add.audio('game_over');
        this.soundLevel_start = this.add.audio('level_start');
        this.soundWin = this.add.audio('win');

        bg = this.add.tileSprite(0, 0, 10240, 896, 'background');
        map = this.add.tilemap('map');
        map.addTilesetImage('level2','leveltile');

        this.moon = this.add.image(-500, 460, 'moon');
        this.moon.anchor.setTo(0.5,0.5);

        createBonus(this,1350,250,20);
        createBonus(this,5100,250,30);
        createBonus(this,9350,250,40);

        layer = map.createLayer('ground');
        this.layer = map.createLayer('trees');
        this.layer = map.createLayer('skull');
        this.layer = map.createLayer('tomb');

        this.gameover = false;

        this.layer.resizeWorld();

        map.setCollision([1,2,3,4,5,6,7]);

        cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR,Phaser.Keyboard.SHIFT ]);

        this.soundLevel_start.play();
    },
    buildPlayer: function(){
        player = this.add.sprite(10, 650, 'player', 'Idle (1).png');
        player.anchor.setTo(0.5,0.5);

        player.soundAttack = this.add.audio('player_attack');
        player.soundDamaged = this.add.audio('player_damaged');
        player.soundDead = this.add.audio('player_dead');

        this.physics.arcade.gravity.y = 300;
        this.physics.enable(player);
        player.body.gravity.y = 1000;
        player.body.bounce.y = 0.1;
        player.body.collideWorldBounds = true;
        player.body.maxVelocity.y = 1000;
        player.body.health = 100;
        this.camera.follow(player);

        player.animations.add('idle', [
            'Idle (1).png',
            'Idle (2).png',
            'Idle (3).png',
            'Idle (4).png',
            'Idle (5).png',
            'Idle (6).png',
            'Idle (7).png',
            'Idle (8).png',
            'Idle (9).png',
            'Idle (10).png'
        ], 10, true, false);
        player.animations.add('walk', [
            'Walk (1).png',
            'Walk (2).png',
            'Walk (3).png',
            'Walk (4).png',
            'Walk (5).png',
            'Walk (6).png',
            'Walk (7).png',
            'Walk (8).png',
            'Walk (9).png',
            'Walk (10).png'
        ], 10, true, false);
        player.animations.add('run', [
            'Run (1).png',
            'Run (2).png',
            'Run (3).png',
            'Run (4).png',
            'Run (5).png',
            'Run (6).png',
            'Run (7).png',
            'Run (8).png',
            'Run (9).png',
            'Run (10).png'
        ], 10, true, false);
        player.animations.add('jump', [
            'Jump (1).png',
            'Jump (2).png',
            'Jump (3).png',
            'Jump (4).png',
            'Jump (5).png',
            'Jump (6).png',
            'Jump (7).png',
            'Jump (8).png',
            'Jump (9).png',
            'Jump (10).png'
        ], 10, false, false);
        playerAttack = player.animations.add('attack', [
            'Attack (1).png',
            'Attack (2).png',
            'Attack (3).png',
            'Attack (4).png',
            'Attack (5).png',
            'Attack (6).png',
            'Attack (7).png',
            'Attack (8).png',
            'Attack (9).png',
            'Attack (10).png'
        ], 20, false, false);
        playerJumpAttack=player.animations.add('jump_attack', [
            'JumpAttack (1).png',
            'JumpAttack (2).png',
            'JumpAttack (3).png',
            'JumpAttack (4).png',
            'JumpAttack (5).png',
            'JumpAttack (6).png',
            'JumpAttack (7).png',
            'JumpAttack (8).png',
            'JumpAttack (9).png',
            'JumpAttack (10).png'
        ], 10, false, false);
        playerDead = player.animations.add('dead', [
            'Dead (1).png',
            'Dead (2).png',
            'Dead (3).png',
            'Dead (4).png',
            'Dead (5).png',
            'Dead (6).png',
            'Dead (7).png',
            'Dead (8).png',
            'Dead (9).png',
            'Dead (10).png'
        ], 10, false, false);

    },
    buildEnemies: function(){
//Enemy(game,x,y,spriteName,health,attackDelay,appearDistance,goDistance,attackDistance,speed,hitForce,hitFrame)
        zombie = new Zombie(this,1000,770,'zombie',80,800,500,350,120,1,7,15);
        zombie.create();

        dracula = new Dracula(this,2200,770,'dracula',100,800,500,450,130,2,13,26);
        dracula.create();

        golem = new Golem(this,3000,770,'golem',100,1000,500,380,250,1,15,23);
        golem.create();

        skeleton = new Skeleton(this,4500,780,'skeleton',50,500,500,350,120,2,7,15);
        skeleton.create();

        skeleton2 = new Skeleton2(this,7000,790,'skeleton2',120,800,800,350,120,1,10,13);
        skeleton2.create();

        darksaber = new Darksaber(this,10000,800,'darksaber',120,1000,1000,850,200,5,20,13,1);
        darksaber.create();

    },
    update:function(){


            this.moon.x =this.moon.x + 1;
        if(this.moon.x-500>this.world.centerX*2){
            this.moon.x = -500;
        }


        this.physics.arcade.collide(player, layer);

            player.body.velocity.x = 0;

            if (player.body.health <= 0 && !playerIsDead) {
                playerIsDead = true;
                player.body.health = 0;
                player.animations.play('dead');
                player.soundDead.play();
                playerDead.onComplete.add(gameover, this);
            }

            if (!playerIsDead) {

                if (!inJumpAttack && !inAttack && cursors.left.isDown && player.body.onFloor()) {

                    if (facing != 'left') {
                        player.scale.setTo(-1, 1);
                        facing = 'left';
                    } else {
                        if (this.shiftKey.isDown) {
                            player.body.velocity.x = -450;
                            jumpHorVelocity = -450;
                            player.animations.play('run');
                        } else {
                            player.body.velocity.x = -250;
                            jumpHorVelocity = -250;
                            player.animations.play('walk');
                        }
                    }
                } else if (!inJumpAttack && !inAttack && cursors.right.isDown && player.body.onFloor()) {
                    if (facing != 'right') {
                        player.scale.setTo(1, 1);
                        //player.animations.play('walk');
                        facing = 'right';
                    } else {
                        if (this.shiftKey.isDown) {
                            player.body.velocity.x = 450;
                            jumpHorVelocity = 450;
                            player.animations.play('run');
                        } else {
                            player.body.velocity.x = 250;
                            jumpHorVelocity = 250;
                            player.animations.play('walk');
                        }
                    }
                } else {
                    if (!inJumpAttack && !inAttack && player.body.onFloor()) {
                        player.animations.play('idle');
                        jumpHorVelocity = 0;
                    }

                }

                if (cursors.up.isDown && player.body.onFloor() && !inJumpAttack && !inAttack && this.time.now > jumpTimer) {
                    player.body.velocity.y = -1100;
                    jumpTimer = this.time.now + 600;
                    player.animations.play('jump');
                }

                if (inAttack) {
                    player.animations.play('attack');
                }
                if (inJumpAttack) {
                    player.animations.play('jump_attack');
                }

                if (this.spaceKey.isDown && !inJumpAttack && !inAttack && player.body.onFloor()) {
                    if (this.shiftKey.isDown) {
                        inJumpAttack = true;
                        setTimeout(function () {
                            inJumpAttack = false;
                        }, 500);
                        player.body.velocity.y = -500;
                    } else {
                        inAttack = true;
                        setTimeout(function () {
                            inAttack = false;
                        }, 500);
                    }

                }

                if (!player.body.onFloor()) {
                    player.body.velocity.x = jumpHorVelocity;
                }

            }
            if (playerAttack.currentFrame.index == 6 && prevFrame == 5) {
                Hit = true;
                player.soundAttack.play();
            } else {
                Hit = false;
            }
            prevFrame = playerAttack.currentFrame.index;

            if (playerJumpAttack.currentFrame.index == 44 && prevJumpFrame == 43) {
                JumpHit = true;
                player.soundAttack.play();
            } else {
                JumpHit = false;
            }

            prevJumpFrame = playerJumpAttack.currentFrame.index;
            //Start Enemy
        if(!this.gameover){
            enemies.forEach(function (item) {
                if (Math.abs(item.enemy.x - player.x) < item.appearDistance) {
                    item.start();
                }
                //Collisions check
                if (inContact(player, item)) {

                    if (item.hit) {
                        player.body.health -= item.hitForce;
                        player.soundDamaged.play();
                    }
                    if (Hit) {
                        item.health -= 10;
                        item.updateLifeLine();
                        item.soundDamaged.play();
                    }
                    if (JumpHit) {
                        item.health -= 15;
                        item.updateLifeLine();
                        item.soundDamaged.play();
                    }
                }
            });
        if(!playerIsDead){
            this.widthLife.width = player.body.health*2.9;
            this.life.updateCrop();
        }else{
            this.widthLife.width =0;
            this.life.updateCrop();
        }
            //bonus pickup
            bonuses.forEach(function(item,i){

                    if ((Math.abs(item.x - player.body.x)<50)&&(Math.abs(item.y - player.body.y)<70)) {
                        player.body.health += item.power;
                        bonuses.splice(i,1);
                        item.image.kill();
                        this.soundBonus.play();
                        if(player.body.health>100){
                            player.body.health=100;
                        }
                    }

            }.bind(this));
        }
        if(enemies.length==0){
            win.call(this);
        }
    }

};

function inContact(obj1, obj2){
    if((Math.abs(obj1.x-obj2.enemy.x)<obj2.attackDistance)&&(Math.abs(obj1.y-obj2.enemy.y+obj2.enemy.height/2)<120)){
    return true;
    }
}

function gameover(){
    this.gameover = true;
    this.startPrompt = this.add.bitmapText(this.camera.width / 2-200, this.camera.height / 2-50,'font','Game over',80);
    this.startPrompt.fixedToCamera = true;
    this.soundGame_over.play();
}
function win(){
    this.startPrompt = this.add.bitmapText(this.camera.width / 2-120, this.camera.height / 2-50,'font','WIN!!',80);
    this.startPrompt.fixedToCamera = true;
    this.soundWin.play();
}