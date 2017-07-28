enyo.kind({
	name: "Info",
	kind: "onyx.Popup",
	layoutKind: "FittableRowsLayout",
	classes: "enyo-fit",
	style: "width: 125px; height: 30px; position: fixed; padding: 40px; z-index: 2;",
	centered: true,
	modal: true,
	floating: true,
	autoDismiss: false,
	published: {
		message: "please wait...",
		timeout: 5000
	},
	components: [
		{ name: "message", fit: true, classes: "info" }
	],
	create: function() {
		this.inherited(arguments);
		this.messageChanged();
		this._timeout = setTimeout(this.remove.bind(this), this.timeout);
	},
	timeoutChanged: function(oldTimeout){
		clearTimeout(this._timeout);
		this._timeout = setTimeout(this.remove.bind(this), this.timeout);
	},
	messageChanged: function(oldMessage) {
		this.$.message.setContent(this.message);
	},
	remove: function(inSender, inEvent) {
		clearTimeout(this._timeout);
		this.destroy();
	}
});

function info(message, context, callback) {
	var _info = context.createComponent(new Info());
	_info.setMessage(message);
	_info.setOwner(context);
	_info.setShowing(true);
	setTimeout(callback.bind(context), 100, context);
	return _info;
}