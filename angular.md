##<center>Angular Study Materials
1.	过滤器可以使用自定义函数，如：

		
        {{ ['Ari','likes','to','travel'] | filter:isCapitalized }}
        $scope.isCapitalized = function(str) {
            return str[0] == str[0].toUpperCase();
        };
    
2.	input表单验证属性（可以先使用html5的约束，如`type='email|number|url...'）`：`ng-required` `ng-minlength` `ng-maxlength` `ng-pattern` 及自定义指令derective验证
3.	form.inputFieldName属性，有`$pristine` and `$dirty`, `$invalid` and `$valid`. `$error`
4.	css样式：`.ng-pristine, .ng-dirty, .ng-valid, .ng-invalid`