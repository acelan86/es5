function ES_P_Object() {
	this.__Prototype__ = null;
	this.__Class__ = 'Object';
	this.__Extensible__ = true;
};

ES_P_Object.constructor = ES_C_Object;

ES_P_Object.toString = function () {

};

ES_P_Object.toLocalString = function () {

};

ES_P_Object.valueOf = function () {

};

ES_P_Object.hasOwnProperty = function (v) {
	var p = ES_Global.toString(v),
		o = ES_Global.toObject(this),
		desc = o.__GetOwnProperty__(p);
	return desc !== undefined;
};

ES_P_Object.isPrototypeOf = function(v) {

};
ES_P_Object.propertyIsEnumerable = function (v) {

};