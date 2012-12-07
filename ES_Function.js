/**
 * 函数对象定义
 */
function ES_Function(o) {
	this.__PrimitiveValue__;
	this.__Call__;
	this.__Scope__;
	this.__Code__;
	this.__TargetFunction__;
	this.__BoundThis__;
	this.__BoundArguments__;
	this.__ParameterMap__;
	this.__FormalParameters__;
}

ES_Function.prototype = {
	__Construct__ : function (args) {
		return Object;
	},
	__HasInstance__ : function (any) {
		return Boolean;
	},
	__Match__ : function (string, index) {
		return Match;
	}
};