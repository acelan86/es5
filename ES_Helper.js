/**
 * 定义一些辅助方法，用于辅助描述ES的某些语句，不是ES实现的内容
 * @type {Object}
 */
var ES_Helper = {
    _initOwnProperty : function (o, props, attr) {
        var _attribute = attr || {
            __Writable__ : true,
            __Enumerable__ : false,
            __Configurable__ : true
        }; //全局属性中除特殊说明的属性外默认属性值

        for (var k in props) {  
            _attribute.__Value__ = props[k];
            o.__DefineOwnProperty__(k, new ES_ST_PropertyDescriptor(_attribute), false);
        }
    }
};