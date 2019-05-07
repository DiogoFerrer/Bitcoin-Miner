class Boot {
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [ Main, Game, Pause ]
    };

    this.game = new Phaser.Game(this.config);
    this.game.scene.start('Main');
  }
}

var game = new Boot();
