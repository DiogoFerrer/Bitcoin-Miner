var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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

    for(var i = 0; i < 25; i++) {
      for(var j = 1; j < 15; j++) {
        if(Math.random() > 0.5) {
          platforms.create(24+i*48, 224+48*j, 'ground').setScale(3).refreshBody();
        } else {
          if(Math.random() > 0.8) {
            coins.create(24+i*48, 225+48*j, 'coin').setScale(0.8).refreshBody();
          }
        }

      }
    }


    this.physics.world.setBounds(0, 0, 800, 1000, true, true, true, true);

    // The player and its settings
    player = this.physics.add.sprite(400, 100, 'dude');
    this.cameras.main.setBounds(0, 0, 400, 1000);
    this.cameras.main.startFollow(player);
    this.cameras.main.setBackgroundColor('#3d0c02');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { coint: 0, end: 9 }),
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
        frames: this.anims.generateFrameNumbers('dude', { coint: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'dig',
        frames: this.anims.generateFrameNumbers('dude', { coint: 0, end: 9 }),
        frameRate: 5,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some coins to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    // coins = this.physics.add.group({
    //     key: 'coin'
    // });

    // coins.children.iterate(function (child) {
    //
    //     //  Give each coin a slightly different bounce
    //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    //
    // });

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the coins with the platforms
    this.physics.add.collider(player, platforms);
    // this.physics.add.collider(coins, platforms);

    //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoin function
    this.physics.add.overlap(player, coins, collectcoin, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    if (cursors.down.isDown) {
      player.anims.play('dig', true);

      platforms.children.iterate(function (child) {
        try {
          if(child.x >= player.x + 5 && child.x <= player.x + 50 && child.y <= player.y + 70 && child.y >= player.y) {
            child.destroy();
          }
        } catch {
          console.log("FIX ME");
        }
      });
    }

    // console.log(player.y);
}

function collectcoin (player, coin)
{
    coin.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (coins.countActive(true) === 0)
    {
        //  A new batch of coins to collect
        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}
