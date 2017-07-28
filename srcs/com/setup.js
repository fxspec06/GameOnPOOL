/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "setup",
	kind: "onyx.Groupbox",
	classes: "center",
	style: "width: 300px",
	published: {
		reset: true,
		autoReset: false
	},
	events: {
		onGenerate: "",
		onColorChange: "",
		onSportTap: "",
		onUserChange: "",
		onRandomize: "",
		onEditTeams: ""
	},
	components: [
		{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Setup Tournament" },
		
		/*
		 * center setup pane
		 */
		{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Title" },
		
		{ kind: "onyx.InputDecorator", components: [
		    { name: "tournament", kind: "onyx.Input", placeholder: "Title" }
		]},
		{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Sport" },
		{ name: "sport", kind: "onyx.RadioGroup", ontap: "sportTap", components: [
		   /* { content: "NHL", active: true},
		    { content: "NBA"},
		    { content: "MLB"},
			{ content: "NFL"},*/
			{ content: "POOL", active: true}
		]},
		{ name: "editButton", kind: "onyx.Button", style: "width: 100%", content: "Edit Teams", classes: "onyx-blue", ontap: "doEditTeams"},
		{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Users" },
		{ kind: "onyx.InputDecorator", components: [
		    { name: "user1", kind: "onyx.Input", placeholder: "User 1", onchange: "doUserChange" },
			{ name: "user1color", kind: "colorPicker", onColorChanged: "doColorChange", color: "blue" }
		]},
		{ kind: "onyx.InputDecorator", components: [
		    { name: "user2", kind: "onyx.Input", placeholder: "User 2", onchange: "doUserChange" },
			{ name: "user2color", kind: "colorPicker", onColorChanged: "doColorChange", color: "black" }
		]},
		{ kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Number of games" },
		{ name: "round1_title", kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Round 1:" },
		{ name: "round1", kind: "onyx.RadioGroup", ontap: "renderButtons", components: [
		    { content: "1", active: true},
		    { content: "3"},
		    { content: "5"},
			{ content: "7"}
		]},
		{ name: "round2_title", kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Round 2:" },
		{ name: "round2", kind: "onyx.RadioGroup", ontap: "renderButtons", components: [
		    { content: "1", active: true},
		    { content: "3"},
		    { content: "5"},
			{ content: "7"}
		]},
		{ name: "round3_title", kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Round 3:" },
		{ name: "round3", kind: "onyx.RadioGroup", ontap: "renderButtons", components: [
		    { content: "1", active: true},
		    { content: "3"},
		    { content: "5"},
			{ content: "7"}
		]},
		{ name: "finals_title", kind: "onyx.GroupboxHeader", style: "background-color:black", content: "Finals:" },
		{ name: "finals", kind: "onyx.RadioGroup", ontap: "renderButtons", components: [
		    { content: "1", active: true},
		    { content: "3"},
		    { content: "5"},
			{ content: "7"}
		]},
		
		
		/*
		 * end of center setup pane
		 */
		{ components: [
			{ kind: onyx.Button, content: "RANDOM", classes: "onyx-negative", ontap: "doRandomize", style: "width:100%;" },
			{tag: "br"},
			{ kind: onyx.Button, content: "CREATE", classes: "onyx-affirmative", ontap: "doGenerate", style: "width:100%;" }
		]}
	],
	create: function(){
		this.inherited(arguments);
	},
	reactivateEdit: function() {
		this.$.editButton.setDisabled(false);
	},
	deactivateEdit: function() {
		this.$.editButton.setDisabled(true);
	},
	renderButtons: function(inSender, inEvent){
		var isPool = (this.$.sport.active.content != "POOL");
		this.$.round1_title.setShowing(isPool);
		this.$.round1.setShowing(isPool);
		
		if(this.$.sport.active.content == "NFL")return;
		var arrays = ["round1","round2","round3","finals"];
		for(var x = 0; x < arrays.length; x++){
			var opt = arrays[x];
			var com = this.$[opt];
			var act = parseInt(com.active.content);
			
			var enable = [1, 3, 5, 7];
			var min;
			
			if(x!=0){
				var lopt = arrays[x-1];
				var lcom = this.$[lopt];
				var lact = parseInt(lcom.active.content);
				
				for (var pos = 0; pos < enable.length; pos++){
					if (enable[pos] == lact){min = pos; break}
				}
				enable.splice(0, min);
			}
			
			while (com.getControls().length){
				com.getControls()[0].destroy();
			}
			com.render();
			
			var next = 0;
			for (var pos = 0; pos < enable.length; pos++){
				if (enable[pos] == act){next = pos; break}
			}
			
			for(var i = 0; i < enable.length; i++){
				com.createComponent( { content: enable[i], active: (next == i) } );
			}
			
			com.render();
		}
	},
	sportTap: function(inSender, inEvent){
		console.log("SPORT TAPPED.")
		this.doSportTap(inSender, inSender);
		this.rounds = this.owner.sports[this.owner.sport].rounds;
		
		if(inSender.active.content == "NFL"){
			console.log("NFL!!", this.$.round1);
			var arrays = ["round1","round2","round3","finals"];
			for(var x = 0; x < arrays.length; x++){
				var opt = arrays[x];
				var com = this.$[opt];
				
				while (com.getControls().length){
					com.getControls()[0].destroy();
				}
				com.render();
				com.createComponents([
					{ content: "1", active: true},
				    //{ content: "3"},
				    //{ content: "5"},
					//{ content: "7"}
				]);
				com.setShowing(x < this.rounds.length);
				com.render();
				this.$[opt + "_title"].setContent(this.rounds[x].name);
			}
			this.reset = true;
		} else if (this.reset){
			var arrays = ["round1","round2","round3","finals"];
			for(var x = 0; x < arrays.length; x++){
				var opt = arrays[x];
				var com = this.$[opt];
				
				while (com.getControls().length){
					com.getControls()[0].destroy();
				}
				com.render();
				com.createComponents([
					{ content: "1", active: (this.rounds[x].games == 1) },
				    { content: "3", active: (this.rounds[x].games == 3) },
				    { content: "5", active: (this.rounds[x].games == 5) },
					{ content: "7", active: (this.rounds[x].games == 7) }
				]);
				com.setShowing(x < this.rounds.length);
				com.render();
				this.$[opt + "_title"].setContent(this.rounds[x].name);
			}
			this.renderButtons();
			if(this.autoReset)
				this.reset = false;
		}
		
	},
	randomize: function(inSender, inEvent){
		
	}
});
