/**
 * Arguments对象
 * 当控制器进入函数代码的执行环境，会创建arguments对象，除非作为“arguments”出现在形参列表中，或者改函数内部变量声明标识符或函数声明标识符为arguments
 */
function ES_Arguments() {

}
/**
 * 创建ES_Arguments对象
 * @param  {ES_Function}                func   将要执行的函数对象
 * @param  {ES_ST_List}                 names  函数的所有形参名
 * @param  {Any}                        args   传给内部方法__Call__的实际参数
 * @param  {ES_ST_EnvironmentRecords}   envRec 变量环境的环境记录
 * @param  {Boolean}                    strict 是否严格模式
 * @return {ES_Arguments}                      ES_Arguments对象
 */
ES_Arguments.createArgumentsObject = function (func, names, args, envRec, strict) {

};

ES_Arguments.makeArgGetter = function (name, envRec) {
    
}