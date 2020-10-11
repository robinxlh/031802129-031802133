## 使用方式

- 下载demo1文件夹到本地，打开文件中的index.html的文件
- 往右边文本框内输入指定格式的关系和信息提交即可  
### 输入文本格式
- 第一行输入导师，其后每个回车行输入‘’级别：学生‘’，输入每行人物信息时，与上面信息相隔一个空行。当输入第二个以上关系时，导师行与之前的信息相隔两个空行，其余同上类推。
例如：
```
导师： 张三
2016 级博士生： 天一、 王二、 吴五
2015 级硕士生： 李四、 王五、 许六
2016 级硕士生： 刘一、 李二、 李三
2017 级本科生： 刘六、 琪七、 司四

刘六： JAVA、 数学建模

李二： 字节跳动、 京东云


导师： 天一
2016 级博士生： 天二、 王二、 吴五
2015 级硕士生： 李四、 王五、 许六
2016 级硕士生： 刘一、 李二、 李三
2017 级本科生： 刘六、 琪七、 司四

刘六： JAVA、 数学建模

李二： 字节跳动、 京东云
```
- 注意最后一行不能有回车

### 输出操作
- 节点蓝色说明节点可点击延展，节点之后还有子树，节点黑色说明节点没有添加详细信息，节点白色说明节点有添加详细信息，可查看
- 鼠标点击节点可以收缩其子节点
- 鼠标移动到节点上即可查看添加的详细信息
- 鼠标对树点击长按可以对树拖拽移动
- 鼠标对树滑动滚轮可以对树进行放大缩小
