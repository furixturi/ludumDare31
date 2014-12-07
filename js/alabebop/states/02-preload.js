alabebop.PreloadState = function (game) {}

alabebop.PreloadState.prototype = {

    preload : function () {
        // progress bar
        //this.preloadBg = this.add.sprite((320-297)/2, (480-145)/2, 'preloaderBg');
        //this.preloadBar = this.add.sprite((320-158)/2, (480-50)/2, 'preloaderBar');
        this.preloadBar = this.add.sprite((320-100)/2, 200, 'preloaderBar');

        //TODO: load game assets

        //button assets
        this.game.load.spritesheet('nextLevelBtn', 'assets/buttons/next_level_button.png', 422, 124);
        this.game.load.spritesheet('playAgainBtn', 'assets/buttons/play_again_button.png', 422, 124);
        this.game.load.spritesheet('playBtn', 'assets/buttons/play_button.png', 270, 124);

        //main-menu state assets
        this.game.load.image('gameTitle_1', 'assets/main-menu/fall.png');
        this.game.load.image('gameTitle_2', 'assets/main-menu/correctly.png');

        //level-master state assets
        this.game.load.image('winMessage_1', 'assets/level-master/well.png');
        this.game.load.image('winMessage_2', 'assets/level-master/done.png');
        this.game.load.image('loseMessage_1', 'assets/level-master/try.png');
        this.game.load.image('loseMessage_2', 'assets/level-master/again.png');

        //level-round state assets
        this.game.load.image('figure_1', 'assets/level-round/figure_1.png');
        this.game.load.image('figure_2', 'assets/level-round/figure_2.png');
        this.game.load.image('pool_0', 'assets/level-round/pool_0.png');
        this.game.load.image('pool_1', 'assets/level-round/pool_1.png');
        this.game.load.image('pool_2', 'assets/level-round/pool_2.png');
        this.game.load.image('plank', 'assets/level-round/plank.png');

    },

    create : function () {

        this.game.state.start('main-intro')

    }

}