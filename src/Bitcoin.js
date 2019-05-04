class Bitcoin {
  constructor(game, platforms) {
    Bitcoin.list = game.physics.add.staticGroup();
    game.physics.add.collider(Bitcoin.list, game.platforms);
  }

  createCoin(x, y) {
    var bitcoin = Bitcoin.list.create(x, y, 'coin').setScale(0.8).refreshBody();
  }
}
