/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "generator",
	published: {
		sports: {
			POOL: {
				conferences: {
					HOME: [["BRY", "Bryan", "Leasot"], ["CRA", "Craig", "Dubey"], ["JUA", "Juan", "Murillo"],
							["PAB", "Pablo", "Murillo"], ["JIM", "Jimmy", "Nugyen"], ["MOI", "Moises", "Rolon"],
							["KEN", "Ken", "Nugyen"], ["ALV", "Alvaro", "Murillo"], ["KYL", "Kyle", "Ethier"],
							["STE", "Stevie", "LeFlesch"], ["NIK", "Nick", "Muller"]],
					AWAY: [["BRY", "Bryan", "Leasot"], ["CRA", "Craig", "Dubey"], ["JUA", "Juan", "Murillo"],
							["PAB", "Pablo", "Murillo"], ["JIM", "Jimmy", "Nugyen"], ["MOI", "Moises", "Rolon"],
							["KEN", "Ken", "Nugyen"], ["ALV", "Alvaro", "Murillo"], ["KYL", "Kyle", "Ethier"],
							["STE", "Stevie", "LeFlesch"], ["NIK", "Nick", "Muller"]]
				},
				seeds: 4,
				rounds: [
					{ name: "No matchups", games: 0, numMatchups: 0 },
					{ name: "Quarterfinals", games: 1, numMatchups: 4 },
					{ name: "Semifinals", games: 3, numMatchups: 2 },
					{ name: "Finals", games: 5, numMatchups: 1, trophy: "Colonial Cup" }
				],
				extras: []
			},
			NHL: {
				conferences: {
					WEST: [["CHI", "Blackhawks", "Chicago"], ["COL", "Blue Jackets", "Columbus"], ["DET", "Red Wings", "Detroit"], ["NSH", "Predators", "Nashville"], ["STL", "Blues", "St. Louis"],
							["CGY", "Flames", "Calgary"], ["COL", "Avalanche", "Colorado"], ["EDM", "Oilers", "Edmonton"], ["MIN", "Wild", "Minnesota"], ["VAN", "Canucks", "Vancouver"],
							["ANA", "Ducks", "Anaheim"], ["DAL", "Stars", "Dallas"], ["LOS", "Kings", "Los Angeles"], ["PHO", "Coyotes", "Phoenix"], ["SJS", "Sharks", "San Jose"]],
					EAST: [["NJD", "Devils", "New Jersey"], ["NYI", "Islanders", "New York"], ["NYR", "Rangers", "New York"], ["PHI", "Flyers", "Philadelphia"], ["PIT", "Penguins", "Pittsburgh"],
							["BOS", "Bruins", "Boston"], ["BUF", "Sabres", "Buffalo"], ["MON", "Canadiens", "Montreal"], ["OTT", "Senators", "Ottawa"], ["TOR", "Leafs", "Toronto Maple"],
							["CAR", "Hurricanes", "Carolina"], ["FLA", "Panthers", "Florida"], ["TAM", "Lightning", "Tampa Bay"], ["WAS", "Capitals", "Washington"], ["WIN", "Jets", "Winnipeg"]]
				},
				seeds: 8,
				rounds: [
					{ name: "Divisional Quarterfinals", games: 7, numMatchups: 8 },
					{ name: "Conference Semifinals", games: 7, numMatchups: 4 },
					{ name: "Conference Finals", games: 7, numMatchups: 2 },
					{ name: "Stanley Cup Finals", games: 7, numMatchups: 1, trophy: "Stanley Cup" },
				],
				extras: ["OT", "EN"]
			},
			NBA: {
				conferences: {
					WEST: [["DAL", "Mavericks", "Dallas"], ["HOU", "Rockets", "Houston"], ["MEM", "Grizzlies", "Memphis"], ["NOR", "Hornets", "New Orleans"], ["SAS", "Spurs", "San Antonio"],
							["DEN", "Nuggets", "Denver"], ["MIN", "Timberwolves", "Minnesota"], ["POR", "Trail Blazers", "Portland"], ["OKC", "Thunder", "Oklahoma City"], ["UTH", "Jazz", "Utah"],
							["GSW", "Warriors", "Golden State"], ["LAC", "Clippers", "Los Angeles"], ["LAL", "Lakers", "Los Angeles"], ["PHO", "Suns", "Phoenix"], ["SAC", "Kings", "Sacramento"]],
					EAST: [["BOS", "Celtics", "Boston"], ["NJN", "Nets", "Brooklyn"], ["NYK", "Knicks", "New York"], ["PHI", "76ers", "Philadelphia"], ["TOR", "Raptors", "Toronto"],
							["CHI", "Bulls", "Chicago"], ["CLE", "Cavaliers", "Cleveland"], ["DET", "Pistons", "Detroit"], ["IND", "Pacers", "Indiana"], ["MIL", "Bucks", "Milwaukee"],
							["ATL", "Hawks", "Atlanta"], ["CHA", "Bobcats", "Charlotte"], ["MIA", "Heat", "Miami"], ["ORL", "Magic", "Orlando"], ["WAS", "Wizards", "Washington"]]
				},
				seeds: 8,
				rounds: [
					{ name: "Divisional Quarterfinals", games: 7, numMatchups: 8 },
					{ name: "Conference Semifinals", games: 7, numMatchups: 4 },
					{ name: "Conference Finals", games: 7, numMatchups: 2 },
					{ name: "NBA Finals", games: 7, numMatchups: 1 },
				],
				extras: ["OT"],
			},
			MLB: {
				conferences: {
					NL: [["ATL", "Braves", "Atlanta"], ["MIA", "Marlins", "Miami"], ["NYM", "Mets", "New York"], ["PHI", "Phillies", "Philadelphia"], ["WAS", "Nationals", "Washington"],
							["CUB", "Cubs", "Chicago"], ["CIN", "Reds", "Cincinnati"], ["HOU", "Astros", "Houston"], ["MIL", "Brewers", "Milwaukee"], ["PIT", "Pirates", "Pittsburgh"],
							["STL", "Cardinals", "St. Louis"], ["ARI", "Diamondbacks", "Arizona"], ["COL", "Rockies", "Colorado"], ["LOS", "Dodgers", "Los Angeles"], ["SDG", "Padres", "San Diego"], ["SFO", "Giants", "San Francisco"]],
					AL: [["BAL", "Orioles", "Baltimore"], ["BOS", "Red Sox", "Boston"], ["NYY", "Yankees", "New York"], ["TBR", "Rays", "Tampa Bay"], ["TOR", "Blue Jays", "Toronto"],
							["CWS", "White Sox", "Chicago"], ["CLE", "Indians", "Cleveland"], ["DET", "Tigers", "Detroit"], ["K.C", "Royals", "Kansas City"], ["MIN", "Twins", "Minnesota"],
							["LAA", "Angels", "Los Angeles"], ["OAK", "Athletics", "Oakland"], ["SEA", "Mariners", "Seattle"], ["TEX", "Rangers", "Texas"]]
				},
				seeds: 5,
				rounds: [
					{ name: "Wildcard Playoff", games: 1, numMatchups: 2, wildcard: 2 },
					{ name: "Divisional Series", nick: "LDS", games: 5, numMatchups: 4 },
					{ name: "League Championship Series", nick: "LCS", games: 7, numMatchups: 2 },
					{ name: "World Series", games: 7, numMatchups: 1 },
				],
				extras: ["EI", "WO"]
			},
			NFL: {
				conferences: {
					NFC: [["DAL", "Cowboys", "Dallas"], ["NYG", "Giants", "New York"], ["PHI", "Eagles", "Philadelphia"], ["WAS", "Redskins", "Washington"],
							["CHI", "Bears", "Chicago"], ["DET", "Lions", "Detroit"], ["GNB", "Packers", "Green Bay"], ["MIN", "Vikings", "Minnesota"],
							["ATL", "Falcons", "Atlanta"], ["CAR", "Panthers", "Carolina"], ["NOR", "Saints", "New Orleans"], ["TAM", "Buccaneers", "Tampa Bay"],
							["ARI", "Cardinals", "Arizona"], ["STL", "Rams", "St. Louis"], ["SFO", "49ers", "San Francisco"], ["SEA", "Seahawks", "Seattle"]],
					AFC: [["BUF", "Bills", "Buffalo"], ["MIA", "Dolphins", "Miami"], ["NWE", "Patriots", "New England"], ["NYJ", "Jets", "New York Jets"],
							["BAL", "Ravens", "Baltimore"], ["CIN", "Bengals", "Cincinnati"], ["CLE", "Browns", "Cleveland"], ["PIT", "Steelers", "Pittsburgh"],
							["HOU", "Texans", "Houston"], ["IND", "Colts", "Indianapolis"], ["JAC", "Jaguars", "Jacksonville"], ["TEN", "Titans", "Tennessee"],
							["DEN", "Broncos", "Denver"], ["K.C", "Chiefs", "Kansas City"], ["OAK", "Raiders", "Oakland"], ["SDG", "Chargers", "San Diego"]]
				},
				seeds: 6,
				rounds: [
					{ name: "Wildcard Playoffs", games: 1, numMatchups: 4, bye: 2 },
					{ name: "Divisional Playoffs", nick: "LDS", games: 1, numMatchups: 4 },
					{ name: "Conference Championship", nick: "LCS", games: 1, numMatchups: 2 },
					{ name: "Super Bowl", games: 1, numMatchups: 1 },
				],
				extras: ["OT"]
			}
		},
		sport: "",
		conference: {
			proper: "", //unique identifier
			conference: "", //name of conference
			sport: "",
			side: "",
			seed: null,
			team: null,
			seeds: [null,null,null,null,null,null,null,null],
			users: [], //which user controls which seed
			teams: []
		},
		sides: {
			left: "", //conference names I.E. west, east, AL, NL etc
			right: ""
		},
		users: {
			user1: {
				name: "",
				color: ""
			},
			user2: {
				name: "",
				color: ""
			}
		},
	},
	events: {
		onGenerate: "",
		onSave: ""
	},
	components: [
		{ name: "hbox", kind: "Scroller", horizontal: "scroll", vertical: "auto", strategyKind: "ScrollStrategy", layoutKind: "FittableColumnsLayout", classes: "center enyo-fit", components: [
			{ kind: "Scroller", layoutKind: "FittableRowsLayout", classes: "conference left", components: [
				{ kind: "onyx.Groupbox", components: [
					{ name: "leftTitle", kind: "onyx.GroupboxHeader", content: "East" },
					{ name: "leftSeeds", side: "left", kind: "List", rows: 8, rowsPerPage: 15, classes: "enyo-fit list", style: "margin-top: 23px !important;", onSetupRow: "loadSeeds", components: [
						{ classes: "team", components: [
							{ name: "leftSeed", kind: "seed", ontap: "seedTap", onhold: "pickUser", side: "left", onChange: "seedChanged" },
						]}
					]}
				]}
			]},
			{ kind: "Scroller", layoutKind: "FittableRowsLayout", classes: "conference left", components: [
				{ kind: "onyx.Groupbox", components: [
					{ name: "leftTeams", kind: "onyx.GroupboxHeader", content: "Eastern Teams" },
					{ name: "left", kind: "List", rows: 15, rowsPerPage: 15, classes: "enyo-fit list", style: "margin-top: 23px !important;", onSetupRow: "loadTeams", components: [
					    { classes: "team", components: [
						    { name: "leftTeam", side: "left", classes: "item left", ontap: "teamTap", components: [
								//{ name: "leftImage", kind: "Image", classes: "teamLogo", style: "float:right" },
								{ name: "leftName" }
							]}
						]}
					]}
				]}
			]},
			{ kind: "Scroller", layoutKind: "FittableRowsLayout", components: [
				{ kind: "setup", onGenerate: "generate", onColorChange: "colorChange", onSportTap: "sportTap", onUserChange: "userChanged", onRandomize: "randomize", onEditTeams: "editTeams" },
			]},
			{ kind: "Scroller", layoutKind: "FittableRowsLayout", classes: "conference right", components: [
				{ kind: "onyx.Groupbox", components: [
					{ name: "rightTeams", kind: "onyx.GroupboxHeader", content: "Western Teams" },
					{ name: "right", kind: "List", rows: 15, rowsPerPage: 15, classes: "enyo-fit list", style: "margin-top: 23px !important;", onSetupRow: "loadTeams", components: [
					    { classes: "team", components: [
						    { name: "rightTeam", side: "right", classes: "item right", ontap: "teamTap", components: [
								{ name: "rightName" },
								//{ name: "rightImage", kind: "Image", classes: "teamLogo", style: "margin-left:-150px;" }
							]}
						]}
					]}
				]}
			]},
			{ kind: "Scroller", layoutKind: "FittableRowsLayout", classes: "conference right", components: [
				{ kind: "onyx.Groupbox", components: [
					{ name: "rightTitle", kind: "onyx.GroupboxHeader", content: "West" },
					{ name: "rightSeeds", side: "right", kind: "List", rows: 8, rowsPerPage: 15, classes: "enyo-fit list", style: "margin-top: 23px !important;", onSetupRow: "loadSeeds", components: [
						{ classes: "team", components: [
							{ name: "rightSeed", kind: "seed", side: "right", onhold: "pickUser", ontap: "seedTap", onChange: "seedChanged" },
						]}
					]}
				]}
			]},
			{ kind: "adduser", showing: false, name: "userPopup", onAdd: "userAdd"},
			{ kind: "editTeams", showing: false, name: "editTeamsPopup", onSaveTeams: "saveTeams"}
		]}
	],
	create: function(){
		this.inherited(arguments);
		
		this.setSport("NHL");
		/*
		generateOutput = function(conf){
			var output = [];
			for(var team in conf){
				var t = conf[team];
				var tsplit = t.split(",");
				output.push([tsplit[2], tsplit[1], tsplit[0]]);
			}
			return JSON.stringify(output);
		}
		console.log(generateOutput(this.sports.MLB.conferences.AL));
		console.log(generateOutput(this.sports.MLB.conferences.NL));
		console.log(generateOutput(this.sports.NFL.conferences.NFC));
		console.log(generateOutput(this.sports.NFL.conferences.AFC));
		console.log(generateOutput(this.sports.NBA.conferences.WEST));
		console.log(generateOutput(this.sports.NBA.conferences.EAST));
		console.log(generateOutput(this.sports.NHL.conferences.WEST));
		console.log(generateOutput(this.sports.NHL.conferences.EAST));*/
	},
	editTeams: function(inSender, inEvent) {
		var teams = this.sports.POOL.conferences;
		this.$.editTeamsPopup.setShowing(true);
		this.$.editTeamsPopup.edit(teams);
	},
	saveTeams: function(inSender, inEvent) {
		this.sports.POOL.conferences = inSender.teams;
		this.doSave(inSender, inEvent, inSender.teams);
		
		this.setSport("POOL");
		
		this.refreshConferences();
	},
	activate: function(teams) {
		console.log("TEAMS: ", teams, "CONFERENCES: ", this.sports.POOL.conferences)
		if (teams.HOME.length != 0) this.sports.POOL.conferences = teams;
		
		this.$.setup.$.sport.bubble("ontap");
		//console.log("ATTEMPTING TO FIX POOL ONTAP");
	},
	addUser: function(side) {
		console.log("ADDING USER..", side, this[this.sides[side]]);
		this.$.userPopup.setShowing(true);
		
		var addz = this.sports.POOL.conferences.HOME;
		this.$.userPopup.refresh(addz);
		
		var conference = this[this.sides[side]];
		this.addingToSide = conference.conference;
	},
	userAdd: function(inEvent, user) {
		user.originator = null;
		delete user.originator;
		console.log("OMGZ ADDING ..", user, this.addingToSide);
		
		var proper = this.sport + " " + this.addingToSide;
		_c = this[proper];
		_side = _c.teams;
		
		_side.splice(_side.length-1, 0, user);
		console.log("After adding...", _side);
		this.refreshConferences();
	},
	generate: function(inSender, inEvent){
		console.log("about to generate...");
		
		var tournament = {
			name: this.$.setup.$.tournament.getValue(),
			sport: this.sport,
			left: this[this.sides.left],
			right: this[this.sides.right],
			users: clone(this.users),
			status: "In Progress",
			round: 0,
			seeds: this.sports[this.sport].seeds,
			matchupsFinished: 0,
			winner: "",
			rounds: this.sports[this.sport].rounds,
			extras: this.sports[this.sport].extras,
			id: SHA256((new Date).toString())
		}
		
		tournament.rounds[0].games = parseInt(this.$.setup.$.round1.active.content);
		tournament.rounds[1].games = parseInt(this.$.setup.$.round2.active.content);
		tournament.rounds[2].games = parseInt(this.$.setup.$.round3.active.content);
		tournament.rounds[3].games = parseInt(this.$.setup.$.finals.active.content);
		
		var date = new Date();
		
		tournament.created = tournament.modified = date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
		
		if(!tournament.name || tournament.name == ""){
			tournament.name = this.sport + " Tournament";
		}
		
		var check = tournament.left.seeds.concat(tournament.right.seeds);
		for(var NULL in check){
			if(check[NULL]==null){
				
				var _alert = alert( "CANNOT CREATE TOURNAMENT WITH EMPTY SEEDS!", this );
				
				console.log(tournament);
				return;
			}
		}
		
		if(!tournament.users.user1.name || !tournament.users.user2.name){
			var _alert = alert( "CANNOT CREATE TOURNAMENT WITH EMPTY USERS!", this );
			console.log(tournament);
			return;
		}
		
		var _info = info("creating...", this, function(context){
			context.doGenerate(JSON.stringify(tournament));
			_info.remove();
		});
		
		//this
	},
	userChanged: function(inEvent, inSender){
		var user = inSender.name;
		var name = inSender.getValue();
		this.users[user].name = name;
		inSender.parent.receiveBlur();
	},
	colorChange: function(inEvent, inSender){
		var user = inSender.name.substr(0, 5);
		this.users[user].color = inSender.color;
		this.refreshConferences();
		inSender.parent.receiveBlur();
	},
	sportTap: function(inSender, inEvent){
		//console.log("sport tapped..", inSender, inEvent);
		this.setSport(inEvent.active.content);
	},
	sportChanged: function(oldSport){
		var side = "left";
		for (var conference in this.sports[this.sport].conferences) {
			var proper = this.sport + " " + conference;
			if(typeof(this[proper]) == "undefined"){
				this[proper] = clone(this.conference);
				this[proper].teams = this.sports[this.sport].conferences[conference];
			}
			this[proper].conference = conference;
			this[proper].side = side;
			this[proper].sport = this.sport;
			this[proper].rounds = this.sports[this.sport].rounds;
			this[proper].seeds.length = this.sports[this.sport].seeds;
			this[proper].users.length = this.sports[this.sport].seeds;
			this.sides[side] = proper;
			this.$[side + "Title"].setContent(conference);
			this.$[side + "Teams"].setContent(conference + " TEAMS");
			//this.refreshConference(this[conference]);
			this.refreshConference(this[proper]);
			side = "right";
		}
		console.log("sport:", this.sport, "|| conferences:", this[this.sides["left"]], this[this.sides["right"]]);
	},
	loadTeams: function(inSender, inEvent){
		var index = inEvent.index,
			conference = this[this.sides[inSender.name]];
		
	    //var rowControl = inEvent.row;
	    //rowControl.$.image.setSrc(this.imageSources[index]);
		//console.log(conference.teams[index]);
		
		this.$[conference.side + "Team"].addRemoveClass("item-selected", conference.team == index);
		
	    this.$[conference.side + "Name"].setContent(conference.teams[index][1]);
	    this.$[conference.side + "Team"].applyStyle("background-image", "url('img/logos/" + this.sport.toLowerCase() + "/" + conference.conference.toLowerCase() + "/" + rs(conference.teams[index][1].toLowerCase()) + ".gif')");
		
		//this.$[conference.side + "Team"].applyStyle("border-bottom", index == this.$[conference.side].rows-1 ? "1px solid silver !important" : null);
		//this.$[conference.side + "Team"].applyStyle("-webkit-border-radius", index == this.$[conference.side].rows-1 ? "15px" : null);
		
	},
	loadSeeds: function(inSender, inEvent){
		var index = inEvent.index,
			conference = this[this.sides[inSender.side]],
			obj = inSender.controls[2].controls[0];
		
		obj.setSeed(index + 1);
		obj.setTeam(conference.seeds[index]);
		obj.setHighlight(index == conference.seed - 1);
		
		try{
			obj.setLogo("img/logos/" + conference.sport.toLowerCase() + "/" + conference.conference.toLowerCase() + "/" + rs(conference.seeds[index][1].toLowerCase()) + ".gif")
		}catch(e){obj.setLogo("")}
		
		if(conference.users[index])
			obj.user.originator.setUser(conference.users[index]);
		
		obj.hasTeam();
		//obj.applyStyle("border-bottom", index == this.$[conference.side + "Seeds"].rows-1 ? "1px solid silver" : "none");
		//obj.applyStyle("-webkit-border-radius", index == this.$[conference.side + "Seeds"].rows-1 ? "15px" : null);
		
//		console.log(inSender, inEvent, index, conference.seeds[index], conference.users[index])
	},
	getSeed: function(conference, row){
		this.$[conference.side + "Seeds"].prepareRow(row - 1);
		var seed = this.$[conference.side + "Seed"];
		return seed;
	},
	seedTap: function(inSender, inEvent){
		
		
		if(inEvent.dispatchTarget.id.toLowerCase().indexOf("user") != -1){
//			console.log(inEvent.dispatchTarget)
			if(inEvent.dispatchTarget.onclick == "changeColor"){
				this[this.sides[inSender.side]].seed = null;
				this.$[this[this.sides[inSender.side]].side + "Seeds"].render();
			}
			if(inEvent.dispatchTarget.ontap == "changeUser"){
				this[this.sides[inSender.side]].seed = inEvent.index + 1;
				this.$[this[this.sides[inSender.side]].side + "Seeds"].render();
			}
			//
			return;
		}
		
		var conference = this[this.sides[inSender.side]],
			seed = inEvent.index + 1,
			renderList = function(that){
				var row = seed - 1;
				that.$[conference.side + "Seeds"].prepareRow(row);
				that.$[conference.side + "Seed"].setSeed(row + 1);
				if (conference.seed == row){
					that.$[conference.side + "Seed"].setHighlight(true);
				} else {
					that.$[conference.side + "Seed"].setHighlight(false);
				}
				
				try{
					that.$[conference.side + "Seed"].setLogo("img/logos/" + conference.sport.toLowerCase() + "/" + conference.conference.toLowerCase() + "/" + rs(conference.seeds[parseInt(row)][1].toLowerCase()) + ".gif");
				}catch(e){that.$[conference.side + "Seed"].setLogo("")}
				
				that.$[conference.side + "Seeds"].renderRow(row);
				that.$[conference.side + "Seeds"].lockRow(row);
				
			};
		
		if (conference.team != null){
			/*
			 * if there is a team selected
			 * and a user taps on a seed
			 * add the team to the selected seed and remove the team from the available teams list
			 */
			this.teamToSeed(conference, conference.teams[conference.team], seed);
			this.$[conference.side + "Seeds"].render();
			//renderList(this);
			return;
		}
		
		var selected = conference.seed == seed;
		
		switch(selected){
			case true:
				/*
				 * deselect it if it's already selected
				 * it'll be the only one selected if it is..
				 */
				
				conference.seed = null;
				this.getSeed(conference, i).setHighlight(false);
				break;
			case false:
				/*
				 * if it's not selected, we need to first check to see if there's a seed that IS selected.
				 * if there IS a selected seed, we need to SWAP with the old one
				 * else, we still need to un-select all the other seeds
				 */
				
				
				
				/*
				 * when a user clicks on a seed
				 */
				for(var i = 0; i < conference.seeds.length; i++){
					var component = this.getSeed(conference, i);
					if (component.highlight && i + 1 == conference.seed) {
						/*
						 * alright. here we have a special case
						 * we need to swap the seeds
						 * remove the highlight
						 * and RETURN from the function, because we WON'T be selecting what we tapped
						 */
						component.setHighlight(false);
						if(this.swapSeeds(conference, seed - 1, i)){
							renderList(this);
							return;
						}
					}
				}
				
				/*
				 * then apply the highlight
				 */
				conference.seed = seed;
				this.getSeed(conference, seed).setHighlight(true);
				
				break;
		}
		renderList(this);
		//this.$[conference.side + "Seeds"].prepareRow(seed - 1);
		this.$[conference.side + "Seeds"].render();
	},
	teamTap: function(inSender, inEvent){
		setTimeout(this.teamTap2.bind(this, inSender, inEvent), 0, inSender, inEvent);
	},
	teamTap2: function(inSender, inEvent) {
		/*
		 * user taps on a team
		 * we need to check if there is a seed selected to add it
		 * else we need to deselect all other teams and select this new one
		 */
		var conference = this[this.sides[inSender.side]],
			row = inEvent.rowIndex,
			renderList = function(that){
				that.$[conference.side].prepareRow(row);
				if (conference.team == row){
					that.$[conference.side + "Team"].addClass("item-selected");
				} else {
					that.$[conference.side + "Team"].removeClass("item-selected");
				}
				
				//console.log("img/logos/" + conference.sport.toLowerCase() + "/" + conference.conference.toLowerCase() + "/" + conference.teams[parseInt(row)][1].toLowerCase() + ".gif")
				
				that.$[conference.side].renderRow(row);
				//that.$[conference.side + "Image"].setSrc("img/logos/" + conference.sport.toLowerCase() + "/" + conference.conference.toLowerCase() + "/" + conference.teams[parseInt(row)][1].toLowerCase() + ".gif");
				that.$[conference.side + "Team"].applyStyle("background-image", "url('img/logos/" + that.sport.toLowerCase() + "/" + conference.conference.toLowerCase() + "/" + rs(conference.teams[row][1].toLowerCase()) + ".gif')");
				
				that.$[conference.side].lockRow(row);
			}
		
		console.log("TEAMTAP: ", inSender, inEvent);
		console.log("Checking", inSender.controls[0].content);
	/*	if (inSender.controls[0].content == "Add User") {
			
			// Show add user popup and return
			this.addUser(inSender.side);
			return;
		}*/
		
		
		if(conference.team){
			var tmp = row;
			row = conference.team;
			renderList(this);
			row = tmp;
		}
		
		if (conference.seed){
			/*
			 * if there is a seed selected
			 * and a user taps on a team
			 * add the team to the selected seed and remove the team from the available teams list
			 */
			this.teamToSeed(conference, conference.teams[row], conference.seed);
			renderList(this);
			return;
		}
		var selected = conference.team == inEvent.rowIndex;
		/*
		 * when a user clicks on a team
		 */
		switch (selected) {
			case true:
				/*
				 * deselect it if it's already selected
				 * it'll be the only one selected if it is..
				 */
				conference.team = null;
				break;
			case false:
				conference.team = row;
				break;
		}
		renderList(this);
	},
	teamToSeed: function(conference, team, seed){

		this.$.setup.deactivateEdit();
		this.refreshConference(conference);
		/*
		 * here we need to add the team to the seed
		 * remove the team from the available teams list
		 * and deselect the seed
		 */
		console.log("ADDING",team,"TO",seed,"SEED",conference);
		
		/*
		 * remove the team from available teams list...
		 */
		var teams = [];
		//console.log("BEFORE:", conference.teams);
		var removed = false;
		for (var i in conference.teams) {
			if (conference.teams[i] == team && removed == false) {
				removed = true;
				continue;
			} else if ((conference.teams[i] == team && removed == true) || (conference.teams[i] != team)) {
				teams.push(conference.teams[i]);
			}
		}
		/*
		for(var i = 0; i < conference.teams.length; i++ ){
			if( removed != false && conference.teams[i] != team ){
				teams.push(conference.teams[i]);
			}
		}*/
		
		//console.log("AFTER:", teams );
		conference.teams = teams;
		
		/*
		 * now, we need to add our team to the correct seed
		 * and then change the seed text to reflect our choice
		 */
		
		/*
		 * first, we need to check to see if a team is already in the slot we are trying to go to.
		 * if there is, we need to move it back to the available teams list
		 */
		if (conference.seeds[seed-1]){
			conference.teams.push(conference.seeds[seed-1]);
		}
		
		
		
		conference.seeds[seed-1] = team;
		
		
		conference.users[seed-1] = this.$[conference.side + "Seed"].user.originator.user;
		
		
		this.invertUser(conference, seed);
		//console.log(seed)
		/*
		 * refresh
		 */
		this.refreshConference(conference);
	},
	seedChanged: function(inEvent, seed){
		var conference = this[this.sides[inEvent.side]];
		
		conference.users[inEvent.seed - 1] = inEvent.user.originator.user;
		
		//inEvent.setUser(conference.users[inEvent.seed - 1]);
		
//		console.log(conference.users[inEvent.seed - 1], seed, conference.users);
		
		this.invertUser(conference, conference.seeds.length+1 - inEvent.seed);
		
		//if(conference.seed == seed)conference.seed = null;
		//conference.seed = null;
	},
	invertUser: function(conference, seed) {
		var offset = 0;
		if (conference.rounds[0].bye){
			offset = conference.rounds[0].bye;
		} else if ( conference.rounds[0].wildcard ){
			offset = conference.rounds[0].wildcard;
		}
		
		if(seed - offset < 0 || seed + offset > conference.seeds){return;}
		
		var testSeed = conference.seeds.length+1 - seed;
		
		var inverseUser = conference.users[testSeed - 1];
		
		if(inverseUser == undefined)
			inverseUser = "user2";
		
		if (inverseUser){
			var userNum = parseInt(inverseUser[4]);
			userNum = userNum == 2 ? 1 : 2;
			conference.users[seed - 1] = "user" + userNum;
			//console.log("CREATING INVERSE FOR ... ", seed, "CLICKED USER", conference.users[seed - 1], "INVERSE USER", conference.users[testSeed - 1], "NEW USER", "user" + userNum, "at index", seed-1);
		}
		
		this.$[conference.side + "Seed"].render();
	},
	swapSeeds: function(conference, oldSeed, newSeed) {
		if(typeof (oldSeed+1) != "number"){return}
		
		console.log("SWAPPING",conference.seeds[oldSeed],"AT SEED",oldSeed+1,"WITH",conference.seeds[newSeed],"AT SEED",newSeed+1);
		
		var tmpTeam = conference.seeds[oldSeed];
		conference.seeds[oldSeed] = conference.seeds[newSeed];
		conference.seeds[newSeed] = tmpTeam;
		
		
		var oldUser = conference.users[oldSeed];
		var newUser = conference.users[newSeed];
		
		conference.users[oldSeed] = newUser;
		conference.users[newSeed] = oldUser;
		
		if(oldUser != newUser){
			this.invertUser(conference, conference.seeds.length - oldSeed);
			this.invertUser(conference, conference.seeds.length - newSeed);
		}
			
		
		this.refreshConference(conference);
		return true;
	},
	randomize: function(inEvent){
		
		this.refreshConferences();
		
		var _lc = this[this.sides["left"]];
		var _rc = this[this.sides["right"]];
		
		var leftRandomized = clone(this.sports[this.sport].conferences[_lc.conference]);
		var rightRandomized = clone(this.sports[this.sport].conferences[_rc.conference]);
		
		leftRandomized = shuffle(leftRandomized);
		rightRandomized = shuffle(rightRandomized);
		
		for(var x = 0; x < _lc.seeds.length; x++){
			_lc.seeds[x] = leftRandomized[x];
			var r = Math.round(Math.random()*1) + 1;
			_lc.users[x] = "user" + r;
			this.getSeed(_lc, x+1).setUser(this.users["user" + r])
			
			this.invertUser(_lc, _lc.seeds.length - x);
		}
		
		_lc.teams = [];
		for(var x = _lc.seeds.length; x < leftRandomized.length; x++){
			_lc.teams.push(leftRandomized[x]);
		}
		
		for(var x = 0; x < _rc.seeds.length; x++){
			_rc.seeds[x] = rightRandomized[x];
			var r = Math.round(Math.random()*1) + 1;
			_rc.users[x] = "user" + r;
			this.invertUser(_rc, _rc.seeds.length - x);
		}
		
		_rc.teams = [];
		for(var x = _rc.seeds.length; x < rightRandomized.length; x++){
			_rc.teams.push(rightRandomized[x]);
		}
		
		var luserList = clone(_lc.users);
		var ruserList = clone(_rc.users);
		this.refreshConferences();
		_lc.users = luserList;
		_rc.users = ruserList;
		//this.$.hbox.render();
		this.$.leftSeeds.render();
		this.$.rightSeeds.render();
	},
	refreshConference: function(conference) {
		for(var seed in conference.seeds){
			this.getSeed(conference, seed).setTeam(conference.seeds[seed]);
			this.getSeed(conference, seed).refreshUser();
		}
		
		conference.seed = null;
		conference.team = null;
		
		/*
		 * hide team highlights
		 */
		/*for(var i in conference.teams){
			this.$[conference.side].prepareRow(i);
			this.$[conference.side + "Team"].removeClass("item-selected");
			this.$[conference.side].lockRow(i);
		}
		this.$[conference.side].render();*/
		
		/*
		 * hide seed highlights
		 */
		
		if (this.sport == "POOL") {
			//console.log("CONFErENCE: ", conference);
			if (conference.teams[conference.teams.length-1][0]!= "ADD") {
				//conference.teams.push(["ADD", "Add User", ""]);
			}
		}
		
		this.$[conference.side].setRows(conference.teams.length);
		this.$[conference.side].render();
		
		
		this.$[conference.side + "Seeds"].setRows(conference.seeds.length);
		this.$[conference.side + "Seeds"].render();
		
		for (var i in conference.seeds) {
			this.getSeed(conference, i).setHighlight(false);
		}
		
		_t = this;
	},
	refreshConferences: function(){
		if(typeof(_gameOn)=="undefined")return;
		this.refreshConference(this[this.sides.left]);
		this.refreshConference(this[this.sides.right]);
	},
	reset: function(){
		delete this[this.sides.left];
		delete this[this.sides.right];
		this.$.setup.reactivateEdit();
		this.sportChanged();
		this.refreshConferences();
	},
	scroll: function(percentage){
		var max = this.$.hbox.getScrollBounds().maxLeft;
		this.$.hbox.scrollLeft = max * percentage;
		this.$.hbox.scrollTo(this.$.hbox.scrollLeft);
	},
	scrollLeft: function(){
		this.updateScroll(-20);
	},
	scrollRight: function(){
		this.updateScroll(20);
	},
	updateScroll: function(distance){
		var newScroll = this.$.hbox.scrollLeft + distance;
		if (newScroll > this.$.hbox.getScrollBounds().maxLeft) newScroll = this.$.hbox.getScrollBounds().maxLeft;
		if (newScroll < 0) newScroll = 0;
		this.$.hbox.scrollLeft = newScroll;
		this.$.hbox.scrollTo(this.$.hbox.scrollLeft);
	},
	pickUser: function(inSender, inEvent){
		var seed = inSender;
		var user = seed.$.user.$.user;
		user.bubble("ontap", {
			dispatchTarget: {
				id: user.id,
				onclick: user.onclick,
				ontap: user.ontap
			},
			index: inEvent.index
		});
	}
});
logControl = function(control){
	for(var property in control){
		console.log(property, control[property] )
	}
}
