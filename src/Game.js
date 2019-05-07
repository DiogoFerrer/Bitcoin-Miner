class Game extends Phaser.Scene {
  constructor() {
    var sceneConfig = {
      key: 'Game',
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
    this.load.image('coin', 'resources/coin.png');
    this.load.spritesheet('dude', 'resources/miner.png', { frameWidth: 100, frameHeight: 80 });
    this.load.spritesheet('walking', 'resources/walking.png', { frameWidth: 37, frameHeight: 101 });
    this.load.image('enemy', 'resources/diglet.png');
    this.load.image('gameOver', 'resources/gameOver.png');
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 400, 'sky');

    // The player
    this.player = new Player(this, 400, 150);
    this.gameOver = false;

    //  The platforms group contains the ground
    this.platforms = new Platform(this);

    // The bitcoins to be collected
    this.bitcoins = new Bitcoin(this, this.platforms);

    // The enemies
    this.enemies = new Enemy(this, this.platforms);

    // Game starts at level 1
    this.levelCount = 1;

    // Initiate level generation
    this.level = new Level(this, this.levelCount);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.pauseButton = this.input.keyboard.addKey('ESC');

    //  Collide the player with the ground
    this.physics.add.collider(this.player.sprite, Platform.list);

    //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoin function
    this.physics.add.overlap(this.player.sprite, Bitcoin.list, this.player.collectcoin, null, this);

    // If player touches enemy, lose game
    this.physics.add.overlap(this.player.sprite, Enemy.list, this.player.getKilled, null, this);
  }

  update() {
    // Check if game is lost
    if (this.gameOver) {
      this.add.image(400, 300, 'gameOver').setScale(2).setTintFill(0xffd700);
      return;
    } // Or if level is won
    else if (this.player.score >= this.level.score) {
      this.level = this.level.nextLevel(this, ++this.levelCount);
    }

    // Movement options
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
    else if (this.cursors.down.isDown) {
      this.player.dig();
    }

    if(Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
      this.scene.pause();
      this.scene.launch('Pause');
    }

    if (this.player.sprite.y >= 400) {
      this.player.scoreText.style.color = "#ffff00";
    }

    Enemy.list.children.iterate(function (child) {
      if(child.body.touching.left) {
        child.setVelocityX(50);
      } else if(child.body.touching.right) {
        child.setVelocityX(-50);
      };
    });
  }

}
