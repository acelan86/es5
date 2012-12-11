var ES_numberConstructor = (function () {
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
            __Value__ : ES_numberPrototype
        }),
        false
    );

    obj._func = function (value) {
        return 'undefined' === typeof value ? 0 : ES_Global.toNumber(value);
    };

    obj._new = function (value) {
        value = obj._func(value);

        var no = new ES_Object({
            __Prototype__ : ES_numberPrototype,
            __Class__ : "Number",
            __PrimitiveValue__ : value,
            __Extensible__ : true
        });
        return no;
    };
    return obj;
})();