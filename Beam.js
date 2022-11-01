class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene, x=0, y=0, velY=-250, velX=0) {
        var x = x;
        var y = y - 16;
        super(scene, x, y, "beam");
        this.lvl = 1
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.velocity.y = velY;
        this.body.velocity.x = velX;
        scene.projectiles.add(this);
    }
    
    update() {
        if (this.y < 32) {
            this.destroy
        }
        this.play("beam_anim");
    }
}