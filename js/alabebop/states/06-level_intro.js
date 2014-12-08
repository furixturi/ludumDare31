alabebop.LevelIntroState = function (game) {}

alabebop.LevelIntroState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {

        this.game.state.start('level-round', true, false, this.levelData);

    }

}