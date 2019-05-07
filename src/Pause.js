class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'Pause' });
  }

  preload() {
    this.load.image('pauseImg', 'resources/pause.png');
  }

  create() {
    this.pauseButton = this.input.keyboard.addKey("ESC");

    this.add.image(400, 300, 'pauseImg').setScale(0.5).setTint(0xffff00);
  }

  update() {
    if (this.pauseButton.isDown) {
      this.scene.resume('Game');
      this.scene.stop();
    }
  }
}
