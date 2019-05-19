class Restart extends Phaser.Scene {
  constructor() {
    super({ key: 'Restart' });
  }

  preload() {}

  create() {
    this.restartButton = this.input.keyboard.addKey("ENTER");

    this.restartText = this.add.text(190, 550, 'Press ENTER to restart', { fontFamily: 'Monospace', fontSize: '32px', fill: '#ffff00' });
    this.timer = this.time.addEvent({
      delay: 500,
      callback: function() {
        this.restartText.alpha = this.restartText.alpha == 1 ? 0 : 1;
      },
      callbackScope: this,
      loop: true
    });
  }

  update() {
    if(this.restartButton.isDown) {
      if(Game.running === true) {
        this.scene.launch('Game');
      }
      else {
        this.scene.launch('Wormhole');
      }
      this.scene.stop();
    }
  }
}
