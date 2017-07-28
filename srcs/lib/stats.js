enyo.kind({
	name: "stats",
	kind: "FittableRows",
	fit: true,
	published: {
		stats: []
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "stats", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "message" },
					{ tag: "br" },
					{ name: "stats" },
					{ name: "nostats", classes: "bigger", content: "there are no stats" }
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.refresh();
	},
	refresh: function(){
		this.stats = [];
		this.calculate();
		this.set();
	},
	set: function(){
		this.$.message.setContent("view detailed stats information here");
		
		var stats = this.fetch();
		if ( stats.length ) {
			this.loadthese(stats);
			this.$.nostats.setShowing(false);
		} else {
			//this.$.message.setContent("you do not have a game save");
			this.$.nostats.setShowing(true);
			this.$.stats.setShowing(false);
		}
		
	},
	calculate: function() {
		var _stats = JSON.parse(localStorage["tracker"]).tournaments;
		
		//console.log(_stats);
		
		for (var i = 0; i < _stats.length; i++) {
			var t = _stats[i];
			var m = t.matchups;
			//console.log("adding matchup to stats...", m);
			for (var r in m) {
				var winner = "";
				if (!m[r]) continue;
				var a = m[r];
				if (r != "finals") {
					for (var z in a.HOME) {
						var k = a.HOME[z];
						
						if (k.home.team[1] == k.away.team[1]) continue;
						
						if (k.winner == "home") {
							this.userWon(k.home.team);
							this.userLost(k.away.team);
						} else if (k.winner == "away") {
							this.userWon(k.away.team);
							this.userLost(k.home.team);
						}
					}
					for (var z in a.AWAY) {
						var k = a.AWAY[z];
						if (k.home.team[1] == k.away.team[1]) continue;
						if (k.winner == "home") {
							this.userWon(k.home.team);
							this.userLost(k.away.team);
						} else if (k.winner == "away") {
							this.userWon(k.away.team);
							this.userLost(k.home.team);
						}
					}
				} else {
					for (var z in a.finals) {
						var k = a.finals[z];
						
						if (k.winner == "home") {
							if (r == "finals") this.userWonTourny(k.home.team);
							if (k.home.team[1] == k.away.team[1]) continue;
							this.userWon(k.home.team);
							this.userLost(k.away.team);
						} else if (k.winner == "away") {
							if (k.home.team[1] == k.away.team[1]) continue;
							if (r == "finals") this.userWonTourny(k.away.team);
							this.userWon(k.away.team);
							this.userLost(k.home.team);
						}
					}
				}
			}
		}
	},
	userWonTourny: function(user) {
		//console.log("won tourny", user)
		var username = user[1];
		for (var u = 0; u < this.stats.length; u++) {
			var _user = this.stats[u];
			if (_user.name == username) this.stats[u].tournys_won++;
		}
	},
	userLost: function(user) {
		var username = user[1];
		//console.log(username + " lost.");
		var lim = this.stats.length;
		if (lim == 0) {
			this.stats.push({
				name: username,
				played: 1,
				won: 0,
				lost: 1,
				tournys_won: 0,
				percentage: 100
			});
		} else {
			var added = false;
			
			for (var u = 0; u < this.stats.length; u++) {
				var _user = this.stats[u];
				if (_user.name == username) {
					added = true;
					this.stats[u].played++;
					this.stats[u].lost++;
					this.stats[u].percentage =  Math.round(1000*(_user.won/_user.played))/10;
				}
			}
			if (added == false) {
				this.stats.push({
					name: username,
					played: 1,
					won: 0,
					lost: 1,
					tournys_won: 0,
					percentage: 100
				});
			}
		}
		this.statsChanged();
	},
	userWon: function(user) {
		var username = user[1];
		//console.log(username + " won!");
		var lim = this.stats.length;
		if (lim == 0) {
			this.stats.push({
				name: username,
				played: 1,
				won: 1,
				lost: 0,
				tournys_won: 0,
				percentage: 100
			});
		} else {
			var added = false;
			for (var u = 0; u < this.stats.length; u++) {
				var _user = this.stats[u];
				if (_user.name == username) {
					added = true;
					this.stats[u].played++;
					this.stats[u].won++;
					this.stats[u].percentage = Math.round(1000*(_user.won/_user.played))/10;
				}
			}
			if (added == false) {
				this.stats.push({
					name: username,
					played: 1,
					won: 1,
					lost: 0,
					tournys_won: 0,
					percentage: 100
				});
			}
		}
		this.statsChanged();
	},
	statsChanged: function() {
		//console.log(this.stats)
		this.set();
	},
	fetch: function(){
		
		var stats = this.stats;
		
		try {
			//stats = JSON.parse(stats);
		} catch(e){stats = [];}
		
		return stats;
	},
	
	


	
	
	
	loadthese: function(stats){
		
		var s = this.$.stats;
		
		s.setShowing(true);
		//s.setContent(JSON.stringify(stats));
		
		var madefirst = false;
		
		var c = [];
		for ( var p in stats ) {
			var player = stats[p];
			
			var ic = [];
			
			var played = 0;
			
			for ( var i in player ){
				
				if ( i == "played" ) played = player[i];
				
				var content = this.format(i, player[i], played);
				
				if ( !madefirst ) {
					ic.push(
						{ tag: "tr", components: [
							{ tag: "td", content: content[0], style: "height: 25px; width: 75px; text-align: right; font-weight: bold;" },
							{ tag: "td", content: content[1], style: "height: 25px; width: 75px; border-color: #927c49;" }
						]}
					);
				} else {
					ic.push(
						{ tag: "tr", components: [
							//{ tag: "td", content: content[0], style: "text-align: right; font-weight: bold;" },
							{ tag: "td", content: content[1], style: "height: 25px; width: 75px; border-color: #927c49;" }
						]}
					);
				}
				
				
			}
			
			c.push({ tag: "table", components: ic });
					madefirst = true;
			
		}
		
		//console.log(c)
		
		s.destroyComponents();
		
		s.createComponents([
			{ layoutKind: "FittableColumnsLayout", components: c }
		]);
		
		s.render();
		
	},
	format: function(category, info, played){
		switch (category){
			case "doubleskunks":
				category = "double skunks";
				break;
			case "doubleskunked":
				category = "double skunked";
				break;
			case "totalpegs":
				category = "total / avg pegs";
				info = info + " / " + Math.round(info/played);
				break;
			case "opppegs":
				category = "opp total / avg pegs";
				info = info + " / " + Math.round(info/played);
				break;
		}
		
		return [category, info];
	}
});