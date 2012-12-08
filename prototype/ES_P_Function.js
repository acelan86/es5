function ES_P_Function() {
	this.__Class__ = 'Function';
	this.__Prototype__ = ES_BI_ObjectPrototype;
	this.__Extensible__ = true;
	return undefined;
}

ES_P_Function.length = 0;

ES_P_Function.constructor = ES_C_Function;

ES_P_Function.toString = function () {

};

ES_P_Function.apply = function (thisArg, argArray) {

};
