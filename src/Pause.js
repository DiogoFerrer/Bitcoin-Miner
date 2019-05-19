class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'Pause' });
  }

  preload() {
    this.load.image('pauseImg', 'resources/images/pause.png');
  }

  create() {
    Sound.music.pause();
    Sound.runSound.stop();

    // Add keyboard input options
    this.pauseButton = this.input.keyboard.addKey('ESC');
    this.exitButton = this.input.keyboard.addKey('Q');

    this.add.image(400, 300, 'pauseImg').setScale(0.5).setTint(0xffff00);
    this.add.text(16, 550, 'Press ESC to unpause', { fontFamily: 'Monospace', fontSize: '24px', fill: '#ffff00' });
    this.add.text(570, 550, 'Press Q to exit', { fontFamily: 'Monospace', fontSize: '24px', fill: '#ffff00' });
  }

  update() {
    // Check for keyboard input
    if (this.pauseButton.isDown) {
      Sound.music.resume();
      if(Game.running === true) {
        this.scene.resume('Game');
      }
      else {
        this.scene.resume('Wormhole');
      }
      this.scene.stop();
    }
    else if (this.exitButton.isDown) {
      if(Game.running === true) {
        Game.running = false;
        this.scene.stop('Game');
      }
      else {
        this.scene.stop('Wormhole');
      }
      this.scene.launch('Main');
      this.scene.stop();
    }
  }
}
