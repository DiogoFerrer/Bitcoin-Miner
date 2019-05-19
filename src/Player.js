class Player {
  constructor(game, x, y) {
    // Player sprite.
    this.sprite = game.physics.add.sprite(x, y, 'dude').setScale(0.9);
    // Player physics properties.
    this.sprite.setCollideWorldBounds(true);
    this.vulnerability = true;
    this.walking = false;

    // The score
    this.score = 0;

    //  Our player animations, turning, walking left and walking right.
    game.anims.create({
        key: 'left',
        frames: game.anims.generateFrameNumbers('dude', { start: 12, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 20
    });

    game.anims.create({
        key: 'right',
        frames: game.anims.generateFrameNumbers('dude', { start: 10, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'dig',
        frames: game.anims.generateFrameNumbers('dude', { start: 5, end: 9 }),
        frameRate: 10,
    });
  };

  inRange(ground, side) {
    if(side == 'left') {
      return ground.x <= this.sprite.x - 5 && ground.x >= this.sprite.x - 50 && ground.y <= this.sprite.y + 70 && ground.y >= this.sprite.y;
    }
    else {
      return ground.x >= this.sprite.x + 5 && ground.x <= this.sprite.x + 50 && ground.y <= this.sprite.y + 70 && ground.y >= this.sprite.y;
    }
  }

  dig(side) {
    Platform.list.children.iterate(function (child) {
      if (child.beingDestroyed === false) {
        if (side == 'right') {
          if(this.inRange(child, side)) {
            Platform.destroy(child, this);
          }
        }
        else {
          if(this.inRange(child, side)) {
            Platform.destroy(child, this);
          }
        }
      }
    }, this);
  }

  collectcoin(_playerSprite, coin) {
    coin.disableBody(true, true);

    //  Add and update the score
    this.player.score += Math.floor(Math.random() * 5) + 1;
    this.scoreText.setText('Bitcoins: ' + this.player.score);
  }

  getKilled(playerSprite, enemy) {
    if(this.player.vulnerability) {
      Sound.runSound.stop();
      Sound.music.stop();
      Sound.killedSound.play();
      playerSprite.setTint(0xff0000);
      this.physics.pause();
      this.gameOver = true;
    }
  };
}
