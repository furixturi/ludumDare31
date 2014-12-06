alabebop.EndingState = function (game) {}

alabebop.EndingState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {

        // create game complete message

        // create play again button
        var playAgainBtn = game.add.button(game.world.centerX - 200, 400, 'playAgainBtn', playAgain, this, 1, 0, 2);

    },

    playAgain: function() {

        this.levelData = $.extend({}, alabebop.gameSetting.levelDataInitial);
        this.levelData.replayGame = true;

        this.game.state.start('main-menu', true, false, this.levelData);

    }

}