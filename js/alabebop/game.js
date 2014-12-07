alabebop.Game = function () {}

alabebop.Game.prototype = {

    start: function() {
        var game = new Phaser.Game(640, 960, Phaser.AUTO, 'game-area');

        game.gameSetting = new alabebop.GameSetting();

        game.state.add('boot', alabebop.BootState);
        game.state.add('preload', alabebop.PreloadState);
        game.state.add('main-intro', alabebop.MainIntroState);
        game.state.add('main-menu', alabebop.MainMenuState);
        game.state.add('level-master', alabebop.LevelMasterState);
        game.state.add('level-intro', alabebop.LevelIntroState);
        game.state.add('level-round', alabebop.LevelRoundState);
        game.state.add('ending', alabebop.EndingState);
        game.state.start('boot');
    }

}