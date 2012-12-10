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

    },
    toNumber : function (any) {

    },
    toInteger : function (any) {

    },
    toInt32 : function (any) {

    },
    toUint32 : function (any) {

    },
    toUint16 : function (any) {

    },
    toString : function (any) {

    },
    toObject : function (any) {

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
        return any.constructor; //一种描述而已
    },
    checkObjectCoercible : function (any) {

    },
    isCallable : function (any) {

    },
    sameValue : function (a, b) {

    }
};