enyo.kind({
	name: "userPicker",
	published: {
		user: "user1",
		users: {},
		auto: true
	},
	events: {
		onSetUser: ""
	},
	components: [
		{ name: "user", ontap: "changeUser", showing: false, classes: "picker" },
		{ name: "chooseUser", kind: "onyx.Popup", centered: true, modal: true, floating: true, classes: "enyo-fit",
		style: "width: 150px; height: 120px; position: fixed; padding: 40px;", components: [
			{ kind: "Scroller", fit: true, components: [
				
				{ layoutKind: "FittableColumnsLayout", components: [
					{ content: "Choose user -", style: "margin-right: 6px;" },
					{ name: "team" },
				]},
				{ tag: "br" },
				{ name: "userList", kind: "List", rows: 2, rowsPerPage: 2, onSetupRow: "loadUsers", components: [
					{ layoutKind: "FittableColumnsLayout", components: [
						{ name: "pickColor", kind: "colorPicker", disabled: true, ontap: "choose" },
						{ name: "pickUser", ontap: "choose" }
					]}
				]}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		if(this.auto)this.userChanged();
		else this.$.user.setShowing(true)
	},
	userChanged: function(oldUser){
		if(this.auto){if(typeof(_gameOn)=="undefined"){return}
		this.setUsers(_gameOn.$.generator.users)}
		this.$.user.applyStyle("background-color", this.users[this.user].color);
		this.doSetUser();
		
		if ( this.owner.name != "bracket" && this.owner.hasTeam && this.owner.hasTeam() ) {
			this.owner.container.applyStyle("background-color", this.users[this.user].color);
			//this.owner.applyStyle("border-color", this.users[this.user].color);
		}
	},
	changeUser: function(inSender, inEvent){
		if(!this.auto){return}
		
		this.$.chooseUser.setShowing(true);
		this.$.userList.render();
		this.doSetUser(this.users[this.user], true);
		
		var that = this;
		setTimeout(function(that){
			var insert;
			try {
				insert = _t[_t.sides[that.owner.side]].seeds[_t[_t.sides[that.owner.side]].seed - 1][0];
			} catch (e){
				insert = that.owner.game[that.owner.team].team[0];
			}
			that.$.team.setContent(insert);
		}, 0, that);
	},
	choose: function(inSender, inEvent){
		if(this.auto){this.setUsers(_gameOn.$.generator.users);}
		this.setUser("user" + (inEvent.rowIndex + 1));
		this.$.chooseUser.setShowing(false);
	},
	loadUsers: function(inSender, inEvent){
		var user = this.users["user" + (inEvent.index+1)];
		this.$.pickColor.setColor(user.color);
		this.$.pickUser.setContent(user.name);
	},
	refresh: function(){
		//this.$.userList.setRows(_gameOn.$.gen.users.length);
		this.userChanged();
	}
});