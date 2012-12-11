var ES_functionPrototype = (function () {
    var fp = new ES_Object({
        __Class__ : 'Function',
        __Prototype__ : ES_objectPrototype,
        __Extensible__ : true
    });

    //命名的数据属性
    fp.__DefineOwnProperty__(
        "es_length",
        new ES_ST_PropertyDescriptor({
            __Value__ : 0
        }),
        false
    );

    //以下同上定义方法
    fp.__DefineOwnProperty__(
        "es_constructor",
        new ES_ST_PropertyDescriptor({
            __Value__ : "ES_functionCounstructor"
        }),
        false
    );

    fp.__DefineOwnProperty__(
        "es_toString",
        new ES_ST_PropertyDescriptor({
            __Value__ : function () {
                return "[[functionPrototype toString function Code]]";
            }
        }),
        false
    );
    fp.__DefineOwnProperty__(
        "es_apply",
        new ES_ST_PropertyDescriptor({
            __Value__ : function (thisArg, argArray) {
                return "[[function prototype apply function code]]";
            }
        }),
        false
    );

    return fp;
})();
