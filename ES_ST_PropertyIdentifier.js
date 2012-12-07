/**
 * 属性标识符类型
 * @param {String}                		name       属性名
 * @param {ES_ST_PropertyDescriptor} 	descriptor 属性描述符
 * 这个东西或许不存在，他只是在ES_LT_Object里面的name : ES_ST_PropertyDescriptor对；见ES_LT_Object
 */
function ES_ST_PropertyIdentifier(name, descriptor) {
    this.name = name;
    this.descriptor = descriptor;
}