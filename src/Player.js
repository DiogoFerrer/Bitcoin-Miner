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

  dig(side) {
    Platform.list.children.iterate(function (child) {
      try {
        if (side == 'right') {
          if(child.x >= this.sprite.x + 5 && child.x <= this.sprite.x + 50 && child.y <= this.sprite.y + 70 && child.y >= this.sprite.y) {
            Sound.digSound.play();
            this.sprite.anims.play('dig', true);
            child.play('destroy', false);
            child.once('animationcomplete', () => {
              child.destroy();
            });
          }
        }
        else {
          if(child.x <= this.sprite.x - 5 && child.x >= this.sprite.x - 50 && child.y <= this.sprite.y + 70 && child.y >= this.sprite.y) {
            Sound.digSound.play();
            this.sprite.anims.play('dig', true);
            child.play('destroy', false);
            child.once('animationcomplete', () => {
              child.destroy();
            });
          }
        }
      } catch {
        console.log("FIX ME");
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
      Sound.music.stop();
      Sound.killedSound.play();
      playerSprite.setTint(0xff0000);
      this.physics.pause();
      this.gameOver = true;
    }
  };
}
