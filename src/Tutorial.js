class Tutorial extends Phaser.Scene {
  constructor() {
    super({ key: 'Tutorial' });
  }

  preload() {
    this.load.image('tutorial', 'resources/images/tutorial.png');
  }

  create() {
    this.add.image(400, 300, 'tutorial');
    this.add.text(275, 575, 'Press SPACE to continue', { fontFamily: 'Monospace', fontSize: '16px', fill: '#000' });

    this.continueButton = this.input.keyboard.addKey('SPACE');
  }

  update() {
    if(Phaser.Input.Keyboard.JustDown(this.continueButton)) {
      this.scene.launch('Main');
      this.scene.stop();
    }
  }
}
