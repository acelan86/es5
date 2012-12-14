/**
 * 左值表达式
 */
//11.2
var ES_LeftHandSideExpressions = {
    //"PropertyAccessor" : {
        "MemberExpression:MemberExpression[Expression]" : function (MemberExpression, Expression) {
            var baseReference = ES_control.execute(MemberExpression),
                baseValue = ES_ST_Reference.getValue(baseReference),
                propertyNameReference = ES_control.execute(Expression),
                prepertyNameValue = ES_ST_Reference.getValue(propertyNameReference),
                propertyNameString = ES_Global.toString(prepertyNameValue),
                isStrict = ES_control.runningEC.isStrict;
            ES_Global.checkObjectCoercible(baseValue);
            return new ES_ST_Reference(baseValue, propertyNameString, isStrict);
        },
        "MemberExpression : IdentifierName" : function (IdentifierName) {
            return ES_ST_LexicalEnvironment.getIdentifierReference(
                ES_control.runningEC.lexicalEnvironment,
                IdentifierName,
                ES_control.runningEC.isStrict
            );
        },
    //},
    "TheNewOperator" : {
        "NewExpression:new NewExpression" : function (NewExpression) {
            var ref = ES_control.execute(NewExpression),
                constructor = ES_ST_Reference.getValue(ref);
            if (ES_Global.type(constructor) !== 'ES_LT_Object') {
                throw new TypeError();
            }
            if (constructor.__Construct__ === undefined) {
                throw new TypeError();
            }
            return constructor.__Construct__(); //@todo, 这里需要再回顾一下构造器的内容
        },
        "MemberExpression:new NewExpression Arguments" : function (NewExpression, Arguments) {
            var ref = ES_control.execute(NewExpression),
                constructor = ES_ST_Reference.getValue(ref),
                argList = ES_control.execute(Arguments);
            if (ES_Global.type(constructor) !== 'ES_LT_Object') {
                throw new TypeError();
            }
            if (constructor.__Construct__ === undefined) {
                throw new TypeError();
            }
            return constructor.__Construct__(argList);
        }
    },
    //函数调用
    //"FunctionCall" : {
        //CallExpression:MemberExpression Arguments
        "CallExpression : memberExp args" : function (memberExp, args) {
            var ref = ES_control.execute(memberExp),
                func = ES_ST_Reference.getValue(ref),
                argList = ES_control.execute(args);
            if (ES_Global.type(func) !== 'ES_LT_Object') {
                throw new TypeError();
            }
            if (ES_Global.isCallable(func) === false) {
                throw new TypeError();
            }

            //获取THIS值
            if (ES_Global.type(ref) === 'ES_ST_Reference') {
                if (ref.isPropertyReference() === true) {
                    thisValue = ref.getBase();
                } else {
                    //基值是环境记录项
                    thisValue = ref.getBase().implicitThisValue();
                }
            } else {
                thisValue = undefined;
            }
            func.__Call__(thisValue, argList);
        },
    //},
    //"ArgumentList" : {
        "Arguments : ()" : function () {
            return [];
        },
        "Arguments : (ArgumentList)" : function (ArgumentList) {
            return ES_control.execute(ArgumentList);
        },
        "ArgumentList : AssignmentExpression" : function (AssignmentExpression) {
            var ref = ES_control.execute(AssignmentExpression),
                arg = ES_ST_Reference.getValue(ref);
            return arg;
        },
        "ArgumentList : ArgumentList, AssignmentExpression" : function (ArgumentList, AssignmentExpression) {
            var precedingArgs = ES_control.execute(ArgumentList),
                ref = ES_control.execute(AssignmentExpression),
                arg = ES_ST_Reference.getValue(ref);
            return precedingArgs.push(arg);
        },
    //},
    "FunctionExpression" : {
        "MemberExpression:FunctionExpression" : function (FunctionExpression) {
            return ES_control.execute(FunctionExpression);
        }
    }
};