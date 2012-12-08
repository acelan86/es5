var control = {
    runningEC : null,
    ecStack : []
};

/** ===============================
 * 执行过程
 * @type {Object}
 */

//进入全局代码 global eval
function runGlobalCode() {
    var globalObj = {},
        globalEnv = newDeclarativeEnvironment(null);
    var ec = new ExecuteContext(globalEnv, globalObj);
    control.ecStack.push(ec);
    control.runningEC = ec;
    control.runningEC.execute(code);
}

//进入函数代码
function runFunctionCode(F, thisArg, argumentList) {
    thisArg = thisArg || globalObj;
    //F的[[scope]]的内部属性，创建函数时确定， F的[[scope]]为当前的lexicalEnvironment
    var localEnv = newDeclarativeEnvironment(F.lexicalEnvironment);
    var ec = new ExecuteContext(localEnv, thisArg);
}