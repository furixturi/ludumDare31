alabebop.PreloadState = function (game) {}

alabebop.PreloadState.prototype = {

    preload : function () {
        // progress bar
        //this.preloadBg = this.add.sprite((320-297)/2, (480-145)/2, 'preloaderBg');
        //this.preloadBar = this.add.sprite((320-158)/2, (480-50)/2, 'preloaderBar');

        //TODO: load game assets
        //button assets
        game.load.spritesheet('nextLevelBtn', 'assets/buttons/next_level_button.png', 400, 50);
        game.load.spritesheet('nextRoundBtn', 'assets/buttons/next_round_button.png', 400, 50);
    },

    create : function () {

        this.game.state.start('main-intro')
    }

}