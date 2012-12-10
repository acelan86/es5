/**
 * 创建函数对象的算法
 */
function ES_createFunctionObject(formalParameterList, functionBody, scope, strict) {
    var f = new ES_O_Object();

    f.__Class__ = 'Function';
    f.__Prototype__ = ES_BI_FunctionPrototype;
    
    f.__Get__ = function (propertyName) {
        var v = ES_O_Object.prototype.__Get__.call(this, propertyName);
        if (propertyName === 'caller' && v is strict) {
            throw new TypeError();
        }
        return v;
    };

    f.__Call__ = function (thiz, args) {
        //@todo13.2.1
        var funcCtx = ES_createExecuteContext(this.__FormalParameters__, args, thiz);
        ES_control.enter(funcCtx);
        var result = ES_control.excute(f.__Code__);
        ES_control.quit();
        //退出执行环境
        if (result.type === throw) {
            throw result.type;
        }
        if (result.type === return) {
            return result.type;
        }
        return undefined;
    };

    f.__Construct__ = function (args) {
        var obj = new ES_O_Object({
            __Class__ : 'Object',
            __Extensible__ : true,
        });
        var proto = this.__Get__('prototype');
        if (ES_Global.type(proto) === ES_LT_Object) {
            obj.__Prototype__ = proto;
        } else {
            obj.__Prototype__ = ES_BI_ObjectPrototype;
        }
        var result = this.__Call__.call(obj, args);
        if (ES_Global.type(result) === ES_LT_Object) {
            return result;
        }
        return obj;
    };

    f.__HasInstance__ = function (any) {
        if (ES_Global.type(any) !== ES_LT_Object) {
            return false;
        }
        var o = this.__Get__('prototype');
        if (ES_Global.type(o) !== ES_LT_Object) {
            throw new TypeError();
        }
        while (1) {
            any = any.__Prototype__;
            if (any === null) {
                return false;
            }
            if (o === any) {
                return true;
            }
        }
    };

    f.__Scope__ = scope;

    var names = new ES_ST_List(formalParameterList);
    f.__FormalParameters__ = names;

    f.__Code__ = functionBody;

    f.__Extensible__ = true;

    var len = formalParameterList.length || 0;
    f.__DefineOwnProperty__(
        "length",
        new ES_ST_PropertyDescriptor({
            __Value__ : len,
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false
        }),
        false
    );

    var proto = ES_C_Object();

    proto.__DefineOwnProperty__(
        "constructor",
        new ES_ST_PropertyDescriptor({
            __Value__ : f,
            __Writable__ : true,
            __Enumerable__ : false,
            __Configurable__ : true
        }),
        false
    );

    f.__DefineOwnProperty__(
        "prototype",
        new ES_ST_PropertyDescriptor({
            __Value__ : proto,
            __Writable__ : true,
            __Enumerable__ : false,
            __Configurable__ : false
        }),
        false
    );

    if (strict === true) {
        var thrower //13.2.3
        f.__DefineOwnProperty__(
            "caller",
            new ES_ST_PropertyDescriptor({
                __Get__ : thrower,
                __Set__ : thrower,
                __Enumerable__ : false,
                __Configurable__ : false
            }),
            false
        );
        f.__DefineOwnProperty__(
            "arguments",
            new ES_ST_PropertyDescriptor({
                __Get__ : thrower,
                __Set__ : thrower,
                __Enumerable__ : false,
                __Configurable__ : false
            }),
            false
        );
    }
    return f;
}


/**
 * Function构造器
 * @param {[type]} p1   [description]
 * @param {[type]} p2   [description]
 * @param {[type]} ...  [description]
 * @param {[type]} pn   [description]
 * @param {[type]} body [description]
 */
var ES_functionConstructor = (function () {
    var fc = new Object({
        __Class__ : 'Function',
        __Prototype__ : ES_functionPrototype,
        __Extensible__ : true
    });

    fc.prototype = ES_functionPrototype;
    fc.length = 1;

    //作为构造器使用
    fc._new = function (p1, p2, ..., pn, body) {
        var argCount = arguments.length;//参数总数， 包括body
        var p = '';
        if (argCount === 0) {
            var body = '';
        } else if (argCount === 1) {
            body = arguments[0];
        } else {
            //argCount > 1
            var firstArg = arguments[0];
            p = ES_Global.toString(firstArg);
            var k = 2;
            while (k < argCount) {
                var nextArg = arguments[k - 1];
                p = p + ',' + ES_Global.toString(nextArg);
                k++;
            }
            body = arguments[k - 1];
        }
        body = ES_Global.toString(body);
        if (p isnot FormalParameterListopt) {
            throw new SyntaxError();
        }
        if (body isnot FunctionBody) {
            throw new SyntaxError();
        }
        var strict;
        if (body is strict) {
            strict = true;
        } else {
            strict = false;
        }
        if (strict) {
            throw Error(); //13.1 todo
        }
        return new ES_createFunctionObject(p, body, scope, strict);
    };
    
    return fc;
})();