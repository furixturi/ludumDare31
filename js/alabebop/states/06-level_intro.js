alabebop.LevelIntroState = function (game) {}

alabebop.LevelIntroState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {

        if(this.levelData.level > 0) {

            this.startLevel();

        } else {

            //create bg
            var bg = this.game.add.sprite(0, 0, 'castle');

            this.counter = 0;
            this.step = Math.PI * 2 / 360;

            //create start level button
            this.startLevelBtn = this.game.add.button(this.game.world.centerX,
                this.game.world.centerY, 'instruction',
                this.startLevelBtnClicked, this);
            this.startLevelBtn.anchor.setTo(.5, .5);
            this.startLevelBtn.input.useHandCursor = true;
            this.startLevelBtn.alpha = 0;
            this.game.add.tween(this.startLevelBtn).to({alpha: 1}, 1500).start();

        }

    },

    update: function() {
        var tStep = Math.cos(this.counter);
        this.startLevelBtn.y = this.game.world.centerY + tStep * 5;
        this.startLevelBtn.rotation += Phaser.Math.degToRad(0.03 * tStep);
        this.counter += this.step;
    },

    startLevelBtnClicked : function() {
        var hideInstructionTween = this.game.add.tween(this.startLevelBtn).to({alpha: 0}, 500);
        hideInstructionTween.onComplete.add(this.startLevel, this);
        hideInstructionTween.start();
    },

    startLevel : function() {

        this.game.state.start('level-round', true, false, this.levelData);

    }

}