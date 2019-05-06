class Player {
  constructor(game, x, y) {
    // Player sprite.
    this.sprite = game.physics.add.sprite(x, y, 'dude');
    // Player physics properties.
    this.sprite.setCollideWorldBounds(true);

    // The score
    this.score = 0;
    this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.scoreText.setScrollFactor(0);

    //  Our player animations, turning, walking left and walking right.
    game.anims.create({
        key: 'left',
        frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    game.anims.create({
        key: 'right',
        frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: -1
    });

    game.anims.create({
        key: 'dig',
        frames: game.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
  };

  dig() {
    Platform.list.children.iterate(function (child) {
      try {
        if(child.x >= this.sprite.x + 5 && child.x <= this.sprite.x + 50 && child.y <= this.sprite.y + 70 && child.y >= this.sprite.y) {
          this.sprite.on('animationcomplete', child.destroy, child);
          this.sprite.anims.play('dig', true);
          child.destroy();
        }
      } catch {
        console.log("FIX ME");
      }
    }, this);
  }

  collectcoin(_playerSprite, coin) {
    coin.disableBody(true, true);

    //  Add and update the score
    this.player.score += 10;
    this.player.scoreText.setText('score: ' + this.player.score);
  }

  getKilled(playerSprite, enemy) {
    playerSprite.setTint(0xff0000);
    this.physics.pause();
    this.gameOver = true;
  };
}
