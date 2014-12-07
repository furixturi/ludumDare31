alabebop.MainIntroState = function (game) {};

alabebop.MainIntroState.prototype = {

    create : function () {

        //this.tweenFadeState()
//fall through
        this.game.state.start('main-menu');

    }/*,

    tweenFadeState : function () {
        this.game.add.tween({})
            .to({alpha: 1}, 2000)
            .onComplete.add(function() {
                this.game.state.start('main-menu');
            }, this);
    }*/

}