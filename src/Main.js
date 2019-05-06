class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  preload() {
    this.load.image('startButton', './resources/startButton.png');
    this.load.image('sky', 'resources/sky.png');
    this.load.image('ground', 'resources/ground.png');
  }

  create() {
    this.add.image(400, 400, 'sky');
    for(var i = 0; i < 17; i++) {
      for(var j = 0; j < 15; j++) {
        this.add.image(24+i*48, 224+48*j, 'ground').setScale(3);
      }
    }
    this.add.text(150, 80, 'Bitcoin Miner', { fontFamily: 'Monospace', fontSize: '64px', fill: '#000' });
    this.startButton = this.add.image(390, 320, 'startButton').setScale(0.2).setInteractive();

    this.option = 0;
    this.startButton.on('pointerdown', function(ev) {
      this.option = 1;
    }, this);
  }

  update() {
    if(this.option === 1) {
      this.scene.start('Game');
    }
  }
};
