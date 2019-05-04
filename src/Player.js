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
  };

  collectcoin(_playerSprite, coin) {
    coin.disableBody(true, true);

    //  Add and update the score
    this.player.score += 10;
    this.player.scoreText.setText('score: ' + this.player.score);

    if (this.player.score > 10) {
        console.log("WIN");
    }
  }

  getKilled(playerSprite, enemy) {
    playerSprite.setTint(0xff0000);
    this.physics.pause();
    this.gameOver = true;
  };
}
