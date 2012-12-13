/**
 * 一元运算符
 */
var ES_UnaryOperators = {
    "delete" : {

    },
    "void" : {

    },
    "typeof" : {
        "UnaryExpression:typeof UnaryExpression" : function (UnaryExpression) {
            var val = ES_control.execute(UnaryExpression);
            if (ES_Global.type(val) === 'ES_ST_Reference') {
                if (val.isUnresolvableReference() === true) {
                    return "undefined";
                }
                val = ES_ST_Reference.getValue(val);
            }
            /** 这里很变态的描述把ES_Global.type里面的方法反向处理了一下ES_LT_Object类型 */
            var type = ES_Global.type(val);
            if (type === 'ES_ST_Object') {
                    if ('undefined' === typeof val.__Call__) {
                        return 'object';
                    }
                    if ('undefined' !== typeof val.__Call__) {
                        return 'function'
                    }
                    //这里如何表示宿主对象？
                
            } else {
                return type;
            }
        }
    },
    "++" : {

    },
    "--" : {

    },
    "+" : {

    },
    "-" : {

    },
    "~" : {

    },
    "!" : {

    }
};