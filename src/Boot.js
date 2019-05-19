class Boot {
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      title: 'Bitcoin Miner',
      scene: [ Sound, Main, Game, Wormhole, Pause, Restart, Highscore ]
    };

    // Boot the game
    Boot.game = new Phaser.Game(this.config);
  }
}

// Ask player username
window.onload = function () {
  var usernameBtn = document.getElementById('usernameBtn');
  var usernameInput = document.getElementById('username');
  usernameBtn.onclick = function () {
    // Get the username and remove input fields
    Boot.username = usernameInput.value;
    var usernameDiv = document.getElementById('usernameDiv');
    usernameDiv.parentNode.removeChild(usernameDiv);

    // Start game
    var game = new Boot();
  }
}
