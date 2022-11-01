class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, name, animation, speed) {
        super(scene, config.width / 2 - 50, config.height / 2, name);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.play(animation);
        this.speed = speed

        this.target;
        this.targetIndex = 0;

        this.isSeeking = true;
        
        this.points = [
            new Phaser.Geom.Circle(50, 50, 32),
            new Phaser.Geom.Circle(100, 50, 32),
            new Phaser.Geom.Circle(250, 50, 32),
            new Phaser.Geom.Circle(50, 95, 32),
            new Phaser.Geom.Circle(100, 95, 32),
            new Phaser.Geom.Circle(250, 95, 32),
            new Phaser.Geom.Circle(50, 180, 32),
            new Phaser.Geom.Circle(100, 180, 32),
            new Phaser.Geom.Circle(250, 180, 32)
        ];

        this.seek();
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

    seek ()
    {
        //  Pick a random target point
        var entry = this.points[(this.targetIndex++) % this.points.length];
        
        this.target = entry;

        this.isSeeking = false;

        this.scene.tweens.add({
            targets: this.body.velocity,
            x: 0,
            y: 0,
            ease: 'Linear',
            duration: 180,
            onComplete: function (tween, targets, ship)
            {
                ship.isSeeking = true;
                ship.scene.tweens.add({
                    targets: ship,
                    speed: 150,
                    delay: 180,
                    ease: 'Sine.easeOut',
                    duration: 180
                });
            },
            onCompleteParams: [ this ]
        });
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        //  Is the ship within the radius of the target?
        if (this.target.contains(this.x, this.y))
        {
            this.seek();
        }
        else if (this.isSeeking)
        {
            var angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);

            this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
        }
    }
}