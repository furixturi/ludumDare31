alabebop.BootState = function (game) {};

alabebop.BootState.prototype = {

    preload : function () {
        //load preloader assets
        this.load.image('preloaderBar', 'assets/preload/preloader.png');
    },

    create : function () {
        //setup game environment, input, etc...
        //this.game.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 320;
        this.scale.minHeight = 480;
        this.scale.maxWidth = 1080;
        this.scale.maxHeight = 1920;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setScreenSize(true);

        this.game.state.start('preload');

    }

}