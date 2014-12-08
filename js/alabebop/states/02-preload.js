alabebop.PreloadState = function (game) {}

alabebop.PreloadState.prototype = {

    preload : function () {
        // progress bar
        //this.preloadBg = this.add.sprite((320-297)/2, (480-145)/2, 'preloaderBg');
        //this.preloadBar = this.add.sprite((320-158)/2, (480-50)/2, 'preloaderBar');
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
        this.preloadBar.anchor.setTo(.5,.5);


        /* load game assets */

        //button assets
        this.game.load.spritesheet('nextLevelBtn', 'assets/buttons/Button_nextBoom.png', 500, 110);
        this.game.load.spritesheet('playAgainBtn', 'assets/buttons/Button_playAgain.png', 500, 110);
        this.game.load.spritesheet('tryAgainBtn', 'assets/buttons/Button_tryAgain.png', 500, 110);
        this.game.load.spritesheet('startBtn', 'assets/buttons/Button_start.png', 500, 110);
        this.game.load.spritesheet('homeBtn', 'assets/buttons/Button_home.png', 500, 110);

        //main-menu bg
        this.game.load.image('mainMenuBg', 'assets/main-menu/bg_start.png');
        this.game.load.image('emailBtn', 'assets/main-menu/email.png');

        //ending bg
        this.game.load.image('endingBg', 'assets/ending/bg_ending.png');

        //level-master win / lose bg
        this.game.load.image('winBg', 'assets/level-master/bg_success.png');
        this.game.load.image('loseBg', 'assets/level-master/bg_fail.png');

        //level-intro asset
        this.game.load.image('instruction', 'assets/level-intro/intro.png');

        //level-round assets
        this.game.load.image('castle', 'assets/level-round/castle_bg.png');
        this.game.load.spritesheet('figure_k', 'assets/level-round/figure_k_b.png', 68,100);
        this.game.load.spritesheet('figure_t', 'assets/level-round/figure_t_b.png', 68, 100);
        this.game.load.spritesheet('car_0', 'assets/level-round/pool_car_w.png', 140, 120);
        this.game.load.spritesheet('car_k', 'assets/level-round/pool_car_r.png', 140, 120);
        this.game.load.spritesheet('car_t', 'assets/level-round/pool_car_b.png', 140, 120);
        this.game.load.image('plank', 'assets/level-round/plank_140x20.png');

    },

    create : function () {

        this.game.state.start('main-intro')

    }

}