class Game {
  constructor(game, config, player) {
    this.game = game;
    this.config = config;
    this.player = player;
  };
};

class Player {
  constructor(game, x, y) {
    // Player sprite.
    this.sprite = game.physics.add.sprite(x, y, 'dude');
    //  Player physics properties.
    this.sprite.setCollideWorldBounds(true);

    // Player hitpoints. Starts with 100hp.
    this.hp = 100;
  };

  receiveDmg() {
    this.hp -= 10;

    if(this.hp == 0) {
      gameOver = true;
    }
  }
}

class Enemies {

  constructor(game, platforms, player) {
    Enemies.list = game.physics.add.group();
    game.physics.add.collider(Enemies.list, platforms);

  }

  createEnemy(x, y, player) {
    var enemy = Enemies.list.create(x, y, 'enemy').setScale(0.3);
    enemy.setVelocityX(50);
  }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var coins;
var bombs;
var platforms;
var enemies;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var level = 1;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'resources/sky.png');

    // 16x16
    this.load.image('ground', 'resources/ground.png');
    this.load.image('coin', 'resources/coin.png');
    this.load.spritesheet('dude', 'resources/miner.png', { frameWidth: 100, frameHeight: 80 });
    this.load.spritesheet('walking', 'resources/walking.png', { frameWidth: 37, frameHeight: 101 });
    this.load.image('enemy', 'resources/diglet.png');
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 400, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    // The bitcoins to be collected
    coins = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    for(var i = 0; i < 25; i++) {
      platforms.create(24+i*48, 224, 'ground').setScale(3).refreshBody();
    }

    player = new Player(this, 400, 100);

    enemies = new Enemies(this, platforms, player);

    for(var i = 0; i < 25; i++) {
      for(var j = 1; j < 15; j++) {
        if(Math.random() > 0.5) {
          platforms.create(24+i*48, 224+48*j, 'ground').setScale(3).refreshBody();
        } else {
          if(Math.random() > 0.9) {
            coins.create(24+i*48, 225+48*j, 'coin').setScale(0.8).refreshBody();
          } else if(Math.random() > 0.9) {
            enemies.createEnemy(24+i*48, 225+48*j, player);
          }
        }

      }
    }

    this.physics.world.setBounds(0, 0, 800, 1000, true, true, true, true);

    // The player and its settings
    // player = this.physics.add.sprite(400, 100, 'dude');
    this.cameras.main.setBounds(0, 0, 400, 1000);
    this.cameras.main.startFollow(player.sprite);
    this.cameras.main.setBackgroundColor('#3d0c02');

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('walking', { start: 7, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('walking', { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'dig',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
        frameRate: 5,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    scoreText.setScrollFactor(0);


    //  Collide the player and the coins with the platforms
    this.physics.add.collider(player.sprite, platforms);

    //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoin function
    this.physics.add.overlap(player.sprite, coins, collectcoin, null, this);
}

function update ()
{
    if (gameOver)
    {
        console.log("GAME OVER");
        return;
    }

    if (cursors.left.isDown)
    {
        player.sprite.setVelocityX(-160);

        player.sprite.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.sprite.setVelocityX(160);

        player.sprite.anims.play('right', true);
    }
    else
    {
        player.sprite.setVelocityX(0);

        player.sprite.anims.play('turn');
    }

    if (cursors.up.isDown && player.sprite.body.touching.down)
    {
        player.sprite.setVelocityY(-330);
    }

    if (cursors.down.isDown) {
      player.sprite.anims.play('dig', true);

      platforms.children.iterate(function (child) {
        try {
          if(child.x >= player.sprite.x + 5 && child.x <= player.sprite.x + 50 && child.y <= player.sprite.y + 70 && child.y >= player.sprite.y) {
            child.destroy();
          }
        } catch {
          console.log("FIX ME");
        }
      });
    }

    if (player.sprite.y >= 440) {
      scoreText.style.color = "#ffff00";
    }

    Enemies.list.children.iterate(function (child) {
      if(child.body.touching.left) {
        child.setVelocityX(50);
      } else if(child.body.touching.right) {
        child.setVelocityX(-50);
      };
    });
}

function collectcoin (player, coin)
{
    coin.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (score > 10) {
        console.log("WIN");
    }
}
