/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "gameOn",
	kind: "FittableRows",
	flex: 1,
	fit: true,
	classes: "enyo-fit body",
	style: "",
	published: {
		kind: ""
	},
	components: [
		{ name: "toolbar", kind: "onyx.Toolbar", components: [
			{ content: "Game On! POOL" },
			
			
			{ name: "save", kind: "onyx.IconButton", src: "img/icons/menu-icon-save.png", ontap: "initiateSave", style: "float:right", showing: false },
			{ name: "create", kind: "onyx.IconButton", src: "img/icons/menu-icon-new.png", ontap: "createTournament", style: "float:right" },
			{ name: "load", kind: "onyx.IconButton", src: "img/icons/menu-icon-search.png", ontap: "loadTournament", style: "float:right" },
			{ name: "helpIcon", kind: "onyx.IconButton", src: "img/icons/menu-icon-help.png", ontap: "displayHelp", style: "float:right" },
			{ name: "statIcon", kind: "onyx.IconButton", src: "img/icons/icon-accounts.png", ontap: "showStats", style: "float:right"}
			
		]},
		{ kind: "FittableColumns", fit: true, components: [
			{ name: "box", classes: "enyo-fit", fit: true, components: [
			/*
			 * app goes here
			 */
				{ name: "generator", kind: "generator", fit: true, showing: false, onGenerate: "generate", onSave: "saveTeams" },
				{ name: "loader", kind: "load", fit: true, showing: false, onLoad: "showBracket", onRemove: "remove" },
				{ name: "bracket", kind: "bracket", fit: true, showing: false, onSave: "save" },
				{ name: "stats", kind: "stats", fit: true, showing: false }
			/*
			 * end app
			 */
			]}
		]},
		{ kind: "help" },
		{ name: "bottom", kind: "onyx.Toolbar", onmousedown: "slide", ondrag: "slide", style: "height: 58px;", components: [
			
			
			
			//{ name: "right", kind: "onyx.IconButton", src: "img/icons/menu-icon-forward.png", onmousedown: "right", onmouseup: "stop", style: "float:right" },
			//{ name: "left", kind: "onyx.IconButton", src: "img/icons/menu-icon-back.png", onmousedown: "left", onmouseup: "stop", style: "float:left" },
			
			
			
			
			
			//{ name: "clear", kind: "onyx.Button", content: "Clear All Tournaments", onclick: "clear" }
		]}
	],
	published: {
		icon: "icon.png",
		handle: "",
		text: ""
	},
	create: function() {
		//this.backupStorage();
		//this.loadBackup();
		//this.saveStorage();

		setTimeout(this.setupStorage.bind(this), 0);
//		this.setupStorage();
		
		this.inherited(arguments);
		//console.log(this)
		/*var that = this;
		setTimeout(function(that){alert( "Hello World", that )}, 0, that);*/
		
		this.$.help.open();
	},

	removeBottomBar: function() {
	    this.$.bottom.setShowing(false);
	},

	statsChange: function(inSender, inEvent) {
		var s = this.$.statsInput.content;
		this.storage = JSON.parse(s);
		this.saveStorage();
	},
	
	slide: function(inSender, inEvent){
		//console.log("SLIDING..", inSender, inEvent);
		var percentage = ( inEvent.pageX - window.innerWidth * .2 ) / ( window.innerWidth - ( window.innerWidth * .4 ) );
		
		this.$.generator.scroll(percentage);
		this.$.bracket.scroll(percentage);
	},
	left: function(inSender, inEvent){
		if(!inSender && !moving){return}
		this.$.generator.scrollLeft();
		this.$.bracket.scrollLeft();
		window.setTimeout(this.left.bind(this), 35);
		moving = true;
	},
	right: function(inSender, inEvent){
		if(!inSender && !moving){return}
		this.$.generator.scrollRight();
		this.$.bracket.scrollRight();
		window.setTimeout(this.right.bind(this), 35);
		moving = true;
	},
	initiateSave: function(inSender, inEvent){
		if(inSender.domStyles.opacity == 1)
			this.$.bracket.save();
	},
	displayHelp: function(inSender, inEvent){
		this.$.help.open();
	},
	save: function(inEvent, tournament){
		tournament = JSON.parse(tournament);
		var saved = false;
		for(var index in this.storage.tournaments){
			var tourny = this.storage.tournaments[index];
			if(!tourny.id){tourny.id = ""}
			if(tourny.id == tournament.id){
				this.storage.tournaments.splice(index, 1); // = clone(tournament);
				
				this.storage.tournaments.unshift(clone(tournament));
				this.saveStorage();
				saved = true;
			}
		}
		if(!saved){
			tournament.id = SHA256((new Date).toString());
			//this.storage.tournaments[this.storage.tournaments.length] = ;
			this.storage.tournaments.unshift(clone(tournament));
			this.saveStorage();
		}
	},
	saveTeams: function(inSender, inEvent) {
		this.storage.teams = inEvent.teams;
		this.saveStorage();
	},
	remove: function(inEvent, tournamentIndex){
		this.storage.tournaments.splice(tournamentIndex, 1);
		this.saveStorage();
		this.loadTournament(inEvent);
		
		var _info = info("deleted.", this, function(context){
			_info.setTimeout(600);
		});
	},
	stop: function(inSender, inEvent){
		moving = false;
	},
	showKind: function(inEvent, kind, activate){
		kind=kind==null?"generator":kind;
		this.hideAll();
		this.$[kind].setShowing(true);
		
		
		if(activate!=null && kind!="stats")this.$[kind].activate(activate);
		this.$[kind].render();
		
		switch(kind){
			case "bracket":
				this.$.save.setShowing(true);
				break;
			case "stats":
				this.$.stats.refresh();
				break;
			case "generator":
				//this.$.generator.activate(activate);
				break;
			default:
				this.$.save.setShowing(false);
				break;
		}
		this.$.toolbar.render();
		this.kind = kind;
	},
	hideAll: function(){
		var box = this.$.box.children;
		for(var component in box){
			box[component].setShowing(false);
		}
	},
	showStats: function(inSender, inEvent) {
		
		if ( this.kind == "bracket" && this.$.bracket.saved == false ) {
			this.$.bracket.closeAll();
			alert("Save tournament?", this, {
				confirmText: "Yes",
				cancelText: "No",
				onConfirm: function(context){
					context.$.bracket.save();
					setTimeout(context.showKind.bind(context, inSender, "stats"), 100, context);
				},
				onCancel: function(context){context.showKind(inSender, "stats")}
			});
		} else {
			this.showKind(inSender, "stats");
		}
		
		
	},
	loadTournament: function(inEvent, domEvent, activate){
		if ( this.kind == "bracket" && this.$.bracket.saved == false ) {
			this.$.bracket.closeAll();
			alert("Save tournament?", this, {
				confirmText: "Yes",
				cancelText: "No",
				onConfirm: function(context){
					context.$.bracket.save();
					setTimeout(context.load.bind(context, activate), 100, context);
				},
				onCancel: function(context){context.load(activate)}
			});
		} else {
			this.load(activate);
		}
	},
	load: function(activate){
		this.$.loader.setTournaments(JSON.stringify(this.storage.tournaments));
		this.showKind(null, "loader", activate);
	},
	createTournament: function(inEvent){
		if ( this.kind == "bracket" && this.$.bracket.saved == false ) {
			this.$.bracket.closeAll();
			alert("Save tournament?", this, {
				confirmText: "Yes",
				cancelText: "No",
				onConfirm: function(context){
					context.$.bracket.save();
					setTimeout(context.load.bind(context, activate), 100, context);
					//context.load(activate);
				},
				onCancel: function(context){context.load(activate)}
			});
		} else {
			this.showKind(inEvent, "generator", this.storage.teams);
		}
	},
	generate: function(inEvent, tournament){
		if(typeof(tournament)!="string")return;
		console.log("CREATING TOURNAMENT!", JSON.parse(tournament));
		this.storage.tournaments.unshift(JSON.parse(tournament));
		this.saveStorage();
		this.$.generator.reset();
		this.loadTournament( null, null, 0 );
		this.loadTournament( null, null, 0 );
		/*this.$.generator.destroy();
		this.$.box.createComponent({ name: "generator", kind: "generator", fit: true, showing: false, onGenerate: "generate" }, {owner:this.$.box});*/
	},
	showBracket: function(inSender, tournament){
		console.log("ABOUT TO DISPLAY BRACKET", JSON.parse(tournament));
		
		this.showKind(null, "bracket", tournament);
	},
	setupStorage: function(){
		this.storage = {
			tournaments: [],
			stats: {},
			preferences: {},
			teams: {HOME: [], AWAY: []}
		}
		if(!localStorage["tracker"]){
			console.log("resetting local storage");
			this.saveStorage();
		} else {
			console.log("loading...", JSON.parse(localStorage["tracker"]));
			var storage = JSON.parse(localStorage.tracker);
			for(var i in storage){
				try{
					this.storage[i] = storage[i];
				} catch (e){
					console.error("ERROR LOADING STORAGE OBJECT...");
					console.error(e);
					console.error(e.message);
					continue;
				}
			}
		}
	},
	saveStorage: function(){
		console.log("saving...", this.storage);
		this.storage = clone(this.storage);
		localStorage.tracker = JSON.stringify(this.storage);
		console.log("SAVE COMPLETE.");
		alert("Data saved.", this);
	},
	backupStorage: function(){
		console.log("BACKING UP STORAGE...");
		localStorage.trackerBackup = JSON.stringify(this.storage);
	},
	loadBackup: function(){
		console.log("LOADING STORAGE BACKUP!");
		this.storage = JSON.parse(localStorage.trackerBackup);
	},
	clear: function(){
		this.storage.tournaments = [];
		this.saveStorage();
	}
});


function clone(obj){
	try {
		return JSON.parse(JSON.stringify(obj));
	} catch (e) {
		console.error(e.message, obj);
		obj.user1.originator = null;
		obj.user2.originator = null;
		return JSON.parse(JSON.stringify(obj));
	}
}

