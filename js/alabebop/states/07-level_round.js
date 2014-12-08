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

    render: function() {
        /*this.planks.forEach(function(plank){
            this.game.debug.body(plank)
        }, this)*/


    },

    createFigures: function() {
        this.figures = this.game.add.group();
        this.figures.enableBody = true;
        this.probabilityK = 0.3 + Math.ceil(Math.random()) * 0.3;

        this.createNewFigure();

        this.generateFigureLoop = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.createNewFigure, this);

    },

    createPlanks: function() {
        this.planks = this.game.add.group();
        this.planks.enableBody = true;
        this.plankWidth = this.game.cache.getImage('plank').width;

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
            Math.random() * (this.game.width - this.paddingLeft -this.paddingRight - this.plankWidth),
            y = this.paddingTop + row * this.rowDistance;

        var newPlank = this.planks.create( x, y, 'plank');

        newPlank.scale.setTo(2, 2)

        newPlank.body.allowGravity = false;
        newPlank.body.immovable = true;

        newPlank.inputEnabled = true;
        newPlank.input.enableDrag();
        newPlank.input.setDragLock(true, false);
        newPlank.input.boundsRect = new Phaser.Rectangle( 0, y - newPlank.height,
            this.game.width, y + newPlank.height);
    },

    createNewFigure : function () {

        if( this.figures.length < this.game.gameSetting.setting.totalFigures ) {

            var probability = Math.random(),
                newFigure;

            if(probability  <= this.probabilityK ) {

                newFigure = this.figures.create( 292, 96, 'figure_k');

            } else {

                newFigure = this.figures.create( 292, 104, 'figure_t');

            }

            newFigure.frame = 6;
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

        do {
            figure.body.velocity.x = (Math.random() -.5) * 400;
        } while (!figure.body.velocity.x || Math.abs(figure.body.velocity.x) < 100)


        figure.body.allowGravity = true;

        figure.body.bounce.y = 0.5 + Math.ceil(Math.random()) * .3;
        figure.body.bounce.x = 0.5 + Math.ceil(Math.random()) * .3;

        this.game.time.events.remove(figure.timer);
    }



}