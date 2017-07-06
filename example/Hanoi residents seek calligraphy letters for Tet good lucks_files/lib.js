/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

//For util.js
/**
 * @class: Util
 * @description: Defines Util functions
 * @version: 1.0
 **/
 
(function($){
	
	$.fn.fadeHotNews = function(options){
		var defaults = {
			key: 'value'
		};
		options = $.extend(defaults, options);  
		
		function goTo(index){
			// code here
		};
		
		return this.each(function(){  
			var that = $(this),
				ulContent = that.find('ul'),
				liNews = ulContent.find('li').not('.first'),
				zTimer = 0,
				zLength = liNews.length,
				zIndex = 0;
				
				var auto = function(){
					zTimer = setInterval(function(){						
						zIndex++;
						if(zIndex >= zLength-1){							
							zIndex = 0;							
						}												
						ulContent.find('.active').animate({
							'opacity':0
						},1000, function(){	
							$(this).css('display','none').removeClass('active');
							liNews.eq(zIndex).css({
								'display':'block',
								'opacity':0
							}).animate({
								'opacity':1
							}, 1000, function(){
								$(this).addClass('active');
							})
						});
					},5000);
				};
				
				var stop = function(){
					clearInterval(zTimer);
				};	
				
				liNews.eq(0).css({
					'display':'block',
					'opacity':1
				}).addClass('active');
				
				auto();
				
				ulContent.unbind('mouseenter.fadeHotNews').bind('mouseenter.fadeHotNews',function(e){
					e.preventDefault();						
					stop();
					return false;
				});
				
				ulContent.unbind('mouseleave.fadeHotNews').bind('mouseleave.fadeHotNews',function(e){						
					e.preventDefault();	
					auto();
					return false;
				});				
										
		});  
	};
	
	$.fn.changeImgNews = function(options){
		var defaults = {
			key: 'value'
		};
		options = $.extend(defaults, options);  
		
		function goTo(index){
			// code here
		};
		
		return this.each(function(){  
			var that = $(this),
				dtContent = that.find('dt'),
				ddContent = that.find('dd'),
				aTags = ddContent.find('a');
				aTags.each(function(){
					var aTag = $(this);
					aTag.unbind('mouseenter.changeImgNews').bind('mouseenter.changeImgNews', function(e){						
						e.preventDefault();
						dtContent.find('img').attr('src', aTag.attr('rel'));
						return false;
					});
				});
		});  
	};
	
	$.fn.sliderImg = function(options){
		var defaults = {
			key: 'value'
		};
		options = $.extend(defaults, options);  
		
		function goTo(index){
			// code here
		};
		
		return this.each(function(){  
			var that= $(this),
				ulContent = that.find('.slideshow-2'),
				zLength = ulContent.find('li').length,
				zWidth = ulContent.find('li:first').outerWidth(true),
				btnNext = that.find('.zNext'),
				btnPrev = that.find('.zPrev'),
				zIndex = 0,
				zThumbs = 3,
				zX = 12
				zStatus = 1;
				btnNext.unbind('click.sliderImg').bind('click.sliderImg', function(e){
					e.preventDefault();						
					if(zIndex > (zLength - 1) - zThumbs || zStatus == 0){
						return false;
					}
					zStatus = 0;
					zIndex ++;
					ulContent.stop(true).animate({
						'margin-left': (-zWidth - zX)*zIndex
					}, function(){
						zStatus = 1;
					});
					return false;
				});
				btnPrev.unbind('click.sliderImg').bind('click.sliderImg', function(e){					
					e.preventDefault();					
					if(zIndex < 1 || zStatus == 0){						
						return false;
					}
					zStatus = 0;
					zIndex --;					
					ulContent.stop(true).animate({
						'margin-left': (-zWidth - zX)*zIndex
					}, function(){
						zStatus = 1;
					});
					return false;
				});
		});  
	};
	
	$.fn.galleryHome = function(options){
		var defaults = {
			key: 'value',
			isContinuous: true
		};
		options = $.extend(defaults, options);  
				
		return this.each(function(){  
			var that= $(this),
				divContent =  that.find('.slideshow-1'),
				divContentShow =  divContent.find('.slideshow-photo'),
				pTags =  divContent.find('p:first'),
				pDes =  divContent.find('.txt-caption'),
				ulContentThumb = that.find('ul:first'),
				liTags = ulContentThumb.find('li'),
				zLength = ulContentThumb.find('li').length,				
				zTimer = 0,
				zThumbs = 3,
				zHeight = ulContentThumb.find('li:first').height(),
				zStatus = 1,
				zIndex = 0;
				
				if (zLength < 3){
					return;
				}
				
				/*if (options.isContinuous){					
					for (var i = 0, il = 3; i < il; i++){
						var clone = liTags.eq(i).clone();
						if (i == 0){
							clone.addClass('continue');
						}
						clone.removeClass('active').appendTo(ulContentThumb);
					}
					liTags = ulContentThumb.find('li');
				}*/
				
				var goTo = function(info){
					// ulContentThumb.animate({
						// 'margin-top': (-zHeight-7)*index
					// }, function(){
						// if (index == zLength){
							// ulContentThumb.css({
								// 'margin-top': 0
							// });
							// zIndex = 0;
							// ulContentThumb.find('li').removeClass('active');
							// ulContentThumb.find('li').eq(zIndex).addClass('active');
						// }
					// });
					divContentShow.find('img:first').attr('src', info.find('a').attr('rel'));
					pDes.find('a').attr('title', info.find('span:first').text()).text(info.find('span:first').text());
				};
				
				var trans = 0;
				var duration = 500;
				
				var auto = function(){

					var tiker = 0 ;
					var itemWidth = liTags.eq(0).outerHeight(true);
					var maxTrans = zLength * itemWidth;

					zTimer = setInterval(function(){
						tiker++;
						zIndex++;						
						if(tiker < zThumbs){
							ulContentThumb.find('li').removeClass('active');
							ulContentThumb.find('li').eq(zIndex).addClass('active');
						}
						else{
							tiker = 0;
							
							trans += itemWidth * 3;						
							
							liTags.removeClass('active');
							liTags.eq(zIndex).addClass('active');
								
							ulContentThumb.stop().animate({
								'margin-top': -trans
							}, duration, function(){
								
								if (trans >= maxTrans){									
									trans = trans - maxTrans;
									zIndex = trans / itemWidth;
									$(this).stop().css({
										'margin-top': -trans
									});
									liTags.removeClass('active');
									liTags.eq(zIndex).addClass('active');
								}
							});
						}
						// if(tiker < zThumbs){
							// ulContentThumb.find('li').removeClass('active');
							// ulContentThumb.find('li').eq(zIndex).addClass('active');
						// }else{		
							// tiker = 0;	
							// ulContentThumb.find('li').removeClass('active');
							// ulContentThumb.find('li').eq(zIndex).addClass('active');
							// if(zIndex > zLength-1){								
								// ulContentThumb.find('li').eq(0).appendTo(ulContentThumb);
								// ulContentThumb.find('li').eq(0).appendTo(ulContentThumb);
								// zIndex = 0;								
							// }
						// }
						goTo(ulContentThumb.find('li').eq(zIndex));						
					},4000);
				};
				
				
				var stop = function(){					
					clearInterval(zTimer);
				};
				
				//auto();
				
				ulContentThumb.unbind('mouseenter.galleryHome').bind('mouseenter.galleryHome',function(e){
					e.preventDefault();						
					stop();
					return false;
				});
				
				ulContentThumb.unbind('mouseleave.galleryHome').bind('mouseleave.galleryHome',function(e){						
					e.preventDefault();	
					// auto();
					return false;
				});
				
				liTags.each(function(){
					var liTag = $(this);
					liTag.unbind('mouseenter.galleryHome').bind('mouseenter.galleryHome',function(e){
						e.preventDefault();
						stop();
						divContentShow.find('img:first').attr('src', liTag.find('a').attr('rel'));
						divContentShow.find('a').attr('href', liTag.find('a').attr('href'));
						pDes.find('a').attr('title', liTag.find('span:first').text()).text(liTag.find('input:first').val());
						return false;
					});
				});
				
				/*pTags.unbind('click.galleryHome').bind('click.galleryHome', function(e){
					e.preventDefault();
					if($(this).hasClass('txt-caption-show')){						
						$(this).removeClass('txt-caption-show').addClass('txt-caption-hide');
						$(this).find('a').attr('title','Hide Caption').text('Hide Caption');						
						pDes.slideDown();
					}else{						
						$(this).removeClass('txt-caption-hide').addClass('txt-caption-show');
						$(this).find('a').attr('title','Show Caption').text('Show Caption');						
						pDes.slideUp();
					}
					return false;
				});*/
		});  
	};
	
	$.fn.tabChange = function(options){
		var defaults = {
			key: 'value'
		};
		options = $.extend(defaults, options);  
		
		function goTo(index){
			// code here
		};
		
		return this.each(function(){  
			var that= $(this),
				ulTags = that.find('.topnews-nav'),
				liTags = ulTags.children(),
				ulBlokcNews = that.find('.topnews-lst'),
				ulMostViewed= that.find('.mostviewed-lst');				
			liTags.each(function(){
				var liTag = $(this),
				liSiblings = liTag.siblings();
				liTag.unbind('click.tabChange').bind('click.tabChange', function(e){
					liSiblings.removeClass('active');
					liTag.addClass('active');
					e.preventDefault();
					if(liTag.index() == 0){
						ulBlokcNews.css('display','block');
						ulMostViewed.css('display','none');
					}else{
						ulMostViewed.css('display','block');
						ulBlokcNews.css('display','none');
					}					
					return false;
				});
			});
		});  
	};
	
})(jQuery);
