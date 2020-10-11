const { assert } = require('chai');
var messege = require('../messege.js');
var expect = require('chai').expect;
var test1 = "导师：张三\
\n2016级博士生：天一、王二、吴五\
\n2015级硕士生：李四、王五、许六\
\n2016级硕士生：刘一、李二、李三\
\n2017级本科生：刘六、琪七、司四\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";

var test2 = "导师：XLH\
\n2016级博士生：天一、王二、吴五\
\n2015级硕士生：李四、王五、许六\
\n2016级硕士生：刘一、李二、李三\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云\
\n\n李二：字节跳动、京东云";


var test3 = "导师：张三\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";

var test4 = "导师：张三\
\n2016级博士生：\
\n2015级硕士生：\
\n2016级硕士生：\
\n2017级本科生：\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";

var test5 = "导师：张三\
\n2016级博士生：天一、王二、吴五\
\n2015级硕士生：李四、王五、许六\
\n2016级硕士生：刘一、李二、李三\
\n2017级本科生：刘六、琪七、司四\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";
describe('数据生成树测试', function() {
    it('测试样例一', function() {
        assert.equal(messege(test1), test1);

    });
    it('测试样例二', function() {
        assert.equal(messege(test2), test2);

    });
    it('测试样例三', function() {
        assert.equal(messege(test3), test3);

    });
    it('测试样例四', function() {
        assert.equal(messege(test4), test4);

    });
    it('测试样例五', function() {
        assert.equal(messege(test5), test5);

    });
});