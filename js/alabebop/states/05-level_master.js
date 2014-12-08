alabebop.LevelMasterState = function( game ){}

alabebop.LevelMasterState.prototype = {

    init: function(levelData) {

        this.levelData = levelData;
            //? levelData : this.game.gameSetting.levelData;

    },

    create: function() {

        if ( this.isFirstLevel() || this.isLastLevel() ) {

            this.nextLevel();

        } else {

            if( this.getWin() ) {

                this.createWinScreen();

            } else {

                this.createLoseScreen();

            }

        }

    },

    createWinScreen : function () {

        //create win message
        var winMessage_1 = this.game.add.sprite(this.game.world.centerX - 162, 200, 'winMessage_1');
        var winMessage_1 = this.game.add.sprite(this.game.world.centerX - 161, 320, 'winMessage_2');

        //create next level button
        /**
         * API: new Button(game, x, y, asset key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
         */
        var nextLevelBtn = this.game.add.button(this.game.world.centerX - 211, 400, 'nextLevelBtn',
            this.nextLevel, this, 1, 0, 2);
        //create replay this level button
        var playAgainBtn = this.game.add.button(this.game.world.centerX - 211, 580, 'playAgainBtn',
            this.nextRound, this, 1, 0, 2);


    },

    createLoseScreen : function () {

        //create lose message
        var loseMessage_1 = this.game.add.sprite(this.game.world.centerX - 121, 200, 'loseMessage_1')
        var loseMessage_2 = this.game.add.sprite(this.game.world.centerX - 161, 320, 'loseMessage_2')
        //create replay this level button
        var playAgainBtn = this.game.add.button(this.game.world.centerX - 211, 480, 'playAgainBtn',
            this.nextRound, this, 1, 0, 2);

    },


    isFirstLevel : function () {

        return this.levelData.level === -1;

    },

    isLastLevel : function () {

        return this.levelData.level === this.levelData.totalLevels;

    },

    getWin : function () {

        return this.levelData.currentScore > 0;

    },

    nextLevel : function () {

        this.levelData.totalScore += this.levelData.currentScore;

        this.levelData.currentScore = 0;

        this.levelData.round = 1;

        if( !this.isLastLevel() ) {

            this.levelData.level++;

            this.game.state.start('level-intro', true, false, this.levelData);

        } else {

            this.game.state.start('ending', true, false, this.levelData);

        }

    },

    nextRound : function () {

        this.levelData.round++;

        this.levelData.currentScore = 0;

        //'state name', clearWorld, clearCache, parameter for next state's init
        this.game.state.start('level-round', true, false, this.levelData);

    }


}