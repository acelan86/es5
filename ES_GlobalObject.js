var ES_GlobalObject = (function () {
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

    return obj;
})();

ES_GlobalObject.eval = function (x) {};

ES_GlobalObject.parseInt = function (string, radix) {};