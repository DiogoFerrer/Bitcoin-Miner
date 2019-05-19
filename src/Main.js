class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  preload() {
    this.load.image('sky', 'resources/images/sky.png');
    this.load.image('cup', 'resources/images/cup.png');
    this.load.image('mainBg', 'resources/images/mainBg.png');
    this.load.image('logo', 'resources/images/logo.png');
    this.load.image('gameOver', 'resources/images/gameOver.png');
    this.load.spritesheet('buttons', 'resources/spritesheets/buttons.png', { frameWidth: 682, frameHeight: 286 });
    this.load.spritesheet('dude', 'resources/spritesheets/miner.png', { frameWidth: 48, frameHeight: 58 });
    this.load.spritesheet('ground', 'resources/spritesheets/ground.png', { frameWidth: 16, frameHeight: 16 });
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
    this.startButton = this.add.image(390, 320, 'buttons').setFrame(4).setScale(0.2).setInteractive();
    this.wormButton = this.add.image(390, 400, 'buttons').setFrame(3).setScale(0.2).setInteractive();

    this.scoresButton = this.add.image(100, 525, 'cup').setScale(0.2).setInteractive();
    this.add.text(55, 555, 'Highscore', { fontFamily: 'Monospace', fontSize: '16px', fill: '#ffff00' });

    // Add mute icon
    Sound.muteIcon = this.add.image(725, 545, 'muteIcon').setFrame(0).setScale(0.2).setTintFill(0xffff00).setScrollFactor(0);

    // Add listeners
    this.option = 0;

    // Classic mode button
    this.startButton.on('pointerover', function(ev) {
      this.startButton.setFrame(5);
    }, this);
    this.startButton.on('pointerout', function(ev) {
      this.startButton.setFrame(4);
    }, this);
    this.startButton.on('pointerdown', function(ev) {
      this.startButton.setFrame(2);
      this.option = 1;
    }, this);

    // Wormhole button
    this.wormButton.on('pointerover', function(ev) {
      this.wormButton.setFrame(0);
    }, this);
    this.wormButton.on('pointerout', function(ev) {
      this.wormButton.setFrame(3);
    }, this);
    this.wormButton.on('pointerdown', function(ev) {
      this.wormButton.setFrame(1);
      this.option = 2;
    }, this);

    // Highscore button
    this.scoresButton.on('pointerdown', function(ev) {
      this.option = 3;
    }, this);
  }

  update() {
    if(this.option === 1) {
      Sound.mainSound.stop();
      this.scene.start('Game');
    }
    else if(this.option === 2) {
      Sound.mainSound.stop();
      this.scene.start('Wormhole');
    }
    else if(this.option === 3) {
      Sound.mainSound.stop();
      this.scene.start('Highscore');
    }
  }
};
