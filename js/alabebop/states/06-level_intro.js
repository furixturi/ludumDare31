alabebop.LevelIntroState = function (game) {}

alabebop.LevelIntroState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {

        var tweenIntro = this.game.add.tween({}).
            to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);

        tweenIntro.onComplete.add(this.levelStart, this)
    },

    levelStart: function() {

        this.game.state.start('level-round', true, false, this.levelData);

    }

}