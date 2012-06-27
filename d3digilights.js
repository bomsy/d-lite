function DigiLights(config){
	this.configuration = null;
	this.setConfiguration(config);
};
DigiLights.color = {
	SINGLE: 0,
	MULTIPLE:1,
}
DigiLights.prototype = {
	setConfiguration : function(config){
		this.configuration = {
			text: typeof config.displayText !== "undefined" ? config.displayText : "00:00:00",

		}
	},

};