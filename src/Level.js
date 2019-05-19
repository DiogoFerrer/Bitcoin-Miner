class Level {
  createLevel(game, level) {
    game.physics.world.setBounds(0, 0, 800, 1000, true, true, true, true);
    game.physics.world.setBoundsCollision(true, true, true, true);

    // Spawn player at level start
    game.player.sprite.setX(400);
    game.player.sprite.setY(150);

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    for(var i = 0; i < 24; i++) {
      game.platforms.createPlatform(24+i*48, 224);
    }

    for(var i = 0; i < 17; i++) {
      for(var j = 1; j < 15; j++) {
        if(Math.random() > level/10) {
          game.platforms.createPlatform(24+i*48, 224+48*j);
        }
        else if(Math.random() > level/10) {
          game.bitcoins.createCoin(24+i*48, 225+48*j);
        }
        else if(Math.random() < level/10) {
          game.enemies.createEnemy(24+i*48, 225+48*j);
        }
      }
    }

    // Add mute icon
    Sound.muteIcon = game.add.image(725, 545, 'muteIcon').setFrame(0).setScale(0.2).setTintFill(0xffff00).setScrollFactor(0);

    game.cameras.main.setBounds(0, 0, 400, 1000);
    game.cameras.main.startFollow(game.player.sprite);
    game.cameras.main.setBackgroundColor('#3d0c02');

    game.levelText = game.add.text(800, 250, 'Level ' + level, { fontFamily: 'Monospace', fontSize: '100px', fill: '#ffff00' });
  }

  constructor(game, level) {
    this.level = level;
    this.score = level * 10;
    this.createLevel(game, level);
  }

  nextLevel(game, level) {
    // Clear current level design
    Platform.list.clear(true);
    Enemy.list.clear(true);
    Bitcoin.list.clear(true);
    game.completedText.destroy();

    // Update player score and level score goal
    game.player.score = 0;
    this.score = level * 10;

    // Reset text colors
    game.scoreText.destroy();
    game.timerText.destroy();
    game.goalText.destroy();
    game.scoreText = game.add.text(16, 16, 'Bitcoins: ' + game.player.score, { fontSize: '32px', fill: "#000" });
    game.scoreText.setScrollFactor(0);
    game.goalText = game.add.text(325, 16, 'Goal: ' + this.score, { fontSize: '32px', fill: "#000" })
    game.goalText.setScrollFactor(0);
    game.timerText = game.add.text(600, 16, 'Time: ' + game.timer, { fontSize: '32px', fill: "#000" });
    game.timerText.setScrollFactor(0);
    game.updated = false;

    game.waitingForLevel = false;
    game.player.vulnerability = true;

    // Create new level design
    return new Level(game, level);
  }
}
