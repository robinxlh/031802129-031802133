const { assert } = require('chai');
var messege = require('../messege.js');
var expect = require('chai').expect;
var test1 = "导师： ZZZ\
\n2016 级博士生： 天二、 王二、 吴五\
\n2015 级硕士生： 李四、 王五、 许六\
\n2016 级硕士生： 刘一、 李二、 李三\
\n2017 级本科生： 刘六、 琪七、 司四\
\n\n刘六： JAVA、 数学建模\
\n\n李二： 字节跳动、 京东云";

var test2 = "导师：XLH\
\n2016级博士生：天一、王二、吴五\
\n2015级硕士生：李四、王五、许六\
\n2016级硕士生：刘一、李二、李三\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云\
\n\n李二：字节跳动、京东云";


var test3 = "导师：WHQ\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";

var test4 = "导师：YH\
\n2016级博士生：\
\n2015级硕士生：\
\n2016级硕士生：\
\n2017级本科生：\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";

var test5 = "导师：WPH\
\n2016级博士生：天一、王二、吴五\
\n2015级硕士生：李四、王五、许六\
\n2016级硕士生：刘一、李二、李三\
\n2017级本科生：刘六、琪七、司四\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";
ans1 = { "name": "ZZZ", "children": [{ "name": "2016 级博士生", "children": [{ "name": "天二", "children": [], "tree": 0, "skill": "" }, { "name": "王二", "children": [], "tree": 0, "skill": "" }, { "name": "吴五", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2015 级硕士生", "children": [{ "name": "李四", "children": [], "tree": 0, "skill": "" }, { "name": "王五", "children": [], "tree": 0, "skill": "" }, { "name": "许六", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2016 级硕士生", "children": [{ "name": "刘一", "children": [], "tree": 0, "skill": "" }, { "name": "李二", "children": [], "tree": 0, "skill": "字节跳动、 京东云" }, { "name": "李三", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2017 级本科生", "children": [{ "name": "刘六", "children": [], "tree": 0, "skill": "JAVA、 数学建模" }, { "name": "琪七", "children": [], "tree": 0, "skill": "" }, { "name": "司四", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }], "tree": 0, "skill": "" };
ans2 = { "name": "XLH", "children": [{ "name": "2016级博士生", "children": [{ "name": "天一", "children": [], "tree": 0, "skill": "" }, { "name": "王二", "children": [], "tree": 0, "skill": "" }, { "name": "吴五", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2015级硕士生", "children": [{ "name": "李四", "children": [], "tree": 0, "skill": "" }, { "name": "王五", "children": [], "tree": 0, "skill": "" }, { "name": "许六", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2016级硕士生", "children": [{ "name": "刘一", "children": [], "tree": 0, "skill": "" }, { "name": "李二", "children": [], "tree": 0, "skill": "字节跳动、京东云" }, { "name": "李三", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }], "tree": 0, "skill": "" };
ans3 = { "name": "WHQ", "children": [], "tree": 0, "skill": "" };
ans4 = { "name": "YH", "children": [{ "name": "2016级博士生", "children": [{ "name": "", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2015级硕士生", "children": [{ "name": "", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2016级硕士生", "children": [{ "name": "", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2017级本科生", "children": [{ "name": "", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }], "tree": 0, "skill": "" };
ans5 = { "name": "WPH", "children": [{ "name": "2016级博士生", "children": [{ "name": "天一", "children": [], "tree": 0, "skill": "" }, { "name": "王二", "children": [], "tree": 0, "skill": "" }, { "name": "吴五", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2015级硕士生", "children": [{ "name": "李四", "children": [], "tree": 0, "skill": "" }, { "name": "王五", "children": [], "tree": 0, "skill": "" }, { "name": "许六", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2016级硕士生", "children": [{ "name": "刘一", "children": [], "tree": 0, "skill": "" }, { "name": "李二", "children": [], "tree": 0, "skill": "字节跳动、京东云" }, { "name": "李三", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }, { "name": "2017级本科生", "children": [{ "name": "刘六", "children": [], "tree": 0, "skill": "JAVA、数学建模" }, { "name": "琪七", "children": [], "tree": 0, "skill": "" }, { "name": "司四", "children": [], "tree": 0, "skill": "" }], "tree": 0, "skill": "" }], "tree": 0, "skill": "" };
ans1 = JSON.stringify(ans1);
ans2 = JSON.stringify(ans2);
ans3 = JSON.stringify(ans3);
ans4 = JSON.stringify(ans4);
ans5 = JSON.stringify(ans5);
describe('数据生成树测试', function() {
    it('测试样例一', function() {
        assert.equal(messege(test1), ans1);

    });
    it('测试样例二', function() {
        assert.equal(messege(test2), ans2);

    });
    it('测试样例三', function() {
        assert.equal(messege(test3), ans3);

    });
    it('测试样例四', function() {
        assert.equal(messege(test4), ans4);

    });
    it('测试样例五', function() {
        assert.equal(messege(test5), ans5);

    });
});