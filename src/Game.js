class Game extends Phaser.Scene {
  constructor() {
    var sceneConfig = {
      key: 'game',
      active: true,
      autofocus: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 400 }
        }
      }
    }

    super(sceneConfig);
  }

  preload () {
    this.load.image('sky', 'resources/sky.png');
    this.load.image('ground', 'resources/ground.png');
    this.load.image('coin', 'resources/coin.png');
    this.load.spritesheet('dude', 'resources/miner.png', { frameWidth: 100, frameHeight: 80 });
    this.load.spritesheet('walking', 'resources/walking.png', { frameWidth: 37, frameHeight: 101 });
    this.load.image('enemy', 'resources/diglet.png');
  }

  create() {
    this.gameOver = false;

    this.physics.world.setBounds(0, 0, 800, 1000, true, true, true, true);
    this.physics.world.setBoundsCollision(true, true, true, true);

    //  A simple background for our game
    this.add.image(400, 400, 'sky');

    //  The this.platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    // The bitthis.coins to be collected
    var coins = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    for(var i = 0; i < 24; i++) {
      this.platforms.create(24+i*48, 224, 'ground').setScale(3).refreshBody();
    }

    var enemies = new Enemies(this, this.platforms);

    for(var i = 0; i < 17; i++) {
      for(var j = 1; j < 15; j++) {
        if(Math.random() > 0.5) {
          this.platforms.create(24+i*48, 224+48*j, 'ground').setScale(3).refreshBody();
        }
        else if(Math.random() > 0.9) {
          coins.create(24+i*48, 225+48*j, 'coin').setScale(0.8).refreshBody();
        }
        else if(Math.random() > 0.9) {
          enemies.createEnemy(24+i*48, 225+48*j);
        }
      }
    }

    this.player = new Player(this, 400, 150);

    this.cameras.main.setBounds(0, 0, 400, 1000);
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBackgroundColor('#3d0c02');

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 6 }),
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
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 6 }),
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
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Collide the player with the platforms
    this.physics.add.collider(this.player.sprite, this.platforms);

    //  Checks to see if the player overlaps with any of the this.coins, if he does call the collectcoin function
    this.physics.add.overlap(this.player.sprite, coins, this.player.collectcoin, null, this);

    // If player touches enemy, lose hp
    this.physics.add.overlap(this.player.sprite, Enemies.list, this.player.receiveDmg, null, this.player);
  }

  update() {
    if (this.gameOver) {
        console.log("GAME OVER");
        return;
    }

    if (this.cursors.left.isDown) {
      this.player.sprite.setVelocityX(-160);

      this.player.sprite.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
        this.player.sprite.setVelocityX(160);

        this.player.sprite.anims.play('right', true);
    }
    else {
        this.player.sprite.setVelocityX(0);

        this.player.sprite.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.sprite.body.touching.down) {
        this.player.sprite.setVelocityY(-330);
    }

    if (this.cursors.down.isDown) {
      this.player.sprite.anims.play('dig', true);

      this.platforms.children.iterate(function (child) {
        try {
          if(child.x >= this.player.sprite.x + 5 && child.x <= this.player.sprite.x + 50 && child.y <= this.player.sprite.y + 70 && child.y >= this.player.sprite.y) {
            child.destroy();
          }
        } catch {
          console.log("FIX ME");
        }
      }, this);
    }

    if (this.player.sprite.y >= 400) {
      this.player.scoreText.style.color = "#ffff00";
    }

    Enemies.list.children.iterate(function (child) {
      if(child.body.touching.left) {
        child.setVelocityX(50);
      } else if(child.body.touching.right) {
        child.setVelocityX(-50);
      };
    });
  }

}
