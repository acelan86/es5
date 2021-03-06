/**
 * 创建函数对象，基础方法
 * @param {String} formalParameterList 函数参数名列表,逗号分隔 "a,b,c,d"
 * @param {String} functionBody        函数体
 * @param {[type]} scope               [description]
 * @param {[type]} strict              [description]
 */
function ES_createFunctionObject(formalParameterList, functionBody, scope, strict) {
    formalParameterList = formalParameterList || "";
    var f = new ES_Object({
        __Class__ : 'Function',
        __Prototype__ : ES_functionPrototype,
        __Extensible__ : true,
        __Scope__ : scope,
        __FormalParameters__ : formalParameterList,
        __Code__ : functionBody
    });
    //15.3.5.4
    f.__Get__ = function (propertyName) {
        var v = ES_Object.prototype.__Get__.call(this, propertyName);
        if (propertyName === 'caller' && ES_Global.isStrictCode(v)) {
            throw new TypeError();
        }
        return v;
    };
    //13.2.1
    f.__Call__ = function (thiz, args) {
        var funcCtx = ES_createExecuteContext(this, args, thiz);
        ES_control.enter(funcCtx);
        ES_declarationBindingInstantiation(this.__Code__, args, this.__FormalParameters__);
        var result = ES_control.run(this.__Code__);
        ES_control.quit();
        //退出执行环境
        if (ES_Global.isThrowCode(result.type)) {
            throw result.value;
        }
        if (ES_Global.isReturnCode(result.type)) {
            return result.value;
        }
        return undefined;
    };
    //13.2.2
    f.__Construct__ = function (args) {
        var obj = new ES_Object({
            __Class__ : 'Object',
            __Extensible__ : true,
        });
        var proto = this.__Get__('prototype');
        if (ES_Global.type(proto) === "ES_LT_Object") {
            obj.__Prototype__ = proto;
        } else {
            obj.__Prototype__ = ES_objectPrototype;
        }
        var result = this.__Call__(obj, args);

        if (ES_Global.type(result) === "ES_LT_Object") {
            return result;
        }
        return obj;
    };

    //15.3.5.3
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

    //定义function对象的length为参数个数
    ES_Helper._initOwnProperty(f, {
        "length" : formalParameterList.split(',').length || 0
    }, {
        __Writable__ : false,
        __Enumerable__ : false,
        __Configurable__ : false
    });


    //开始创建原型
    var proto = ES_objectConstructor.__Construct__();
    ES_Helper._initOwnProperty(proto, {
        "constructor" : f
    }, {
        __Writable__ : true,
        __Enumerable__ : false,
        __Configurable__ : true
    });

    ES_Helper._initOwnProperty(proto, {
        "prototype" : proto
    }, {
        __Writable__ : true,
        __Enumerable__ : false,
        __Configurable__ : false
    });

    if (strict === true) {
        var thrower = ES_throwTypeError;//13.2.3
        f.__DefineOwnProperty__(
            "caller",
            new ES_ST_PropertyDescriptor({
                __Get__ : thrower,
                __Set__ : thrower,
                __Enumerable__ : false,
                __Configurable__ : false
            }, 'accessor'),
            false
        );
        f.__DefineOwnProperty__(
            "arguments",
            new ES_ST_PropertyDescriptor({
                __Get__ : thrower,
                __Set__ : thrower,
                __Enumerable__ : false,
                __Configurable__ : false
            }, 'accessor'),
            false
        );
    }
    return f;
}


/**
 * 标准内置Function构造器
 */
var ES_functionConstructor = (function () {
    var o = new ES_Object({
        __Class__ : 'Function',
        __Prototype__ : ES_functionPrototype,
        __Extensible__ : true
    });

    ES_Helper._initOwnProperty(o, {
        "prototype" : ES_functionPrototype,
        "lenght" : 1
    },{
        __Writable__ : false,
        __Enumerable__ : false,
        __Configurable__ : false
    });

    //作为构造器使用 15.3.2 new Function()
    o.__Construct__ = function (/*p1, p2, ... pn, body*/) {
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
        if (!ES_Global.isFormalParameterListopt(p)) {
            throw new SyntaxError();
        }
        if (!ES_Global.isFunctionBody(body)) {
            throw new SyntaxError();
        }
        var strict;
        if (ES_Global.isStrictCode(body)) {
            strict = true;
        } else {
            strict = false;
        }
        if (strict) {
            throw Error(); //13.1 todo
        }
        //@todo scope哪里来的？ 
        return new ES_createFunctionObject(p, body, ES_globalEC, strict);
    };

    return o;
})();