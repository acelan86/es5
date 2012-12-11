var ES_stringPrototype = (function () {
    var sp = new ES_Object({
        __Class__ : 'String',
        __Prototype__ : ES_objectPrototype,
        __Extensible__ : true
    });

    sp.__DefineOwnProperty__(
        "es_constructor",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : "ES_stringConstructor"
        }),
        false
    );

    sp.__DefineOwnProperty__(
        "es_toString",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : function () {
                return "[[string object es_toString function code]]";
            }
        }),
        false
    );

    sp.__DefineOwnProperty__(
        "es_valueOf",
        new ES_ST_PropertyDescriptor({
            __Writable__ : false,
            __Enumerable__ : false,
            __Configurable__ : false,
            __Value__ : function () {
                return "[[string object es_valueOf function code]]";
            }
        }),
        false
    );
    return sp;
})();