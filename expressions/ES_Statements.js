/**
 * 语句
 * @type {Object}
 */
var ES_Statements = {
    "Block" : {
        "Block:{}" : function () {
            return ['normal', {}, {}];
        },
        "Block:{StatementList}" : function (StatementList) {
            return ES_control.execute(StatementList);
        },
        "StatementList:Statement" : function (Statement) {
            var s = ES_Global.execute(Statement);
            if (ES_Global.isThrowCode(s.type)) {
                return ["throw", s[1], {}];
            }
            return s;
        },
        "StatementList:StatementList Statement" : function (StatementList, Statement) {
            var sl = ES_Global.execute(StatementList);
            //@todo 12.1
        }
    },
    //12.2
    "VariableStatement" : {
        "VariableStatement:var VariableDeclarationList" : function (VariableDeclarationList) {
            ES_control.execute(VariableDeclarationList);
            return ["normal", "", ""]; //“”代表empty
        },
        "VariableDeclarationList:VariableDeclaration" : function (VariableDeclaration) {
            ES_control.execute(VariableDeclaration);
        },
        "VariableDeclarationList:VariableDeclarationList, VariableDeclaration" : function (VariableDeclarationList, VariableDeclaration) {
            ES_control.execute(VariableDeclarationList);
            ES_control.execute(VariableDeclaration);
        },
        "VariableDeclaration:Identifier" : function (Identifier) {
            return Identifier;
        },
        "VariableDeclaration:Identifier Initialiser" : function (Identifier, Initialiser) {
            var lhs = ES_control.execute(Identifier), //实际为标识符查找过程,返回值为ES_ST_Reference，同11.1.2
                rhs = ES_control.execute(Initialiser),
                value = ES_ST_Reference.getValue(rhs);
            ES_ST_Reference.putValue(lhs, value);
            return Identifier;
        },
        "Initialiser:=AssignmentExpression" : function (AssignmentExpression) {
            return ES_control.execute(AssignmentExpression);
        }
    },
    //12.3
    "EmptyStatement" : {

    },
    //12.4
    "ExpressionStatement" : {

    },
    //12.5
    "ifStatement" : {

    },
    //迭代语句 12.6
    "IterationStatements" : {

    },
    //12.7
    "continueStatement" : {

    },
    //12.8
    "breakStatement" : {

    },
    //12.9
    "returnStatement" : {

    },
    //12.10
    "withStatement" : {
        "withStatement:with(Expression)Statement" : function (Expression, Statement) {
            var val = ES_control.execute(Expression),
                obj = ES_Global.toObject(ES_ST_Reference(val)),
                oldEnv = ES_control.runningEC.lexicalEnvironment,
                newEnv = ES_ST_LexicalEnvironment.newObjectEnvironment(obj, oldEnv);
            newEnv.provideThis = true;
            ES_control.runningEC.lexicalEnvironment = newEnv;
            var c = ES_control.execute(Statement);
            //若执行过程有错误抛出,c = (throw, v, enpty);
            ES_control.runningEC.lexicalEnvironment = oldEnv;
            return c;
    },
    //12.11
    "switchStatement" : {

    },
    //12.12
    "LabelledStatements" : {

    },
    //12.13
    "throwStatement" : {

    },
    //12.14
    "tryStatement" : {
        "Catch:catch(Identifier)Block" : function (Identifier, Block, c) {
            //c是由throw传过来的
            var oldEnv = ES_control.runningEC.lexicalEnvironment,
                catchEnv = ES_ST_LexicalEnvironment.newDeclarativeEnvironment(oldEnv);
            catchEnv.createMutableBinding(Identifier);
            catchEnv.setMutableBinding(Identifier, c, false);
            ES_control.runningEC.lexicalEnvironment = catchEnv;
            var b = ES_control.execute(Block);
            ES_control.runningEC.lexicalEnvironment = oldEnv;
            return b;
        },
        "Finally:finally Block" : function (Block) {
            return ES_control.execute(Block);
        }
    },
    //12.15
    "debuggerstatement" : {

    }
};