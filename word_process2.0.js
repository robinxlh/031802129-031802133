var json = [];
var node = {
    "name": "",
    "children": [{
        "name": "",
        "children": [],
        "Tree": 0,
        "skill": ""
    }],
    "Tree": 0, //有没有另外一棵树
    "skill": ""

};
var now1=[];   //辅助查找返回
var find1=0;  //全局，有没有找到
var Name = {};
function find(name2){
    now1=[];
    if(Name.hasOwnProperty(name2)){   //找到
        find1=1;
        finding(name2,json);
        return now1;
    }
    Name[name2]=1;
    find1=1;
    return json;    //没找到
}
function finding(name2,json1){
    if(json1.length==0){
        return;
    }
    for (var i=0;i<json1.length;i++){
        if(json1[i].name==name2){
            now1=json1[i]["children"];  //找到返回儿子数组
            find1=0;
            return ;
        }
        else {
            finding(name2,json1[i].children);
            if(find1==0){
                return ;
            }
        }
    }
}

var shuru = "导师：张三\
\n2016级博士生：天一、王二、吴五\
\n2015级硕士生：李四、王五、许六\
\n2016级硕士生：刘一、李二、李三\
\n2017级本科生：刘六、琪七、司四\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云\
\n\n\n导师：吴五\
\n2016级博士生：天一、王二、吴一\
\n2015级硕士生：李四、王五、许六\
\n2016级硕士生：刘一、李二、李三\
\n2017级本科生：刘六、琪七、司四\
\n\n刘六：JAVA、数学建模\
\n\n李二：字节跳动、京东云";

function messege() {
    var mdata = shuru;
    var trees = mdata.split("\n\n\n"); //分割树
    var position = '';
    var name = '';
    var skill = '';
    for (var i = 0; i < trees.length; i++) { //第几个树
        var page = trees[i].split("\n\n"); //分割关系与信息
        var skillman = {}; //清空技能人
        for (var j = 0; j < page.length; j++) {
            if (j == 0) { //关系
                continue; //最后执行，先获得信息
                // var rela=page[j].split('\n');    //分割行
                // for(var k=0;k<rela.length;k++){
                //     var hang=rela[k].split('：');   //注意符号中文
                //     position=hang[0];
                //     name=hang[1];
                //     if(position=="导师"){   //导师
                //         var node={
                //             "name":name,
                //             "children":[],
                //             "tree":0,
                //             "skill":""
                //         };
                //         tree[i]=node;
                //     }
                //     else {              //学生
                //         var name1=name.split("、");
                //         var node1={
                //             "name":position,
                //             "children":name1,
                //             "tree":0,
                //             "skill":""
                //         };
                //         tree[i].children[k-1]=node1;
                //     }
                // }
            } else { //人物信息   //先
                var rela = page[j].split('\n'); //分割行
                for (var k = 0; k < rela.length; k++) {
                    var hang = rela[k].split('：');
                    name = hang[0];
                    skill = hang[1];
                    skillman[name] = skill;
                }
            }
        }
        var now=[];
        var po=i;
        var rela = page[0].split('\n'); //分割行
        var number1=0;
        for (var k = 0; k < rela.length; k++) {
            var hang = rela[k].split('：'); //注意符号中文
            position = hang[0];
            name = hang[1];
            if (position == "导师") { //导师
                var node = {
                    "name": name,
                    "children": [],
                    "tree": 0,
                    "skill": ""
                };
                if (skillman.hasOwnProperty(name)) {
                    node.skill = skillman[name];
                }
                find1=0;
                now=find(name);    
                po=now.length;
                if(find1){          //没找到用json
                    now[po] = node;
                    now=now[po].children;
                }
                            //now现在是父节点的孩子节点
                // now=find(name);
                // po=now.length;
                // now[po] = node;
            } else { //学生
                number1=now.length;
                var name1 = name.split("、");
                var node1 = {        //属于级别
                    "name": position,
                    "children": [],
                    "tree": 0,
                    "skill": ""
                };
                for (var k1 = 0; k1 < name1.length; k1++) {    //学生
                    var node2 = {
                        "name": name1[k1],
                        "children": [],
                        "tree": 0,
                        "skill": ""
                    }
                    if (skillman.hasOwnProperty(name1[k1])) {    //这个学生有没有技能
                        node2.skill = skillman[name1[k1]];
                    }
                    Name[name1[k1]]=1;
                    node1.children[k1] = node2;
                }
                now[number1] = node1;
            }
        }
    }
}
messege();
for(var i=0;i<100;i++){
    var k=2;
}