ES5.1
===
这不是一个可用的项目，只是用javascript来描述ES5.1的内容

约定：
==
1. 'undefined' !== typeof XXX 标识XXX不存在
2. 用__Xxx__ 来替代ES5描述中的[[Xxx]]内部属性或方法
3. 用_xxx 来定义为了实现语言描述额外加上的变量或方法，非ES规范描述的内容

类型：
==
1. ES_LT_XXX 语言类型 (包括Undefined, Null, Boolean, String, Number, Object)
2. ES_ST_XXX 规范类型 (包括Refrence, List, Completion, PropertyDescriptor, PropertyIdentifier, LexicalEnvironment, EnvironmentRecords)
3. ES_O_XXX 对象
4. ES_C_XXX 构造器
5. ES_BI_XXX 内建对象