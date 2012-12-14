/**
 * 语句
 * @type {Object}
 */
var ES_Statements = {
    "Block" : {
        "Block:{}" : function () {
            return {
                type : 'normal',
                value : {},
                target : {}
            };
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
    "Variable" : {
        //VariableStatement:var VariableDeclarationList
        "VS : var vdl" : function (vdl) {
            ES_control.execute(vdl);
            return {
                type : "normal",
                value : {},
                target : {}
            }; 
        },
        //VariableDeclarationList:VariableDeclaration
        "VDL : vd" : function (vd) {
            ES_control.execute(vd);
        },
        //VariableDeclarationList:VariableDeclarationList, VariableDeclaration
        "VDL : vdl, vd" : function (vdl, vd) {
            ES_control.execute(vdl);
            ES_control.execute(vd);
        },
        //VariableDeclaration:Identifier
        "VD : id" : function (id) {
            return id;
        },
        //VariableDeclaration:Identifier Initialiser
        "VD : id init" : function (id, init) {
            var lhs = ES_control.execute(id), //实际为标识符查找过程,返回值为ES_ST_Reference，同11.1.2
                rhs = ES_control.execute(init),
                value = ES_ST_Reference.getValue(rhs);
            ES_ST_Reference.putValue(lhs, value);
            return Identifier;
        },
        //Initialiser:=AssignmentExpression
        "INIT : = assignExpression" : function (assignExpression) {
            return ES_control.execute(assignmentExpression);
        }
    },
    //12.3
    "Empty" : {

    },
    //12.4
    "Expression" : {

    },
    //12.5
    "if" : {

    },
    //迭代语句 12.6
    "Iteration" : {

    },
    //12.7
    "continue" : {

    },
    //12.8
    "break" : {

    },
    //12.9
    "return" : {

    },
    //12.10
    "widthStatement" : {
        "withStatement:  with (Expression) Statement" : function (Expression, Statement) {
            var val = ES_control.execute(Expression),
                obj = ES_Global.toObject(ES_ST_Reference(val)),
                oldEnv = ES_control.runningEC.lexicalEnvironment,
                newEnv = ES_ST_LexicalEnvironment.newObjectEnvironment(obj, oldEnv);

            newEnv.environmentRecords.provideThis = true;

            ES_control.runningEC.lexicalEnvironment = newEnv;
            var c = ES_control.execute(Statement);
            //若执行过程有错误抛出,c = (throw, v, enpty);
            ES_control.runningEC.lexicalEnvironment = oldEnv;
            return c;
        }
    },
    //12.11
    "switch" : {

    },
    //12.12
    "Label" : {

    },
    //12.13
    "throw" : {

    },
    //12.14
    "tryStatement" : {
        "Catch: catch (Identifier) Block" : function (Identifier, Block, c) {
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
        "Finally: finally Block" : function (Block) {
            return ES_control.execute(Block);
        }
    },
    //12.15
    "debugger" : {

    }
};