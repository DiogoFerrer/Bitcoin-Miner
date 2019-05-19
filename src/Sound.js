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
    this.load.spritesheet('muteIcon', 'resources/muteIcon.png', { frameWidth: 258, frameHeight: 258 });
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

    Sound.muted = false;
    Sound.muteButton = this.input.keyboard.addKey('M');

    // When all sounds are loaded, lauch main menu
    this.scene.launch('Main');
  }

  update() {
    if(Phaser.Input.Keyboard.JustDown(Sound.muteButton)) {
      if (Sound.muted === false) {
        Sound.muteIcon.setFrame(1);
      }
      else {
        Sound.muteIcon.setFrame(0);
      }
      Sound.mute();
    }
  }

  // Mute or unmute sound
  static mute() {
    // Commented solution would avoid conditional flow, but does not work for some reason

    // Sound.music.volume = (Sound.music.volume + 1) % 2;
    // Sound.runSound.volume = (Sound.runSound.volume + 1) % 2;
    // Sound.coinSound.volume = (Sound.coinSound.volume + 1) % 2;
    // Sound.digSound.volume = (Sound.digSound.volume + 1) % 2;
    // Sound.highSound.volume = (Sound.highSound.volume + 1) % 2;
    // Sound.mainSound.volume = (Sound.highSound.volume + 1) % 2;
    // Sound.killedSound.volume = (Sound.killedSound.volume + 1) % 2;

    if (Sound.muted === false) {
      Sound.music.volume = 0;
      Sound.runSound.volume = 0;
      Sound.coinSound.volume = 0;
      Sound.digSound.volume = 0;
      Sound.highSound.volume = 0;
      Sound.mainSound.volume = 0;
      Sound.killedSound.volume = 0;
    }
    else {
      Sound.music.volume = 1;
      Sound.runSound.volume = 1;
      Sound.coinSound.volume = 1;
      Sound.digSound.volume = 1;
      Sound.highSound.volume = 1;
      Sound.mainSound.volume = 1;
      Sound.killedSound.volume = 1;
    }
    Sound.muted = !Sound.muted;
  }
}
