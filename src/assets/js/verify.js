/*! Verify-v0.1.1 MIT License by 大熊*/

import jQuery from 'jquery';
// import {
//     getMpanelback
// } from '@/api/login';
(function($, window, document,undefined) {
	//定义Slide的构造函数
    var Slide = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
        	type : 1,
        	mode : 'fixed',	//弹出式pop，固定fixed
        	vOffset: 1,
			vSpace : 5,
			codeId:'',
            explain : '向右滑动完成验证',
			imgUrl : '',
			smallImg: '',
            imgSize : {
	        	width: '400px',
	        	height: '200px',
	        },
	        blockSize : {
	        	width: '50px',
	        	height: '50px',
	        },
            circleRadius: '10px',
	        barSize : {
	        	width : '400px',
	        	height : '40px',
			},
        	rand1: Math.floor(Math.random()*9+1),
        	rand2: Math.floor(Math.random()*9+1),
            ready : function(){},
        	success : function(){},
            error : function(){}
            
        },
        this.options = $.extend({}, this.defaults, opt)
    };
    
    
    //定义Slide的方法
    Slide.prototype = {
        
        init: function() {
        	var _this = this;
        	
        	//加载页面
        	this.loadDom();
			_this.refresh();
        	
        	this.$element[0].onselectstart = document.body.ondrag = function(){ 
				return false; 
			};
        	
        	if(this.options.mode == 'pop')	{
        		this.$element.on('mouseover', function(e){
        			_this.showImg();
	        	});
	        	
	        	this.$element.on('mouseout', function(e){
	        		_this.hideImg();
	        	});
	        	
	        	
	        	this.htmlDoms.out_panel.on('mouseover', function(e){
	        		_this.showImg();
	        	});
	        	
	        	this.htmlDoms.out_panel.on('mouseout', function(e){
	        		_this.hideImg();
	        	});
        	}
        	
        	//按下
        	this.htmlDoms.move_block.on('touchstart', function(e) {
				_this.start(e);
        	});
        	
        	this.htmlDoms.move_block.on('mousedown', function(e) {
        		_this.start(e);
        	});
        	
        	//拖动
            window.addEventListener("touchmove", function(e) {
            	_this.move(e);
            });

			
            window.addEventListener("mousemove", function(e) {
				
            	_this.move(e);
            });
            
            //鼠标松开
            window.addEventListener("touchend", function() {
            	_this.end();
            });
            window.addEventListener("mouseup", function() {
            	_this.end();
            });
            
            //刷新
            _this.$element.find('.verify-refresh').on('click', function() {
				_this.refresh();
				_this.options.ready(true);
            });
        },
        
        //初始化加载
        loadDom : function() {

			this.status = false;	//鼠标状态
        	this.isEnd = false;		//验证完成
        	this.setSize = this.resetSize(this);	//重新设置宽度高度
			this.plusWidth = 0;
			this.plusHeight = 0;
            this.x = 0;
            this.y = 0;
        	var panelHtml = '';
			var tmpHtml = '';
			this.$element.empty();
			this.lengthPercent = (parseInt(this.setSize.img_width)-parseInt(this.setSize.block_width))/(parseInt(this.setSize.img_width)-parseInt(this.setSize.bar_height));
        	
        	if(this.options.type != 1) {		//图片滑动
        		
				panelHtml += '<div class="verify-img-out"><div class="verify-img-panel"><div class="verify-refresh" style="z-index:3"><i class="iconfont icon-refresh"></i></div><canvas  class="verify-img-canvas" width="'+this.setSize.img_width+'" height="'+this.setSize.img_height+'"></canvas></div></div>';

				this.plusWidth = parseInt(this.setSize.block_width);
				this.plusHeight = parseInt(this.setSize.block_height);

				tmpHtml = '<canvas class="verify-sub-block"  width="'+this.plusWidth+'" height="'+this.plusHeight+'" style="left:0; position:absolute;" ></canvas>';
        	}
        	
			panelHtml += tmpHtml+'<div class="verify-bar-area"><div class="verify-msg">'+this.options.explain+'</div><div class="verify-left-bar"><span  class="verify-msgs"></span><div  class="verify-move-block"><i  class="verify-icon iconfont icon-right"></i></div></div></div>';
        	this.$element.append(panelHtml);
        	
        	this.htmlDoms = {
        		sub_block : this.$element.find('.verify-sub-block'),
        		out_panel : this.$element.find('.verify-img-out'),
        		img_panel : this.$element.find('.verify-img-panel'),
				img_canvas : this.$element.find('.verify-img-canvas'),
        		bar_area : this.$element.find('.verify-bar-area'),
        		move_block : this.$element.find('.verify-move-block'),
        		left_bar : this.$element.find('.verify-left-bar'),
        		msg : this.$element.find('.verify-msg'),
        		icon : this.$element.find('.verify-icon'),
        		refresh :this.$element.find('.verify-refresh')
			};
			this.htmlDoms.out_panel.parent().css({'width': this.setSize.img_width, 'margin':'0 auto','position':'relative'});
			this.htmlDoms.img_panel.css({'width': this.setSize.img_width, 'height': this.setSize.img_height});
			this.htmlDoms.bar_area.css({'width': (parseInt(this.setSize.bar_width)-10)+'px', 'height': (parseInt(this.setSize.bar_height)-20)+'px', 'line-height':(parseInt(this.setSize.bar_height)-20)+'px','padding':'10px 5px'});
        	this.htmlDoms.move_block.css({'width': this.setSize.bar_height, 'height': this.setSize.bar_height,'line-height':this.setSize.bar_height});
        	this.htmlDoms.left_bar.css({'width': this.setSize.bar_height, 'height': this.setSize.bar_height});
  
        	this.randSet();
        },
        
		drawImg: function(obj, img,simg) {
			var graphParameter;
	       	var canvas = this.htmlDoms.img_canvas[0];
			if(canvas) {
				var ctx=canvas.getContext("2d");
				ctx.drawImage(img,0,0, parseInt(this.setSize.img_width), parseInt(this.setSize.img_height));

				graphParameter = {
					x : this.x,
					y : this.y,
				};
				
				obj.drawRule(ctx, graphParameter);
			}
			
			var canvas2 = this.htmlDoms.sub_block[0];
			if(canvas2) {
				var ctx2=canvas2.getContext("2d");
				var simg = new Image();
				simg.src = this.options.smallImg;
				ctx2.drawImage(simg, 0, 0, this.plusWidth,this.plusHeight);
				obj.drawRule(ctx2, graphParameter);
			}
		},

		drawRule:function(ctx, graphParameter) {
			var x = graphParameter.x;
            var y = graphParameter.y;
            var r = graphParameter.r
            var w = graphParameter.w
            var h = graphParameter.h
  
            ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo((x + w) + r * 0.4, y);
			ctx.arc((x + w) + r, y - r * 0.8, r, 0.7 * Math.PI, 0.3 * Math.PI);
			ctx.lineTo((x + (2 * w) + (2 * r)), y);
			ctx.lineTo((x + (2 * w) + (2 * r)), y + h);
			ctx.arc((x + (2 * w) + (2 * r)) + (r * 0.8), y + h + r, r, 1.2*Math.PI, 0.8*Math.PI);
			ctx.lineTo((x + (2 * w) + (2 * r)), y + (2 * h) + (2 * r));
			ctx.lineTo(x, y + (2 * h) + (2 * r));
			ctx.lineTo(x, y + h + 2 * r - r * 0.4);
			ctx.arc(x + (r * 0.8), y + h + r, r, 0.8 * Math.PI, 1.2 * Math.PI, true);
			ctx.lineTo(x, y);

            ctx.fillStyle="#fff";
			ctx.fill();
			ctx.closePath();
		},


        //鼠标按下
        start: function(e) {
        	if(this.isEnd == false) {
	        	this.htmlDoms.msg.text('松开验证');
	        	this.htmlDoms.move_block.css('background-color', '#18A452');
	        	this.htmlDoms.icon.css('color', '#fff');
	        	e.stopPropagation();
	        	this.status = true;
        	}
        },
        
        //鼠标移动
        move: function(e) {
        	if(this.status && this.isEnd == false) {
	            if(!e.touches) {    //兼容移动端
					var x = e.clientX;
	            }else {     //兼容PC端
	                var x = e.touches[0].pageX;
	            }
	            var bar_area_left = Slide.prototype.getLeft(this.htmlDoms.bar_area[0]);
				var move_block_left = x - bar_area_left - (document.getElementById("mpanel").offsetLeft); //小方块相对于父元素的left值

	            if(this.options.type != 1) {		//图片滑动
					if(move_block_left >= (this.htmlDoms.bar_area[0].offsetWidth - parseInt(this.setSize.bar_height) + parseInt(parseInt(this.setSize.block_width)/2) - 2) ) {
	                	move_block_left = (this.htmlDoms.bar_area[0].offsetWidth - parseInt(this.setSize.bar_height) + parseInt(parseInt(this.setSize.block_width)/2)- 2);
	            	}
	            }else {		//普通滑动
	            	if(move_block_left >= this.htmlDoms.bar_area[0].offsetWidth - parseInt(parseInt(this.setSize.bar_height)/2) + 3) {
	            		this.$element.find('.verify-msg:eq(1)').text('松开验证');
	                	move_block_left = this.htmlDoms.bar_area[0].offsetWidth - parseInt(parseInt(this.setSize.bar_height)/2) + 3;
	            	}else {
	            		this.$element.find('.verify-msg:eq(1)').text('');
	            	}
	            }

	            if(move_block_left <= parseInt(parseInt(this.setSize.block_width)/2)) {
            		move_block_left = parseInt(parseInt(this.setSize.block_width)/2);
            	}
				
	            
	            //拖动后小方块的left值
	            this.htmlDoms.move_block.css('left', move_block_left-parseInt(parseInt(this.setSize.block_width)/2) + "px");
	            this.htmlDoms.left_bar.css('width', move_block_left-parseInt(parseInt(this.setSize.block_width)/2) + "px");
				this.htmlDoms.sub_block.css('left', (move_block_left-parseInt(parseInt(this.setSize.block_width)/2)) * this.lengthPercent + "px");
	        }
        },
        
        //鼠标松开
        end: function() {
			var _this = this;
        	//判断是否重合
        	if(this.status  && this.isEnd == false) {
                console.log(parseInt(this.htmlDoms.move_block.css("left")),">>>>>>>>>>>");

				_this.htmlDoms.move_block.css('background-color', '#5cb85c');
                _this.htmlDoms.icon.css('color', '#fff');
                _this.htmlDoms.icon.removeClass('icon-right');
                _this.htmlDoms.icon.addClass('icon-check');
                _this.htmlDoms.refresh.hide();
                _this.isEnd = true;
                _this.options.success(parseInt(this.htmlDoms.move_block.css("left"))/window.dpr);
                

				// getMpanelback(_this.options.vOffset,_this.options.codeId,parseInt(this.htmlDoms.move_block.css("left"))/window.dpr).then((res) => {
				// 	_this.htmlDoms.move_block.css('background-color', '#5cb85c');
				// 	_this.htmlDoms.icon.css('color', '#fff');
				// 	_this.htmlDoms.icon.removeClass('icon-right');
				// 	_this.htmlDoms.icon.addClass('icon-check');
				// 	_this.htmlDoms.refresh.hide();
				// 	_this.isEnd = true;
				// 	_this.options.success(_this);
				// 	return
				// }).catch((res) => {
				// 	_this.htmlDoms.move_block.css('background-color', '#d9534f');
				// 	_this.htmlDoms.icon.css('color', '#fff');
				// 	_this.htmlDoms.icon.removeClass('icon-right');
				// 	_this.htmlDoms.icon.addClass('icon-close');
				// 	setTimeout(function () { 
				// 		_this.refresh();
				// 	}, 400);
					
				// 	_this.options.error(_this);
				// 	return false;
				// });
				
	            // this.status = false;
        	}
        },
        
        //弹出式
        showImg : function() {
        	this.htmlDoms.out_panel.css({'display': 'block'});
        	this.htmlDoms.sub_block.css({'display': 'block'});
        },
        
        //固定式
        hideImg : function() {
        	this.htmlDoms.out_panel.css({'display': 'none'});
        	this.htmlDoms.sub_block.css({'display': 'none'});
        },
        
        
        resetSize : function(obj) {
        	var img_width,img_height,bar_width,bar_height,block_width,block_height,circle_radius;	//图片的宽度、高度，移动条的宽度、高度
        	var parentWidth = obj.$element.parent().width() || $(window).width();
        	var parentHeight = obj.$element.parent().height() || $(window).height();
        	
       		if(obj.options.imgSize.width.indexOf('%')!= -1){
        		img_width = parseInt(obj.options.imgSize.width)/100 * parentWidth + 'px';
		　　}else {
				img_width = obj.options.imgSize.width;
			}
		
			if(obj.options.imgSize.height.indexOf('%')!= -1){
        		img_height = parseInt(obj.options.imgSize.height)/100 * parentHeight + 'px';
		　　}else {
				img_height = obj.options.imgSize.height;
			}
		
			if(obj.options.barSize.width.indexOf('%')!= -1){
        		bar_width = parseInt(obj.options.barSize.width)/100 * parentWidth + 'px';
		　　}else {
				bar_width = obj.options.barSize.width;
			}
		
			if(obj.options.barSize.height.indexOf('%')!= -1){
        		bar_height = parseInt(obj.options.barSize.height)/100 * parentHeight + 'px';
		　　}else {
				bar_height = obj.options.barSize.height;
			}
			
			if(obj.options.blockSize) {
				if(obj.options.blockSize.width.indexOf('%')!= -1){
					block_width = parseInt(obj.options.blockSize.width)/100 * parentWidth + 'px';
			　　}else {
					block_width = obj.options.blockSize.width;
				}
				
			
				if(obj.options.blockSize.height.indexOf('%')!= -1){
					block_height = parseInt(obj.options.blockSize.height)/100 * parentHeight + 'px';
			　　}else {
					block_height = obj.options.blockSize.height;
				}
			}

			if(obj.options.circleRadius) {
				if(obj.options.circleRadius.indexOf('%')!= -1){
					circle_radius = parseInt(obj.options.circleRadius)/100 * parentHeight + 'px';
			　　}else {
					circle_radius = obj.options.circleRadius;
				}
			}
	
			return {img_width : img_width, img_height : img_height, bar_width : bar_width, bar_height : bar_height, block_width : block_width, block_height : block_height, circle_radius : circle_radius};
       	},
        
        //随机出生点位
        randSet: function() {
        	var top = this.options.rand1 * parseInt(this.setSize.img_height)/15 + parseInt(this.setSize.img_height) * 0.1;
        	var left = this.options.rand2 * parseInt(this.setSize.img_width)/15 + parseInt(this.setSize.img_width) * 0.1;
  
            this.x = left;
            this.y = top;

			this.htmlDoms.sub_block.css({'top': (parseInt(this.options.rand2))+'px'});
        },
        
        //刷新
        refresh: function() {
			var _this = this;
        	this.htmlDoms.refresh.show();
        	this.$element.find('.verify-msg:eq(1)').text('');
        	this.$element.find('.verify-msg:eq(1)').css('color', '#000');
        	this.htmlDoms.move_block.animate({'left':'-2px'}, 'fast');
			this.htmlDoms.left_bar.animate({'width': parseInt(this.setSize.bar_height)}, 'fast');
			this.htmlDoms.icon.css('color', '#aaa');
			this.htmlDoms.icon.removeClass('icon-close');
			this.htmlDoms.icon.addClass('icon-right');
			this.$element.find('.verify-msg:eq(0)').text(this.options.explain);
        	
        	this.randSet();
 
			var img = new Image();
			var simg = new Image();
			img.src = this.options.imgUrl;
			simg.src = this.options.smallImg;
		 	// 加载完成开始绘制
		 	$(img).on('load', function(e) {
				_this.drawImg(_this,img,simg);
			});		
			
			this.isEnd = false;
			this.htmlDoms.sub_block.css('left', "0");
			
        },
        
        //获取left值
        getLeft: function(node) {
			var left = $(node).offset().left;
            return left;
        }
    };
    
    
    
    
    //在插件中使用slideVerify对象
    $.fn.slideVerify = function(options, callbacks) {
        var slide = new Slide(this, options);
        slide.init();
    };
   
})(jQuery, window, document);




