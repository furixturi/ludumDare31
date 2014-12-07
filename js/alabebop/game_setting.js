var alabebop = {};

alabebop.GameSetting = function() {

    this.setting = {
        totalLevels : 5,
        totalFigures : 10,
        numPlanks : [4, 5, 6, 7, 3],
        gridSizes : [100, 80, 60, 60, 200]
    }

    this.levelData = {
        level : 1,
        round : 1,
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

