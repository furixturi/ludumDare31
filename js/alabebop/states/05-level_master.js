alabebop.LevelMasterState = function( game ){}

alabebop.LevelMasterState.prototype = {

    init: function(levelData) {

        this.levelData = levelData ? levelData : this.game.gameSetting.levelData;

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

        //create next level button
        /**
         * API: new Button(game, x, y, asset key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
         */
        var nextLevelBtn = game.add.button(game.world.centerX - 200, 400, 'nextLevelBtn', nextLevel, this, 1, 0, 2);
        //create replay this level button
        var nextRoundBtn = game.add.button(game.world.centerX - 200, 480, 'nextRoundBtn', nextRound, this, 1, 0, 2);


    },

    createLoseScreen : function () {

        //create lose message

        //create replay this level button
        var nextRoundBtn = game.add.button(game.world.centerX - 200, 480, 'nextRoundBtn', nextRound, this, 1, 0, 2);

    },


    isFirstLevel : function () {

        return this.levelData.level === 1;

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