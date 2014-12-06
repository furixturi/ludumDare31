alabebop.LevelMasterState = function( game ){}

alabebop.LevelMasterState.prototype = {

    init: function(levelData) {

        this.levelData = levelData ? levelData : {
            level : 1,
            round : 1,
            currentScore : 0,
            totalScore : 0,
            replay : false
        };

    },

    create: function() {

        this.decideLevelState();

    },

    decideLevelState : function() {

        if( this.isFirstLevel() || ( this.getWin() && !this.getReplay()) ) {

            this.nextLevel();

        } else if ( !this.getWin() || this.getReplay() ) {

            this.nextRound();

        }

    },

    isFirstLevel : function () {

        return this.levelData.level === 1;

    },

    getWin : function () {

        return this.levelData.currentScore > 0;

    },

    getReplay : function () {

        return this.levelData.replay;

    },

    nextLevel : function () {

        this.levelData.level++;

        this.levelData.totalScore += this.levelData.currentScore;

        this.levelData.currentScore = 0;

        this.levelData.round = 1;

        this.game.state.start('level-intro', true, false, this.levelData);

    },

    nextRound : function () {

        this.levelData.round++;

        //'state name', clearWorld, clearCache, parameter for next state's init
        this.game.state.start('level-round', true, false, this.levelData);

    }


}