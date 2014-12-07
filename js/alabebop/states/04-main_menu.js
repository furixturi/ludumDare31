alabebop.MainMenuState = function(game) {};

alabebop.MainMenuState.prototype = {

    init: function(levelData) {

        this.levelData = levelData ? levelData : this.game.gameSetting.levelData

    },

    create: function(){

        // create title
        var title_1 = game.add.sprite(game.world.centerX - 211, 200, 'gameTitle_1')
        var title_2 = game.add.sprite(game.world.centerX - 211, 320, 'gameTitle_2')

        // create play button
        var playBtn = game.add.button(game.world.centerX - 135, 400, 'playBtn', tweenPlayState, this, 1, 0, 2);

        //PHASE 2: if replay, create level selection menu

        /*if( this.levelData.gameReplay) {

        }*/

    },

    tweenPlayState: function(){
        var tweenMenuShrink = this.game.add.tween({}).
            to({x: 0, y: 0}, 200);

        var tweenFadeIn = this.game.add.tween({}).
            to({alpha: 1}, 2000);

        tweenFadeIn.onComplete.add(function() {
            this.game.state.start('level-master', true, false, this.levelData);
        }, this);

        tweenMenuShrink.chain(tweenFadeIn);
        tweenMenuShrink.start();
    }

}