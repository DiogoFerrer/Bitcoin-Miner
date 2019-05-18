class Boot {
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [ Sound, Main, Game, Pause, Restart, Highscore ]
    };

    // Boot the game
    this.game = new Phaser.Game(this.config);
  }
}

var game = new Boot();
