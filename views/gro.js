;
(function () {

    function Geo() {

        if (!(this instanceof Geo)) {
            return new Geo();
        }

        this.geo = navigator.geolocation;
        this.settings = {
            enableHighAccuracy: true,
            maximumAge: 1000,
            timeout: 3000
        };

    }

    Geo.prototype.find = function (cb) {
        var that = this;
        if (this.geo) {//浏览器支持geolocation
                        
            this.geo.getCurrentPosition(function(position){
                 var x = position.coords.latitude;
                 var y = position.coords.longitude;
                 cb(x,y);
                 show1.innerHTML = [x,y].join()

            }, this.fail, this.settings);

        } else {//浏览器不支持geolocation
             alert('浏览器不支持geolocation')
        }

    };

    Geo.prototype.fail = function (error) {
        switch (error.code) {
            case 1:
                alert("位置服务被拒绝");
                break;

            case 2:
                alert("暂时获取不到位置信息");
                break;

            case 3:
                alert("获取信息超时");
                break;

            case 4:
                alert("未知错误");
                break;
        }
    };

    window.Geo = function () {
        return Geo();
    };

} ());

window.onload = function () {
    
    b.onclick = getColleges;
    
    function getColleges(){
        var getAddress = new Geo();

        getAddress.find(function(x,y){

            var college = colleges
            .slice(0)
            .filter(function(item){
                return getDistance(x,y,item.a,item.b) < 20000
            })
            .map(function(item) {
                return item.c;
            });
            
            show.innerHTML = JSON.stringify(college,null,'❤')
        })
    }
    

}


// 百度地图选点，查看附近的大学


