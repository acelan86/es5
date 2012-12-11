var ES_booleanPrototype = (function () {
    var bp = new ES_Object({
        __Class__ : 'Boolean',
        __Prototype__ : ES_objectPrototype,
        __Extensible__ : true
    });

    bp.__DefineOwnProperty__(
        "es_constructor",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : "ES_booleanConstructor"
        }),
        false
    );

    bp.__DefineOwnProperty__(
        "es_toString",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : function () {
                return "[[boolean object es_toString function code]]";
            }
        }),
        false
    );

    bp.__DefineOwnProperty__(
        "es_valueOf",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : function () {
                return "[[boolean object es_valueOf function code]]";
            }
        }),
        false
    );
    return bp;
})();
