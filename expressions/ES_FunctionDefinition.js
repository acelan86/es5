/**
 * 函数定义 13
 * @type {Object}
 */
var ES_FunctionDefinition = {
    //函数声明
    //FunctionDeclaration:function Identifier(FormalParameterList_opt){FunctionBody}
    "FD : function id(par) {body}" : function (id, par, body) {
        return ES_createFunctionObject(
            par,
            body,
            ES_control.runningEC.varEnvironment,
            ES_control.runningEC.isStrict || ES_Global.isStrictCode(body)
        );
    },
    //FunctionExpression:function (FormalParameterList_opt){FunctionBody}
    "FE : function (par) {body}" : function (par, body) {
        return ES_createFunctionObject(
            par,
            body,
            ES_control.runningEC.lexicalEnvironment,
            ES_control.runningEC.isStrict || ES_Global.isStrictCode(body)
        );
    },
    //函数表达式
    //FunctionExpression:function Identifier_opt(FormalParameterList_opt){FunctionBody}
    "FE : function id(par) {body}" : function (id, par, body) {
        var funcEnv = ES_ST_LexicalEnvironment.newDeclarativeEnvironment(ES_control.runningEC.lexicalEnvironment),
            envRec = funcEnv.enviromentRecords;
        envRec.createImmutableBinding(id);
        var closure = ES_createFunctionObject(
            par,
            body,
            funcEnv,
            ES_control.runningEC.isStrict || ES_Global.isStrictCode(body)
        );
        envRec.initializeImmutableBinding(Identifier, closure);
        return closure;
    },
    "FunctionBody:SourceElements_opt" : function (SourceElements) {
        //@todo
    }
};