class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  preload() {
    this.load.image('startButton', './resources/startButton.png');
    this.load.image('sky', 'resources/sky.png');
    this.load.image('cup', 'resources/cup.png');
    this.load.image('mainBg', 'resources/mainBg.png');
    this.load.image('logo', 'resources/logo.png');
  }

  create() {
    // Play main menu music
    Sound.mainSound.play();

    // Add background images
    this.add.image(400, 400, 'sky');
    this.add.image(400, 400, 'mainBg');
    this.add.image(400, 125, 'logo');

    // Fetch the highscore from localStorage
    Highscore.key = Object.keys(localStorage);
    Highscore.highscore = localStorage.getItem(Highscore.key);

    // Add menu buttons
    this.startButton = this.add.image(390, 320, 'startButton').setScale(0.2).setInteractive();

    this.scoresButton = this.add.image(100, 525, 'cup').setScale(0.2).setInteractive();
    this.add.text(55, 555, 'Highscore', { fontFamily: 'Monospace', fontSize: '16px', fill: '#ffff00' });

    // Add listeners
    this.option = 0;
    this.startButton.on('pointerdown', function(ev) {
      this.option = 1;
    }, this);
    this.scoresButton.on('pointerdown', function(ev) {
      this.option = 2;
    }, this);
  }

  update() {
    if(this.option === 1) {
      Sound.mainSound.stop();
      this.scene.start('Game');
    }
    else if(this.option === 2) {
      Sound.mainSound.stop();
      this.scene.start('Highscore');
    }
  }
};
