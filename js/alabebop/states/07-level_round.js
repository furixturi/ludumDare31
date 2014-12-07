alabebop.LevelRoundState = function (game) {}

alabebop.LevelRoundState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {

        //enable physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 150;
        //add background
        this.game.add.sprite(0, 0, 'castle');
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
        this.probabilityK = 0.3 + Math.ceil(Math.random()) * 0.3;

        this.createNewFigure();

        this.generateFigureLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.createNewFigure, this);

    },

    createNewFigure : function () {

        if( this.figures.length < this.game.gameSetting.setting.totalFigures ) {

            var probability = Math.random(),
                newFigure;

            if(probability  <= this.probabilityK ) {

                newFigure = this.figures.create( 308, 116, 'figure_k');

            } else {

                newFigure = this.figures.create( 308, 116, 'figure_2');

            }

            newFigure.frame = 5;
            newFigure.body.collideWorldBounds = true;
            newFigure.timer = this.game.time.events.add(Phaser.Timer.SECOND, this.jump, newFigure);

        } else {
            //remove generate figure timer
            this.game.time.events.remove(this.generateFigureLoop);

        }

    },

    //this is pointed to the figure sprite
    jump: function() {
        //this.game.physics.enable(newFigure, Phaser.Physics.ARCADE);
        this.body.bounce.y = 0.5 + Math.ceil(Math.random()) * .3;
        this.body.bounce.x = 0.5 + Math.ceil(Math.random()) * .3;
    },

    createPlanks: function() {

    },

    createPools: function() {

    }

}