/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "game",
	kind: "onyx.Slideable",
	layoutKind: "FittableRowsLayout",
	//draggable: false,
	min: -100,
	max: 0,
	value: -100,
	unit: "%",
	classes: "enyo-fit",
	style: "width: 300px; background-color: #333333; border-right: 2px ridge black; position: fixed; z-index: 2;",
	published: {
		game: {},
		gameNo: 0,
		users: {},
		conference: "",
		matchup: "",
		round: "",
		locked: false,
		roundName: "",
		extras: {}
	},
	events: {
		onGamePlayed: "",
		onClose: ""
	},
	components: [
		{ kind: "onyx.Toolbar", style: "text-align: center; height: 58px;", components: [
			//{ kind: "onyx.IconButton", src: "img/icons/button_left.png", classes: "onyx-icon-lg", ontap: "goLeft", style: "float: left" },
			{ name: "toolText" },
			//{ kind: "onyx.IconButton", src: "img/icons/button_right.png", classes: "onyx-icon-lg", ontap: "goRight", style: "float: right" },
		]},
		{ kind: "Scroller", layoutKind: "FittableRowsLayout", classes: "center", thumb: false, horizontal: "auto", fit: true, components: [
			{ kind: "onyx.GroupboxHeader", content: "Home" },
			{ name: "home", kind: "team", team: "home", onSetUser: "userChanged" },
			
			//{ style: "height: 20%;" },
			
			{ kind: "onyx.Groupbox", style: "clear: both;", components: [
			    { kind: "onyx.GroupboxHeader", content: "Final" },
			    { name: "extras" },
		        /*{ components: [
		            { content: "OT", style: "display: inline;margin-right:5px;" },
		            { name: "OT", kind: "onyx.ToggleButton", value: false }
		        ]},
		        { components: [
		            { content: "EN", style: "display: inline;margin-right:5px;" },
		            { name: "EN", kind: "onyx.ToggleButton", value: false }
		        ]},*/
		        { components: [
		        	{ name: "save", kind: "onyx.Button", content: "Save", ontap: "save", style: "width:100%;", classes: "onyx-blue" },
		        ]},
		        { components: [
		        	{ kind: "onyx.Button", content: "Close", ontap: "close", style: "width:100%;" }
		        ]}
		    ]},
			
			//{ style: "height: 20%;" },
			
			{ name: "away", kind: "team", team: "away", onSetUser: "userChanged", style: "clear: both;", },
			{ kind: "onyx.GroupboxHeader", content: "Away", style: "clear: both;", },
		]},
		{ kind: "onyx.Toolbar", style: "height: 58px;bottom:0px;" }
	],
	create: function(){
		this.inherited(arguments);
	},
	userChanged: function(inSender, inEvent){
		var ha = inSender.name;
		
		if(_t.matchups[this.roundName][this.conference][this.matchup-1][ha].user == clone(this.$[ha].$.user.user))return;
		
		_t.matchups[this.roundName][this.conference][this.matchup-1][ha].user = clone(this.$[ha].$.user.user);
		
		_t.matchups[this.roundName][this.conference][this.matchup-1][ha].userChanged = true;
		
		this.refresh();
		
		if(this.roundName != "finals"){
			this.owner.$[this.roundName + "_right"].render();
			this.owner.$[this.roundName + "_left"].render();
		} else {
			this.owner.$.finals.render();
		}
		this.owner.$.matchup.refresh();
		_t.users.user1.originator = null;
		_t.users.user2.originator = null;
	},
	refresh: function(inSender, inEvent){
		this.setShowing(true);
		//this.$.conference.setContent(this.conference);
		
		//this.$.matchup.setContent(this.matchup);
		//this.$.round.setContent(this.round);
		//this.$.game.setContent(this.gameNo + 1);
		this.$.toolText.setContent("Game " + (this.gameNo + 1));
		
		this.$.home.setGame(this.game);
		this.$.away.setGame(this.game);
		
		this.$.extras.destroyComponents();
		for(var c in this.$.extras.getControls()){
			this.$.extras.getControls()[c].destroy();
		}
		if(typeof this.extras == "undefined"){this.extras = []}
		if(typeof this.game.overtime != "undefined" ){this.extras = this.extras.concat(_gameOn.$.generator.sports[_t.left.sport].extras)}
		for (var x in this.extras){
			if(this.$[this.extras[x]])continue;
			this.$.extras.createComponents([
				{ components: [
		            { content: this.extras[x], style: "display: inline;margin-right:5px;" },
		            { name: this.extras[x], kind: "onyx.ToggleButton", value: false, owner: this }
		        ]}
			]);
			
			this.$[this.extras[x]].setDisabled(this.locked);
			
			var value;
			
			if(this.extras[x] == "OT" && this.game.overtime){value = this.game.overtime}
			else if(this.extras[x] == "EN" && this.game.emptynet){value = this.game.emptynet}
			else {value = this.game[this.extras[x]]}
			
			this.$[this.extras[x]].setValue(value);
		}
		this.$.extras.render();
		
		//console.log(this.game.played)
		if(this.game.played){this.locked = true}
		
		this.$.save.setDisabled(this.locked);
		
		this.$.home.setDisabled(this.locked);
		this.$.away.setDisabled(this.locked);
		
		if (this.$.home.$.user.user == this.$.away.$.user.user){
			this.$.home.$.user.setAuto(true);
			this.$.away.$.user.setAuto(true);
		} else {
			this.$.home.$.user.setAuto(false);
			this.$.away.$.user.setAuto(false);
		}
		
	},
	save: function(inSender, inEvent){
		var extras = {};
		for( var x in this.extras ){
			var xt = this.$[this.extras[x]];
			extras[xt.name] = xt.getValue();
		}
		
		var homeScore = this.$.home.score;
		var awayScore = this.$.away.score;
		
		if (homeScore==awayScore) {
			var _alert = alert( "GAME TIED! CANNOT SAVE GAME...", this );
			return;
		}
		if (extras.OT || extras.EI || extras.WO){
			var limit = 1;
			switch(_t.left.sport){
				case "NHL":
					limit = 1;
					break;
				case "MLB":
					limit = 4;
					break;
				case "NFL":
					limit = 7;
					break;
				case "NBA":
					limit = 30;
					break;
			}
			//console.log(limit, "limit", homeScore - awayScore, -(awayScore - homeScore), (homeScore - awayScore) > limit, -(awayScore - homeScore) > limit)
			if ((homeScore - awayScore) > limit && -(awayScore - homeScore) > limit){
				var _alert = alert( "YOU SAID IT WAS OVERTIME! YOU LIE.", this );
				return;
			}
			
		}
		if (this.$.home.$.user.user == this.$.away.$.user.user){
			var _alert = alert( "A USER CANNOT FACE THEMSELVES. PLEASE CHANGE THE USER FOR ONE OF THE TEAMS.", this );
			return;
		}
		
		var results = {
			game: this.matchup - 1,
			round: this.round,
			conference: this.conference,
			home: {
				score: homeScore
			},
			away: {
				score: awayScore
			},
			winner: homeScore > awayScore ? "home" : "away",
			extras: extras
		}
		this.doGamePlayed(results);
	},
	close: function(inSender, inEvent){
		this.$.animator.play();
		
		if(this.value != this.min)
			this.animateToMin();
	},
	open: function(inSender, inEvent){
		this.$.animator.play();
		
		if(this.value != this.max)
			this.animateToMax();
	},
	scrollLeft: function() {
		//this.updateScroll(-20);
	},
	scrollRight: function() {
		//this.updateScroll(20);
	},
	updateScroll: function(distance) {
		/*var newScroll = this.$.hbox.scrollLeft + distance;
		if (newScroll > this.$.hbox.getScrollBounds().maxLeft) newScroll = this.$.hbox.getScrollBounds().maxLeft;
		if (newScroll < 0) newScroll = 0;
		this.$.hbox.scrollLeft = newScroll;
		this.$.hbox.scrollTo(this.$.hbox.scrollLeft);*/
	}
});