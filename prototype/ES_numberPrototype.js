var ES_numberPrototype = (function () {
    var np = new ES_Object({
        __Class__ : 'Number',
        __Prototype__ : ES_objectPrototype,
        __Extensible__ : true
    });

    np.__DefineOwnProperty__(
        "es_constructor",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : "ES_numberConstructor"
        }),
        false
    );

    np.__DefineOwnProperty__(
        "es_toString",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : function () {
                return "[[number object es_toString function code]]";
            }
        }),
        false
    );

    np.__DefineOwnProperty__(
        "es_valueOf",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : function () {
                return "[[number object es_valueOf function code]]";
            }
        }),
        false
    );
    return np;
})();