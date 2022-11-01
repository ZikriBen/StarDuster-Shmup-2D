class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, name, animation, speed) {
        super(scene, config.width / 2 - 50, config.height / 2, name);
        this.scene = scene
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.play(animation);
        this.speed = speed
    }
    
    move() {
        this.y += this.speed;

        if (this.y > config.height) {
            this.resetPos()
        }
    }

    resetPos() {
        this.y = 0
        this.x = Phaser.Math.Between(0, config.width);
    }
}