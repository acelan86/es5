function ES_C_Function(p1, p2, ..., pn, body) {
	this.__Class__ = 'Function';
	this.__Prototype__ = ES_BI_FunctionPrototype;
	this.__Extensible__ = true;

}

ES_C_Function.prototype = ES_BI_FunctionPrototype;

ES_C_Function.length = 1;