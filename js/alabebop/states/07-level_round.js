alabebop.LevelRoundState = function (game) {}

alabebop.LevelRoundState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {

        //enable physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //add background

        //create
        this.createFigures();
        this.createPlanks();
        this.createPools();

    },

    update: function() {

    },

    createFigures: function() {
        this.figures = this.game.add.group();
        this.figures.enableBody = true;

        var probabilityK = 0.3 + Math.random() * 0.3;

        console.log('probabilityK: ', probabilityK)

        for( var i = 0; i < this.game.gameSetting.setting.totalFigures; i++ ) {

            var probability = Math.random(),
                newFigure;

            if(probability  <= probabilityK ) {
                console.log('probability: ', probability, 'create k')
                newFigure = this.figures.create( i * 64, 0, 'figure_k');

            } else {
                console.log('probability: ', probability, 'create t')
                newFigure = this.figures.create( i * 64, 0, 'figure_2');
            }
            newFigure.animations.add('bumpTop', [0], 10, true);
            newFigure.animations.add('bumpBottom', [1], 10, true);
            newFigure.animations.add('bumpRight', [2], 10, true);
            newFigure.animations.add('bumpLeft', [3], 10, true);
            newFigure.animations.add('jump', [4], 10, true);
            newFigure.animations.add('normal', [5], 10, true);
            newFigure.body.collideWorldBounds = true;
        }

    },

    createPlanks: function() {

    },

    createPools: function() {

    }

}