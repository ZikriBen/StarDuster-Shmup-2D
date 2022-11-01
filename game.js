var gameSettings = {
    playerSpeed: 200,
    maxPowerups: 2,
    powerUpVel: 50,
}

var config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    parent: 'game',
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}
  
var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
}
  
var game = new Phaser.Game(config);