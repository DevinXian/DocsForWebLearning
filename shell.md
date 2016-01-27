#<center>Shell学习
###一、牛刀小试

1.	设置颜色`\e[1;31m` 设置echo字体颜色，3x字色，4x背景色。`\e[0m`取消颜色设置（重置）
2.  查看进程环境变量：`cat /proc/$PID/environ `$PID是当前进程id
3.  获取进程id：pgrep + 程序名，如：`pgrep mongod/gedit`
4.  格式化2结果： `cat /proc/$pid/environ | tr '\0' '\n` 一行一个键值对
5.  输入变量：`echo $var` 或 `echo ${var}`；
6.  printf/echo中双引号内可以使用5中的格式输出
7.  export VAR 设置环境变量，如:`export PATH="$PATH:XXXXXX"`
8.  获取变量length: `echo ${#var}`其中var是变量名
9.  获取shell版本`echo $SHELL`，如`/usr/bin/zsh`；同`echo $0`，后者只显示简称，如 zsh
10. 查看当前用户是否是root,`echo $UID`,0为root，余则不是
11. bash提示符为PS1，如`cat ~/.bashrc |grep PS1`
12. 基本整数运算let [] (())  expr
	let用法：`no1=4;no2=5;let result=no1+no2; echo $result`;`let no1++/--`;`let no+= 6`
    []用法：`result = $[no1 + no2];result=[$no1 + 1]`
    (())用法：必须加$，如:`$((no2 + 50))`
    expr用法： <code>result=\`expr 3 + 4\`</code>  注意expr后面，数字和符号之间要有**空格**; `result=$(expr $no1 + 5)`
13. 高级运算器bc，如：`echo "4 * 0.56" | bc`; <code>let no=54; result = echo "$no * 1.5"|bc\;echo $result;</code>
	设置精度： `echo "scale=2; 3/8" | bc` 结果 0.37
    进制转换： `no=100;echo "obase=2;$no" | bc;` `no=1100100; echo "obase=10;ibase=2;$no" | bc`
    平方/开方： `echo "sqrt(100)" | bc` `echo "10^10" | bc`
14.	文件描述符 stdin---0 stdout---1 stderr---2;如`echo somevar/cat somefile >/>> filename`重定向输入
	命令错误，返回非0状态，通过$?获取;/dev/null丢弃任何输入其中的东西
    输出到文件`cmd 2>stderr.txt 1>stdout.txt`;stderr输出到stdout: `cmd 2>&1 output.txt` 或`cmd &> output.txt`
    屏蔽stderr不输出的方法：`cat filename_not_permitted 2>err.txt` or `cat xxx 2> /dev/null` 
    stdin的副本命令`tee`，如：`cat * | tee out.txt | cat -n` 如果`cat *`报错,只会由tee把stdin打印到out.txt,stderr会被tee忽略；通过tee复制了一份stdin（即输入到out.txt的内容）给后续的命令（cat）
    使用-将stdin作为命令参数，如`echo who is this | tee -`；也可以是`/dev/stdin`或`/dev/stdout`
    文件重定向到命令，如`cat<test.txt`; 脚本中向文件输入脚本内容块，如：
            #!/bin/bash
            cat << EOF>log.txt
            LOG FILE HEADER
            This is a test log file
            Function: System statistics
            EOF
    
15.	自定义文件描述符:exec。追加>>/截断>/只读<, 如：
			exec 3 < input.txt #使用文件描述符3打开并读取文件
            echo "some string" > input.txt
            echo <& 3 #<&必须相连，使用3来读取文件，只能使用一次
            ## 截断
            exec 4>input.txt
            echo 'some content' >& 4
            cat output.txt
            ## 追加
            exec 5>>input.txt
            echo append line >& 5
            cat output.txt
            ##output: some content\n append line
16.	数组 `arr=(1 2 3)`或`arr[0]='index1'...`;`echo $arr;echo ${arr[0]}; echo ${arr[*]}`;注意bash下标从0，zsh是1？
17.	关联数组：声明方法为`declare -A arr_name`.索引=值 赋值；内嵌索引赋值，如`arr=([index1]=val1 [index2]=var2)`;列出索引：`${!arr[* or @]}`;列出值，去掉`!`即可
18.	别名alias new_cmd='command sequence',可以`echo 'alias cmd="command seq"' >> ~/.bashrc`放入环境变量;对应`unalias`；注意转义
19.	终端信息：tput和stty

###二、