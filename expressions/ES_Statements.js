/**
 * 语句
 * @type {Object}
 */
var ES_Statements = {
	"Block" : {

	},
	"VariableStatement" : {

	},
	"EmptyStatement" : {

	},
	"ExpressionStatement" : {

	},
	"ifStatement" : {

	},
	//迭代语句
	"IterationStatements" : {

	},
	"continueStatement" : {

	},
	"breakStatement" : {

	},
	"returnStatement" : {

	},
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
	"switchStatement" : {

	},
	"LabelledStatements" : {

	},
	"throwStatement" : {

	},
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
	"debuggerstatement" : {

	}
};