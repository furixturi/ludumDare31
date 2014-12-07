alabebop.LevelRoundState = function (game) {}

alabebop.LevelRoundState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {

        //enable physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //add background
        this.game.add.sprite(0, 0, 'castle');
        //create
        this.createFigures();
        this.createPlanks();
        this.createPools();

        this.game.time.events.loop(Phaser.Timer.SECOND, this.createNewFigure, this);

    },

    update: function() {



    },

    createFigures: function() {
        this.figures = this.game.add.group();
        this.figures.enableBody = true;
        this.probabilityK = 0.3 + Math.ceil(Math.random()) * 0.3;

        this.createNewFigure();

/*        for( var i = 0; i < this.game.gameSetting.setting.totalFigures; i++ ) {

            var probability = Math.random(),
                newFigure;

            if(probability  <= probabilityK ) {
                console.log('probability: ', probability, 'create k')
                newFigure = this.figures.create( i * 64, 0, 'figure_k');

            } else {
                console.log('probability: ', probability, 'create t')
                newFigure = this.figures.create( i * 64, 0, 'figure_2');
            }


            newFigure.frame = 5;
            newFigure.animations.add('bumpTop', [0], 10, true);
            newFigure.animations.add('bumpBottom', [1], 10, true);
            newFigure.animations.add('bumpRight', [2], 10, true);
            newFigure.animations.add('bumpLeft', [3], 10, true);
            newFigure.animations.add('jump', [4], 10, true);
            newFigure.animations.add('normal', [5], 10, true);
            newFigure.body.collideWorldBounds = true;
        }*/

    },

    createNewFigure : function () {

        if( this.figures.length < this.game.gameSetting.setting.totalFigures ) {

            var probability = Math.random(),
                newFigure;

            if(probability  <= this.probabilityK ) {
                console.log('probability: ', this.probabilityK, 'create k')
                newFigure = this.figures.create( 310, 116, 'figure_k');

            } else {
                console.log('probability: ', this.probabilityK, 'create t')
                newFigure = this.figures.create( 310, 116, 'figure_2');
            }

            newFigure.frame = 5;
            newFigure.body.collideWorldBounds = true;

        }

    },

    createPlanks: function() {

    },

    createPools: function() {

    }

}