function ES_BI_FunctionPrototype() {
	this.__Class__ = 'Function';
	this.__Prototype__ = ES_BI_ObjectPrototype;
	this.__Extensible__ = true;
	return undefined;
}

ES_BI_FunctionPrototype.length = 0;

ES_BI_FunctionPrototype.constructor = ES_C_Function;

ES_BI_FunctionPrototype.toString = function () {

};

ES_BI_FunctionPrototype.apply = function (thisArg, argArray) {

};
