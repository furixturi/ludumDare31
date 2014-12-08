var alabebop = {};

alabebop.GameSetting = function() {

    this.setting = {
        totalLevels : 4,
        totalFigures : 10,
        numRows : [3, 4, 2, 1],
        numCars : [4, 3, 3, 2],
        numSafeCars : [3, 2, 1, 0]
    }

    this.levelData = {
        level : -1,
        round : -1,
        currentScore : 0,
        totalScore : 0,
        levelReplay : false,
        gameReplay : false
    };

    this.levels = [];

    this.init();
}

alabebop.GameSetting.prototype = {

    init : function() {

        this.refreshLevels()

    },

    refreshLevels : function() {

        for( var i = 0; i < this.setting.totalLevels; i++ ) {

        }

    }

}

