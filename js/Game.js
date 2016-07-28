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

function Enemy(game,x,y,spriteName,health,attackDelay,appearDistance,goDistance,attackDistance,speed,hitForce,hitFrame){

    this.enemy = game.add.sprite(x,y,spriteName);

    this.soundAppear = game.add.audio(spriteName+'_appear');
    this.soundAttack = game.add.audio(spriteName+'_attack');
    this.soundDead = game.add.audio(spriteName+'_dead');
    this.soundDamaged = game.add.audio(spriteName+'_damaged');

    this.attackDelay = attackDelay;
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
    this.hitForce = hitForce;
    this.hitFrame = hitFrame;

    this.enemy.anchor.setTo(0.5,0.5);

    this.create = function(){

    };

    this.start = function(){

        if(!this.isAppear){
            this.enemy.animations.play('appear');
            this.soundAppear.play();
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
                if(Math.abs(this.enemy.x - player.x)<=attackDistance){

                    if(!this.inAttack){
                        this.enemy.animations.play('attack');
                        this.soundAttack.play();
                        this.inAttack = true;
                    }
                }else{
                    this.inAttack = false;
                    if(this.enemy.x - player.x>0){
                        if(this.facing!="left"){
                            this.facing = "left";
                            this.enemy.scale.setTo(1,1);
                        }
                        this.enemy.animations.play('walk');
                        this.enemy.x-=1;

                    }else{
                        if(this.facing=="left"){
                            this.facing="right";
                            this.enemy.scale.setTo(-1,1);
                        }
                        this.enemy.animations.play('walk');
                        this.enemy.x+=speed;
                    }
                }


            }else{
                this.enemy.animations.play('idle');
            }
        }
        if(this.health<=0&&!this.isDead){
            this.isDead = true;
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

        zombie = new Zombie(this,1000,680,'zombie',80,800,500,350,120,1,7,15);
        zombie.create();


        dracula = new Dracula(this,1800,675,'dracula',100,800,500,450,130,2,13,26);
        dracula.create();


        golem = new Golem(this,2500,665,'golem',120,1000,500,380,250,1,15,23);
        golem.create();


        skeleton = new Skeleton(this,3500,675,'skeleton',50,500,500,350,120,2,7,15);
        skeleton.create();


        skeleton2 = new Skeleton2(this,4500,660,'skeleton2',120,800,500,350,120,1,10,13);
        skeleton2.create();

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
                        player.animations.play('walk');
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
                    player.soundAttack.play();
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
                if (inContact(player, item.enemy)) {

                    if (item.hit) {
                        player.body.health -= item.hitForce;
                        player.soundDamaged.play();
                    }
                    if (Hit) {
                        item.health -= 10;
                        item.soundDamaged.play();
                    }
                    if (JumpHit) {
                        item.health -= 15;
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
    }

};

function inContact(obj1, obj2){
    if((Math.abs(obj1.x-obj2.x)<120)&&(Math.abs(obj1.y-obj2.y)<120)){
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
    this.startPrompt = this.add.bitmapText(this.camera.width / 2-200, this.camera.height / 2-50,'font','WIN!!',80);
    this.startPrompt.fixedToCamera = true;
    this.soundWin.play();
}