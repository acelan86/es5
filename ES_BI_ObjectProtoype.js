function ES_BI_ObjectPrototype() {
	this.__Prototype__ = null;
	this.__Class__ = 'Object';
	this.__Extensible__ = true;
};

ES_BI_ObjectPrototype.constructor = ES_C_Object;

ES_BI_ObjectPrototype.toString = function () {

};

ES_BI_ObjectPrototype.toLocalString = function () {

};

ES_BI_ObjectPrototype.valueOf = function () {

};

ES_BI_ObjectPrototype.hasOwnProperty = function (v) {
	var p = ES_Global.toString(v),
		o = ES_Global.toObject(this),
		desc = o.__GetOwnProperty__(p);
	return desc !== undefined;
};

ES_BI_ObjectPrototype.isPrototypeOf = function(v) {

};
ES_BI_ObjectPrototype.propertyIsEnumerable = function (v) {

};