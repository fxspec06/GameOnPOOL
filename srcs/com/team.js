/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "team",
	kind: "FittableRows",
	fit: true,
	published: {
		team: "",
		game: {},
		score: 0,
		disabled: false,
		logo: "",
		side: ""
	},
	events: {
		onSetUser: ""
	},
	components: [
		{ kind: "FittableColumns", components: [
			
			{ name: "scorebox", classes: "center", style: "float: left; width: 20%; margin-top: 50px !important;", components: [
				{ name: "plus", kind: "onyx.IconButton", src: "img/icons/button_up.png", classes: "onyx-icon-lg", ontap: "plus", onhold: "increase", onmouseup: "stop" },
				{ name: "score", classes: "score", content: 0 },
				{ name: "minus", kind: "onyx.IconButton", src: "img/icons/button_down.png", classes: "onyx-icon-lg", ontap: "minus", onhold: "decrease", onmouseup: "stop" }
			]},
			
			
			
			{ name: "otherBox", style: "float: right; width: 60%; clear: none; display: table; padding: 15px;", components: [
				{ name: "teamBox", kind: "FittableColumns", style: "margin: 7px;", classes: "center header", components: [
					{ name: "team" },
				]},
				
				{ name: "logo", kind: "enyo.Image", style: "margin: 7px;", showing: false },
				
				{ name: "userBox", kind: "FittableColumns", style: "float: right; text-align: right; margin: 7px;", components: [
					{ name: "userName" },
					{ name: "user", kind: "userPicker", auto: false, onSetUser: "doSetUser" },
					
				]},
				
				{ name: "logo_", kind: "enyo.Image", style: "margin: 7px;", showing: false },
				
			]}
			
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.refreshLayout();
	},
	refreshLayout: function(){
		//console.log(this.team)
		switch(this.team){
			case "away":
				this.$.otherBox.applyStyle("float", "left !important");
				this.$.scorebox.applyStyle("float", "right !important");
				this.$.userBox.applyStyle("float", "left !important");
				this.$.userBox.applyStyle("text-align", "left !important");
				this.$.user.applyStyle("float", "left !important");
				this.$.userBox.applyStyle("display", "table-header-group !important");
				this.$.teamBox.applyStyle("display", "table-footer-group !important");
				this.$.logo_.setShowing(true);
				this.logo = "logo_";
				this.$.scorebox.applyStyle("margin-right", "15px");
				break;
			case "home":
				this.$.userBox.applyStyle("display", "table-footer-group !important");
				this.$.teamBox.applyStyle("display", "table-header-group !important");
				this.$.logo.setShowing(true);
				this.logo = "logo";
				this.$.scorebox.applyStyle("margin-left", "15px");
				break;
		}
		this.render();
	},
	gameChanged: function(oldGame) {
		console.log("LOADING GAME...", this.game);
		//this.$.team.setContent(this.team);
		if(typeof this.game[this.team].team == "string"){
			this.game[this.team].team = clone(upgrade(this.game[this.team].team));
		}
		this.$.team.setContent(this.game[this.team].team[0]);
		//this.$.seed.setContent(this.game[this.team].seed);
		//console.log(this.game[this.team].user);
		
		this.$.user.setUsers(_t.users);
		this.$.user.setUser(this.game[this.team].user);
		this.$.userName.setContent(_t.users[this.game[this.team].user].name);
		
		this.setScore(this.game[this.team].score);
		
		
		try{
			this.$[this.logo].setSrc(logos[test(this.game[this.team])][this.game[this.team].seed - 1]);
		}catch(e){console.log(e.message);this.$[this.logo].setSrc("")}
		
		this.refreshLayout();
		this.$.user.refresh();
		//console.log(this.game[this.team], test(this.game[this.team]))
		
	},
	minus: function(inSender, inEvent){
		if(this.disabled)return;
		if(this.score > 0)
			this.score--;
		this.setScore(this.score--);
	},
	plus: function(inSender, inEvent){
		if(this.disabled || this.score > 999)return;
		this.score++;
		this.setScore(this.score++);
	},
	increase: function(inSender, inEvent){
		if(!inSender && !moving){return}
		if(this.disabled || this.score > 999)return;
		this.score++;
		this.setScore(this.score++);
		window.setTimeout(this.increase.bind(this), 35);
		moving = true;
	},
	decrease: function(inSender, inEvent){
		if(!inSender && !moving){return}
		if(this.disabled)return;
		if(this.score > 0)
			this.score--;
		this.setScore(this.score--);
		window.setTimeout(this.decrease.bind(this), 35);
		moving = true;
	},
	stop: function(inSender, inEvent){
		moving = false;
	},
	scoreChanged: function(oldScore){
		this.$.score.setContent(this.score);
		this.$.score.addRemoveClass("digitTwo", (this.score > 9));
		this.$.score.addRemoveClass("digitThree", (this.score > 99));
	}
});