class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }
    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0, 0);
        
        this.clouds = this.add.tileSprite(0, 0, config.width, config.height, "clouds");       
        this.clouds.setOrigin(0, 0);
        this.clouds.setScrollFactor(555);

        
        this.beamSound = this.sound.add("audio_beam");
        this.explosionSound = this.sound.add("audio_explosion");
        this.pickUpSound = this.sound.add("audio_pickup");
        this.music = this.sound.add("music");
        // this.music.play(musicConfig);

        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1)
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
        this.score = 0;
        this.scoreSize = 6;
        this.maxLives = 5;
        this.maxPowerUp = 3;
        this.currentPowerUp = 0;
        this.life = 3;
        this.scoreLabel.text = "SCORE " + "0".repeat(this.scoreSize);
        
        this.player = new Player(this,config.width / 2 - 8, config.height - 64, "player", "idle")
        this.hearts = []
        
        for (let i = 0; i < this.life; i++) {
            let heart = this.add.sprite(config.width - (i * 12) - 10, 10, "heart")
            heart.setScale(1.2)
            this.hearts.push(heart)
            heart.play("heart_anim")
        }


        this.enemy_small = new Enemy(this, "enemy-small", "enemy-small_anim", 1);
        this.enemy_medium = new Enemy(this, "enemy-medium", "enemy-medium_anim", 2);
        this.enemy_big = new Enemy(this, "enemy-big", "enemy-big_anim", 2.5);
        
        this.projectiles = this.add.group()
        this.enemies = this.physics.add.group()
        this.enemies.add(this.enemy_small)
        this.enemies.add(this.enemy_medium)
        this.enemies.add(this.enemy_big)
        
        this.powerUps = this.physics.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, (projectile, powerup) => {
            projectile.destroy()
        });

        this.physics.add.overlap(this.player, this.powerUps, this.player.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.player.takeHit, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.enemyTakeHit, null, this);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.cursorKeys.left.on('down', () => {
            this.player.setTexture("moveLeft");
            this.player.play("moveLeft"); 
        });

        this.cursorKeys.right.on('down', () => {
            this.player.setTexture("moveRight");
            this.player.play("moveRight"); 
        });

        this.cursorKeys.left.on('up', () => {
            this.player.setTexture("idle");
            this.player.play("idle"); 
        });

        this.cursorKeys.right.on('up', () => {
            this.player.setTexture("idle");
            this.player.play("idle"); 
        });

        this.cursorKeys.space.on('up', () => {
            if (this.player.active)
                this.player.shotBeam();
        });
        
    }

    update() {
        this.background.tilePositionY -= 0.5;
        this.clouds.tilePositionY -= 0.75;
        this.player.moveManager();

        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update();
        }

        this.enemy_small.move();
        this.enemy_medium.move();
        this.enemy_big.move();
    }

    enemyTakeHit(projectile, enemy){
        projectile.destroy()
        this.explosionSound.play()
        this.score += 15;
        this.scoreLabel.text = "SCORE " + this.zeroPad(this.score, this.scoreSize)
        new Explosion(this, enemy.x, enemy.y);
        enemy.resetPos()

        if (this.score % 150 === 0) {
            this.generatePowerUp()
        }
    }

    generatePowerUp() {
        if (this.powerUps.getChildren().length >= this.maxPowerUp) 
            return;

        var powerUp = this.physics.add.sprite(16, 16, "power-up");
        this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
        
        if (Math.random() > 0.5) {
            powerUp.play("red");
        } else {
            powerUp.play("gray");
        }

        powerUp.setVelocity(50, 50);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(0.5);
        console.log(this.powerUps.getChildren().length)
    }

    zeroPad(number, size) {
        var stringNumber = String(number);
        
        while(stringNumber.length < (size || 2)) {
            stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
}