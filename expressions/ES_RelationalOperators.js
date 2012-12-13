/**
 * 关系/比较运算符
 */
var ES_RelationalOperators = {
	"<" : {

	},
	">" : {

	},
	"<=" : {

	},
	">=" : {

	},
	"instanceof" : {
		"RelationalExpression:RelationalExpression instanceof ShiftExpression" : function (RelationalExpression, ShiftExpression) {
			var lref = ES_Global.execute(RelationalExpression),
				lval = ES_ST_Reference.getValue(lref),
				rref = ES_Global.execute(ShiftExpression),
				rval = ES_ST_Reference.getValue(rref);
			if (ES_Global.type(rval) !== 'ES_LT_Object') {
				throw new TypeError();
			}
			if ('undefined' === typeof rval.__HasInstance__) {
				throw new TypeError();
			}
			return rval.__HasInstance__(lval);
		}
	},
	"in" : {
		"RelationalExpression:RelationalExpression in ShiftExpression" : function (RelationalExpression, ShiftExpression) {
			var lref = ES_Global.execute(RelationalExpression),
				lval = ES_ST_Reference.getValue(lref),
				rref = ES_Global.execute(ShiftExpression),
				rval = ES_ST_Reference.getValue(rref);
			if (ES_Global.type(rval) !== 'ES_LT_Object') {
				throw new TypeError();
			}
			return rval.__HasProperty__(ES_Global.toString(lval));
		}
	}
};