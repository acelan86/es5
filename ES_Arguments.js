/**
 * 创建Arguments对象
 * @param  {ES_Object}                funcObj       将要执行的函数对象
 * @param  {ES_ST_List}                 names       函数的所有形参名
 * @param  {Any}                        args        传给内部方法__Call__的实际参数
 * @param  {ES_ST_EnvironmentRecords}   envRec      变量环境的环境记录
 * @param  {Boolean}                    isStrict    是否严格模式
 * @return {ES_Object}                              对象
 */
ES_createArgumentsObject = function (funcObj, names, args, envRec, isStrict) {
    var len = args.length,
        obj = new ES_Object({
            __Class__ : 'Arguments',
            __Prototype__ : ES_objectPrototype,
            __Extensible__ : true
        }),
        object = ES_objectConstructor;

    //设置arguments.length
    obj.__DefineOwnProperty__(
        'length',
        new ES_ST_PropertyDescriptor({
            __Value__ : len,
            __Writable__ : true,
            __Enumerable__ : false,
            __Configurable__ : true
        }),
        false
    );

    var map = object.__Construct__(),
        mappedNames = [], //模拟一个List
        indx = len - 1;
    while (indx >= 0) {
        var val = args[indx];
        //定义arguments[n]
        obj.__DefineOwnProperty__(
            ES_Global.toString(indx),
            new ES_ST_PropertyDescriptor({
                __Value__ : val,
                __Writable__ : true,
                __Enumerable__ : true,
                __Configurable__ : true
            }),
            false
        );
        if (indx < names.length) {
            var name = names[indx];
            if (isStrict === false && mappedNames.indexOf(name) === -1) {
                mappedNames.push(name);
                var g = ES_makeArgGetter(name, envRec),
                    p = ES_makeArgSetter(name, envRec);
                map.__DefineOwnProperty__(
                    ES_Global.toString(indx),
                    new ES_ST_PropertyDescriptor({
                        __Set__ : p,
                        __Get__ : g,
                        __Configurable__ : true
                    }),
                    false
                );
            }
        }
        indx--;
    }
    if (mappedNames.length > 0) {
        obj.__ParameterMap__ = map;

        obj.__Get__ = function (p) {
            var map = this.__ParameterMap__,
                isMapped = map.__GetOwnProperty__(p);
            if (isMapped === undefined) {
                var v = ES_Object.prototype.__Get__.call(this, p);
                if (p === "caller" && ES_Global.isStrictFuncion(v)) {
                    throw new TypeError();
                }
                return v;
            } else {
                //map包含一个p的形参映射表
                return map.__Get__(p);
            }
        };

        obj.__GetOwnProperty__ = function (p) {
            var desc = ES_Object.prototype.__GetOwnProperty__.call(this, p);
            if (desc === undefined) {
                return desc;
            }
            var map = this.__ParameterMap__,
                isMapped = map.__GetOwnProperty__(p);
            if (isMapped !== undefined) {
                desc = map.__Get__(p);
            }
            return desc;
        };

        obj.__DefineOwnProperty__ = function (p, desc, isThrow) {
            var map = this.__ParameterMap__,
                isMapped = map.__GetOwnProperty__(p),
                allowed = ES_Object.prototype.__DefineOwnProperty__.call(this, p, desc, false);
            if (allowed === false) {
                if (isThrow === true) {
                    throw new TypeError();
                } else {
                    return false;
                }
            }
            if (isMapped !== undefined) {
                if (ES_ST_PropertyDescriptor.isAccessorDescriptor(desc) === true) {
                    map.__Delete__(p, false);
                } else {
                    if ('undefined' !== typeof desc.__Value__) {
                        map.__Put__(p, false);
                    }
                    if ('undefined' !== typeof desc.__Writable__) {
                        map.__Delete__(p, false);
                    }
                }
            }
            return true;
        };

        obj.__Delete__ = function (p, isThrow) {
            var map = this.__ParameterMap__,
                isMapped = map.__GetOwnProperty__(p),
                result = ES_Object.prototype.__Delete__.call(this, p, isThrow);
            if (result === true && isMapped !== undefined) {
                map.__Delete__(p, false);
            }
            return result;
        };
    }
    if (isStrict === false) {
        //定义arguments.callee
        obj.__DefineOwnProperty__(
            "callee",
            new ES_ST_PropertyDescriptor({
                __Value__ : funcObj,
                __Writable__ : true,
                __Enumerable__ : false,
                __Configurable__ : true
            }),
            false
        );
    } else {
        var thrower = ES_throwTypeError;
        //定义arguments.caller arguments.callee 为抛出错误, 严格模式不允许又这两个定义
        obj.__DefineOwnProperty__(
            "caller",
            new ES_ST_PropertyDescriptor({
                __Get__ : thrower,
                __Set__ : thrower,
                __Enumerable__ : false,
                __Configurable__ : false
            }),
            false
        );
        //
        obj.__DefineOwnProperty__(
            "callee",
            new ES_ST_PropertyDescriptor({
                __Get__ : thrower,
                __Set__ : thrower,
                __Enumerable__ : false,
                __Configurable__ : false
            }),
            false
        );
    }

    return obj;
};

ES_makeArgGetter = function (name, envRec) {
    var body = "return" + name + ";";
    return ES_createFunctionObject(null, body, envRec, true);
};

ES_makeArgSetter = function (name, envRec) {
    var param = name + "_arg",
        body = name + "=" + param + ';';
    return ES_createFunctionObject(param, body, envRec, true);
};