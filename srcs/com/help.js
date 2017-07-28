/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "help",
	kind: "onyx.Slideable",
	layoutKind: "FittableRowsLayout",
	//draggable: false,
	min: -100,
	max: 0,
	value: 0,
	unit: "%",
	classes: "enyo-fit",
	style: "width: 600px; background-color: #333333; border-right: 2px ridge black; position: fixed; z-index: 2;",
	published: {
		
	},
	events: {
		
	},
	components: [
		{ kind: "onyx.Toolbar", style: "height: 58px;", components: [
			//{ kind: "onyx.IconButton", src: "img/icons/button_left.png", classes: "onyx-icon-lg", ontap: "goLeft", style: "float: left" },
			{ name: "toolText", style: "float: left;" },
			{ kind: "onyx.RadioGroup", ontap: "change", style: "float: right;", components: [
				{ content: "Tips", active: true },
				{ content: "FAQ" },
				{ content: "Support" }
			]}
			//{ kind: "onyx.IconButton", src: "img/icons/button_right.png", classes: "onyx-icon-lg", ontap: "goRight", style: "float: right" },
		]},
		{ kind: "Scroller", layoutKind: "FittableRowsLayout", style: "padding: 20px;", thumb: false, horizontal: "auto", fit: true, components: [
			{ name: "sections", components: [
				{ kind: "tips" },
				{ kind: "faq", showing: false },
				{ kind: "support", showing: false }
			]}
		]},
		{ kind: "onyx.Toolbar", style: "height: 58px;bottom:0px;", components: [
			{ kind: "onyx.Button", content: "Close", ontap: "close" },
			
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.$.toolText.setContent("Help");
	},
	hideAll: function(){
		var components = this.$.sections.children;
		
		for(var c in components){
			components[c].setShowing(false);
		}
	},
	change: function(inSender, inEvent){
		var selected = inSender.active.content.toLowerCase();
		
		this.hideAll();
		
		this.$[selected].setShowing(true);
		
	},
	close: function(inSender, inEvent){
		this.$.animator.play();
		
		if(this.value != this.min)
			this.animateToMin();
	},
	open: function(inSender, inEvent){
		this.$.animator.play();
		
		if(this.value != this.max)
			this.animateToMax();
	}
});

/*

{ name: "save", kind: "onyx.IconButton", src: "img/icons/menu-icon-save.png", ontap: "initiateSave", style: "float:right", showing: false },
{ name: "create", kind: "onyx.IconButton", src: "img/icons/menu-icon-new.png", ontap: "createTournament", style: "float:right" },
{ name: "load", kind: "onyx.IconButton", src: "img/icons/menu-icon-search.png", ontap: "loadTournament", style: "float:right" },
{ name: "helpIcon", kind: "onyx.IconButton", src: "img/icons/menu-icon-help.png", ontap: "displayHelp", style: "float:right" },
{ name: "statIcon", kind: "onyx.IconButton", src: "img/icons/icon-accounts.png", ontap: "showStats", style: "float:right"}

*/
enyo.kind({
	name: "tips",
	components: [
		{ tag: "ul", components: [
			{ tag: "li", allowHtml: true, content: "To create a new tournament, press <img src='img/icons/menu-icon-new.png' style='max-height: 40px; overflow: hidden;' /> icon in the top right corner of the screen." },
			{ tag: "li", allowHtml: true, content: "To edit teams, press <span class='onyx-blue'>blue button</span> on the tournament screen."},
			{ tag: "li", allowHtml: true, content: "To copy a player, press <img src='img/icons/menu-icon-newcard.png' style='max-height: 40px; overflow: hidden;' /> to delete a player, press <img src='img/icons/toolbar-icon-multi-delete.png' style='max-height: 40px; overflow: hidden;' />."},
			{ tag: "li", content: "To re-order seeds, tap on a seed to select it and then tap on another seed to change its position." },
			{ tag: "li", content: "To change the user for a seed, tap and hold on the seed; you will then see a user selection box." },
			{ tag: "li", content: "Use the bottom toolbar to scroll horizontally." },
			{ tag: "li", content: "Tap and hold on the tournament name from the tournament screen to change the tournament name!" },
			{ tag: "li", content: "Tap and hold on either user from the tournament screen to change the name of a user!" },
			{ tag: "li", content: "You can view old tournaments! Easily see which tournaments are complete by checking for the lock icon on the loading screen!" },
			{ tag: "li", content: "View quick snapshots of your tournaments by clicking the 'i' button from the loading screen." },
			{ tag: "li", content: "Make sure you have at least 4 players before starting to create your tournament!" }
		]}
	],
	create: function(){
		this.inherited(arguments);
	}
});
enyo.kind({
	name: "support",
	components: [
		{ content: "If you are having trouble with the app, if you have a question, if you would like to report a bug, or if you have a suggestion or feature request, please " + 
			"contact via one of the following methods:" },
		{ tag: "dl", components: [
			{ tag: "dt", content: "Email" },
			{ tag: "dd", allowHtml: true, content: "<a href='mailto:fxspec06@gmail.com'>fxspec06@gmail.com</a>" },
			{ tag: "dd", allowHtml: true, content: "<a href='mailto:bshado@charter.net'>bshado@charter.net</a>" },
			{ tag: "dt", content: "Twitter" },
			{ tag: "dd", allowHtml: true, content: "<a target='_new' href='http://www.twitter.com/fxspec06'>fxspec06</a>" },
		]},
		{ content: "For more information about Enyo and the EnyoJS HTML framework, be sure to check out:" },
		{ tag: "ul", components: [
			{ tag: "li", allowHtml: true, content: "<a target='_new' href='http://www.enyojs.com/'>EnyoJS</a>" },
			{ tag: "li", allowHtml: true, content: "<a target='_new' href='http://www.twitter.com/enyojs'>@EnyoJS</a>" },
			{ tag: "li", allowHtml: true, content: "<a target='_new' href='http://www.openwebosproject.org/index.html'>Open webOS</a>" },
		]},
	],
	create: function(){
		this.inherited(arguments);
	}
});
enyo.kind({
	name: "faq",
	components: [
		{ tag: "dl", components: [
			{ tag: "dt", content: "Q: Why can't I load anything?" },
			{ tag: "dd", content: "A: In order to load a tournament, you first need to create a tournament. Press the plus button in the top right corner of the screen to create a new virtual tournament." },
			{ tag: "dt", content: "Q: I thought I created a tournament, but I don't see anything to load. I tapped the word 'LOAD' but still nothing happens." },
			{ tag: "dd", content: "A: In order to actually create your tournament, you first must tap on the green 'CREATE' button from the tournament creation screen." },
			{ tag: "dt", content: "Q: What do I do in the users area?" },
			{ tag: "dd", content: "A: Type the user's name, and select their colour."},
			{ tag: "dt", content: "Q: The app does not allow side-scrolling. I see there are more columns available, how can I get to them?!" },
			{ tag: "dd", content: "A: The app DOES, in fact, allow for side-scrolling. The bottom toolbar is used to scroll horizontally. Tap anywhere on the bar to scroll to that point horizontally." },
			{ tag: "dt", content: "Q: When I try to create my tournament, Why do I see the message 'Cannot create tournament with empty users?'" },
			{ tag: "dd", content: "A: In order to create your virtual tournament, it is required that two users face each other. Therefore it would be extremely counter-intuitive to allow tournament"
				 + " creation without having users' names entered. Please enter names for User 1 and User 2 before creating your tournament." },
			
			{ tag: "dt", content: "Q: I've been playing with this app for hours, but I still can't quite figure out what exactly it does?" },
			{ tag: "dd", allowHtml: true, content: "A: This is a <b>virtual pool tournament app</b>. It allows you to " + 
				"create a tournament in which people play against each other, in real life, using a pool table, pool balls, and pool sticks." + 
				"The user creates a new tournament, and then plays the games on an actual pool table against their real-life " + 
				"opponent. After each game is complete, the user enters their scores and continues playing until all games are finished. " + 
				"Afterwards, the app serves as a stats central for all previous tournaments and matchups the users have faced against each other." },
			{ tag: "dt", content: "Q: If I select 5 games in the first round, I cannot select 3 or 1 game for any round afterwards?" },
			{ tag: "dd", content: "A: Yes. This is because for playoff / tournament formats, you would never play less games in a deeper round." },
			{ tag: "dt", content: "Q: Why do I see the words 'GAME TIED! CANNOT SAVE GAME.' ?" },
			{ tag: "dd", content: "A: This is because the scores for the game are tied. If two teams are playing each other in a game, the game cannot end when the scores "
				+ " for both teams are the same. Nobody would ever win, and the tournament would be pointless." },
			{ tag: "dt", content: "Q: How do I exit the game screen without playing the game?" },
			{ tag: "dd", content: "A: Press the close button." },
			{ tag: "dt", content: "Q: After I've finished the first round, I try to play the next game but am presented with a message 'A USER CANNOT FACE THEMSELVES. PLEASE CHANGE THE USER FOR ONE OF THE TEAMS.'? " },
			{ tag: "dd", content: "A: In tournaments, typically two people will play each other in games. It would be impossible for one person to play as both teams in a pool game. " + 
				"Because of this, my app forces to choose a different user for one of the two teams if by some chance two teams controlled by the same user end up facing each other. " + 
				"To change a user, simply tap on the coloured circle next to the user's name and select the opposite user for that team. That user will then control that" + 
				"team throughout the remainder of their playoff run." },
		]}
	],
	create: function(){
		this.inherited(arguments);
	}
});