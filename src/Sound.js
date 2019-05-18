class Sound extends Phaser.Scene {
  constructor() {
    super({ key: 'Sound' });
  }

  preload() {
    this.load.image('loading', 'resources/loading.png');
    setTimeout(function(game) {
      game.add.image(400, 300, 'loading');
    }, 500, this);
    this.load.audio('music', 'resources/music.mp3');
    this.load.audio('digSound', 'resources/digSound.mp3');
    this.load.audio('runSound', 'resources/runSound.mp3');
    this.load.audio('coinSound', 'resources/coinSound.mp3');
    this.load.audio('highSound', 'resources/highSound.mp3');
    this.load.audio('mainSound', 'resources/mainSound.mp3');
    this.load.audio('killedSound', 'resources/killedSound.mp3');

  }

  // Return config object for sound creation
  createConfig(loop, volume=1) {
    var audioConfig = {
      mute: false,
      volume: volume,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: loop,
      delay: 0
    };

    return audioConfig;
  }

  create() {
    // All the different game sounds
    Sound.music = this.sound.add('music', this.createConfig(true));
    Sound.runSound = this.sound.add('runSound', this.createConfig(true, 10));
    Sound.coinSound = this.sound.add('coinSound', this.createConfig(false));
    Sound.digSound = this.sound.add('digSound', this.createConfig(false));
    Sound.highSound = this.sound.add('highSound', this.createConfig(true));
    Sound.mainSound = this.sound.add('mainSound', this.createConfig(true));
    Sound.killedSound = this.sound.add('killedSound', this.createConfig(false));

    // When all sounds are loaded, lauch main menu
    this.scene.launch('Main');
  }

  update() {}

  // Mute or unmute sound
  mute(sound) {
    sound.volume = sound.volume == 1 ? 0 : 1;
  }
}
