alabebop.EndingState = function (game) {}

alabebop.EndingState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {
        //create scores


        // create game complete message
        this.game.add.sprite(0, 0, 'endingBg');


        // create play again button
        var homeBtn = this.game.add.button(70, 660, 'homeBtn', this.playAgain, this, 1, 0, 2);
        homeBtn.input.useHandCursor = true;

    },

    playAgain: function() {

        this.game.gameSetting = new alabebop.GameSetting()

        this.levelData = this.game.gameSetting.levelData;
        this.levelData.gameReplay = true;

        this.game.state.start('main-menu', true, false, this.levelData);

    }

}