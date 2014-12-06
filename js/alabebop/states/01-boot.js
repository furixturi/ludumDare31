alabebop.BootState = function (game) {};

alabebop.BootState.prototype = {

    preload : function () {
        //TODO: load preloader assets
    },

    create : function () {
        //TODO: setup game environment, input, etc...

        this.game.state.start('preload');
    }

}