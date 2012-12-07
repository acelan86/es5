/**
 * 执行上下文对象
 */
function ExecuteContext(lex, thiz) {
    this.lexicalEnvironment = lex;
    this.varEnvironment = lex;
    this.thisArg = thiz;
}