/**
 * 执行上下文对象
 */
function ES_ExecuteContext(lex, thiz) {
    this.lexicalEnvironment = lex;
    this.varEnvironment = lex;
    this.thisArg = thiz;
}
/**
 * 创建一个新的执行环境
 * caller.funcObj(args);
 */
function ES_createExecuteContext(funcObj, args, thisArg) {
    var thiz,
        isStrict = false,
        args = args || [];

    //1、确定this
    if (ES_Global.isStrictCode(funcObj.__Code__)) {
        thiz = thisArg;
        isStrict = true;
    } else if (thiz === null || thiz === undefined) {
        thiz = ES_GlobalObject;
    } else if (ES_Global.type(thisArg) !== "ES_LT_Object") {
        thiz = ES_Global.toObject(thisArg);
    } else {
        thiz = thisArg;
    }
    //2、建立词法环境,建立执行环境
    var localEnv = ES_ST_LexicalEnvironment.newDeclarativeEnvironment(funcObj.__Scope__),
        ec = new ES_ExecuteContext(localEnv, thiz);
    //3、在执行环境中绑定函数和变量声明
    ES_declarationBindingInstantiation(ec, funcObj.__Code__, isStrict, args, funcObj.__FormalParameters__);
    return ec;
};

/**
 * 定义绑定初始化方法
 * @param  {ExecuteContext} ec      当前执行上下文
 * @param  {code}           code    当前调用者提供的代码
 */
function ES_declarationBindingInstantiation(ec, code, isStrict, args, argNames) {
    var envRec = ec.varEnvironment.environmentRecords,
        configurableBindings = false,
        strict = false;
    if (ES_Global.isEvalCode(code)) {
        configurableBindings = true;
    }
    strict = isStrict;
    if (ES_Global.isFunctionCode(code)) {
        var func = ES_createFunctionObject(argNames, code, ec, isStrict);
        argNames = argNames.split(',');
        var argCount = args.length;
        var n = 0,
            v = null;
        for (; n < argNames.length; n++) {
            if (n > argCount) {
                v = undefined;
            } else {
                v = args[n];
            }
            var argAlreadyDeclared = envRec.hasBinding(argNames[n]);
            if (argAlreadyDeclared === false) {
                envRec.createMutableBinding(argNames[n]);
            }
            envRec.setMutableBinding(argNames[n], v, strict);
        }
    }
    //绑定函数声明
    var f, fn, fo;
    for (var linenum = 2, len = code.length; linenum < len; linenum++) {
        if (f = ES_Global.isFunctionDeclaration(code[linenum])) {
            fn = f.identifier; //标识符
            fo = new ES_createFunctionObject(f.args, f.funcBody, ec, isStrict);
            var argAlreadyDeclared = envRec.hasBinding(fn);
            if (argAlreadyDeclared === false) {
                envRec.createMutableBinding(fn, configurableBindings);
            } else if (envRec === ES_globalEC.varEnvironment.environmentRecords){
                var go = ES_globalObject;
                var existingProp = go.__GetProperty__(fn);
                if (existingProp.__Configurable__ === true) {
                    go.__DefineOwnProperty__(
                        fn,
                        new ES_ST_PropertyDescriptor({
                            __Value__       : undefined,
                            __Writable__    : true,
                            __Enumerable__  : true,
                            __Configurable__: configurableBindings
                        }),
                        true
                    );
                } else if (ES_ST_PropertyDescriptor.isAccessorDescriptor(existingProp) === true || !(existingProp.__Writable__ === true && existingProp.__Enumerable__ === true)) {
                    throw new TypeError();
                }
            }
            envRec.setMutableBinding(fn, fo, strict);
        }
    }

    var argumentsAlreadyDeclared = envRec.hasBinding("es_arguments");
    if (ES_Global.isFunctionCode(code) && argumentsAlreadyDeclared === false) {
        var argsObj = ES_createArgumentsObject(func, argNames, args, envRec, isStrict);
        if (isStrict === true) {
            envRec.createImmutableBinding("es_arguments");
            envRec.initializeImmutableBinding("es_arguments", argsObj);
        } else {
            envRec.createMutableBinding("es_arguments");
            envRec.setMutableBinding("es_arguments", argsObj, false);
        }
    }

    //绑定内部变量声明
    var d, dn;
    for (var linenum = 2, len = code.length; linenum < len; linenum++) {
        if (d = (ES_Global.isVariableDeclaration(code[linenum]) || ES_Global.isVariableDeclarationNoIn(code[linenum]))) {
            dn = d.identifier;
            var varAlreadyDeclared = envRec.hasBinding(dn);
            //解释了同一个lexicalEnv下，同名的变量定义无法覆盖同名函数定义
            if (varAlreadyDeclared === false) {
                envRec.createMutableBinding(dn, configurableBindings);
                envRec.setMutableBinding(dn, undefined, strict);
            }
        }
    }
};