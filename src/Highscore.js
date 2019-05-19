class Highscore extends Phaser.Scene {
  constructor() {
    super({ key: 'Highscore' });
  }

  preload() {
    this.load.image('highBg', './resources/highBg.png');
  }

  getPadding(len) {
    var result = "";
    // Name must occupy 7 spaces
    for(var i = len; i < 7; i++) {
      result += " ";
    }
    return result;
  }

  create() {
    // Add a background
    this.add.image(400, 300, 'highBg');

    // Play the highscores music
    Sound.highSound.play();

    // Display highscore
    if(Highscore.highscore != null) {
      this.add.text(200, 300, Highscore.key + this.getPadding(Highscore.key.length) + " -    Level " + Highscore.highscore, { fontSize: "32px", fill: "#000" });
    }
    else {
      this.add.text(250, 300, "No champion yet!", { fontFamily: 'Monospace', fontSize: '32px', fill: '#000' });
    }

    // Add mute icon
    Sound.muteIcon = this.add.image(725, 545, 'muteIcon').setFrame(0).setScale(0.2).setTintFill(0x0).setScrollFactor(0);

    this.add.text(16, 575, 'Press ESC to leave', { fontFamily: 'Monospace', fill: '#000' });
    this.exitButton = this.input.keyboard.addKey('ESC');
  }

  update() {
    if (this.exitButton.isDown) {
      Sound.highSound.stop();
      this.scene.launch('Main');
      this.scene.stop();
    }
  }

  // Register new highscore in local storage
  static register(name, score) {
    if (Highscore.highscore == null || score > parseInt(Highscore.highscore, 10)) {
      // Default name
      if (name === null) name = 'Champ';

      localStorage.removeItem(Highscore.key);
      localStorage.setItem(name, score);

      // Update the highscore
      Highscore.key = Object.keys(localStorage);
      Highscore.highscore = localStorage.getItem(Highscore.key);
    }

  }
}
