/**
 * 词法环境对象
 */
function ES_ST_LexicalEnvironment(envRec, outerLex) {
    this.environmentRecords = envRec;
    this.outerLexicalEnvironment = outerLex;
}

/**
 * 获取词法环境(lex)中某变量(name)的引用
 * @param  {ES_ST_LexicalEnvironment}   lex     词法环境
 * @param  {String}                     name    变量名
 * @param  {Boolean}                    strict  是否严格模式
 * @return {ES_ST_Reference}                    引用
 */
ES_ST_LexicalEnvironment.getIdentifierReference = function (lex, name, strict) {
    if (lex === null) {
        return new ES_ST_Reference(undefined, name, strict);
    }
    var envRec = lex.environmentRecords;
    if (envRec.hasBinding(name)) {
        return new ES_ST_Reference(envRec, name, strict);
    }
    return ES_ST_LexicalEnvironment.getIdentifierReference(lex.outerLexicalEnvironment, name, strict);
};

/**
 * 新建一个声明式词法环境
 * @param  {ES_ST_LexicalEnvironment}   outerlex    外部词法环境
 * @return {ES_ST_LexicalEnvironment}               新建的声明式词法环境
 */
ES_ST_LexicalEnvironment.newDeclarativeEnvironment = function (outerlex) {
    var envRec = new DeclarativeEnvironmentRecords();
    return new ES_ST_LexicalEnvironment(envRec, outerlex);
};

/**
 * 新建一个对象式词法环境
 * @param  {ES_LT_Object}               o        绑定对象
 * @param  {ES_ST_LexicalEnvironment}   outerlex 外部词法环境
 * @return {ES_ST_LexicalEnvironment}            新建的对象式词法环境
 */
ES_ST_LexicalEnvironment.newObjectEnvironment = function (o, outerlex) {
    var envRec = new ObjectEnvironmentRecords(o);
    return new ES_ST_LexicalEnvironment(envRec, outerlex);
};

