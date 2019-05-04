class Player {
  constructor(game, x, y) {
    // Player sprite.
    this.sprite = game.physics.add.sprite(x, y, 'dude');
    //  Player physics properties.
    this.sprite.setCollideWorldBounds(true);

    // Player hitpoints. Starts with 100hp.
    this.hp = 100;

    // Player hp display
    this.hpText = game.add.text(650, 16, 'hp: ' + this.hp, { fontSize: '32px', fill: '#ff0000' });
    this.hpText.setScrollFactor(0);

    // Player vulnerability to enemies
    this.vulnerability = true;

    //  The score
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

  getKilled(player, enemy) {
    
  };
}
