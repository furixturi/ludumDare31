alabebop.MainMenuState = function(game) {};

alabebop.MainMenuState.prototype = {

    init: function(levelData) {

        this.levelData = levelData ? levelData : this.game.gameSetting.levelData

    },

    create: function(){

        // create title
//        var title_1 = this.game.add.sprite(this.game.world.centerX - 211, 200, 'gameTitle_1')
        var title_2 = this.game.add.sprite(this.game.world.centerX - 211, 320, 'gameTitle_2')

        var bg = this.game.add.sprite(0, 0, 'mainMenuBg');

        var emailBtn = this.game.add.button(this.game.world.centerX - 124,
            872, 'emailBtn', function(){
                window.location.href= "mailto:alabebop@gmail.com"
            }, this);

        emailBtn.input.useHandCursor = true;

        // create play button
        var startBtn = this.game.add.button(70, 744, 'startBtn',

            function(){
                this.game.state.start('level-master', true, false, this.levelData);
            },

            this, 1, 0, 2 );

        startBtn.input.useHandCursor = true;
        startBtn.alpha = 0;
        this.game.add.tween(startBtn).to({ alpha: 1}, 1500).start();

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