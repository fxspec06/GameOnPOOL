/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "adduser",
	kind: "onyx.Popup",
	classes: "enyo-fit",
	style: "width: 350px; height: 450px; position: fixed; padding: 40px; z-index: 2;",
	
	
	/*autoDismiss: false,
	floating: true,*/
	
	published: {
		abbreviation: "",
		first: "",
		last: "",
		userList: []
	},
	events: {
		onAdd: "",
		onCancel: ""
	},
	components: [
		{ layoutKind: "FittableRowsLayout", style: "padding: 15px;", fit: true, components: [
			{ kind: "onyx.GroupboxHeader", content: "Add User"},
			
			{ kind: "onyx.RadioGroup", ontap: "switch", components: [
				{ name: "manualRadio", kind: "onyx.RadioButton", active: true, content: "Manual" },
				{ name: "selectRadio", kind: "onyx.RadioButton", content: "Select" }
			]},
			{ name: "box", kind: "FittableRows", components: [
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
				{ name: "selectBox", tag: "select" }
				
			]}
		]},
		{ kind: "onyx.Button", content: "Confirm", ontap: "add", classes: "onyx-affirmative" },
		{ kind: "onyx.Button", content: "Cancel", ontap: "cancel", classes: "onyx-negative"}
	],
	create: function(){
		this.inherited(arguments);
	},
	refresh: function(teams) {
		//console.log("TEAMS: ", teams);
		this.teams = teams;
		this.$.selectBox.destroyComponents();
		for (var t in teams) 
			this.$.selectBox.createComponent({ 
				tag: "option", 
				content: teams[t], 
				value: t,
				style: "height: 20px;"
			});
		this.$.selectBox.render();
	},
	switch: function(inSender, inEvent) {
		//console.log("rAdio", inSender, inEvent);
		switch (inEvent.originator.content) {
			case "Manual":
				this.$.manualBox.setShowing(true);
				this.$.selectBox.setShowing(false);
				break;
			case "Select":
				this.$.manualBox.setShowing(false);
				this.$.selectBox.setShowing(true);
				
				break;
		}
	},
	add: function(inSender, inEvent) {
		var newUser = "";
		if (this.$.manualRadio.active == true) {
			newUser = [ this.getAbbreviation(), this.getFirst(), this.getLast() ];
			//console.log("newUser", this.$.abbreviation, this.$.first, this.$.last);
		} else {
			//console.log(document.getElementById(this.$.selectBox.id).selectedIndex, "trying");
			newUser = this.teams[document.getElementById(this.$.selectBox.id).selectedIndex];
		}
		this.doAdd(newUser);
		this.cancel();
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