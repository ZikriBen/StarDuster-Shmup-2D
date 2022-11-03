class Player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, name, animation){
        super(scene, x, y, name);
        this.scene = scene
        this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);;
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        this.setCollideWorldBounds(true);
        this.play(animation)
        this.shotLvl = 1;
        this.maxShotLvl = 5;
    }
    
    moveManager(){
        this.setVelocity(0);

        if(this.scene.cursorKeys.left.isDown){
          this.setVelocityX(-gameSettings.playerSpeed);
        }else if(this.scene.cursorKeys.right.isDown){
          this.setVelocityX(gameSettings.playerSpeed);
        }
    
        if(this.scene.cursorKeys.up.isDown){
          this.setVelocityY(-gameSettings.playerSpeed);
        }else if(this.scene.cursorKeys.down.isDown){
          this.setVelocityY(gameSettings.playerSpeed);
        }
    }

    shotBeam() {
        switch (this.shotLvl) {
            case 1: 
                new Beam(this.scene, this.x, this.y);
                break
            case 2:
                new Beam(this.scene, this.x-4, this.y);
                new Beam(this.scene, this.x+4, this.y);
                break
            case 3:
                new Beam(this.scene, this.x-4, this.y);
                new Beam(this.scene, this.x+4, this.y);
                new Beam(this.scene, this.x-8, this.y);
                new Beam(this.scene, this.x+8, this.y);
                break;
            case 4:
                new Beam(this.scene, this.x-4, this.y);
                new Beam(this.scene, this.x+4, this.y);
                new Beam(this.scene, this.x-8, this.y);
                new Beam(this.scene, this.x+8, this.y);
                new Beam(this.scene, this.x-12, this.y, -250, -50);
                new Beam(this.scene, this.x+12, this.y, -250, 50);
                break
            case 5:
                new Beam(this.scene, this.x-4, this.y);
                new Beam(this.scene, this.x+4, this.y);
                new Beam(this.scene, this.x-8, this.y);
                new Beam(this.scene, this.x+8, this.y);
                new Beam(this.scene, this.x-12, this.y, -250, -50);
                new Beam(this.scene, this.x+12, this.y, -250, 50);
                new Beam(this.scene, this.x+12, this.y, -250, 70);
                new Beam(this.scene, this.x-12, this.y, -250, -70);
                break
        }
        this.scene.beamSound.play()
    }

    // 'this' in below function reffering to scene object
    takeHit(player, enemy){
        if (player.alpha < 1) {
            return;
        }
        this.life--;
        let heart = this.hearts.pop()
        heart.destroy()
        enemy.resetPos();
        this.shotLvl = 1;
        
        for (var i = 0; i < this.powerUps.getChildren().length; i++)
            this.powerUps.getChildren()[i].destroy();

        new Explosion(this, player.x, player.y);
        player.disableBody(true, true);

        this.player.revive()
    }

    // 'this' in below function reffering to scene object
    pickPowerUp(player, powerup) {
        if (player.alpha < 1) {
            return;
        }

        if (player.shotLvl < player.maxShotLvl) {
            player.shotLvl++;
        }
        else {
            this.setScore(5);
        }

        this.pickUpSound.play();
        this.currentPowerUp--;
        powerup.disableBody(true, true);
        powerup.destroy();
    }

    revive() {
        if (this.scene.life > 0) {
            this.scene.time.addEvent({
                delay: 1000,
                callback: this.reset,
                callbackScope: this.scene,
                loop: false
            })
        }
        else {
            console.log("Game Over!")
        }
    }

    // 'this' in below function reffering to scene object
    reset() {
        var x = config.width / 2 - 8;
        var y = config.height - 24;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5;

        this.tweens.add({
            targets: this.player,
            y: config.height - 34,
            ease: 'Power1',
            duration: 1000,
            repeat:0,
            onComplete: function(){
              this.player.alpha = 1;
            },
            callbackScope: this
          });
    }
}