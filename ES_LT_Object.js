/**
 * 对象类型 （语言类型）
 * @param {Object} o 初始化参数
 */
function ES_LT_Object(o) {
    //内部属性
    this.__Prototype__ = o.__Prototype__ || null; //此对象原型，为ES_LT_Object || null
    this.__Class__ = o.__Class__; //此对象分类的一个字符串，原生对象占用"Arguments", "Array", "Boolean", "Date", "Error", "Function", "JSON", "Math", "Number", "Object", "RegExp", "String"，宿主对象可以为除这些值之外的任何字符串
    this.__Extensible__ = o.__Extensible__ || false; //是否可以向对象添加自身属性（ownProperty）
}