var ES_globalObject = (function () {
    var obj = new ES_Object();

    obj.__DefineOwnProperty__(
        "NaN",
        new ES_ST_PropertyDescriptor({
            __Value__ : NaN,
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable : false
        }),
        false
    );

    obj.__DefineOwnProperty__(
        "Infinity", 
        new ES_ST_PropertyDescriptor({
            __Value__ : Infinity,
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable : false
        }),
        false
    );

    obj.__DefineOwnProperty__(
        "undefined",
        new ES_ST_PropertyDescriptor({
            __Value__ : undefined,
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable : false
        }),
        false
    );

    obj.eval = function () {};
    obj.parseInt = function (string) {};

    return obj;
})();
