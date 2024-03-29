class Enemy {
  constructor(game, platforms) {
    Enemy.list = game.physics.add.group();
    game.physics.add.collider(Enemy.list, Platform.list);
  }

  createEnemy(x, y) {
    var enemy = Enemy.list.create(x, y, 'enemy').setScale(0.3);
    enemy.setVelocityX(50);
    enemy.setCollideWorldBounds(true);
  }
}
