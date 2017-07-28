/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "seed",
	kind: "GroupItem",
	classes: "item",
	published: {
		seed: "",
		round: "",
		conference: "",
		side: "",
		highlight: false,
		team: "",
		user: "", 
		finals: false,
		logoSide: "",
		logo: "",
		asterisk: false
	},
	events: {
		onChange: ""
	},
	components: [
		//{ name: "logo", kind: "Image", classes: "teamLogo" },
		{ name: "user", style:"position: absolute;margin:5px 10px 0px 10px;", kind: "userPicker", showing: false, onSetUser: "set" },
		{ name: "box", kind: "FittableColumns", components: [
			
			{ kind: "onyx.InputDecorator", style: "width:100%;border:none;", components: [
			
				{ name: "leftSeed", classes: "seedNumber", content: "1", showing: false },
				{ kind: "FittableColumns", components: [
					{ name: "leftTeam", content: "Pick a team...", showing: false },
					
					{ name: "rightTeam", content: "Pick a team...", showing: false },
				]},
				{ name: "rightSeed", classes: "seedNumber", content: "1", showing: false },
			]},
			{ name: "asterisk", showing: false, content: "*", style: " font-size: 2em; font-weight: 900; top:5px; margin-left: -0px; position: absolute; font-style: normal;" }
		]}
	],
	create: function(){
		this.inherited(arguments);
		if(!this.side)return;
		this.seedChanged();
		this.sideChanged();
	},
	sideChanged: function(oldSide){
		this.removeClass(oldSide);
		this.addClass(this.side);
		this.$.asterisk.applyStyle(oldSide, null);
		this.$.asterisk.applyStyle(this.side, "3px");
		
		if (this.finals)
			this.applyStyle("background-position-x", "right");
	},
	highlightChanged: function(oldHighlight){
		this.highlight ? this.addClass("item-selected") : this.removeClass("item-selected");
	},
	teamChanged: function(oldTeam) {
		var newText = this.team != ("" || null || undefined) ? typeof this.team == "object" || !this.team ? this.team[1] : this.team : "Pick a team...";
		
		if(this.finals == true){
			this.setSide("left");
		}
		this.$[this.side + "Team"].setContent(newText);
		this.$[this.side + "Team"].setShowing(true);
		
		this.$.user.setShowing(newText != "Pick a team..." && newText != " ");
		
		this.logoSideChanged();
		
		this.$.asterisk.setShowing(this.asterisk);
	},
	refreshUser: function(){
		this.$.user.setUser(this.$.user.user);
		this.$.user.userChanged();
		
	},
	userChanged: function(inEvent, user, propogate){
		user = user == null ? inEvent : user;
		//console.log("SETTING USER...", user);
		this.user = user;
		if(propogate)
			this.doChange();
		
		//console.log(this.$.user.users[this.$.user.user].color)
		
		
	},
	set: function(oldUser, user, propogate){
		user = user == null ? oldUser : user;
		//console.log("SETTING USER...", user);
		this.user = user;
		//if(propogate == true)
			this.doChange(this.seed);
		
		this.hasTeam();
	},
	logoSideChanged: function(oldLogo){
		if(this.seed==0 || !this.logoSide){
			this.logoChanged();
			return;
		}
		var logo = logos[this.logoSide][this.seed - 1];
		this.applyStyle("background-image", "url('" + rs(logo) + "')");
	},
	logoChanged: function(oldLogo){
		this.applyStyle("background-image", "url('" + rs(this.logo) + "')");
	},
	seedChanged: function(oldSeed){
		if(this.finals){
			this.setSide("left");
		}
		
		this.$[this.side + "Seed"].setContent(this.seed);
		this.$[this.side + "Seed"].setShowing(true);
		
		
		this.$.user.applyStyle(this.side == "left" ? "right" : "left", "0");
	},
	update: function(){
		this.doChange();
	},
	pickUser: function(inSender, inEvent){
		this.$.user.changeUser();
	},
	hasTeam: function(){
		var hasTeam = false;
		
		if( this.seed != ( "-" || "" || "undefined") && this.team != ("" || null || undefined) && this.$[this.side + "Team"] != ( " " || "Pick a team..." ) )
			hasTeam = true;
		
		//console.log("HAS TEAM:", this.seed, hasTeam)
		if(!hasTeam){
			this.container.applyStyle("background-color", null);
			this.applyStyle("border-color", null);
		}
		
		this.logoSideChanged();
		
		this.$.asterisk.setShowing(this.asterisk);
		
		return hasTeam;
	}
});