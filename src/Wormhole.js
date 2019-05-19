class Wormhole extends Phaser.Scene {
  constructor() {
    var sceneConfig = {
      key: 'Wormhole',
      autofocus: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 400 }
        }
      }
    }

    super(sceneConfig);
  }

  preload() {}

  create() {
    // Play game music
    Sound.music.play();

    //  A simple background for our game
    this.add.image(400, 400, 'sky');
    this.add.image(400, 3000, 'sky');

    // Spawn player at Wormhole start
    this.player = new Player(this, 400, 150, Boot.username);

    //  The platforms group contains the ground objects
    this.platforms = new Platform(this);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.pauseButton = this.input.keyboard.addKey('ESC');

    //  Collide the player with the ground
    this.physics.add.collider(this.player.sprite, Platform.list);

    // Create Wormhole map
    this.physics.world.setBounds(0, 0, 800, 2700, true, true, true, true);
    this.physics.world.setBoundsCollision(true, true, true, false);

    // Wormhole is about mining
    // There are 17 blocks across
    for(var i = 0; i < 17; i++) {
      // There are 50 blocks of dirt to the other side of the planet
      for(var j = 0; j < 50; j++) {
        this.platforms.createPlatform(Platform.width/2+i*Platform.width, 225+Platform.height*j);
      }
    }


    // Add mute icon
    Sound.muteIcon = this.add.image(725, 545, 'muteIcon').setFrame(0).setScale(0.2).setTintFill(0xffff00).setScrollFactor(0);

    this.cameras.main.setBounds(0, 0, 400, 2750);
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setBackgroundColor('#3d0c02');
  }

  update() {
    Game.inputOptions(this);

    // If player reaches the other side of planet, falls and dies
    if(this.player.sprite.y >= 2800) {
      this.add.image(400, 300, 'gameOver').setScale(2).setTintFill(0xffd700).setScrollFactor(0);
      this.scene.pause();
      this.scene.launch('Restart');
    }
  }
}
