alabebop.BootState = function (game) {};

alabebop.BootState.prototype = {

    preload : function () {
        //TODO: load preloader assets
        //this.load.image('preloaderBg', 'img/loading-bg.png');
        //this.load.image('preloaderBar', 'img/loading-bar.png');
    },

    create : function () {
        //TODO: setup game environment, input, etc...
        this.game.input.maxPointers = 1;
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVertically = true;
        this.game.stage.scale.setScreenSize(true);
        this.game.state.start('preload');

    }

}