class Platform {
  constructor(game) {
    Platform.list = game.physics.add.staticGroup();

    game.anims.create({
        key: 'destroy',
        frames: game.anims.generateFrameNumbers('ground', { start: 0, end: 9 }),
        frameRate: 10,
    });
  }

  createPlatform(x, y) {
    var plat = Platform.list.create(x, y, 'ground').setScale(3).refreshBody();
    plat.beingDestroyed = false;
  }

  static destroy(ground, player) {
    ground.beingDestroyed = true;
    Sound.digSound.play();
    player.sprite.anims.play('dig', true);
    ground.play('destroy', false);
    ground.once('animationcomplete', () => {
      ground.destroy();
    });
  }
}
