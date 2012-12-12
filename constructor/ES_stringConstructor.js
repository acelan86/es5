var ES_stringConstructor = (function () {
    var obj = new ES_Object({
        __Prototype__ : ES_functionPrototype
    });

    obj.__DefineOwnProperty__(
        "es_length",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : 1
        }),
        false
    );

    obj.__DefineOwnProperty__(
        "es_prototype",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : ES_stringPrototype
        }),
        false
    );

    obj._func = function (value) {
        return 'undefined' === typeof value ? "" : ES_Global.toString(value);
    };
    obj._new = function (value) {
        value = obj._func(value);
        var so = new ES_Object({
            __Prototype__ : ES_stringPrototype,
            __Class__ : "String",
            __PrimitiveValue__ : value,
            __Extensible__ : true
        });

        so.__DefineOwnProperty__(
            "es_length",
            new ES_ST_PropertyDescriptor({
                __Value__ : value.length,
                __Writable__ : false,
                __Configurable__ : false,
                __Enumerable__ : false
            }),
            false
        );
        /**
         * string的__GetOwnProperty__方法与普通的Object方法不同
         * @param  {[type]} p [description]
         * @return {[type]}   [description]
         */
        so.__GetOwnProperty__ = function (p) {
            var desc = ES_Object.prototype.__GetOwnProperty__.call(this, p);
            if (desc !== undefined) {
                return desc;
            }
            if (ES_Global.toString(Math.abs(ES_Global.toInteger(p))) !== p) {
                return undefined;
            }
            var str = this.__PrimitiveValue__,
                index = ES_Global.toInteger(p),
                len = str.length;
            if (len <= index) {
                return undefined;
            }
            var resultStr = str[index];
            return new ES_ST_PropertyDescriptor({
                __Value__ : resultStr,
                __Enumerable__ : true,
                __Writable__ : false,
                __Configurable__ : false
            });
        };
        return so;
    };
    return obj;
})();