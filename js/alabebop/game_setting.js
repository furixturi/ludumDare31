var alabebop = {};

alabebop.GameSetting = function() {

    this.setting = {
/*        totalLevels : 4,
        totalFigures : 10,
        numRows : [3, 4, 2, 1],
        numCars : [4, 3, 3, 2],
        numSafeCars : [3, 2, 1, 1],       */
        totalLevels : 2,
        totalFigures : 1,
        numRows : [1, 4],
        numCars : [4, 3],
        numSafeCars : [4, 2],
        pointMap : {
            figure_k : {
                car_0 : 5,
                car_k : 10,
                car_t : 0,
                ground : -5
            },
            figure_t : {
                car_0 : 5,
                car_k : 0,
                car_t : 10,
                ground : -5
            }

        }
    }

    this.levelData = {
        level : -1,
        round : 0,
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

