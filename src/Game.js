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
    this.load.spritesheet('dude', 'resources/miner.png', { frameWidth: 48, frameHeight: 58 });
    this.load.spritesheet('ground', 'resources/ground.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('coin', 'resources/coin.png');
    this.load.image('enemy', 'resources/diglet.png');
    this.load.image('gameOver', 'resources/gameOver.png');

  }

  create() {

    // Play game music
    Sound.music.play();

    // Flag for text update
    this.updated = false;

    //  A simple background for our game
    this.add.image(400, 400, 'sky');

    // The player
    this.player = new Player(this, 400, 150, Boot.username);
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
    this.waitingForLevel = false;

    // Display player score and level goal
    this.scoreText = this.add.text(16, 16, 'Bitcoins: ' + this.player.score, { fontSize: '32px', fill: '#000' });
    this.scoreText.setScrollFactor(0);
    this.goalText = this.add.text(325, 16, 'Goal: ' + this.level.score, { fontSize: '32px', fill: '#000' })
    this.goalText.setScrollFactor(0);

    // Create and display level timer
    this.timer = 300;
    this.timerText = this.add.text(600, 16, 'Time: ' + this.timer, { fontSize: '32px', fill: '#000' });
    this.timerText.setScrollFactor(0);

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
      // Update highscore if needed
      Highscore.register(this.player.username, this.levelCount);
      this.add.image(400, 300, 'gameOver').setScale(2).setTintFill(0xffd700).setScrollFactor(0);
      this.scene.pause();
      this.scene.launch('Restart');
    } // Or if level is won
    else if (this.player.score >= 1 && !this.waitingForLevel) {
      this.completedText = this.add.text(100, 250, 'Level completed!', { fontFamily: 'Monospace', fontSize: '64px', fill: '#ffff00' }).setScrollFactor(0);
      this.waitingForLevel = true;
      this.player.vulnerability = false;

      this.time.delayedCall(3000, function (){
        this.level = this.level.nextLevel(this, ++this.levelCount);
      }, null, this);
    }

    // Movement options and input events
    if (this.cursors.left.isDown) {
      this.player.sprite.setVelocityX(-160);

      this.player.sprite.anims.play('left', true);
      if(this.player.walking === false) {
        Sound.runSound.play();
        this.player.walking = true;
      }
    }
    else if (this.cursors.right.isDown) {
      this.player.sprite.setVelocityX(160);

      this.player.sprite.anims.play('right', true);
      if(this.player.walking === false) {
        Sound.runSound.play();
        this.player.walking = true;
      }
    }
    else {
      this.player.sprite.setVelocityX(0);

      this.player.sprite.anims.play('turn');
      if(this.player.walking === true) {
        Sound.runSound.stop();
        this.player.walking = false;
      }
    }

    if (this.cursors.up.isDown && this.player.sprite.body.touching.down) {
      this.player.sprite.setVelocityY(-250);
      Sound.runSound.stop();
    }
    else if (this.cursors.left.isDown && Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.player.dig('left');
    }
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.player.dig('right');
    }

    if(Phaser.Input.Keyboard.JustDown(this.pauseButton)) {
      this.scene.pause();
      this.scene.launch('Pause');
    }

    // Change text color for visibility purposes
    if (this.player.sprite.y >= 460 && this.updated == false) {
      this.scoreText.destroy();
      this.timerText.destroy();
      this.goalText.destroy();

      this.scoreText = this.add.text(16, 16, 'Bitcoins: ' + this.player.score, { fontSize: '32px', fill: "#ffff00" });
      this.scoreText.setScrollFactor(0);
      this.goalText = this.add.text(325, 16, 'Goal: ' + this.level.score, { fontSize: '32px', fill: "#ffff00" })
      this.goalText.setScrollFactor(0);
      this.timerText = this.add.text(600, 16, 'Time: ' + this.timer, { fontSize: '32px', fill: "#ffff00" });
      this.timerText.setScrollFactor(0);
      this.updated = true;
    }

    // Make enemies move the other way when touching a wall
    Enemy.list.children.iterate(function (child) {
      if(child.body.touching.left) {
        child.setVelocityX(50);
      } else if(child.body.touching.right) {
        child.setVelocityX(-50);
      };
    });

    // When level banner leaves screen, destroy it
    this.levelText.setX(this.levelText.x - 10);
    if(this.levelText.x < -400) {
      this.levelText.destroy();
    }

    // Update timer. If time is up, game over
    this.timer -= 1/60;
    this.timerText.setText('Time: ' + this.timer.toFixed(0));
    if(this.timer <= 0) {
      this.gameOver = true;
    }
  }

}
