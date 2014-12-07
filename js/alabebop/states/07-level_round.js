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

        this.numRows = this.game.gameSetting.setting.numRows[this.levelData.level];

        this.paddingTop = this.paddingBottom = 260;
        this.paddingLeft = this.paddingRight = 70;
        this.rowDistance = Math.round(
            (this.game.height - this.paddingTop - this.paddingBottom) / this.numRows);

        for ( var i = 0; i < this.numRows; i++) {

            this.createNewPlank(i)

        }

    },

    createPools: function() {

    },

    createNewPlank : function(row) {
        var x = this.paddingLeft +
            Math.random() * (this.game.width - this.paddingLeft -this.paddingRight),
            y = this.paddingTop + row * this.rowDistance;

        var newPlank = this.planks.create( x, y, 'plank');
        newPlank.body.allowGravity = false;
        newPlank.body.immovable = true;
    },

    newPlankPos : function(index) {

        if( !this.grid ) {
            this.grid = this.calcGrid(this.game.gameSetting.setting.gridSizes[this.levelData.level])
        }

        return {
            minX : 200,
            minY : 260
        }

    },

    createNewFigure : function () {

        if( this.figures.length < this.game.gameSetting.setting.totalFigures ) {

            var probability = Math.random(),
                newFigure;

            if(probability  <= this.probabilityK ) {

                newFigure = this.figures.create( 292, 100, 'figure_k');

            } else {

                newFigure = this.figures.create( 292, 100, 'figure_t');

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