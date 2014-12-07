alabebop.BootState = function (game) {};

alabebop.BootState.prototype = {

    preload : function () {
        //TODO: load preloader assets
        //this.load.image('preloaderBg', 'img/loading-bg.png');
        this.load.image('preloaderBar', 'assets/preload/preloader-bar.png');
    },

    create : function () {
        //setup game environment, input, etc...
        this.game.input.maxPointers = 1;
        this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setScreenSize(true);
        this.game.state.start('preload');

    }

}