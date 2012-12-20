var ES_functionPrototype = (function () {
    var fp = new ES_Object({
        __Class__ : 'Function',
        __Prototype__ : ES_objectPrototype,
        __Extensible__ : true
    });

    ES_Helper._initOwnProperty(fp, {
        "length" : 0,
        "constructor" : "ES_functionCounstructor",
        "toString" : function () {
            return "[[functionPrototype toString function Code]]";
        },
        "apply" : function () {
            return "[[function prototype apply function code]]";
        },
        "call" : function () {
            return "";
        },
        "bind" : function () {}
    });

    return fp;
})();
