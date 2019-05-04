class Main {
  constructor() {
    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [ Game ]
    };

    this.game = new Phaser.Game(config);
  }
};

var game = new Main();
