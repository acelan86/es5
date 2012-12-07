/** ========================
 * 对象定义
 * ======================== */
/**
 * 执行上下文对象
 */
function ExecuteContext(lex, thiz) {
    this.LexicalEnvironment = lex;
    this.VarEnvironment = lex;
    this.thisArg = thiz;
}

//获取词法环境(lex)中某变量(name)的引用
function getIdentifierReference(lex, name, strict) {
    if (lex === null) {
        var refrenceObj = {};
        refrenceObj[name] = undefined;
        return refrenceObj;
    }
    var envRec = lex.environmentRecords;
    if (envRec.hasBinding(name)) {
        var refrenceObj = {};
        refrenceObj[name] = envRec;
        return refrenceObj;
    }
    return getIdentifierReference(lex.outerLexicalEnvironment, name, strict);
}

//新建一个声明式词法环境
function newDeclarativeEnvironment(lex) {
    var envRec = new DeclarativeEnvironmentRecords(),
        env;
    env =  new LexicalEnvironment(envRec, lex);
    return env;
}

//新建一个对象式词法环境
function newObjectEnvironment(o, lex) {
    var envRec = new ObjectEnvironmentRecords(o),
        env;
    env = new LexicalEnvironment(envRec, lex);
    return env;
}

var control = {
    runningEC : null,
    ecStack : []
};
/** ===============================
 * 函数声明过程
 */
function createFunctionObject() {
    var o = new Object();
    o.[[class]] = 'function';
    o.proto = Function.prototype;

    o.scope = control.runningEC.lexicalEnvironment;

}

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