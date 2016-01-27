##<center>Angular Study Materials
1.	过滤器可以使用自定义函数，如：

		
        {{ ['Ari','likes','to','travel'] | filter:isCapitalized }}
        $scope.isCapitalized = function(str) {
            return str[0] == str[0].toUpperCase();
        };
    
2.	