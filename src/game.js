var BasicGame = {};

var CREDITS = $.jStorage.get("user_credits");
var LANGUAGE = $.jStorage.get("opt_language");
var SFX = $.jStorage.get("opt_sfx");
var MUSIC = $.jStorage.get("opt_music");
if(CREDITS === null || CREDITS < BET){CREDITS = BEGIN_CREDITS;}
if(SFX === null){SFX = true;}
if(MUSIC === null){MUSIC = true;}
if(LANGUAGE === null){LANGUAGE = 'en';}

var AUTO = false;

var WIN = 0;
var WIN_POS = 0;
var WIN_POS_ARR = [];
var pos = 0;
var pos_steps = 360 / 20;
for(var i = 0; i < 20; i++){
    WIN_POS_ARR.push(pos);
    pos += pos_steps;
}

var LANG = {
	en:{
		welcome: "Welcome",
		settings_title_1: "Settings",
		settings_title_2: "Language",
		settings_opt_label_1: "Sound",
		settings_opt_label_2: "Music",
		settings_opt_label_3: "Fullscreen",
		msg_error_credits: "No credits!",
		msg_loading: "Loading ...",
		msg_autoplay_deactivated: "Autoplay deactivated",
		msg_autoplay_activated: "Autoplay activated",
		msg_play: "Game is running ...",
		msg_gamefinish: "Game finish!",
		msg_win: "YOU WIN",
		msg_nowins: "YOU LOSE!",
		btn_ok: "OK",
		btn_play: "Play",
		btn_spin: "SPIN"
	},
	de:{
		welcome: "Willkommen",
		settings_title_1: "Einstellungen",
		settings_title_2: "Sprache",
		settings_opt_label_1: "Soundeffekte",
		settings_opt_label_2: "Musik",
		settings_opt_label_3: "Vollbild",
		msg_error_credits: "Keine Kredits!",
		msg_loading: "Laden ...",
		msg_autoplay_deactivated: "Autoplay deaktiviert",
		msg_autoplay_activated: "Autoplay aktiviert",
		msg_play: "Spiel läuuft ...",
		msg_gamefinish: "Spielrunde beendet!",
		msg_win: "GEWONNEN",
		msg_nowins: "VERLOREN!",
		btn_ok: "OK",
		btn_play: "Spielen",
		btn_spin: "DREHEN"
	},
	es:{
		welcome: "Bienvenida",
		settings_title_1: "Ajustes",
		settings_title_2: "Idioma",
		settings_opt_label_1: "Efectos sonoros",
		settings_opt_label_2: "Música",
		settings_opt_label_3: "Pantalla completa",
		msg_error_credits: "Sin crédito!",
		msg_loading: "Cargar ...",
		msg_autoplay_deactivated: "Juego automática desactivada",
		msg_autoplay_activated: "Juego automática activada",
		msg_play: "El juego se está ejecutando ...",
		msg_gamefinish: "Ronda finalizada!",
		msg_win: "WON",
		msg_nowins: "PERDIDO!",
		btn_ok: "OK",
		btn_play: "Jugar",
		btn_spin: "GIRAR"
	}
};

function sizeHandler(){
    $("#game").css("height", $(window).innerHeight());
}
$(window).resize(function() {
    sizeHandler();
});
$(document).ready(function(){
    sizeHandler();
});

BasicGame.GameLoad = function (game){};

BasicGame.GameLoad.prototype = {
	init: function() {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
	},
    preload: function() {
    	this.game.load.image('bg', GAME_PATH+'assets/bg.png');
    	this.load.atlasJSONHash('splash', GAME_PATH+'assets/splash.png', GAME_PATH+'assets/splash.json');
    },
    create: function() {
    	this.bg = this.add.sprite(0, 0, 'bg');
		this.dec = this.add.sprite(0, 0, 'splash', 'dec_menu.png');
		this.dec.x = this.game.world.width - this.dec.width;
		this.dec.y = this.game.world.height - this.dec.height;
		this.logo = this.add.text(0, 141, GAME_NAME, {font: "127px Arial bold", fill: "#f6c522"});
		this.logo.x = this.game.world.centerX - this.logo.width / 2;
		this.PPanel = this.add.sprite(0, 661, 'splash', 'progress_panel.png');
		this.PPanel.x = this.game.world.centerX - this.PPanel.width / 2;
		var spacer = 6;
		this.dot1 = this.add.sprite(this.PPanel.x + 25, 684, 'splash', 'progress_dot.png');
		this.dot2 = this.add.sprite(this.dot1.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot3 = this.add.sprite(this.dot2.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot4 = this.add.sprite(this.dot3.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot5 = this.add.sprite(this.dot4.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot6 = this.add.sprite(this.dot5.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot7 = this.add.sprite(this.dot6.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot8 = this.add.sprite(this.dot7.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot9 = this.add.sprite(this.dot8.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot10 = this.add.sprite(this.dot9.x + this.dot1.width + spacer, 684, 'splash', 'progress_dot.png');
		this.dot1.visible = false;
		this.dot2.visible = false;
		this.dot3.visible = false;
		this.dot4.visible = false;
		this.dot5.visible = false;
		this.dot6.visible = false;
		this.dot7.visible = false;
		this.dot8.visible = false;
		this.dot9.visible = false;
		this.dot10.visible = false;
		this.game.load.onFileComplete.add(function(progress, cacheKey, success, totalLoaded, totalFiles){
			if(progress >= 10 && this.dot1.visible == false){this.dot1.visible = true;}
			if(progress >= 20 && this.dot2.visible == false){this.dot2.visible = true;}
			if(progress >= 30 && this.dot3.visible == false){this.dot3.visible = true;}
			if(progress >= 40 && this.dot4.visible == false){this.dot4.visible = true;}
			if(progress >= 50 && this.dot5.visible == false){this.dot5.visible = true;}
			if(progress >= 60 && this.dot6.visible == false){this.dot6.visible = true;}
			if(progress >= 70 && this.dot7.visible == false){this.dot7.visible = true;}
			if(progress >= 80 && this.dot8.visible == false){this.dot8.visible = true;}
			if(progress >= 90 && this.dot9.visible == false){this.dot9.visible = true;}
			if(progress >= 100 && this.dot10.visible == false){this.dot10.visible = true;}
        	if(progress == 100){
            	this.CallEventTimer = this.time.events.add(Phaser.Timer.SECOND, this.CallGame, this);
          	}
		}, this);
		this.BeginLoad();
    },
    BeginLoad: function (){
    	this.load.atlasJSONHash('basis', GAME_PATH+'assets/basis.png', GAME_PATH+'assets/basis.json');
		if(this.game.device.desktop){
			this.load.audio('music', [GAME_PATH+'assets/audio/music.mp3']);
            this.load.audio('sfx_click', [GAME_PATH+'assets/audio/click.mp3']);
            this.load.audio('sfx_bet', [GAME_PATH+'assets/audio/bet.mp3']);
            this.load.audio('sfx_win', [GAME_PATH+'assets/audio/win.mp3']);
            this.load.audio('sfx_lose', [GAME_PATH+'assets/audio/lose.mp3']);
            this.load.audio('sfx_wheel', [GAME_PATH+'assets/audio/wheel.mp3']);
		} else {
            if(navigator.userAgent.match(/Android/gi)){
            	this.load.audio('music', [GAME_PATH+'assets/audio/music.ogg']);
                this.load.audio('sfx_click', [GAME_PATH+'assets/audio/click.ogg']);
                this.load.audio('sfx_bet', [GAME_PATH+'assets/audio/bet.ogg']);
                this.load.audio('sfx_win', [GAME_PATH+'assets/audio/win.ogg']);
                this.load.audio('sfx_lose', [GAME_PATH+'assets/audio/lose.ogg']);
                this.load.audio('sfx_wheel', [GAME_PATH+'assets/audio/wheel.ogg']);
            } else {
            	this.load.audio('music', [GAME_PATH+'assets/audio/music.mp3']);
                this.load.audio('sfx_click', [GAME_PATH+'assets/audio/click.mp3']);
                this.load.audio('sfx_bet', [GAME_PATH+'assets/audio/bet.mp3']);
                this.load.audio('sfx_win', [GAME_PATH+'assets/audio/win.mp3']);
                this.load.audio('sfx_lose', [GAME_PATH+'assets/audio/lose.mp3']);
                this.load.audio('sfx_wheel', [GAME_PATH+'assets/audio/wheel.mp3']);
            }
		}
    	this.load.start();
    },
	CallGame: function (){
		if(DEBUGMODE === true){
			this.state.start('Game');
		} else {
			this.state.start('Lobby');
		}
	}
};

BasicGame.Lobby = function (game){};

BasicGame.Lobby.prototype = {
	create: function() {
		this.sfxClick = this.game.add.audio('sfx_click');
		this.add.sprite(0, 0, 'bg');
		this.dec = this.add.sprite(0, 0, 'splash', 'dec_menu.png');
		this.dec.x = this.game.world.width - this.dec.width;
		this.dec.y = this.game.world.height - this.dec.height;
		this.logo = this.add.text(0, 141, GAME_NAME, {font: "127px Arial bold", fill: "#f6c522"});
		this.logo.x = this.game.world.centerX - this.logo.width / 2;
		this.PlayBtn = this.add.sprite(0, 661, 'basis', 'btn_green.png');
		this.PlayBtn.x = this.game.world.centerX - this.PlayBtn.width / 2;
        this.PlayBtn.inputEnabled = true;
        this.PlayBtn.input.useHandCursor = true;
        this.PlayBtn.events.onInputDown.add(function(){
            if(SFX === true){
                this.sfxClick.play();
            }
        	this.state.start('Game');

        }, this);
        this.PlayBtnLabel = this.add.text(0, this.PlayBtn.y + 20, LANG[LANGUAGE]['btn_play'], {font: "63px Arial", fill: "#1f3311"});
		this.PlayBtnLabel.x = this.game.world.centerX - this.PlayBtnLabel.width / 2;
	}
}

BasicGame.Game = function (game){
	this.ready = false;
};

BasicGame.Game.prototype = {
  	create: function(){

  		this.MusicBG = this.add.audio('music');
  		this.sfxClick = this.game.add.audio('sfx_click');
  		this.sfxBet = this.game.add.audio('sfx_bet');
  		this.sfxWin = this.game.add.audio('sfx_win');
  		this.sfxLose = this.game.add.audio('sfx_lose');
  		this.sfxWheel = this.game.add.audio('sfx_wheel');

		if(MUSIC === true){
			this.MusicBG.play('', 0, 1, true);
		}

  		this.add.sprite(0, 0, 'bg');
  		this.wheel = this.add.sprite(1010, this.game.world.centerY, 'basis', 'wheel.png');
  		this.wheel.angle = 8;
        this.wheel.anchor.set(0.5);
        this.wheelfront = this.add.sprite(633, 162, 'basis', 'wheel_front.png');
        this.croupier = this.add.sprite(-563, 214, 'basis', 'croupier.png');
        this.bg_panel = this.add.sprite(0, 980, 'basis', 'bg_panel.png');

        this.add.sprite(35, 1001, 'basis', 'score_panel_1.png');
        this.add.sprite(14, 1005, 'basis', 'icon_coin.png');
        this.add.sprite(253, 1001, 'basis', 'score_panel_1.png');
        this.add.sprite(475, 1001, 'basis', 'message_panel.png');

        this.buttons = this.add.group();
        this.SettingsBtn = this.buttons.create(1350, 991, 'basis', 'btn_settings.png');
        this.SpinBtn = this.buttons.create(1010, this.game.world.centerY, 'basis', 'btn_spin.png');
        this.SpinBtn.anchor.set(0.5);
        this.buttons.setAll('inputEnabled', true);
        this.buttons.setAll('input.useHandCursor', true);
        this.buttons.setAll('input.pixelPerfectOver', true);
        this.buttons.setAll('input.pixelPerfectClick', true);
        this.SettingsBtn.events.onInputDown.add(this.viewSettings, this);
        this.SpinBtn.events.onInputDown.add(this.LoadGame, this);
        this.SpinBtnLabel = this.add.text(0, 0, '', {font: "20px Arial", fill: "#000000"});
        this.ValueCredits = this.add.text(74, 1013, CREDITS, {font: "30px Arial", fill: "#ffffff"});
        this.ValueBet = this.add.text(250, 1003, BET, {font: "30px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.ValueBet.setTextBounds(0, 0, 188, 58);
        this.ValueMessage = this.add.text(492, 1017, '', {font: "24px Arial", fill: "#ffffff"});
        this.ValueMessage.setTextBounds(0, 0, 239, 30);

		// Settings
        this.Settings = this.add.group();
        this.Mask = this.game.add.graphics(0, 0);
        this.Mask.beginFill('0x000000');
        this.Mask.drawRect(0, 0, this.game.world.width, this.game.world.height);
        this.Mask.alpha = 0.6;
        this.Settings.add(this.Mask);
        this.Settingsbg = this.Settings.create(this.game.world.centerX, this.game.world.centerY, 'basis', 'panel.png');
        this.Settingsbg.anchor.setTo(0.5);
        this.Settingsbg = this.Settings.create(21, 703, 'basis', 'coins.png');
        this.Settingsbg = this.Settings.create(1055, 105, 'basis', 'cards.png');
        this.settings_title1 = this.add.text(281, 232, '', {font: "56px Arial", fill: "#f8dc19"});
        this.settings_title2 = this.add.text(281, 647, '', {font: "56px Arial", fill: "#f8dc19"});
		this.settings_opt_label1 = this.game.add.text(387, 366, '', {font: "bold 34px Arial", fill: "#ffffff"});
		this.settings_opt_label2 = this.game.add.text(387, 471, '', {font: "bold 34px Arial", fill: "#ffffff"});
		this.settings_opt_label3 = this.game.add.text(844, 471, '', {font: "bold 34px Arial", fill: "#ffffff"});
        this.Settings.add(this.settings_title1);
        this.Settings.add(this.settings_title2);
		this.Settings.add(this.settings_opt_label1);
		this.Settings.add(this.settings_opt_label2);
		this.Settings.add(this.settings_opt_label3);
		this.SettingsButtons = this.add.group();
		this.CloseBtn = this.SettingsButtons.create(95, 127, 'basis', 'btn_resume.png');
		this.SFXBtn = this.SettingsButtons.create(281, 352, 'basis', 'btn_opt_on.png');
		if(SFX === false){this.SFXBtn.frameName = 'btn_opt_off.png';}
		this.MusicBtn = this.SettingsButtons.create(281, 457, 'basis', 'btn_opt_on.png');
		if(MUSIC === false){this.MusicBtn.frameName = 'btn_opt_off.png';}
		this.FullscreenBtn = this.SettingsButtons.create(738, 457, 'basis', 'btn_opt_off.png');
		this.settings_lang1_button = this.SettingsButtons.create(563, 738, 'basis','lang_en.png');
		this.settings_lang2_button = this.SettingsButtons.create(809, 738, 'basis','lang_de.png');
		this.settings_lang3_button = this.SettingsButtons.create(1055, 738, 'basis','lang_es.png');
		this.settings_lang1_button.anchor.x = 0.5;
		this.settings_lang2_button.anchor.x = 0.5;
		this.settings_lang3_button.anchor.x = 0.5;
		this.settings_lang1_button.scale.setTo(1.5);
		this.settings_lang2_button.scale.setTo(1.5);
		this.settings_lang3_button.scale.setTo(1.5);
        this.SettingsButtons.setAll('inputEnabled', true);
        this.SettingsButtons.setAll('input.useHandCursor', true);
        this.SettingsButtons.setAll('input.pixelPerfectOver', true);
        this.SettingsButtons.setAll('input.pixelPerfectClick', true);
        this.CloseBtn.events.onInputDown.add(this.closeSettings, this);
        this.SFXBtn.events.onInputDown.add(this.PressSFX, this);
        this.MusicBtn.events.onInputDown.add(this.PressMusic, this);
        this.FullscreenBtn.events.onInputDown.add(this.PressFullScreen, this);
		this.settings_lang1_button.events.onInputDown.add(function(){this.PressLang('en');}, this);
		this.settings_lang2_button.events.onInputDown.add(function(){this.PressLang('de');}, this);
		this.settings_lang3_button.events.onInputDown.add(function(){this.PressLang('es');}, this);
        this.Settings.add(this.SettingsButtons);
		this.copyr = this.game.add.text(1076, 919, 'Copyright 2018 by All-Scripts', {font: "17px Arial", fill: "#ffffff"});
		this.copyr.inputEnabled = true;
		this.copyr.input.useHandCursor = true;
		this.copyr.events.onInputDown.add(function(){window.location.href = 'https://www.all-scripts.de';}, this);
		this.Settings.add(this.copyr);
        this.Settings.visible = false;

		// Winpanel
        this.WinLabel = this.add.group();
        this.Mask2 = this.game.add.graphics(0, 0);
        this.Mask2.beginFill('0x000000');
        this.Mask2.drawRect(0, 0, this.game.world.width, this.game.world.height);
        this.Mask2.alpha = 0.6;
        this.WinLabel.add(this.Mask2);
        this.WinLabelbg = this.WinLabel.create(this.game.world.centerX, this.game.world.centerY, 'basis', 'win_panel.png');
        this.WinLabelbg.anchor.setTo(0.5);
        this.WinLabelbg = this.WinLabel.create(141, 563, 'basis', 'coins.png');
        this.WinLabelbg = this.WinLabel.create(267, 281, 'basis', 'stars_left.png');
        this.WinLabelbg = this.WinLabel.create(935, 281, 'basis', 'stars_right.png');
        this.labelwin = this.add.text(0, 316, '', {font: "63px Arial", fill: "#ffffff"});
        this.labelwin2 = this.add.text(0, 492, '+ 5000', {font: "84px Arial", fill: "#f8dc19"});
		this.labelwin2.x = this.game.world.centerX - this.labelwin2.width / 2;
		this.WinLabel.add(this.labelwin);
		this.WinLabel.add(this.labelwin2);
		this.WinCloseBtn = this.WinLabel.create(527, 661, 'basis', 'btn_green.png');
		this.WinCloseBtn.x = this.game.world.centerX - this.WinCloseBtn.width / 2;
        this.WinCloseBtn.inputEnabled = true;
        this.WinCloseBtn.input.useHandCursor = true;
        this.WinCloseBtn.events.onInputDown.add(function(){
            if(SFX === true){
                this.sfxClick.play();
            }        
        	this.closeWinLabel();
        }, this);
        this.WinCloseBtnLabel = this.add.text(0, this.WinCloseBtn.y + 25, '', {font: "63px Arial", fill: "#1f3311"});
		this.WinLabel.add(this.WinCloseBtnLabel);
        this.WinLabel.visible = false;

		// Losepanel
        this.LoseLabel = this.add.group();
        this.Mask3 = this.game.add.graphics(0, 0);
        this.Mask3.beginFill('0x000000');
        this.Mask3.drawRect(0, 0, this.game.world.width, this.game.world.height);
        this.Mask3.alpha = 0.6;
        this.LoseLabel.add(this.Mask3);
        this.LoseLabelbg = this.LoseLabel.create(this.game.world.centerX, this.game.world.centerY, 'basis', 'lose_panel.png');
        this.LoseLabelbg.anchor.setTo(0.5);
        this.LoseLabelbg = this.LoseLabel.create(141, 563, 'basis', 'coins.png');
        this.labellose = this.add.text(0, 345, '', {font: "63px Arial", fill: "#ffffff"});
        this.labellose.x = this.game.world.centerX - this.labellose.width / 2;
        this.labellose2 = this.add.text(0, 492, '', {font: "84px Arial", fill: "#f8dc19"});
		this.labellose2.x = this.game.world.centerX - this.labellose2.width / 2;
		this.LoseLabel.add(this.labellose);
		this.LoseLabel.add(this.labellose2);
		this.LoseCloseBtn = this.LoseLabel.create(527, 661, 'basis', 'btn_red.png');
		this.LoseCloseBtn.x = this.game.world.centerX - this.LoseCloseBtn.width / 2;
        this.LoseCloseBtn.inputEnabled = true;
        this.LoseCloseBtn.input.useHandCursor = true;
        this.LoseCloseBtn.events.onInputDown.add(function(){
            if(SFX === true){
                this.sfxClick.play();
            }              
        	this.closeLoseLabel();
        }, this);
        this.LoseCloseBtnLabel = this.add.text(0, this.LoseCloseBtn.y + 25, '', {font: "63px Arial", fill: "#ffffff"});
		this.LoseLabel.add(this.LoseCloseBtnLabel);
        this.LoseLabel.visible = false;
		this.UpdateLanguage();
		this.ValueMessage.text = LANG[LANGUAGE]['welcome'];

		tween = game.add.tween(this.croupier).to( { x: 70 }, 492, Phaser.Easing.Linear.None, true);
		this.ready = true;
	},
    PressSFX: function(){
    	if(DEBUGMODE === true){
    		console.log('press sfx');
    	}
    	if(SFX === true){
    		SFX = false;
    		this.SFXBtn.frameName = 'btn_opt_off.png';
    	} else {
    		SFX = true;
    		this.SFXBtn.frameName = 'btn_opt_on.png';
    	}
    	$.jStorage.set("opt_sfx", SFX);
    },
    PressMusic: function(){
    	if(DEBUGMODE === true){
    		console.log('press music');
    	}
    	if(MUSIC === true){
    		MUSIC = false;
    		this.MusicBG.stop();
    		this.MusicBtn.frameName = 'btn_opt_off.png';
    	} else {
    		MUSIC = true;
    		this.MusicBG.play('', 0, 1, true);
    		this.MusicBtn.frameName = 'btn_opt_on.png';
    	}
    	$.jStorage.set("opt_music", MUSIC);
    },
    PressFullScreen: function(){
    	if(DEBUGMODE === true){
    		console.log('press fullscreen');
    	}
        if(this.game.scale.isFullScreen){
            this.game.scale.stopFullScreen();
            this.FullscreenBtn.frameName = 'btn_opt_off.png';
        } else {
            this.game.scale.startFullScreen(false);
            this.FullscreenBtn.frameName = 'btn_opt_on.png';
        }
    },
	PressAuto: function(){
    	if(DEBUGMODE === true){
    		console.log('press autoplay');
    	}
        if(SFX === true){
            this.sfxClick.play();
        }
		if(AUTO === true){
			AUTO = false;
			this.ValueMessage.text = LANG[LANGUAGE]['msg_autoplay_deactivated'];
		} else {
			AUTO = true;
			this.ValueMessage.text = LANG[LANGUAGE]['msg_autoplay_activated'];
		}
	},
    PressLang: function(lang){
        LANGUAGE = lang;
        this.UpdateLanguage();
    },
    UpdateLanguage: function(){
    	if(DEBUGMODE === true){
    		console.log('update language | new language: '+LANGUAGE);
    	}
		this.labelwin.text = LANG[LANGUAGE]['msg_win'];
        this.labelwin.x = this.game.world.centerX - this.labelwin.width / 2;
		this.WinCloseBtnLabel.text = LANG[LANGUAGE]['btn_ok'];
		this.WinCloseBtnLabel.x = this.game.world.centerX - this.WinCloseBtnLabel.width / 2;
		this.labellose.text = LANG[LANGUAGE]['msg_nowins'];
		this.labellose.x = this.game.world.centerX - this.labellose.width / 2;
		this.LoseCloseBtnLabel.text = LANG[LANGUAGE]['btn_ok'];
		this.LoseCloseBtnLabel.x = this.game.world.centerX - this.LoseCloseBtnLabel.width / 2;
		this.SpinBtnLabel.text = LANG[LANGUAGE]['btn_spin'];
        this.SpinBtnLabel.x = this.SpinBtn.x - this.SpinBtnLabel.width / 2;
        this.SpinBtnLabel.y = this.SpinBtn.y - this.SpinBtnLabel.height / 2 + 5;
		this.settings_title1.text = LANG[LANGUAGE]['settings_title_1'];
		this.settings_title2.text = LANG[LANGUAGE]['settings_title_2'];
		this.settings_opt_label1.text = LANG[LANGUAGE]['settings_opt_label_1'];
		this.settings_opt_label2.text = LANG[LANGUAGE]['settings_opt_label_2'];
		this.settings_opt_label3.text = LANG[LANGUAGE]['settings_opt_label_3'];
		this.ValueMessage.text = '';
		$.jStorage.set("opt_language", LANGUAGE);
    },
	viewSettings: function(){
        if(SFX === true){
            this.sfxClick.play();
        }
        this.buttons.setAll('inputEnabled', false);
		this.Settings.visible = true;
	},
	closeSettings: function(){
        if(SFX === true){
            this.sfxClick.play();
        }
        this.Settings.visible = false;
        this.buttons.setAll('inputEnabled', true);
        this.buttons.setAll('input.useHandCursor', true);
        this.buttons.setAll('input.pixelPerfectOver', true);
        this.buttons.setAll('input.pixelPerfectClick', true);
	},
	closeWinLabel: function(){
		this.WinLabel.visible = false;
	},
	closeLoseLabel: function(){
		this.LoseLabel.visible = false;
	},
    LoadGame: function(){
		if(this.ready === true){
			this.ready = false;
			this.ValueMessage.text = LANG[LANGUAGE]['msg_loading'];
           	if(CREDITS >= BET){
           		CREDITS -= BET;
           		this.updateCREDITS();
                var container = [];
                for(i = 0; i < 20; i++){
                    for(n = 0; n <= CHANCES[i]['count']; n++){
                        container.push(i);
                    }
                }
                this.shuffle(container);
                var pos = this.game.rnd.between(0, container.length);
                WIN_POS = container[pos];
                if(DEBUGMODE === true){
                    console.log('WIN_POS: '+WIN_POS);
                    console.log('ARRAY: '+container);
                }
	           	this.Spin();
            } else {
                this.ValueMessage.text = LANG[LANGUAGE]['msg_error_credits'];
            }
		} else {
			this.PressAuto();
		}
	},
    updateCREDITS: function(){
    	$.jStorage.set("user_credits", CREDITS);
    	this.ValueCredits.text = this.number_format(CREDITS, 0, ',', '');
    },
    Spin: function(){
   		this.ValueMessage.text = LANG[LANGUAGE]['msg_play'];
        if(SFX === true){
            this.sfxWheel.play();
        }
    	this.spinTween = this.game.add.tween(this.wheel).to({angle: 360 * WHEEL_ROUNDS + WIN_POS_ARR[WIN_POS] + 9}, 3516, Phaser.Easing.Quadratic.Out, true);
        this.spinTween.onComplete.add(this.winPrize, this);
	},
	winPrize: function(){
    	if(WIN_PRIZES[WIN_POS] === 0){
    		WIN = 0;
    	}
    	else if(WIN_PRIZES[WIN_POS] === 'x5' || WIN_PRIZES[WIN_POS] === 'x2' || WIN_PRIZES[WIN_POS] === 'x10'){
    		var factor = WIN_PRIZES[WIN_POS].substr(1);
    		WIN = BET * factor;
    	} else {
    		WIN = WIN_PRIZES[WIN_POS];
    	}
    	this.time.events.add(Phaser.Timer.SECOND, function(){
            this.ready = true;
            if(AUTO === true){
            	if(WIN > 0){
                    CREDITS += WIN;
                    this.updateCREDITS();
                    if(SFX === true){
                        this.sfxWin.play();
                    }
            		this.ValueMessage.text = LANG[LANGUAGE]['msg_win'] + ' + ' + this.number_format(WIN, 0, ',', '');
            	} else {
                    if(SFX === true){
                        this.sfxLose.play();
                    }
            		this.ValueMessage.text = LANG[LANGUAGE]['msg_nowins'];
            	}
                this.time.events.add(Phaser.Timer.SECOND, this.LoadGame, this);
            } else {
            	if(WIN > 0){
                    CREDITS += WIN;
                    this.updateCREDITS();
            		this.labelwin2.text = '+ ' + this.number_format(WIN, 0, ',', '');
            		this.WinLabel.visible = true;
                    if(SFX === true){
                        this.sfxWin.play();
                    }
            	} else  {
            		this.labellose2.text = '0 ';
            		this.LoseLabel.visible = true;
                    if(SFX === true){
                        this.sfxLose.play();
                    }
            	}
            	this.ValueMessage.text = LANG[LANGUAGE]['msg_gamefinish'];
            }
    	}, this);
	},
    shuffle: function(array){
    	var currentIndex = array.length, temporaryValue, randomIndex ;
      	while (0 !== currentIndex) {
      		randomIndex = Math.floor(Math.random() * currentIndex);
        	currentIndex -= 1;
        	temporaryValue = array[currentIndex];
        	array[currentIndex] = array[randomIndex];
        	array[randomIndex] = temporaryValue;
      	}
      	return array;
    },
	number_format: function(number, decimals, decPoint, thousandsSep){
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
		var n = !isFinite(+number) ? 0 : +number
		var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
		var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
		var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
		var s = ''
		var toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec)
			return '' + (Math.round(n * k) / k).toFixed(prec)
		}
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || ''
			s[1] += new Array(prec - s[1].length + 1).join('0')
		}
		return s.join(dec)
	}
}

var game = new Phaser.Game(1440, 1080, Phaser.AUTO, 'game');
game.state.add('GameLoad', BasicGame.GameLoad);
game.state.add('Lobby', BasicGame.Lobby);
game.state.add('Game', BasicGame.Game);
game.state.start('GameLoad');