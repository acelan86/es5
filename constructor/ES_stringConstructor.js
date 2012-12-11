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
        return so;
    };
    return obj;
})();