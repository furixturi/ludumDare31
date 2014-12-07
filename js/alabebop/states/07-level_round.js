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

        this.game.physics.arcade.collide(this.figures, this.planks)

    },

    createFigures: function() {
        this.figures = this.game.add.group();
        this.figures.enableBody = true;
        this.probabilityK = 0.3 + Math.ceil(Math.random()) * 0.3;

        this.createNewFigure();

        this.generateFigureLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.createNewFigure, this);

    },

    createPlanks: function() {
        this.planks = this.game.add.group();
        this.planks.enableBody = true;

        for ( var i = 0; i < this.game.gameSetting.setting.numPlanks[this.levelData.level]; i++) {

            this.createNewPlank(i)

        }

    },

    createPools: function() {

    },

    createNewPlank : function(index) {
        var grid = this.calcGrid(index);
        var x = index === 0 ? this.game.world.centerX :
            grid.minX + Math.ceil(Math.random() * this.game.gameSetting.setting.gridSizes[this.levelData.level]);
        var y = index === 0 ? 200 :
            grid.minY + Math.ceil(Math.random() * this.game.gameSetting.setting.gridSizes[this.levelData.level]);

        var newPlank = this.planks.create( x, y, 'plank');
        newPlank.anchor.setTo(0.5, 0.5);
        newPlank.body.allowGravity = false;
        newPlank.body.immovable = true;
    },

    calcGrid : function(index) {
        var paddingLeft,
            paddingRight = paddingLeft = 70,
            paddingTop = 200,
            paddingBottom = 260,
            gridSize = this.game.gameSetting.setting.gridSizes[this.levelData.level],
            grid = {
                minX : paddingLeft,
                minY : paddingTop
            };

        return grid;


    },

    createNewFigure : function () {

        if( this.figures.length < this.game.gameSetting.setting.totalFigures ) {

            var probability = Math.random(),
                newFigure;

            if(probability  <= this.probabilityK ) {

                newFigure = this.figures.create( 308, 116, 'figure_k');

            } else {

                newFigure = this.figures.create( 308, 116, 'figure_t');

            }

            newFigure.frame = 5;
            newFigure.body.allowGravity = false;
            newFigure.body.collideWorldBounds = true;
            newFigure.timer = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.jumpFigure, this, newFigure);

        } else {
            //remove generate figure timer
            this.game.time.events.remove(this.generateFigureLoop);

        }

    },

    jumpFigure: function(figure) {
        figure.frame = 4;
        figure.body.velocity.x = (Math.random() -.5) * 400;
        figure.body.allowGravity = true;
        figure.body.bounce.y = 0.5 + Math.ceil(Math.random()) * .3;
        figure.body.bounce.x = 0.5 + Math.ceil(Math.random()) * .3;
        this.game.time.events.remove(figure.timer);
    }



}