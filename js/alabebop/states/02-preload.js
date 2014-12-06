alabebop.PreloadState = function (game) {}

alabebop.PreloadState.prototype = {

    preload : function () {

        //TODO: load game assets
        //button assets
        game.load.spritesheet('nextLevelBtn', 'assets/buttons/next_level_button.png', 400, 50);
        game.load.spritesheet('nextRoundBtn', 'assets/buttons/next_round_button.png', 400, 50);
    },

    create : function () {

        this.game.state.start('main-intro')
    }

}