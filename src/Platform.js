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
    Platform.list.create(x, y, 'ground').setScale(3).refreshBody();
  }
}
