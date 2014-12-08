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
        this.createCars();


    },

    createFigures: function() {
        this.figures = this.game.add.group();
        this.figures.enableBody = true;
        this.probabilityK = 0.3 + Math.ceil(Math.random()) * 0.3;
        this.figureWidth = this.game.cache.getImage('figure_k').width / 7;
        this.figureHeight = this.game.cache.getImage('figure_k').height;

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

    createCars: function() {
        this.cars = this.game.add.group();
        this.cars.enableBody = true;
        this.carScale = {x: 0.8, y: 0.8};

        var carWidth = this.game.cache.getImage('car_0').width / 2 * this.carScale.x,
            carHeight = this.game.cache.getImage('car_0').height * this.carScale.y,
            carDistance = Math.round(this.game.width / 3),
            boundingBoxOffsetX = 18 * this.carScale.x;

        var x = (carDistance - carWidth) / 2 ,
            y = this.game.height - carHeight,
            newCar;

        for( var i = 0; i < 3; i++ ) {

            var probability = Math.random(),
                carKey = '';

            if(probability < .33) {

                carKey = 'car_0';

            } else if( probability >= .33 && probability < .66) {

                carKey = 'car_k';

            } else {

                carKey = 'car_t';

            }

            newCar = this.cars.create(x, y, carKey);
            newCar.scale.setTo(this.carScale.x, this.carScale.y);
            newCar.body.allowGravity = false;
            newCar.body.immovable = true;
            newCar.body.setSize( carWidth - boundingBoxOffsetX,
                carHeight, boundingBoxOffsetX, 0)
            x += carDistance;

        }

    },

    createNewPlank : function(row) {
        var x = this.paddingLeft +
            Math.random() * (this.game.width - this.paddingLeft -this.paddingRight - this.plankWidth),
            y = this.paddingTop + row * this.rowDistance;

        var newPlank = this.planks.create( x, y, 'plank');

        //newPlank.scale.setTo(2, 2)

        newPlank.body.allowGravity = false;
        newPlank.body.immovable = true;

        newPlank.inputEnabled = true;
        newPlank.input.enableDrag();
        newPlank.input.setDragLock(true, false);
        newPlank.input.boundsRect = new Phaser.Rectangle( 0, y - newPlank.height,
            this.game.width, y + newPlank.height);
    },

    createNewFigure : function () {

        var boundingBoxOffsetX = 16;

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
            newFigure.body.setSize(this.figureWidth - boundingBoxOffsetX * 2,
                100, boundingBoxOffsetX, 0);
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
    },

    //DEBUG
    render: function() {
        /*this.planks.forEach(function(plank){
         this.game.debug.body(plank)
         }, this)*/

        /*this.figures.forEach(function(figure){
            this.game.debug.body(figure)
        }, this)*/

        /*this.cars.forEach(function(car){
            this.game.debug.body(car)
        }, this)*/


    },

    update: function() {

        this.game.physics.arcade.collide(this.figures, this.planks)
        this.game.physics.arcade.collide(this.figures, this.cars)

    }



}