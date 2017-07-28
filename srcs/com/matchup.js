/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "matchup",
	kind: "onyx.Slideable",
	classes: "enyo-fit",
	style: "padding: 0px; width: 1000px; border-left: 2px ridge black; background-color: #333333; position: fixed; z-index: 1; ",
	
	//width: 1000px; height: 600px; 
	
	
	/*autoDismiss: false,
	floating: true,*/
	
	//draggable: false,
	min: 0,
	max: window.innerWidth,
	value: window.innerWidth,
	unit: "px",
	
	published: {
		game: {},
		users: {},
		conference: "",
		matchup: "",
		matchups: "",
		round: "",
		current: 0,
		locked: false,
		side: "",
		roundName: "",
		isMax: true
	},
	events: {
		onViewGame: "",
		onMatchupComplete: "",
		onGetLogo: ""
	},
	components: [
		{ name: "render", components: [
			{ name: "background", kind: "enyo.Image", style: "position: absolute; width: 576px; height: 384px; opacity: .05; left: 212px; top: 133px;" },
			{ kind: "onyx.Toolbar", components: [
				{ kind: "onyx.IconButton", src: "img/icons/button_left.png", classes: "onyx-icon-lg", ontap: "previousMatchup", style: "float: left" },
				{ content: "Head to Head Matchup", style: "margin-top:12px;" },
				{ kind: "onyx.IconButton", src: "img/icons/button_right.png", classes: "onyx-icon-lg", ontap: "nextMatchup", style: "float: right" }
			]},
			{ layoutKind: "FittableRowsLayout", style: "padding: 15px;", fit: true, components: [
				{ layoutKind: "FittableColumnsLayout", fit: true, components: [
					{ classes: "list round", components: [
						{ layoutKind: "FittableColumnsLayout", components: [
							{ classes: "game game-extended-left left", style: "width: 350px; border-bottom:none;", components: [
								{ components: [
									{ name: "home", kind: "seed", side: "left", classes: "item-extended-left" }
								]}
							]},
							{ classes: "game game-extended-right left", style: "width: 60px; border-bottom:none;", components: [
								{ components: [
									{ name: "home_wins", classes: "item item-extended-right wins" }
								]}
							]}
						]},
						{ layoutKind: "FittableColumnsLayout", components: [
							{ classes: "game game-extended-left left", style: "width: 350px; border-top:none;", components: [
								{ components: [
									{ name: "away", kind: "seed", side: "left", classes: "item-extended-left" }
								]}
							]},
							{ classes: "game game-extended-right left", style: "width: 60px; border-top:none;", components: [
								{ components: [
									{ name: "away_wins", classes: "wins item item-extended-right " }
								]}
							]}
						]}
					]},
					{ name: "summary", layoutKind: "FittableRowsLayout", style: "font-weight: 900; text-align: center;", fit: true },
				]},
				{ name: "games", layoutKind: "FittableRowsLayout", style: "font-weight: 900; text-align: left; margin-top: 40px; margin-left: 40px;", fit: true }
			]},
			{ kind: "onyx.Button", content: "Close", ontap: "close", style: "bottom:50px;right:50px;position:absolute;" },
		/*{ kind: "onyx.Toolbar", classes: "center", components: [
			{ name: "right", kind: "onyx.IconButton", src: "img/icons/menu-icon-forward.png", onmousedown: "right", onmouseup: "stop", style: "float:right" },
			{ kind: "onyx.Button", content: "Close", ontap: "close" },
			{ name: "left", kind: "onyx.IconButton", src: "img/icons/menu-icon-back.png", onmousedown: "left", onmouseup: "stop", style: "float:left" }
		]}*/
		]}
	],
	create: function(){
		this.inherited(arguments);
	},
	resizeHandler: function(inEvent){
		var newMax = window.innerWidth;
		var newMin = window.innerWidth - 1000;
		
		
		
		this.setMax(newMax);
		this.setMin(newMin);
		
		switch(this.isMax){
			case true:
				this.animateToMax();
				break;
			case false:
				this.animateToMin();
				break;
		}
		
	},
	previousMatchup: function(inSender, inEvent){
		if(this.roundName == "finals"){return}
		this.matchup--;
		var backup = this.conference;
		if (this.matchup < 0) {
			this.side = this.side == "left" ? "right" : "left";
			this.conference = _t[this.side].conference;
			try {
				this.matchup = _t.matchups[this.roundName][this.conference].length - 1;
			} catch (e) {
				this.conference = backup;
				this.matchup = _t.matchups[this.roundName][this.conference].length - 1;
			}
		}
		
		var _m = _t.matchups[this.roundName];
		var _c = _m[this.conference];
		var _g = _c[this.matchup];
		this.setMatchups(_g);
		
		console.log("PREVIOUS MATCHUP:", this.conference, this.matchup, this.matchups);
		this.refresh();
	},
	nextMatchup: function(inSender, inEvent){
		if(this.roundName == "finals"){return}
		this.matchup++;
		var backup = this.conference;
		if (this.matchup >= _t.matchups[this.roundName][this.conference].length) {
			this.side = this.side == "left" ? "right" : "left";
			this.conference = _t[this.side].conference;
			this.matchup = 0;
			try {
				_t.matchups[this.roundName][this.conference].length - 1;
			} catch (e) {
				this.conference = backup;
			}
		}
		
		var _m = _t.matchups[this.roundName];
		
		var _c = _m[this.conference];
		
		var _g = _c[this.matchup];
		this.setMatchups(_g);
		
		console.log("NEXT MATCHUP:", this.conference, this.matchup, this.matchups);
		this.refresh();
	},
	refresh: function(inSender, inEvent){
		this.setCurrent(this.matchups.current);
		this.setShowing(true);
		/*this.$.conference.setContent(this.conference);
		
		this.$.matchup.setContent(this.matchup + 1);
		this.$.round.setContent(this.round);
		this.$.game.setContent(this.current + 1);
		
		this.$.status.setContent(this.matchups.status);
		
		//this.$.home.setContent(this.matchups.home.team);
		//this.$.away.setContent(this.matchups.away.team);
		
		this.$.home_score.setContent(this.matchups.games[this.current].home.score);
		this.$.away_score.setContent(this.matchups.games[this.current].away.score);
		
		this.$.home_user.setContent(_t.users[this.matchups.games[this.current].home.user].name);
		this.$.away_user.setContent(_t.users[this.matchups.games[this.current].away.user].name);*/
		
		
		
		this.$.home.setRound(this.round);
		this.$.home.$.user.setAuto(false);
		this.$.home.$.user.setUsers(this.users);
		this.$.home.$.user.setUser(this.matchups.home.user);
		this.$.home.setConference(this.conference);
		this.$.home.setSeed(this.matchups.home.seed);
		this.$.home.asterisk = this.matchups.home.userChanged;
		this.$.home.setTeam(this.matchups.home.team);
		this.$.home.refreshUser();
		this.$.home.removeClass("winner");
		this.$.home_wins.removeClass("winner");
		this.$.home.setLogoSide(test(this.matchups.home));
		
		this.$.away.setRound(this.round);
		this.$.away.$.user.setAuto(false);
		this.$.away.$.user.setUsers(this.users);
		this.$.away.$.user.setUser(this.matchups.away.user);
		this.$.away.setConference(this.conference);
		this.$.away.setSeed(this.matchups.away.seed);
		this.$.away.asterisk = this.matchups.away.userChanged;
		this.$.away.setTeam(this.matchups.away.team);
		this.$.away.refreshUser();
		this.$.away.removeClass("winner");
		this.$.away_wins.removeClass("winner");
		this.$.away.setLogoSide(test(this.matchups.away));
		
		this.$.away_wins.container.applyStyle("background-color", this.$.away.container.domStyles["background-color"]);
		this.$.home_wins.container.applyStyle("background-color", this.$.home.container.domStyles["background-color"]);
		
		this.$.home_wins.setContent(this.matchups.home.wins);
		this.$.away_wins.setContent(this.matchups.away.wins);
		
		
		var therest;
		
		if(this.roundName == "finals"){
			therest = "playoffs";
		} else {
			therest = this.conference;
		}
		
		this.$.background.setSrc("img/logos/" + _t.left.sport.toLowerCase() + "/" + therest.toLowerCase() + ".gif");
		
		if (this.matchups.status == "Complete") {
			this.$[this.matchups.winner].addClass("winner");
			this.$[this.matchups.winner + "_wins"].addClass("winner");
		}
		
		var numbers=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
		
		this.$.summary.destroyComponents();
		this.$.summary.createComponents([
			{ content: this.conference == "finals" ? _t.rounds[this.round - 1].name : this.conference + " " + _t.rounds[this.round - 1].name + (this.round == 3 ? "" : " Matchup " + ( this.matchup + 1 ) ) },
			{ tag: "br" },
			{ content: this.matchups.home.team[2] + " " + this.matchups.home.team[1] + " vs " + this.matchups.away.team[2] + " " + this.matchups.away.team[1]},
			{ tag: "br" },
			{ content: this.matchups.max == 1 ? "Single Elimination Knockout" : "Best of " + numbers[this.matchups.max] + " Series" },
			{ tag: "br" },
			{ content: this.matchups.status == "Complete" ? ( this.matchups[this.matchups.winner].team[1] + " win series " + this.matchups[this.matchups.winner].wins + " game" + ( this.matchups[this.matchups.winner].wins > 1 ? "s" : "" ) + " to " + ( this.matchups.max - this.matchups[this.matchups.winner].wins ) ) : 
				( this.matchups.home.wins == this.matchups.away.wins ? "Series Tied " + this.matchups.home.wins + "-" + this.matchups.home.wins : 
					( this.matchups.home.wins > this.matchups.away.wins ? this.matchups.home.team[1] + " Lead " + this.matchups.home.wins + " games to " + this.matchups.away.wins 
						: this.matchups.away.team[1] + " lead " + this.matchups.away.wins + " games to " + this.matchups.home.wins ) ) }
		]);
		
		
		this.$.games.destroyComponents();
		
		//console.log(this.matchups)
		
		for(var x in this.matchups.games){
			var g = this.matchups.games[x];
			
			var cstring = "";
			
			cstring += "Game " + (parseInt(x) + 1) + ": ";
			
			if ( g.played ) {
				
				
				var winner = g.winner;
				var loser = ( "home" != g.winner ? "home" : "away" );
				
				if(typeof g[winner].team != "object"){
					g[winner].team = upgrade(g[winner].team);
					g[loser].team = upgrade(g[loser].team);
				}
				
				
				var winnerTeam = g[winner].team[1];
				var loserTeam = g[loser].team[1];
				
				cstring += "W " + winnerTeam + " " + g[winner].score + ( g.emptynet ? " (EN) " : "" ) + ", L " + loserTeam + " " + g[loser].score + ( g.overtime ? " (OT)" : "" );
				
				for(var x in _t.extras){
					//console.log(_t.extras[x])
					if(g[_t.extras[x]]){
						cstring += " (" + _t.extras[x] + ")";
					}
				}
				
				this.$.games.createComponents([
					{ content: cstring },
					{ tag: "br" }
				]);
			} else {
				var component;
				
				if (parseInt(x) > this.matchups.current) {
					
					/*
					 * if the most wins by either team
					 * subtracted by the series limit
					 * 
					 * is greater than the series limit
					 * subtracted by the current game index
					 * 
					 * this game is "To Be Determined"
					 * 
					 * else it's "(If Necessary)"
					 */
					
					var mostWins = ( this.matchups.home.wins > this.matchups.away.wins ? this.matchups.home.wins : this.matchups.away.wins );
					var leastPossible = (this.matchups.limit - mostWins) + this.matchups.current + 1;
					
					var extra;
					
					if( parseInt(x) + 1 < leastPossible ){
						extra = { content: "To Be Determined", style: "margin-left: 10px;"}
					} else if (this.matchups.status != "Complete") {
						extra = { content: "(If Necessary)", style: "font-style: italic; margin-left: 10px;"}
					} else {
						extra = { content: "-", style: "font-style: italic; margin-left: 10px;"}
					}
					
					component = [
						{ content: cstring },
						extra
					];
					
				} else {
					component = [
						{ content: cstring },
						{ kind: "onyx.Button", classes: "onyx-affirmative", content: "Play!", ontap: "view", owner: this, style: "margin-left: 10px; width: 200px;" }
					];
				}
				
				this.$.games.createComponents([
					{ layoutKind: "FittableColumnsLayout", components: component },
					{ tag: "br" }
				]);
			}
			
		}
		
		this.$.render.render();
		
		_gameOn.waterfall("onresize");
	},
	open: function(inSender, inEvent){
		this.$.animator.play();
		
		if(this.value != this.min)
			this.animateToMin();
		
		this.isMax = false;
	},
	close: function(inSender, inEvent){
		this.$.animator.play();
		
		if(this.value != this.max)
			this.animateToMax();
		
		//logControl(this.$.animator)
		this.isMax = true;
	},
	view: function(inSender, inEvent){
		this.doViewGame();
	}
});