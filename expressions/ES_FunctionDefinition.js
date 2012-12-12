/**
 * 函数定义 13
 * @type {Object}
 */
var ES_FunctionDefinition = {
    "FunctionDeclaration:function Identifier(FormalParameterList_opt){FunctionBody}" : function (Identifier, FormalParameterList, FunctionBody) {
        return ES_createFunctionObject(
            FormalParameterList,
            FunctionBody,
            ES_control.runningEC.varEnvironment,
            ES_control.runningEC.isStrict || ES_Global.isStrictFunction(FunctionBody)
        );
    },
    "FunctionExpression:function (FormalParameterList_opt){FunctionBody}" : function (FormalParameterList, FunctionBody) {
        return ES_createFunctionObject(
            FormalParameterList,
            FunctionBody,
            ES_control.runningEC.lexicalEnvironment,
            ES_control.runningEC.isStrict || ES_Global.isStrictFunction(FunctionBody)
        );
    },
    "FunctionExpression:function Identifier_opt(FormalParameterList_opt){FunctionBody}" : function (Identifier, FormalParameterList, FunctionBody) {
        var funcEnv = ES_ST_LexicalEnvironment.newDeclarativeEnvironment(ES_control.runningEC.lexicalEnvironment),
            envRec = funcEnv.enviromentRecords;
        envRec.createImmutableBinding(Identifier);
        var closure = ES_createFunctionObject(
            FormalParameterList,
            FunctionBody,
            funcEnv,
            ES_control.runningEC.isStrict || ES_Global.isStrictFunction(FunctionBody)
        );
        envRec.initializeImmutableBinding(Identifier, closure);
        return closure;
    },
    "FunctionBody:SourceElements_opt" : function (SourceElements) {
        //@todo
    }
};