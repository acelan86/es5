/**
 * 主值表达式
 * @type {Object}
 */
//11.1
var ES_PrimaryExpressions = {
    //this 11.11.1
    thiz : function () {
        return ES_control.runningEC.thisBinding;
    },
    //标识符引用11.11.2
    Identifier : function (identifier) {
        var lex = ES_control.runningEC.lexicalEnvironment,
            strict = ES_control.runningEC.isStrict;
        return ES_LexicalEnvironment.getIdentifierReference(lex, identifier, strict);
    },
    //字面量11.1.3
    Literal : {
        NullLiteral : null,
        BooleanLiteral : [true, false],
        NumericLiteral : 0, //数字
        StringLiteral : "", //字符串
        RegExpLiteral : new RegExp(), //正则
    },
    //11.1.4
    ArrayInitialiser : {
        //ArrayLiteral : [Elision_opt]
        "ArrayLiteral:[Elision_opt]" : function (Elision) {
            var arr = ES_arrayConstructor._new(), //new Array()
                pad = ES_control.execute(Elision) || 0; //解释执行Elision_opt
            arr.__Put__('es_length', pad, false);
            return arr;
        },
        "ArrayLiteral:[ElementList]" : function (ElementList) {
            return ES_control.execute(ElementList);
        },
        "ArrayLiteral:[ElementList, Elision_opt]" : function (ElementList, Elision) {
            var arr = ES_control.execute(ElementList),
                pad = ES_control.execute(Elision) || 0,
                len = arr.__Get__('es_length');
            arr.__Put__('es_length', ES_Global.toUint32(pad + len), false);
            return arr;
        },

        "ElementList:Elision_optAssignmentExpression" : function (Elision, AssignmentExpression) {
            var arr = ES_arrayConstructor._new(),
                firstIndex = ES_control.execute(Elision) || 0,
                initResult = ES_control.execute(AssignmentExpression),
                initValue = ES_ST_Reference.getValue(initResult);
            arr.__DefineOwnProperty__(
                ES_Global.toString(firstIndex),
                new ES_ST_PropertyDescriptor({
                    __Value__ : initValue,
                    __Writable__ : true,
                    __Enumerable__ : true,
                    __Configurable__ : true
                }),
                false
            );
            return arr;
        },
        "ElementList:ElementList, Elision_optAssignmentExpression" : function (ElementList, Elision, AssignmentExpression) {
            var arr = ES_control.execute(ElementList),
                pad = ES_control.execute(Elision) || 0,
                initResult = ES_Global.execute(AssignmentExpression),
                initValue = ES_ST_Reference.getValue(initResult),
                len = arr.__Get__('es_length');

            arr.__DefineOwnProperty__(
                ES_Global.toString(ES_Global.toUint32(pad + len)),
                new ES_ST_PropertyDescriptor({
                    __Value__ : initValue,
                    __Writable__ : true,
                    __Enumerable__ : true,
                    __Configurable__ : true
                }),
                false
            );
            return arr;
        },

        "Elision:," : function () {
            return 1;
        },
        "Elision:Elision" : function (Elision) {
            var preceding = ES_control.execute(Elision);
            return preceding + 1;
        }
    },
    //11.1.5
    ObjectInitialiser : {
        "ObjectLiteral:{}" : function () {
            return ES_objectConstructor._new();
        },
        "ObjectLiteral:{PropertyNameAndValueList}" : function (PropertyNameAndValueList) {
            return ES_control.execute(PropertyNameAndValueList);
        },
        "PropertyNameAndValueList:PropertyAssignment" : function (PropertyAssignment) {
            var obj = ES_objectConstructor._new(),
                propId = ES_control.execute(PropertyAssignment);
            obj.__DefineOwnProperty__(
                propId.name,
                propId.descriptor,
                false
            );
            return obj;
        },
        "PropertyNameAndValueList:PropertyNameAndValueList,PropertyAssignment" : function (PropertyNameAndValueList, PropertyAssignment) {
            var obj = ES_control.execute(PropertyNameAndValueList),
                propId = ES_control.execute(PropertyAssignment),
                previous = obj.__GetOwnProperty__(propId.name);
            if (previous !== undefined) {
                if (
                    (ES_control.runningEC.isStrict && ES_ST_PropertyDescriptor.isDataDescriptor(previous) === true && ES_ST_PropertyDescriptor.isDataDescriptor(propId.descriptor) === true)
                    || (ES_ST_PropertyDescriptor.isDataDescriptor(previous) === true && ES_ST_PropertyDescriptor.isAccessorDescriptor(propId.descriptor) === true)
                    || (ES_ST_PropertyDescriptor.isAccessorDescriptor(previous) === true && ES_ST_PropertyDescriptor.isDataDescriptor(propId.descriptor) === true)
                    || (ES_ST_PropertyDescriptor.isAccessorDescriptor(previous) === true && ES_ST_PropertyDescriptor.isAccessorDescriptor(propId.descriptor) === true && (('undefined' !== typeof previous.__Get__ && 'undefined' !== typeof propId.descriptor.__Get__) || ('undefined' !== typeof previous.__Set__ && 'undefined' !== typeof propId.descriptor.__Set__)))
                ) {
                    throw new SyntaxError();
                }
            }
            //怎么感觉这里需要返回啥，ecma没说？
        },
        "PropertyAssignment:PropertyName:AssignmentExpression" : function (PropertyName, AssignmentExpression) {
            var propName = ES_control.execute(PropertyName),
                exprValue = ES_control.execute(AssignmentExpression),
                propValue = ES_ST_Reference.getValue(exprValue),
                desc = new ES_ST_PropertyDescriptor({
                    __Value__ : propValue,
                    __Writable__ : true,
                    __Enumerable__ : true,
                    __Configurable__ : true
                });
            return new ES_ST_PropertyIdentifier(propName, desc);
        },
        "PropertyAssignment:get PropertyName () {FunctionBody}" : function (PropertyName, FunctionBody) {
            var propName = ES_control.execute(PropertyName),
                closure = ES_createFunctionObject("", FunctionBody, ES_control.runningEC.lexicalEnvironment, ES_Global.isStrictFunction(FunctionBody)),
                desc = new ES_ST_PropertyDescriptor({
                    __Get__ : closure,
                    __Enumerable__ : true,
                    __Configurable__ : true
                });
            return new ES_ST_PropertyIdentifier(propName, desc);
        },
        "PropertyAssignment:set PropertyName (PropertySetParameterList) {FunctionBody}" : function (PropertyName, PropertySetParameterList, FunctionBody) {
            var propName = ES_control.execute(PropertyName),
                closure = ES_createFunctionObject(PropertySetParameterList, FunctionBody, ES_control.runningEC.lexicalEnvironment, ES_Global.isStrictFunction(FunctionBody)),
                desc = new ES_ST_PropertyDescriptor({
                    __Set__ : closure,
                    __Enumerable__ : true,
                    __Configurable__ : true
                });
            return new ES_ST_PropertyIdentifier(propName, desc);
        },
        "PropertyName:IdentifierName" : function (IdentifierName) {
            return IdentifierName;
        },
        "PropertyName:StringLiteral" : function (StringLiteral) {
            return StringLiteral.SV; //StringValue
        },
        "PropertyName:NumericLiteral" : function (NumericLiteral) {
            var nbr = NumericLiteral.NV;
            return ES_Global.toString(nbr);
        }
    },
    //11.1.6
    GroupingOperator : {
        "PrimaryExpressions:(Expressions)" : function (Expressions) {
            return ES_control.execute(Expressions);
        }
    }
    // @todo Expression : 
};

