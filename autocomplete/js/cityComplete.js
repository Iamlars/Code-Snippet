function CityCompelte(selector,list){
    this.cities = list;
    this.max = 10;

    Auto.call(this,selector);
    this.init();
}

CityCompelte.prototype = new Auto();
CityCompelte.prototype.constructor = CityCompelte;
CityCompelte.prototype.onInput = function(value){
    var arr = [];
    
    if(value === '-' || !value.length){
    this.list.hide();
    return false;
    }
        
    $.each(this.cities,function (i,n) {
    if(n.indexOf(value)!==-1){
        arr.push( n.split('-').shift() );
    }
    });
    
    if(!arr.length){
    this.list.html('<em>没有找到对应的城市</em>').show();
    return false;
    }
    
    if(arr.length > this.max){
    arr.length = this.max;
    }
    
    this.build(arr);
}