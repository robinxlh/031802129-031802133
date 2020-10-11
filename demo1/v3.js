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
var now1 = []; //辅助查找返回
var find1 = 0; //全局，有没有找到
var Name = {};

function find(name2) {
    now1 = [];
    if (Name.hasOwnProperty(name2)) { //找到
        find1 = 1;
        finding(name2, json);
        return now1;
    }
    Name[name2] = 1;
    find1 = 1;
    return json; //没找到
}

function finding(name2, json1) {
    if (json1.length == 0) {
        return;
    }
    for (var i = 0; i < json1.length; i++) {
        if (json1[i].name == name2) {
            now1 = json1[i]["children"]; //找到返回儿子数组
            find1 = 0;
            return;
        } else {
            finding(name2, json1[i].children);
            if (find1 == 0) {
                return;
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

function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function messege() {
    var mdata = document.getElementById("rk").value;
    // var mdata=shuru;
    var n = document.getElementById('tree').childNodes.length;
    for (var i = n - 1; i >= 0; i--) {
        document.getElementById('tree').removeChild(
            document.getElementById('tree').childNodes[i]);
    }
    var n = document.getElementById('tree').childNodes.length;
    for (var i = 0; i < n; i++) {
        document.getElementById('tree').removeChild(
            document.getElementById('tree').childNodes[i]);
    }
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
            } else { //人物信息   //先
                var rela = page[j].split('\n'); //分割行
                for (var k = 0; k < rela.length; k++) {
                    var hang = rela[k].split('：');
                    name = Trim(hang[0]);
                    skill = Trim(hang[1]);
                    skillman[name] = skill;
                }
            }
        }
        var now = [];
        var po = i;
        var rela = page[0].split('\n'); //分割行
        var number1 = 0;
        for (var k = 0; k < rela.length; k++) {
            var hang = rela[k].split('：'); //注意符号中文
            position = Trim(hang[0]);
            name = Trim(hang[1]);
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
                find1 = 0;
                now = find(name);
                po = now.length;
                if (find1) { //没找到用json
                    now[po] = node;
                    now = now[po].children;
                }
                //now现在是父节点的孩子节点
                // now=find(name);
                // po=now.length;
                // now[po] = node;
            } else { //学生
                number1 = now.length;
                var name1 = name.split("、");
                var node1 = { //属于级别
                    "name": position,
                    "children": [],
                    "tree": 0,
                    "skill": ""
                };
                for (var k1 = 0; k1 < name1.length; k1++) { //学生
                    name1[k1] = Trim(name1[k1]);
                    var node2 = {
                        "name": name1[k1],
                        "children": [],
                        "tree": 0,
                        "skill": ""
                    }
                    if (skillman.hasOwnProperty(name1[k1])) { //这个学生有没有技能
                        node2.skill = skillman[name1[k1]];
                    }
                    Name[name1[k1]] = 1;
                    node1.children[k1] = node2;
                }
                now[number1] = node1;
            }
        }
    }
    var json_str = JSON.stringify(json[0]);
    console.log(json_str);
    for (var i = 0; i < json.length; i++) { //生成多颗树
        init1(i);
    }

    Name = {}; //防止干扰下一次提交
    json = [];
}
var body1 = document.getElementsByTagName("body")[0];

function init1(tn) {
    var margin = [20, 120, 20, 120],
        width = document.getElementById("tree").offsetWidth,
        height = document.getElementById("tree").offsetHeight;
    //设置树的属性
    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) {
            return [d.y, d.x];
        });

    var zoom = d3.behavior.zoom().scaleExtent([0.1, 100]).on("zoom", zoomed); //添加放大缩小事件

    var svg = d3.select("body").select("#tree").append("svg")
        .call(zoom) //给svg绑定zoom事件
        .append("g")
        .call(zoom) //给g绑定zoom事件
        .append("g")
        .attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");


    root = json[tn];
    root.x0 = height / 2;
    root.y0 = 0;

    // function collapse(d) {          //树初始化折叠，还是别开了
    //     if (d.children) {
    //         d._children = d.children;
    //         d._children.forEach(collapse);
    //         d.children = null;
    //     }
    // }

    // root.children.forEach(collapse);
    update(root);

    function zoomed() {
        svg.attr("transform",
            "translate(" + zoom.translate() + ")" +
            "scale(" + zoom.scale() + ")"
        );
    }

    function update(source) {

        // Compute the new tree layout.  
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.  
        nodes.forEach(function(d) {
            d.y = d.depth * 180;
        });

        // Update the nodes…  
        var node = svg.selectAll("g.node")
            .data(nodes, function(d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.  
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
        
            .attr("title", function(d) {
                if (d.skill.length == 0) {
                    return "对不起，此人没有添加详细信息";
                } 
                else return d.skill;
            })
            .on("mouseover", function(d) { //鼠标移上事件
                // this.append('<div id="tooltip">' + '123' + "</div>"); //创建提示框,添加到页面中
                var div = document.createElement("div");
                div.id = "tooltip";
                div.textContent = this.getAttribute("title");
                // this.appendChild(div);
                body1.appendChild(div);
                var posX = 0,
                    posY = 0;
                var event = event || window.event;
                if (event.pageX || event.pageY) {
                    posX = event.pageX;
                    posY = event.pageY;
                } else if (event.clientX || event.clientY) {
                    posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
                    posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
                }
                // $("#tree").appendChild(div);
                $("#tooltip").css({
                        // left: (d.x + 30) + "px",
                        // top: d.y + "px",
                        left: (posX + 30) + "px",
                        top: posY + "px",
                        opacity: "0.8"
                    }).show(250) //设置提示框的坐标，并显示
            })
            .on("mouseout", function(d) {
                $("#tooltip").remove();
            })
            // .attr("onmouseover",function(d){
            //     var p = document.createElement("p");  //创建段落节点
            //     var txt = document.createTextNode(d.skill);  //创建文本节点，文本内容为“盒模型”
            //     p.appendChild(txt);  //把文本节点增加到段落节点中
            //     this.append(p);
            // })
            .on("click", click);



        //节点图形    
        nodeEnter.append("circle")
            .attr("r", 1e-6)    //da
            .style("fill", function(d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        //标签    
        nodeEnter.append("text")
            .attr("x", function(d) {
                return d.children || d._children ? -10 : 10;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            // .attr("title",function(d){
            //     if(d.skill.length==0){
            //         return "sorry,void";
            //     }
            //     else return d.skill;
            // })
            // .attr("onmouseover",function(d){

        // })
        .text(function(d) {
                return d.name;
            })
            .style("fill-opacity", 1e-6);

        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", 9.5)
            // .attr("r", 1e-6)
            .style("fill", function(d) {
                // if(d._children)return "ligtsteelblue";
                // else {
                //     // if(d.skill.length)return "#cda";
                //     // else return "#fff";
                //     return "#fff";
                // }
                // return d._children ? "lightsteelblue" : "#fff";
                return d._children ? "#5df" :d.skill.length?"#fff":"##00FF004";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        var link = svg.selectAll("path.link")
            .data(links, function(d) {
                return d.target.id;
            });

        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {
                    x: source.x0,
                    y: source.y0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });

        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();

        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

}