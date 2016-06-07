function Auto(selector){
	this.input = selector;
	this.listID = '';
  this.inputID = '';
	this.list = '';
}

Auto.prototype.init = function(){
  var random = 'id'+Math.random();
  
	this.listID = 'listid'+Math.random();
  this.inputID = this.input.attr('id') || (this.input.attr('id',random),random);
	this.list = $('<div id="'+this.listID+'" class="auto-complete-list"></div>');
  
	this.list.css({
		left: this.input.position().left,
		top:30,
		width: this.input[0].offsetWidth
	})
	this.input.after(this.list);
  
	this.keyEvent();
	this.mouseEvent();
}

Auto.prototype.keyEvent = function(){
	var that = this;
	
	this.input.on('focus',function(){
		that.list.css({
			left: that.input.position().left
		});
	});
	
	this.input.on('input',function(){
		that.onInput($.trim(this.value));
		that.move(0);
	});
	
	this.input.on('keydown.move',function(e){
		// up:38 down:40 tab:9 esc:27
		switch(e.which){
			case 38: 
				that.moveNext(-1);
			  break;
			case 40: 
			  that.moveNext(1);
				break;
			case 13: 
			  e.preventDefault();
			  that.choosen();
				break;
			case 9: 
			case 27: 
				that.list.hide();
				break;
			default:;
		}
	});
	
}

Auto.prototype.mouseEvent = function(){
	var that = this;
	
	this.list
	.on('mouseenter','li',function(){
		 that.move($(this).index());
	})
	.on('click','li',function(){
		 that.choosen();
	});
  
  this.input.focus(function(){
    that.onInput($.trim(this.value));
    that.move(0);
  });

}

Auto.prototype.closeList = function(string){
	var that = this;
	
	$(document).off('click.close');
	$(document).on('click.close',function(e){
		var targetID = e.target.id;
		if(targetID !== that.listID && targetID!==that.inputID){
			that.list.hide();
		}
	});
	
}

Auto.prototype.onInput = function(string){
	
}

Auto.prototype.choosen = function(){
	this.input.val(this.list.find('.active').text());
	this.list.hide();
}

Auto.prototype.move = function(index){
	this.list.find('li').removeClass('active');
	this.list.find('li').eq(index).addClass('active');
}

Auto.prototype.moveNext = function(step){
	var current = this.list.find('.active').index()+step,
			size = this.list.find('li').length;
	if(current == -1){
		current = size-1;
	}else if(current === size){
		current = 0;
	}
	this.move(current);
}

Auto.prototype.build = function(array){
	var html = '',
	    list = [];
	
	if(!$.isArray(array)){
		html = array;
	}else{
		$.each(array,function(i,n){
			list.push('<li>'+n+'</li>');
		});
		html = '<ul>'+list.join('')+'</ul>';
	}

	this.list.html(html).show();
	this.closeList();
}




