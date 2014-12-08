alabebop.LevelMasterState = function( game ){}

alabebop.LevelMasterState.prototype = {

    init: function(levelData) {

        this.levelData = levelData;

    },

    create: function() {

        if ( this.isFirstLevel() ) {

            this.nextLevel();

        } else if ( this.isLastLevel() && this.getWin() ) {

            this.game.state.start('ending', true, false, this.levelData);

        } else {


            if( this.getWin() ) {

                this.createWinScreen();

            } else {

                this.createLoseScreen();

            }

        }

    },

    createScore : function (color) {
        var score = this.game.add.text(this.game.world.centerX, 224, this.levelData.currentScore, {
            font : "150px Iceberg",
            fill : color,
            align : 'left'
        });


        score.anchor.setTo(0.5, 0.5);

    },

    createWinScreen : function () {

        var bg = this.game.add.sprite(0, 0, 'winBg');

        this.createScore('#a23946');

        //create next level button
        /**
         * API: new Button(game, x, y, asset key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
         */
        var nextLevelBtn = this.game.add.button(70, 640, 'nextLevelBtn',
            this.nextLevel, this, 1, 0, 2);
        //create replay this level button
        var playAgainBtn = this.game.add.button(70, 800, 'playAgainBtn',
            this.nextRound, this, 1, 0, 2);


    },

    createLoseScreen : function () {

        var bg = this.game.add.sprite(0, 0, 'loseBg');

        this.createScore('#373737');

        //create replay this level button
        var tryAgainBtn = this.game.add.button(70, 700, 'tryAgainBtn',
            this.nextRound, this, 1, 0, 2);

    },


    isFirstLevel : function () {

        return this.levelData.level === -1;

    },

    isLastLevel : function () {

        return this.levelData.level === this.game.gameSetting.setting.totalLevels - 1;

    },

    getWin : function () {

        return this.levelData.currentScore > 0;

    },

    nextLevel : function () {

        this.levelData.totalScore += this.levelData.currentScore;

        this.levelData.currentScore = 0;

        this.levelData.round = 0;

        this.levelData.level++;

        this.game.state.start('level-intro', true, false, this.levelData);


    },

    nextRound : function () {

        this.levelData.round++;

        this.levelData.currentScore = 0;

        //'state name', clearWorld, clearCache, parameter for next state's init
        this.game.state.start('level-round', true, false, this.levelData);

    }


}