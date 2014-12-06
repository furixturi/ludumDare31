alabebop.PreloadState = function (game) {}

alabebop.PreloadState.prototype = {

    preload : function () {

        //TODO: load game assets

    },

    create : function () {

        this.game.state.start('main-intro')
    }

}