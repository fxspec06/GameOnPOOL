/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "load",
	published: {
		tournaments: '[]',
		selected: -1
	},
	events: {
		onLoad: "",
		onRemove: ""
	},
	components: [
		{ kind: "FittableColumns", classes: "enyo-fit", components: [
			{ kind: "onyx.Groupbox", layoutKind: "FittableRowsLayout", classes: "teamList", fit: true, components: [
				{ content: "Load", classes: "header" },
				{ kind: "Scroller", fit: true, components: [
					{ name: "tournaments", kind: "List", rows: 15, rowsPerPage: 100, classes: "enyo-fit list",  onSetupRow: "load", components: [
						{ name: "item", classes: "item loader ", ontap: "select", components: [
							{ name: "name" },
							{ name: "lock", kind: "onyx.Icon", src: "img/icons/secure-lock.png" },
							{ name: "tools", style: "float:right;", components: [
								{ name: "delete", kind: "onyx.IconButton", src: "img/icons/toolbar-icon-multi-delete.png", ontap: "remove", style: "margin-right: 16px;" },
								{ name: "info", kind: "onyx.IconButton", src: "img/icons/menu-icon-info.png", ontap: "infobox", style: "margin-right: 16px;" },
								//menu-icon-info
								//{ name: "down", kind: "onyx.IconButton", src: "img/icons/menu-icon-down.png", ontap: "movedown" },
								//{ name: "up", kind: "onyx.IconButton", src: "img/icons/menu-icon-up.png", ontap: "moveup" },
								{ name: "load", kind: "onyx.IconButton", src: "img/icons/toaster-icon-downloads.png", ontap: "tapped" },
							]}
						]},
						
					]}
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.tournamentsChanged();
	},
	activate: function(args){
		console.log("AUTO-LOADING...")
		this.tapped(this, { index: args });
	},
	select: function(inSender, inEvent){
		this.selected = this.selected == inEvent.index ? null : inEvent.index;
		this.$.tournaments.renderRow(inEvent.index);
//		inSender.render();
	},
	tournamentsChanged: function(oldTournaments){
		this.tournaments = JSON.parse(this.tournaments);
		console.log("Loading...", this.tournaments);
		for(var i in this.tournaments){
			if(this.tournaments[i] == null){
				this.doRemove(i);
			}
		}
		this.$.tournaments.setRows(this.tournaments.length);
		this.$.tournaments.render();
	},
	load: function(inSender, inEvent){
		var index = inEvent.index;
		//this.$.item.applyStyle("opacity", this.selected != index ? 0.8 : null);
		this.$.item.addRemoveClass("loader-selected", this.selected == index );
		//this.$.tools.setShowing(this.selected == index);
		try {
			_t = this.tournaments[index];
			
			if ( _t.status == "Complete" && typeof _t.winner == "string" ) {
				_t.winner = upgrade(_t.winner);
			}
			
		    this.$.name.setContent(
		    		_t.left.sport
		    	+ " -- " + _t.name
		    	+ " -- " + _t.created
		    	+ " -- " + _t.status + ( _t.status == "Complete" ? " -- Winner: " + _t.winner[1] : "" )
		    	+ " -- " + _t.users.user1.name + " vs. " + _t.users.user2.name
		    	
		    );
		    
		    this.$.lock.setShowing(_t.status == "Complete" );
		    
		    if(index == this.$.tournaments.rows - 1){
		    	//this.$.item.applyStyle("border-bottom","1px solid silver");
		    	//this.$.item.applyStyle("-webkit-border-radius","15px");
		    } else {
		    	this.$.item.applyStyle("border-bottom", null);
		    	this.$.item.applyStyle("-webkit-border-radius",null);
		    }
	    } catch (e) {
	    	console.log(e);
	    	console.log(e.message);
	    }
	},
	tapped: function(inSender, inEvent){
		if(this.selected != inEvent.index){
			this.selected = inEvent.index;
			return;
		}
		var _info = info("loading...", this, function(context){
			context.doLoad(JSON.stringify(context.tournaments[inEvent.index]));
			_info.remove();
			context.selected = -1;
		});
		this.selected = -1;
	},
	infobox: function(inSender, inEvent){
		if(this.selected != inEvent.index){
			this.selected = inEvent.index;
			return;
		}
		
		_t = this.tournaments[inEvent.index];
		
		var infoString = "<table>";
		
		infoString += "<tr><td>Name:</td><td>" + _t.name + "</td></tr>";
		
		infoString += "<tr><td>User 1:</td><td>" + _t.users.user1.name + "</td><td>Wins:</td><td>" + calculateWins("user1", _t.matchups) + "</td></tr>";
		
		infoString += "<tr><td>User 2:</td><td>" + _t.users.user2.name + "</td><td>Wins:</td><td>" + calculateWins("user2", _t.matchups) + "</td></tr>";
		
		//infoString += "</br>" + 
		
		infoString += "<tr><td>Created:</td><td>" + _t.created + "</td></tr>";
		infoString += "<tr><td>Modified:</td><td>" + _t.modified + "</td></tr>";
		infoString += "<tr><td>Status:</td><td>" + _t.status + "</td></tr>";
		
		if(_t.status == "Complete"){
			infoString += "<tr><td>Winner:</td><td>" + _t.winner[2] + " " + _t.winner[1] + " (" + _t.users[_t.matchups.finals.finals[0][_t.matchups.finals.finals[0].winner].user].name + ")" + "</td></tr>";
		} else {
			infoString += "<tr><td>Round:</td><td>" + _t.round + "</td></tr>";
			infoString += "<tr><td>Finished:</td><td>" + _t.matchupsFinished + " / " + _t.numMatchups + "</td></tr>";
		}
		
		infoString += "</table>";
		
		var _alert = alert( infoString, this, {
			allowHtml: true,
			onCancel: function(inContext){ inContext.tapped(inSender, inEvent) },
			confirmText: "CONTINUE",
			cancelText: "LOAD",
			modal: true
		});
		
		this.selected = -1;
	},
	remove: function(inSender, inEvent){
		if(this.selected != inEvent.index){
			this.selected = inEvent.index;
			return;
		}
		var _alert = alert( "Delete tournament?", this, {
			onCancel: function(context){ context.selected = -1; context.doRemove(inEvent.index) },
			confirmText: "NO",
			cancelText: "YES"
		});
		this.selected = -1;
	}
});