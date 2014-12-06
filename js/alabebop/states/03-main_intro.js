alabebop.MainIntroState = function (game) {};

alabebop.MainIntroState.prototype = {

    create : function () {

        //TODO: add main intro assets

        //this.tweenFadeState()

        this.game.state.start('main-menu');

    },

    tweenFadeState : function () {
        this.game.add.tween({})
            .to({alpha: 1}, 2000)
            .onComplete.add(function() {
                this.game.state.start('main-menu');
            }, this);
    }

}