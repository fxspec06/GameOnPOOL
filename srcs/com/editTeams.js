/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "editTeams",
	kind: "onyx.Popup",
	classes: "enyo-fit",
	style: "width: 700px; height: 450px; position: fixed; padding: 40px; z-index: 2;",
	
	
	/*autoDismiss: false,
	floating: true,*/
	
	published: {
		abbreviation: "",
		first: "",
		last: "",
		userList: []
	},
	events: {
		onSaveTeams: "",
		onCancel: ""
	},
	components: [
		{ kind: "FittableRows", classes: "enyo-fit", components: [
			{ kind: "FittableColumns", style: "padding: 15px;", classes: "enyo-fit",components: [
				{ kind: "FittableRows", components: [
					{ name: "box", fit: true, kind: "FittableRows", style: "text-align: center;", components: [
						{ kind: "onyx.GroupboxHeader", content: "Add New", style: "margin-top: 20px;" },
						{ name: "manualBox", showing: true, components: [	
							{content: "3 letter abbreviation"},
							{ kind: "onyx.InputDecorator", components: [
							    { name: "abbreviation", kind: "onyx.Input", placeholder: "ABB", oninput: "abbChanged"}
							]},
							{content: "First name"},
							{ kind: "onyx.InputDecorator", components: [
							    { name: "first", kind: "onyx.Input", placeholder: "FIR", oninput: "firstChanged"}
							]},
							{content: "Last name"},
							{ kind: "onyx.InputDecorator", components: [
							    { name: "last", kind: "onyx.Input", placeholder: "LAS", oninput: "lastChanged"}
							]}
						]},
						{ kind: "onyx.Button", content: "Add ->", ontap: "add", classes: "onyx-affirmative" },
						{ fit: true },
						{ kind: "onyx.Button", content: "Save", ontap: "save", classes: "onyx-affirmative" },
						{ kind: "onyx.Button", content: "Cancel", ontap: "cancel", classes: "onyx-negative"}
					]}
				]},
				{ kind: "Scroller", fit: true, layoutKind: "FittableRowsLayout", components: [
					{ kind: "onyx.GroupboxHeader", content: "Current Teams"},
					{ name: "box2", components: [
						{ name: "teamList", kind: "List", classes: "enyo-fit", rowsPerPage: 15, onSetupRow: "setupRow", components: [
							{ name: "team", classes: "item ",  kind: "FittableColumns", components: [
								{ name: "name", style: "margin-left: 16px;" },
								{ name: "delete", kind: "onyx.IconButton", src: "img/icons/toolbar-icon-multi-delete.png", ontap: "remove", style: "float: right; margin-right: 16px;" },
								{ name: "copy", kind: "onyx.IconButton", src: "img/icons/menu-icon-newcard.png", ontap: "copy", style: "float: right; margin-right: 16px;" },
							]}
						]}
					]}
				]}
			]}
		]},
	],
	create: function(){
		this.inherited(arguments);
	},
	copy: function(inSender, inEvent) {
		//console.log("Copy...", inSender, inEvent);
		var index = inEvent.rowIndex;
		
		this.teams.HOME.push(this.teams.HOME[index]);
		this.teams.AWAY.push(this.teams.AWAY[index])
		this.refresh();
	},
	remove: function(inSender, inEvent) {
		//console.log("Delete...", inSender, inEvent);
		var index = inEvent.rowIndex;
		
		this.teams.HOME.splice(index, 1);
		this.teams.AWAY.splice(index, 1);
		
		this.refresh();
	},
	edit: function(teams) {
		this.teams = teams;
		this.refresh();
	},
	save: function(inSender, inEvent) {
		this.doSaveTeams(inSender, this.teams);
		this.cancel();
	},
	refresh: function() {
	
		for (var t in this.teams.HOME) {
			if (this.teams.HOME[t][0] == "ADD") this.teams.HOME.splice(t, 1);
		}
		for (var t in this.teams.HOME) {
			if (this.teams.AWAY[t][0] == "ADD") this.teams.AWAY.splice(t, 1);
		}
		this.$.teamList.setRows(this.teams.HOME.length);
		
		this.$.teamList.render();
	},
	abbChanged: function(inSender, inEvent) {
		this.abbreviation = inSender.content;
	},
	firstChanged: function(inSender, inEvent) {
		this.first = inSender.content;
	},
	lastChanged: function(inSender, inEvent) {
		this.last = inSender.content;
	},
	add: function(inSender, inEvent) {
		this.teams.HOME.push([this.abbreviation, this.first, this.last]);
		this.teams.AWAY.push([this.abbreviation, this.first, this.last]);
		console.log(this.teams);
		this.refresh();
	},
	setupRow: function(inSender, inEvent) {
		var index = inEvent.index;
		var team = this.teams.HOME[index];
		//console.log(index, team);
		this.$.name.setContent(team[0] + ": " + team[1] + " " + team[2]);
	},
	cancel: function(inSender, inEvent) {
		this.$.abbreviation.setValue("");
		this.$.first.setValue("");
		this.$.last.setValue("");
		this.setShowing(false);
	},
	abbChanged: function(inSender, inEvent) {
		if (inEvent!= null) this.setAbbreviation(inEvent.srcElement.value);
	},
	firstChanged: function(inSender, inEvent) {
		if (inEvent!= null) this.setFirst(inEvent.srcElement.value);
	},
	lastChanged: function(inSender, inEvent) {
		if (inEvent!= null) this.setLast(inEvent.srcElement.value);
	}
});