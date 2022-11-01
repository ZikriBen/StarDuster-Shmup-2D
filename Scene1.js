class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "./assets/desert-backgorund4.png")
        this.load.image("clouds", "./assets/clouds-transparent-trn.png")
        this.load.spritesheet("enemy-small", "./assets/enemy-small.png", {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet("enemy-medium", "./assets/enemy-medium.png", {frameWidth: 32, frameHeight: 16})
        this.load.spritesheet("enemy-big", "./assets/enemy-big.png", {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet("explosion", "./assets/explosion.png",{frameWidth: 16,frameHeight: 16});
        this.load.spritesheet("power-up", "assets/power-up.png",{frameWidth: 16,frameHeight: 16});
        this.load.spritesheet("player", "./assets/ship.png", {frameWidth: 16, frameHeight: 24})
        this.load.spritesheet("beam", "./assets/laser-bolts.png", {frameWidth: 16, frameHeight: 16})
        this.load.spritesheet("heart", "./assets/heart8tiles.png", {frameWidth: 8, frameHeight: 8})
        this.load.bitmapFont("pixelFont", "./assets/font/font.png", "./assets/font/font.xml")
        this.load.audio("audio_beam", ["./assets/sounds/beam.ogg", "./assets/sounds/beam.mp3"])
        this.load.audio("audio_pickup", ["./assets/sounds/pickup.ogg", "./assets/sounds/pickup.mp3"])
        this.load.audio("audio_explosion", ["./assets/sounds/explosion.ogg", "./assets/sounds/explosion.mp3"])
        this.load.audio("music", ["./assets/sounds/sci-fi_platformer12.ogg", "./assets/sounds/sci-fi_platformer12.mp3"])
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame")

        this.anims.create({
            key: "enemy-small_anim",
            frames: this.anims.generateFrameNumbers("enemy-small"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "enemy-medium_anim",
            frames: this.anims.generateFrameNumbers("enemy-medium"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "enemy-big_anim",
            frames: this.anims.generateFrameNumbers("enemy-big"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "heart_anim",
            frames: this.anims.generateFrameNumbers("heart"),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("beam", { 
                frames: [2, 3] 
            }),
            frameRate: 20,
            repeat: -1
        });
        
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("power-up", {
              start: 0,
              end: 1
            }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("power-up", {
              start: 2,
              end: 3
            }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", { 
                frames: [2,7] 
            }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: "moveRight",
            frames: this.anims.generateFrameNumbers("player", { 
                frames: [2,7,3,8,4,9] 
            }),
            frameRate: 20,
            repeat: 0,
        });

        this.anims.create({
            key: "moveLeft",
            frames: this.anims.generateFrameNumbers("player", { 
                frames: [2,7,1,6,0,5] 
            }),
            frameRate: 20,
            repeat: 0,
        });
    }
}