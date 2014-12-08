alabebop.LevelRoundState = function (game) {}

alabebop.LevelRoundState.prototype = {

    init : function( levelData ) {
        this.levelData = levelData;
    },

    create: function() {
        this.pointMap = this.game.gameSetting.setting.pointMap;

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
        var numSafeCars = this.game.gameSetting.setting.numSafeCars[this.levelData.level],
            carPosIdxAry = [];

        for(var o = 0; o < this.game.gameSetting.setting.numCars[this.levelData.level]; o++) {
            carPosIdxAry.push(o);
        }

        var carWidth = this.game.cache.getImage('car_0').width / 2 * this.carScale.x,
            carHeight = this.game.cache.getImage('car_0').height * this.carScale.y,
            carDistance = Math.round(this.game.width / 4),
            boundingBoxOffsetX = 18 * this.carScale.x;

        var xStart = (carDistance - carWidth) / 2,
            y = this.game.height - carHeight,
            newCar;

        //create safe cars and place them randomly
        for( var i = 0; i < numSafeCars; i++ ) {

            var posIdx = Math.floor(Math.random() * carPosIdxAry.length),
                x = xStart + carPosIdxAry[posIdx] * carDistance;
            carPosIdxAry.splice(posIdx, 1);

            newCar = this.cars.create(x, y, 'car_0');
            newCar.scale.setTo(this.carScale.x, this.carScale.y);
            newCar.body.allowGravity = false;
            newCar.body.immovable = true;
            newCar.body.setSize( carWidth - boundingBoxOffsetX,
                carHeight, boundingBoxOffsetX, 0)
        }

        //in the lefing spots randomly create other two types of cars
        for( var j = 0; j < carPosIdxAry.length; j++ ) {

                var posIdx = carPosIdxAry[j],
                    probability = Math.random(),
                carKey = '';

            x = xStart + posIdx * carDistance;

            if(probability < .5) {

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

        this.game.physics.arcade.collide(this.figures, this.planks, this.collisionHandlerPlank, null, this)
        this.game.physics.arcade.collide(this.figures, this.cars, this.collisionCarHandler, null, this);

        this.figures.forEach(function(figure){

            if(figure.body.onFloor()) {
                figure.frame = 1;
            }

            if(figure.body.onWall()) {
                if(figure.x <= 0) {
                    figure.frame = 3;
                } else {
                    figure.frame = 2;
                }
            }

        });

    },

    collisionCarHandler : function(figure, car) {

        if(figure.body.touching.down && car.body.touching.up && this.pointMap[figure.key][car.key]) {
            figure.kill()
            car.frame = 1;
        }

        if( figure.body.touching.left && car.body.touching.right ) {
            figure.frame = 3;
        }

        if( figure.body.touching.right && car.body.touching.left ) {
            figure.frame = 2;
        }

    },

    collisionHandlerPlank : function(figure, plank) {

        if(figure.body.touching.up && plank.body.touching.down ) {
            figure.frame = 0;
        }

        if( figure.body.touching.down && plank.body.touching.up ) {
            figure.frame = 5;
        }

        if( figure.body.touching.left && plank.body.touching.right ) {
            figure.frame = 3;
        }

        if( figure.body.touching.right && plank.body.touching.left ) {
            figure.frame = 2;
        }

    }

}