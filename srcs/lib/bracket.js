/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */

logos = {
	left: new Array(8),
	right: new Array(8)
}
upgrade = (function(te){
	
	search = function(test, findIn){
		var found = false;
		var fobj;
		for(var c in findIn){
			for (var t in findIn[c]){
				if ( test == findIn[c][t][1] ){
					found = true;
					fobj = findIn[c][t];
					break;
				}
			}
			if(found)break;
		}
		if(!found){fobj = false}
		return fobj;
	}
	var findIn = _gameOn.$.generator.sports[_t.left.sport].conferences;
	var arr = te.split(" ");
	if(arr.length == 3){
		var test = arr[1] + " " + arr[2];
		var fobj = search(test, findIn);
		if(fobj){
			arr = clone(fobj);
		} else {
			arr = clone(search(arr[2], findIn));
		}
	} else {
		arr = clone(search(arr[1], findIn));
	}
	//console.log("UPGRADING TEAM...", te, arr);
	return arr;
});

test = (function(hfa){
	if(hfa.team==false || !hfa.team)return;
	var test = hfa.team[0];
	if(typeof hfa.team != "object"){
		test = upgrade(hfa.team);
		//return "";
	}
	return _t.left.seeds[hfa.seed - 1][0] == test ? "left" : "right";
});

enyo.kind({
	name: "bracket",
	published: {
		left: {},
		right: {},
		matchups: {
			round1: {},
			round2: {},
			round3: {},
			finals: {}
		},
		saved: false,
		logos: {
			left: new Array(8),
			right: new Array(8)
		}
	},
	events: {
		onSave: ""
	},
	style: "text-align: center;",
	components: [
		{ name: "hbox", kind: "Scroller", horizontal: "scroll", vertical: "auto", strategyKind: "ScrollStrategy", layoutKind: "FittableColumnsLayout", classes: "center enyo-fit", components: [
			
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "bracket left", components: [
				{ name: "leftTitle", kind: "onyx.GroupboxHeader", content: "East", style: "background-color: black;" },
				{ name: "round1_left_title", kind: "onyx.GroupboxHeader" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "round1_left", side: "left", round: 1, kind: "List", rows: 0, rowsPerPage: 10, classes: "enyo-fit list round",
						onSetupRow: "loadGame", components: [
							{ name: "round1_left_game", classes: "game", ontap: "viewMatchup", components: [
								{ components: [
									{ name: "round1_left_home", kind: "seed" },
								]},
								{ components: [
									{ name: "round1_left_away", kind: "seed" }
								]}
							]}
					]}
				]}
			]},
			{ name: "round2_left_box", kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "bracket left", components: [
				{ name: "round2_left_title", kind: "onyx.GroupboxHeader" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "round2_left", side: "left", round: 2, kind: "List", rows: 0, rowsPerPage: 10, classes: "enyo-fit list round",
						onSetupRow: "loadGame", components: [
							{ name: "round2_left_game", classes: "game", ontap: "viewMatchup", components: [
								{ components: [
									{ name: "round2_left_home", kind: "seed" },
								]},
								{ components: [
									{ name: "round2_left_away", kind: "seed" }
								]}
							]}
					]}
				]}
			]},
			
			{ name: "round3_left_box", kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "bracket left", components: [
				{ name: "round3_left_title", kind: "onyx.GroupboxHeader" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "round3_left", side: "left", round: 3, kind: "List", rows: 0, rowsPerPage: 10, classes: "enyo-fit list round",
						onSetupRow: "loadGame", components: [
							{ name: "round3_left_game", classes: "game", ontap: "viewMatchup", components: [
								{ components: [
									{ name: "round3_left_home", kind: "seed" },
								]},
								{ components: [
									{ name: "round3_left_away", kind: "seed" }
								]}
							]}
					]}
				]}
			]},
			
			
			{ name: "details", kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", components: [
				{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Legend" },
				{ kind: "Scroller", horizontal: "hidden", fit: true, components: [
					/*
					 * 
					 */
						{ kind: "onyx.Groupbox", components: [
							{ name: "tournament", style: "background-color:black", onhold: "editTitle", kind: "onyx.GroupboxHeader" },
							{ classes: "game", components: [
								{ components: [
									{ name: "sport", kind: "Image", style: "width: 352px; height: 0px; opacity: 1;" },
								]}
							]},
							{ name: "finals_box", layoutKind: "FittableRowsLayout", classes: "bracket", components: [
								{ name: "finals_title", kind: "onyx.GroupboxHeader" },
								{ name: "finals", side: "", round: 4, kind: "List", rows: 0, rowsPerPage: 1, classes: "list round",
									onSetupRow: "loadGame", components: [
										{ name: "finals__game", classes: "game", ontap: "viewMatchup", classes: "left", components: [
											{ components: [
												{ name: "finals__home", kind: "seed", finals: true },
											]},
											{ components: [
												{ name: "finals__away", kind: "seed", finals: true }
											]}
										]}
								]}
							]},
							{ name: "winner_", kind: "onyx.GroupboxHeader", content: "Winner" },
							{ name: "winner", classes: "pad" },
							{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Users" },
							{ kind: "FittableColumns", classes: "pad", onhold: "editUser", components: [
								{ name: "user1", kind: "userPicker", auto: false },
								{ name: "user1name" }
							]},
							{ kind: "FittableColumns", classes: "pad", onhold: "editUser", components: [
								{ name: "user2", kind: "userPicker", auto: false },
								{ name: "user2name" }
							]},
							{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Status" },
							{ name: "status", classes: "pad" },
							{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Date Created" },
							{ name: "created", classes: "pad" },
							{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Date Modified" },
							{ name: "modified", classes: "pad" },
							{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Round" },
							{ name: "round", classes: "pad" },
							{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Matchups Finished" },
							{ name: "finished", classes: "pad" },
						]},
					/*
					 * 
					 */
					
					
					/*
					 * 
					 */
				]}
			]},

			
			{ name: "round3_right_box", kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "bracket right", components: [
				{ name: "round3_right_title", kind: "onyx.GroupboxHeader" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "round3_right", side: "right", round: 3, kind: "List", rows: 0, rowsPerPage: 10, classes: "enyo-fit list round",
						onSetupRow: "loadGame", components: [
							{ name: "round3_right_game", classes: "game", ontap: "viewMatchup", components: [
								{ components: [
									{ name: "round3_right_home", kind: "seed" },
								]},
								{ components: [
									{ name: "round3_right_away", kind: "seed" }
								]}
							]}
					]}
				]}
			]},
			
			{ name: "round2_right_box", kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "bracket right", components: [
				{ name: "round2_right_title", kind: "onyx.GroupboxHeader" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "round2_right", side: "right", round: 2, kind: "List", rows: 0, rowsPerPage: 10, classes: "enyo-fit list round",
						onSetupRow: "loadGame", components: [
							{ name: "round2_right_game", classes: "game", ontap: "viewMatchup", components: [
								{ components: [
									{ name: "round2_right_home", kind: "seed" },
								]},
								{ components: [
									{ name: "round2_right_away", kind: "seed" }
								]}
							]}
					]}
				]}
			]},
			
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "bracket right", components: [
				{ name: "rightTitle", kind: "onyx.GroupboxHeader", content: "West", style: "background-color: black;" },
				{ name: "round1_right_title", kind: "onyx.GroupboxHeader" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "round1_right", side: "right", round: 1, kind: "List", rows: 0, rowsPerPage: 10, classes: "enyo-fit list round",
						onSetupRow: "loadGame", components: [
							{ name: "round1_right_game", classes: "game", ontap: "viewMatchup", components: [
								{ components: [
									{ name: "round1_right_home", kind: "seed" },
								]},
								{ components: [
									{ name: "round1_right_away", kind: "seed" }
								]}
							]}
					]}
				]}
			]}
		]},
		
		{ name: "matchup", kind: "matchup", onMatchupComplete: "matchupComplete", onViewGame: "viewGame" },
		
		{ name: "game", kind: "game", onGamePlayed: "gamePlayed", onClose: "gameClosed" },
	],
	create: function(){
		this.inherited(arguments);
	},
	activate: function(tournament){
		
		this.setSaved(true);
		this.tournament = JSON.parse(tournament);
		console.log("BRACKET: ", clone(this.tournament));
		_t = this.tournament; //set a pointer so we don't have to freakin' type 'this.tournament' all te freakin time....
		
		if(!_t.matchups){
			this.generateMatchups();
		}
		this.loadBracket();
		this.savedChanged();
		
	},
	savedChanged: function(oldValue){
		_gameOn.$.save.applyStyle("opacity", !this.saved ? "1" : "0.2");
		_gameOn.$.toolbar.render();
	},
	editTitle: function(inSender, inEvent){
		var _alert = alert("Edit title", this, {
			onConfirm: function(context){
				_t.name = _alert.$.space.$.tournament.getValue();
				context.setSaved(false);
				context.loadBracket();
			},
			confirmText: "Save",
			cancelText: "Cancel",
			modal: true
		});
		_alert.$.space.createComponents([
			{ kind: "onyx.InputDecorator", components: [
			    { name: "tournament", kind: "onyx.Input", placeholder: "Title", value: _t.name }
			]}
		]);
		_alert.render();
	},
	editUser: function(inSender, inEvent){
		var userName = inSender.children[0].name;
		var _alert = alert("Edit " + userName, this, {
			onConfirm: function(context){
				_t.users[userName].name = _alert.$.space.$.user.getValue();
				context.setSaved(false);
				context.loadBracket();
			},
			confirmText: "Save",
			cancelText: "Cancel",
			modal: true
		});
		_alert.$.space.createComponents([
			{ kind: "onyx.InputDecorator", components: [
			    { name: "user", kind: "onyx.Input", placeholder: userName, value: _t.users[userName].name }
			]}
		]);
		_alert.render();
	},
	save: function(inSender, inEvent){
		var date = new Date();
		
		_t.modified = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
		
		console.log("SAVING...", _t);
		
		var _info = info("saving...", this, function(context){
			context.doSave(JSON.stringify(_t));
			_info.setMessage("saved.");
			_info.setTimeout(500);
		});
		
		this.setSaved(true);
	},
	viewMatchup: function(inSender, inEvent){
		var game = inEvent.index;
		var round = inSender.container.round;
		var side = inSender.container.side;
		
		var roundName = "round" + round;
		
		var conference;
		
		if(roundName == "round4"){
			roundName = "finals";
			conference = "finals";
		} else {
			conference = _t[side].conference;
		}
		
		var _m = _t.matchups[roundName];
		var _c = _m[conference];
		var _g = _c[game];
		
		this.$.matchup.setRoundName(roundName);
		this.$.matchup.setUsers(_t.users);
		this.$.matchup.setConference(conference);
		this.$.matchup.setMatchup(game);
		this.$.matchup.setRound(round);
		this.$.matchup.setSide(side);
		this.$.matchup.setMatchups(_g);
		this.$.matchup.setCurrent(_g.current);
		this.$.matchup.setLocked(round != _t.round);
		this.$.matchup.refresh();
		this.$.matchup.open();
	},
	viewGame: function(inSender, inEvent){
		
		var round = inSender.round;
		var side = inSender.side;
		var game = inSender.matchup;
		
		
		var roundName = "round" + round;
		
		if(roundName == "round4"){
			roundName = "finals";
			conference = "finals";
		} else {
			var conference = _t[side].conference;
		}
		
		var _m = _t.matchups[roundName];
		var _c = _m[conference];
		var _g = _c[game];
		
		this.$.game.setExtras(_t.extras);
		this.$.game.setUsers(_t.users);
		this.$.game.setConference(conference);
		this.$.game.setMatchup(game + 1);
		this.$.game.setRound(round);
		this.$.game.setRoundName(roundName);
		this.$.game.setGameNo(inSender.current);
		this.$.game.setGame(_g.games[inSender.current]);
		this.$.game.setLocked(round != _t.round || _g.status == "Complete");
		this.$.game.refresh();
		//console.log(this.$.game.value, this.$.game.max)
		
		this.$.game.open();
		//this.$.game.toggleMinMax();
		//this.$.game.render();
		
	},
	gamePlayed: function(inEvent, results){
		console.log("GAME PLAYED! SAVING GAME ...");
		
		var conference = results.conference;
		
		var roundName = "round" + results.round;
		
		if(roundName == "round4"){
			roundName = "finals";
			conference = "finals";
		}
		
		var _m = _t.matchups[roundName];
		var _c = _m[conference];
		var _g = _c[results.game];
		
		_g.games[_g.current].home.score = results.home.score;
		_g.games[_g.current].away.score = results.away.score;
		
		for( var x in results.extras ){
			//console.log(x, results.extras[x])
			_g.games[_g.current][x] = results.extras[x];
			//console.log(results)
		}
		
		//_g.games[_g.current].emptynet = results.emptynet;
		//_g.games[_g.current].overtime = results.overtime;
		
		_g.games[_g.current].played = true;
		_g.games[_g.current].winner = results.winner;
		
		
		_g[results.winner].wins++;
		
		/*
		 * if a team has won the series..
		 * then we need to finish it
		 */
		if(_g[results.winner].wins == _g.limit){
			
			_g.status = "Complete";
			_g.winner = results.winner;
			
			_t.matchupsFinished++;
			
			if(_t.matchupsFinished == _t.numMatchups && roundName != "finals") {
				_t.matchupsFinished = 0;
				_t.round++;
			} else if (_t.matchupsFinished == _t.numMatchups && roundName == "finals") {
				_t.status = "Complete";
				_t.winner = _g[results.winner].team;
				//this.save();
			}
			
			if(roundName != "finals")
				this.updateMatchups(results.conference, results.round + 1, _g);
		} else {
			_g.current++;
		}
		
		this.$.game.close();
		console.log("RESULTS:", _t);
		this.$.hbox.render();
		
		this.loadBracket(roundName);
		
		//this.$.matchup.close();
		this.$.matchup.setCurrent(_g.current);
		this.$.matchup.refresh();
		
		this.setSaved(false);
	},
	loadBracket: function(){
		
		this.$.sport.setSrc("img/logos/" + _t.left.sport.toLowerCase() + "/" + _t.left.sport.toLowerCase() + ".gif");
		
		this.$.round1_left.setRows(_t.matchups.round1[_t.left.conference].length);
		
		this.$.round1_right.setRows(_t.matchups.round1[_t.right.conference].length);
		
		this.$.round2_left_box.setShowing(false);
		this.$.round2_right_box.setShowing(false);
		this.$.round3_left_box.setShowing(false);
		this.$.round3_right_box.setShowing(false);
		this.$.finals_box.setShowing(false);
		this.$.round2_left.setRows(0);
		this.$.round2_right.setRows(0);
		this.$.round3_left.setRows(0);
		this.$.round3_right.setRows(0);
		this.$.finals.setRows(0);
		
		if(_t.matchups.round2[_t.left.conference]) {
			this.$.round2_left.setRows(_t.matchups.round2[_t.left.conference].length);
			this.$.round2_left_box.setShowing(true);
		}
		
		if(_t.matchups.round2[_t.right.conference]) {
			this.$.round2_right.setRows(_t.matchups.round2[_t.right.conference].length);
			this.$.round2_right_box.setShowing(true);
		}
		
		if(_t.matchups.round3[_t.left.conference]) {
			this.$.round3_left.setRows(_t.matchups.round3[_t.left.conference].length);
			this.$.round3_left_box.setShowing(true);
		}
		
		if(_t.matchups.round3[_t.right.conference]) {
			this.$.round3_right.setRows(_t.matchups.round3[_t.right.conference].length);
			this.$.round3_right_box.setShowing(true);
		}
		
		if(_t.matchups.finals.finals) {
			this.$.finals.setRows(_t.matchups.finals.finals.length);
			this.$.finals_box.setShowing(true);
		}
		
		for(var t in _t.left.seeds){
			var s = _t.left.seeds[t];
			if(typeof s == "string"){
				_t.left.seeds[t] = clone(upgrade(s));
			}
		}
		for(var t in _t.right.seeds){
			var s = _t.right.seeds[t];
			if(typeof s == "string"){
				_t.right.seeds[t] = clone(upgrade(s));
			}
		}
		
		this.$.tournament.setContent(_t.name);
		this.$.user1.setUsers(_t.users);
		this.$.user1.setUser("user1");
		this.$.user1name.setContent(_t.users.user1.name);
		this.$.user1.refresh();
		this.$.user2.setUsers(_t.users);
		this.$.user2.setUser("user2");
		this.$.user2name.setContent(_t.users.user2.name);
		this.$.user2.refresh();
		
		this.$.leftTitle.setContent(_t.left.conference);
		this.$.rightTitle.setContent(_t.right.conference);
		try {
			this.$.round1_left_title.setContent(_t.rounds[0].name);
		} catch (e) {
			_t.rounds = clone(_gameOn.$.generator.sports[_t.left.sport].rounds);
			this.$.round1_left_title.setContent(_t.rounds[0].name);
		}
		this.$.round1_right_title.setContent(_t.rounds[0].name);
		
		this.$.round2_left_title.setContent(_t.rounds[1].name);
		this.$.round2_right_title.setContent(_t.rounds[1].name);
		
		this.$.round3_left_title.setContent(_t.rounds[2].name);
		this.$.round3_right_title.setContent(_t.rounds[2].name);
		
		this.$.finals_title.setContent(_t.rounds[3].name);

		this.$.created.setContent(_t.created);
		this.$.modified.setContent(_t.modified);
		this.$.status.setContent(_t.status);
		this.$.round.setContent(_t.round);
		this.$.finished.setContent(_t.matchupsFinished + " / " + _t.numMatchups);
		
		if(_t.status == "Complete"){
			if ( typeof _t.winner == "string" ) {
				_t.winner = upgrade(_t.winner);
			}
			this.$.winner.setContent(_t.winner[2] + " " + _t.winner[1] + " (" + _t.users[_t.matchups.finals.finals[0][_t.matchups.finals.finals[0].winner].user].name + ")");
			this.$.winner.setShowing(true);
			this.$.winner_.setShowing(true);
		} else {
			this.$.winner.setShowing(false);
			this.$.winner_.setShowing(false);
		}
		
		if( !_t.extras ){
			_t.extras = clone(_gameOn.$.generator.sports[_t.left.sport].extras);
		}
		
		this.$.hbox.render();
	},
	generateMatchups: function(){
		
		/*
		 * here, we generate a new set of matchups
		 * inside _t.matchups 
		 */
		
		_t.matchups = clone(this.matchups);
		
		/*
		 * left teams and seeds..
		 */
		
		_t.round++;
		
		var teams = clone(_t.left.teams).concat(_t.right.teams);
		
		_t.matchups.round1[_t.left.conference] = [];
		_t.matchups.round1[_t.right.conference] = [];
		
		var matchups = _t.seeds;
		
		var offset = 0;
		
		if (_t.rounds[0].bye){
			offset = 2;
		} else if (_t.rounds[0].wildcard){
			offset = _t.seeds - _t.rounds[0].wildcard;
		} else if (_t.sport == "POOL" && _t.round==1) {
			offset = 4;
			_t.round++;
		}
		
		
		for( var i = 0; i < offset; i++){
			this.updateMatchups(_t.left.conference, 2, {
				winner:"team",
				team: {
					seed: i + 1,
					team: _t.left.seeds[i],
					user: _t.left.users[i]
				}
			});
			this.updateMatchups(_t.right.conference, 2, {
				winner:"team",
				team: {
					seed: i + 1,
					team: _t.right.seeds[i],
					user: _t.right.users[i]
				}
			});
		}
		
		for(var i = 0 + offset; i < matchups; i++){
			this.updateMatchups(_t.left.conference, 1, {
				winner:"team",
				team: {
					seed: i + 1,
					team: _t.left.seeds[i],
					user: _t.left.users[i]
				}
			});
			this.updateMatchups(_t.right.conference, 1, {
				winner:"team",
				team: {
					seed: i + 1,
					team: _t.right.seeds[i],
					user: _t.right.users[i]
				}
			});
		}
		
		console.log("MATCHUPS CREATED...", _t);
		this.setSaved(false);
	},
	updateMatchups: function(conference, round, game){
		var roundName = "round" + round;
		
		if(roundName == "round" + (_t.numRounds ? _t.numRounds : "4")){
			roundName = "finals";
			conference = "finals";
		}
		
		
		if(!_t.matchups[roundName][conference]){
			var games;
			switch(round){
				case 2:
					games = [null, new Matchup(null, null, _t.rounds[round-1].games)];
					break;
				case 3:
				default:
					games = [null];
					break;
			}
			_t.matchups[roundName][conference] = games;
		}
		
		/*
		 * format for game is:
		 * [seed, team, user]
		 * 
		 */
		var winningTeam = game[game.winner];
		var _r = _t.matchups[roundName][conference];
		
		
		
		var teams = [[winningTeam.seed, winningTeam.team, winningTeam.user]];
		
		for(var matchup in _r) {
			if (_r[matchup] == null) continue;
			
			if (_r[matchup].away.seed != "-"){
				teams.push([_r[matchup].away.seed, _r[matchup].away.team, _r[matchup].away.user]);
			}
			if (_r[matchup].home.seed != "-"){
				teams.push([_r[matchup].home.seed, _r[matchup].home.team, _r[matchup].home.user]);
			}
		}
		
		/*
		 * we've filled our matchups array with all of our seeds from this round. we're good!
		 * but now, we've got to sort our new matchups array by the first index
		 * this'll require a special function...
		 */
		var specialSort = function(a, b){
			return a[0] - b[0];
		}
		teams.sort(specialSort);
		
		var matchups = [];
		var used = [];
		
		for (var index = 0; index < teams.length; index++) {
			var team1 = 0 + index;
			var team2 = teams.length - index - 1;
			
			var test1 = used.indexOf(team1) < 0;
			var test2 = used.indexOf(team2) < 0;
			
			if(team1 != team2 && test1 && test2 ){
				matchups.push([teams[team1], teams[team2]]);
				used.push(team1);
				used.push(team2);
			} else if ( test1 || (team1 == team2 && test1 )  ){
				matchups.push([teams[team1], null]);
				used.push(team1);
			} else if ( test2  ){
				matchups.push([teams[team2], null]);
				used.push(team2);
			}
		}
		//console.log(round, "lalalalallala")
		for(var game = 0; game < matchups.length; game++){
			_t.matchups[roundName][conference][game] = new Matchup(matchups[game][0], matchups[game][1], _t.rounds[round-1].games);
		}
		
		
		if(!_t.matchupsFinished || _t.matchupsFinished == 0){
			var mod = 2;
			if(roundName == "finals"){
				mod = 1;
			}
			_t.matchupsFinished=0;
			_t.numMatchups = matchups.length * mod;
		}
		
		console.log("UPDATING MATCHUPS...", conference, _t);
		
		this.loadBracket();
		
	},
	loadGame: function(inSender, inEvent){
		var game = inEvent.index;
		var round = inSender.round;
		var side = inSender.side;
		
		var roundName = "round" + round;
		
		if(roundName == "round" + (_t.numRounds ? _t.numRounds : "4")){
			roundName = "finals";
			conference = "finals";
		} else {
			var conference = _t[side].conference;
		}
		
		/*
		 * we have all the matchups..
		 * we just need to pull from them.
		 */
		var _m = _t.matchups[roundName];
		var _c = _m[conference];
		var _g = _c[game];
		
		var home = this.$[roundName + "_" + side + "_home"];
		
		home.setRound(game);
		home.setSide(side);
		if(typeof _g.home.team == "string"){
			_g.home.team = upgrade(_g.home.team);
		}
		home.asterisk = _g.home.userChanged;
		home.setTeam(_g.home.team);
		home.$.user.setAuto(false);
		home.$.user.setUsers(_t.users);
		home.$.user.setUser(_g.home.user);
		//console.log(_g.home.user, _g.home.team, roundName)
		home.setSeed(_g.home.seed);
		
		var testSide;
		try{
			testSide = test(_g.home);
			home.setLogoSide(testSide);
		} catch(e){}
		
		try{
			logos[testSide][_g.home.seed - 1] = "";
			logos[testSide][_g.home.seed - 1] = "img/logos/" + _t[testSide].sport.toLowerCase() + "/" + _t[testSide].conference.toLowerCase() + "/" + _t[testSide].seeds[_g.home.seed - 1][1].toLowerCase() + ".gif";
		} catch (e){}
		
		
		var away = this.$[roundName + "_" + side + "_away"];
		
		
		
		
		away.setRound(game);
		away.setSide(side);
		if(typeof _g.away.team == "string"){
			_g.away.team = upgrade(_g.away.team);
		}
		away.asterisk = _g.away.userChanged;
		away.setTeam(_g.away.team);
		away.$.user.setAuto(false);
		away.$.user.setUsers(_t.users);
		away.$.user.setUser(_g.away.user);
		//console.log(_g.away.user, _g.away.team, roundName)
		away.setSeed(_g.away.seed);
		
		var testSide;
		try{
			testSide = test(_g.away);
			away.setLogoSide(testSide);
		} catch(e){}
		try {
			logos[testSide][_g.away.seed - 1] = "";
			logos[testSide][_g.away.seed - 1] = "img/logos/" + _t[testSide].sport.toLowerCase() + "/" + _t[testSide].conference.toLowerCase() + "/" + _t[testSide].seeds[_g.away.seed - 1][1].toLowerCase() + ".gif";
		} catch (e){}
		
		var _w;
		if(_g.status == "Complete"){
			switch(_g.winner){
				case "home":
					_w = home;
					break;
				case "away":
					_w = away;
					break;
			}
		}
		home.removeClass("winner");
		away.removeClass("winner");
		if(_w){
			/*
			 * we have a winner!
			 * do stuff for the winner (i.e. highlight it, show the scores for both games...)
			 */
			_w.addClass("winner");
		}
		
		home.refreshUser();
		away.refreshUser();
	},
	scroll: function(percentage){
		var max = this.$.hbox.getScrollBounds().maxLeft;
		
		this.$.hbox.scrollLeft = max * percentage;
		this.$.hbox.scrollTo(this.$.hbox.scrollLeft);
		
		//this.$.game.scroll(percentage);
	},
	scrollLeft: function(){
		this.updateScroll(-20);
		this.$.game.scrollLeft();
	},
	scrollRight: function(){
		this.updateScroll(20);
		this.$.game.scrollRight();
	},
	updateScroll: function(distance){
		var newScroll = this.$.hbox.scrollLeft + distance;
		if (newScroll > this.$.hbox.getScrollBounds().maxLeft) newScroll = this.$.hbox.getScrollBounds().maxLeft;
		if (newScroll < 0) newScroll = 0;
		this.$.hbox.scrollLeft = newScroll;
		this.$.hbox.scrollTo(this.$.hbox.scrollLeft);
	},
	closeAll: function(){
		this.$.matchup.close();
		this.$.game.close();
	}
});