class Platform {
  constructor(game) {
    Platform.list = game.physics.add.staticGroup();
  }

  createPlatform(x, y) {
    Platform.list.create(x, y, 'ground').setScale(3).refreshBody();
  }
}
