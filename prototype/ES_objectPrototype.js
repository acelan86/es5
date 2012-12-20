var ES_objectPrototype = (function () {
    var op = new ES_Object({
        __Prototype__ : null,
        __Class__ : 'Object',
        __Extensible__ : true
    });

    //下面其实都是用op.__DefineOwnProperty__定义的属性，为命名数据属性或者命名访问器属性，这样写就是为了方便
    op.__DefineOwnProperty__(
        "constructor",
        new ES_ST_PropertyDescriptor({
            __Value__ : "ES_objectConstructor",
        }),
        false
    );
    op.__DefineOwnProperty__(
        "toString",
        new ES_ST_PropertyDescriptor({
            __Value__ : function () {
                return "[[object prototype es_toString function code]]";
            }
        }),
        false
    );
    op.__DefineOwnProperty__(
        "valueOf",
        new ES_ST_PropertyDescriptor({
            __Value__ : function () {
                return "[[object prototype es_valueOf function code]]";
            }
        }),
        false
    );
    op.__DefineOwnProperty__(
        "hasOwnProperty",
        new ES_ST_PropertyDescriptor({
            __Value__ : function (v) {
                return "[[object prototype es_hasOwnProperty function code]]";
                var p = ES_Global.toString(v),
                    o = ES_Global.toObject(this),
                    desc = o.__GetOwnProperty__(p);
                return desc !== undefined;
            }
        }),
        false
    );
    op.__DefineOwnProperty__(
        "toLocalString",
        new ES_ST_PropertyDescriptor({
            __Value__ : function () {
                return "[[object prototype toLocalString function code]]";
            }
        }),
        false
    );

    op.__DefineOwnProperty__(
        "isPrototypeOf",
        new ES_ST_PropertyDescriptor({
            __Value__ : function () {
                return "[[object prototype es_isPrototypeOf function code]]";
            }
        }),
        false
    );
    op.__DefineOwnProperty__(
        "propertyIsEnumerable",
        new ES_ST_PropertyDescriptor({
            __Value__ : function (v) {
                return "[[object prototype es_propertyIsEnumerable function code]]";
            }
        }),
        false
    );

    return op;
})();
