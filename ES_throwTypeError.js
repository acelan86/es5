var ES_throwTypeError = (function () {
	var f = new ES_Object({
		__Class__ : "Function",
		__Prototype__ : ES_functionPrototype,
		__Extensible__ : false
	});

	f.__Call__ = function (thiz, args) {
        var funcCtx = ES_createExecuteContext(this.__FormalParameters__, args, thiz);
        ES_control.enter(funcCtx);
        var result = ES_control.excute(f.__Code__);
        ES_control.quit();
        //退出执行环境
        if (ES_Global.isThrowCode(result.type)) {
            throw result.type;
        }
        if (ES_Global.isReturnCode(result.type)) {
            return result.type;
        }
        return undefined;
    };
    f.__Scope__ = ES_globalEC;
    f.__FormalParameters__ = [];
    f.__Code__ = "throw new TypeError();";
    f.__DefineOwnProperty__(
    	"lengh",
    	new ES_ST_PropertyDescriptor({
    		__Value__ : 0,
    		__Writable__ : false,
    		__Enumerable__ : false,
    		__Configurable__ : false
    	}),
    	false
    );

    return f;
})();