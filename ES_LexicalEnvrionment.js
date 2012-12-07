/**
 * 词法环境对象
 */
function ES_LexicalEnvironment(envRec, outerLex) {
    this.environmentRecords = envRec;
    this.outerLexicalEnvironment = outerLex;
}