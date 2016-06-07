# 列表自动补全

基于`jquery`

## [Live Demo](http://lewo.coding.me/Code-Snippet/autocomplete/autocomplete.html)

写了email后缀补全和城市列表筛选两个demo，都继承并扩展了同一个类，详见代码，
效果图：

### email后缀补全
    $('.mails input').each(function(){
      new EmailCompelte($(this));
    });
     
    或者：
    
    $.fn.emailCompelte = function(){
      this.each(function(){
        new EmailCompelte($(this));  
      }) 
    };
    
    $('.mails input').emailCompelte();

![email后缀补全](./images/email.png)

### 城市列表筛选 
    var cityList = [
      "阿勒泰-aletai-alt",
      "安康-ankang-ak",
      ...
      "遵义-zunyi-zy"
    ];

    $('.cities input').each(function(){
      new CityCompelte($(this),cityList);
    });
![城市列表筛选](./images/other.png)
  
