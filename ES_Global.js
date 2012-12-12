/**
 * 定义全局方法
 */
var ES_Global = {
    /**
     * 类型转换操作集合
     */
    toPrimitive : function (any) {

    },
    toBoolean : function (any) {
        return !!any;
    },
    toNumber : function (any) {
        return Number(any);
    },
    toInteger : function (any) {
        return window.parseInt(any);
    }, 
    toInt32 : function (any) {

    },
    toUint32 : function (any) {

    },
    toUint16 : function (any) {

    },
    toString : function (any) {
        return String(any);
    },
    toObject : function (any) {
        switch (ES_Global.type(any)) {
            case 'undefined' :
            case 'null' : 
                throw new TypeError();
            case 'boolean' : 
                return ES_booleanConstructor._new(any);
            case 'number' : 
                return ES_numberConstructor._new(any);
            case 'string' : 
                return ES_stringConstructor._new(any);
            case 'ES_LT_Object' :
                return any;
            default : 
                throw new TypeError();
        }
    },

    /**
     * 测试操作集合
     */
    /**
     * 判断是语言类型或者规范类型中的某一种
     * @param  {Any} any     要判断的对象
     * @return {ES_TYPE}     包括ES_LT_Undefined, ES_LT_Null, ES_LT_Boolean, ES_LT_String, ES_LT_Number, ES_LT_Object语言类型
     *                       和ES_ST_Reference, ES_ST_List, ES_ST_Completion, ES_ST_PropertyDescriptor, ES_ST_PropertyIdentifier, ES_ST_LexicalEnvironment, ES_ST_EnvironmentRecords规范类型
     */
    type : function (any) {
        var type = typeof any;
        return ('object' === type ? (any._constructor || "ES_LT_Object") : type);
    },
    checkObjectCoercible : function (any) {

    },
    isCallable : function (any) {

    },
    sameValue : function (x, y) {
        if (ES_Global.type(x) !== ES_Global.type(y)) {
            return false;
        }
        if (ES_Global.type(x) === 'undefined') {
            return true;
        }
        if (ES_Global.type(x) === 'null') {
            return true;
        }
        if (ES_Global.type(x) === 'number') {
            if (isNaN(x) && isNaN(y)) {
                return true;
            }
            if (x === +0 && y === -0) {
                return false;
            }
            if (x === -0 && y === +0) {
                return false;
            }
            if (x === y) {
                return true;
            }
            return false;
        }
        if (ES_Global.type(x) === 'string') {
            return x == y;
        }
        if (ES_Global.type(x) === 'Boolean') {
            return x === y;
        }
        return x === y;
    },

    isFormalParameterListopt : function () {
        return true;
    },
    isFunctionBody : function () {
        return true;
    },
    isStrictCode : function (code) {
        return code && code[1] && (code[1] === "'use strict'"); 
    },
    isFunctionCode : function (code) {
        return code && code[0] && (code[0] === "funcCode"); 
    },
    isEvalCode : function (code) {
        return code && code[0] && (code[0] === "eCode"); 
    },
    isFunctionDeclaration : function (code) {
        code = code || "";
        var m = code.match(/function\s([a-zA-Z0-9]*)\(([^\(\)]*)\)\s*\{(.*)\}/);
        if (m) {
            console.debug(m);
            return {
                'identifier' : m[1],
                'funcBody' : m[3],
                'args' : m[2]
            };
        }
        return false;
    },
    isVariableDeclaration : function (code) {
        code = code || "";
        var m = code.match(/var\s*([a-zA-Z0-9]+)/);
        if (m) {
            return {
                'identifier' : m[1]
            }
        }
        return false;
    },
    isVariableDeclarationNoIn : function (code) {
        code = code || "";
        var m = code.match(/var\s*([a-zA-Z0-9]+)/);
        if (m) {
            return {
                'identifier' : m[1]
            }
        }
        return false;
    },

    isThrowCode : function (code) {
        var code = code || "";
        return code.indexOf('throw') >= 0;
    },
    isReturnCode : function (code) {
        var code = code || "";
        return code.indexOf('return') >= 0;
    },
};