class Highscores extends Phaser.Scene {
  constructor() {
    super({ key: 'Highscores' });
  }

  preload() {
    this.load.json('highscores', './resources/highscores.json');
  }

  create() {
    // Fetch the highscores
    this.highscores = this.cache.json.get('highscores')['highscores'];

    for(var i = 0; i < this.highscores.length; i++) {
      this.add.text(250, 200+i*100, this.highscores[i]["name"] + " " + this.highscores[i]["score"], { fontSize: "32px", fill: "#fff" });

      console.log(this.highscores[i]);
    }
  }

  update() {

  }
}
