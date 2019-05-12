class Highscores extends Phaser.Scene {
  constructor() {
    super({ key: 'Highscores' });
  }

  preload() {
    this.load.json('highscores', './resources/highscores.json');
    this.load.image('highBg', './resources/highBg.png');
  }

  getPadding(len) {
    var result = "";
    for(var i = len; i < 7; i++) {
      result += " ";
    }
    return result;
  }

  create() {
    // Fetch the highscores
    this.highscores = this.cache.json.get('highscores')['highscores'];

    // Add a background
    this.add.image(400, 300, 'highBg');

    // Display highscores
    for(var i = 0; i < this.highscores.length; i++) {
      this.add.text(200, 200+i*100, i+1 + ". " + this.highscores[i]["name"] + this.getPadding(this.highscores[i]["name"].length) + " - Level " + this.highscores[i]["score"], { fontSize: "32px", fill: "#000" });
    }

    this.add.text(16, 575, 'Press ESC to leave', { fontFamily: 'Monospace', fill: '#000' });
    this.exitButton = this.input.keyboard.addKey('ESC');
  }

  update() {
    if (this.exitButton.isDown) {
      this.scene.launch('Main');
      this.scene.stop();
    }
  }
}
