class Enemies {

  constructor(game, platforms) {
    Enemies.list = game.physics.add.group();
    game.physics.add.collider(Enemies.list, game.platforms);
  }

  createEnemy(x, y) {
    var enemy = Enemies.list.create(x, y, 'enemy').setScale(0.3);
    enemy.setVelocityX(50);
    enemy.setCollideWorldBounds(true);
  }
}
