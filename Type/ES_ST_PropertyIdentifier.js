/**
 * 属性标识符类型
 * @param {String}                		name       属性名
 * @param {ES_ST_PropertyDescriptor} 	descriptor 属性描述符
 */
function ES_ST_PropertyIdentifier(name, descriptor) {
    this.name = name;
    this.descriptor = descriptor;
}