function EmailCompelte(selector,emails){
    this.emails = emails || [
        '@163.com' ,
        '@139.com' , 
        '@qq.com' , 
        '@sina.com' , 
        '@sohu.com' , 
        '@yeah.com' ,  
        '@126.com',
        '@hotmail.com',
        '@189.com',
        '@gmail.com',
        '@foxmail.com',
        '@21cn.com'
    ];
    Auto.call(this,selector);
    this.init();
}

EmailCompelte.prototype = new Auto();
EmailCompelte.prototype.constructor = EmailCompelte;
EmailCompelte.prototype.onInput = function(value){
    var arr = [],
        hasAt = value.indexOf('@');
    
    if(!value.length){
    this.list.hide();
    return false;
    }
    
    // 已经输入了@
    if(hasAt > -1){
    var str = value.substr(0,hasAt),
        domain = value.substr(hasAt);

    $.each(this.emails,function(i,n){
        if(n.indexOf(domain) >-1 ){
        arr.push( str+n );
        }	
    });
    
    }else{
    $.each(this.emails,function(i,n){
        arr.push( value+n );
    });
    }

    this.build(arr);
}

EmailCompelte.prototype.closeList = function(string){
    var that = this;
    
    $(document).off('click.close-email');
    $(document).on('click.close-email',function(e){
    var targetID = e.target.id;
    if(targetID !== that.id && targetID!==that.inputID){
        that.list.hide();
    }
    });
    
}