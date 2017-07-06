$(function(){
	/******************* Latestnews Mostviewed Latestcomment ******************/
	$.fn.tabChange = function(options) {
		var defaults = {
			key: 'value'
		};
		options = $.extend(defaults, options);  
	
		function goTo(index){
			// code here
		};
		
		return this.each(function(){  
			var that= $(this),
				ulTags = that.find('.ui-general'),
				liTags = ulTags.children(),
				mostWatchedTab = that.find('.latestnews-lst'),
				mostListendTab = that.find('.mostviewed1-lst');
				//mostViewedTab = that.find('.latestcomment-lst');		
			liTags.each(function(){
				var liTag = $(this),
				liSiblings = liTag.siblings();
				liTag.unbind('click.tabChange').bind('click.tabChange', function(e){
					liSiblings.removeClass('active');
					liTag.addClass('active');
					if(liTag.index() == 0){
						mostWatchedTab.show();
						mostListendTab.hide();
						$('.latestcomment-lst').hide();
					}else if(liTag.index() == 1){
						mostWatchedTab.hide();
						mostListendTab.show();
						$('.latestcomment-lst').hide();
					}else if(liTag.index() == 2){
						mostWatchedTab.hide();
						mostListendTab.hide();
						$('.latestcomment-lst').show();
					}
					return false;
				});
			});
		});  
	};

	$('.block-sidebar-01').tabChange();


	/*******************  Comment **********************/
	if ($('#UserCommentForm_name').val() == '') {
		$('#UserCommentForm_name').val('Your Name');
	}
	if ($('#UserCommentForm_email').val() == '') {
		$('#UserCommentForm_email').val('Your Email');
	}
	if ($('#UserCommentForm_title').val() == '') {
		$('#UserCommentForm_title').val('Title');
	}
	if ($('#UserCommentForm_comment').text() == '') {
		$('#UserCommentForm_comment').html('Write your comment here');
	}	
	$('#UserCommentForm_email').focus(function(){
		if ($(this).val() == 'Your Email') {
			$(this).val('');
		}
	});
	$('#UserCommentForm_title').focus(function(){
		if ($(this).val() == 'Title') {
			$(this).val('');
		}
	});

	$('#UserCommentForm_name').focus(function(){
		if ($(this).val() == 'Your Name') {
			$(this).val('');
		}
	});
	$('#UserCommentForm_email').focus(function(){
		if ($(this).val() == 'Your Email') {
			$(this).val('');
		}
	});
	$('#UserCommentForm_title').focus(function(){
		if ($(this).val() == 'Your Title') {
			$(this).val('');
		}
	});
	$('#UserCommentForm_name').blur(function(){
		if ($(this).val() == '') {
			$(this).val('Your Name');
		}
	});
	$('#UserCommentForm_email').blur(function(){
		if ($(this).val() == '') {
			$(this).val('Your Email');
		}
	});
	$('#UserCommentForm_title').blur(function(){
		if ($(this).val() == '') {
			$(this).val('Title');
		}
	});


	/***************** Focus menu item *****************/
	var term = $("#term_name").val();
	$('#nav li:contains(' + term + ')').addClass('active');
	

	/**************** Custom list ******************/
	$(".media-play").colorbox({iframe: true, transition:"fade", innerWidth:600, innerHeight:400});


	/**************** Print email share *****************/
	$('#print').click(function() {
		var currentUrl = $('#currentUrl').val();
		var urlArr = currentUrl.split('?');
		var urlComponentArr = urlArr[0].split('/');
		var slug = urlComponentArr[urlComponentArr.length - 1];
		var prefixUrl = urlArr[0].split(slug);
		var url = prefixUrl[0] + 'print?' + urlArr[1];

		var width  = 600;
		var height = 750;
		var left = (screen.width  - width) / 2;
	    var top  = (screen.height - height) / 2;
	    var params = 'width=' +width + ',height=' + height + ',menubar=yes, scrollbars=yes, resizable=no';
	    params += ', top='+top+', left='+left;

		window.open(url, "_blank", params);
	});
	
	/****************** Content detail ******************/
	$('#slider').nivoSlider({
		effect: 'fade',
		slices: 1, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed: 500, // Slide transition speed
        pauseOnHover: true, // Stop animation while hovering
        pauseTime: 10000, // How long each slide will show
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false,
        beforeChange: function () {
            $('.nivo-main-image').css('display', 'none');
        },
        afterChange:function () {                            
            $('.nivo-main-image').css('display', 'none');
        }
    });

    $('.nivo-controlNav').css('display', 'none');
    $('.nivo-caption').css('display', 'none');
    
    $('.slider-wrapper').hover(function() {
    	$('.nivo-controlNav').css('display', 'block');
    	$('.nivo-caption').css('display', 'block');
	});

    $('.slider-wrapper').mouseleave(function() {
    	$('.nivo-controlNav').css('display', 'none');
    	$('.nivo-caption').css('display', 'none');
	});

    $('.comment-item .content').each(function() {
    	$(this).expander({
			slicePoint: 250,
			widow: 2,
			expandSpeed: 0,
			collapseSpeed: 0,
			expandText: '[+]',
			userCollapseText: '[-]',
			afterExpand: function() {
					$(this).find('.details').css('display', 'inline');
				}
    	});
	});	
});
//onShowCity('hanoi');

onPageLoad();

var addthis_config = {
	ui_click: true 
}

function openRss(id) {
	var url = $('#currentUrl').val();
	url += '/rss?category=' + id; 	
	window.open(url, "_blank");
}
//For weather
var container;
var selectedUnit;
var selectedCity;

function onPageLoad(){
	selectedUnit = 'c';
	//onChangeCity('hanoi');
    onShowCity('hochiminh');
}
function onShowCity(city){
	selectedCity = city;
	var apisrc = 'http://query.yahooapis.com/v1/public/yql?q=use%20\'http%3A%2F%2Fisithackday.com%2Fweatherbadge%2Fweather.bylocation.xml\'%20as%20we%3Bselect%20*%20from%20we%20where%20location%3D%22'+selectedCity+'%22%20and%20unit%3D\''+selectedUnit+'\'&format=json&callback=showWeather';

	var s = document.createElement('script');
	s.src=apisrc;
	document.getElementsByTagName('head')[0].appendChild(s);
}
function onChangeCity(city){
	selectedCity = city;
	
	var apisrc = 'http://query.yahooapis.com/v1/public/yql?q=use%20\'http%3A%2F%2Fisithackday.com%2Fweatherbadge%2Fweather.bylocation.xml\'%20as%20we%3Bselect%20*%20from%20we%20where%20location%3D%22'+selectedCity+'%22%20and%20unit%3D\''+selectedUnit+'\'&format=json&callback=showWeather';

	var s = document.createElement('script');
	s.src=apisrc;
	document.getElementsByTagName('head')[0].appendChild(s);

}

function onChangeUnit(unit){
	selectedUnit = unit;
	onChangeCity(selectedCity);
}

function showWeather(data){

	if (container==undefined){
	}
	else{
		document.getElementById("weather").removeChild(container);
	}
	var wdata = data.query.results.weather.rss.channel;
	var title = wdata.title;
	var pic = wdata.item.description.match(/src="([^"]+)".*/)[1];
	var temperature = wdata.item.condition.temp;
	var weather = wdata.item.condition.text;
	var link = wdata.link;

	var badge = '<div style="width:280px"><div style="float:left;width:140px;margin-top:5px;"><div>'+
	'<strong style="font-size:10px;font:Arial, Helvetica, sans-serif">TODAY</strong></div><div style="width:124px; border-bottom: 1px solid #E1E1E1;overflow: hidden; padding: 5px 0;">'+
	'<div style="float:left"><img style="vertical-align:bottom" height="32" width="32" src="http://l.yimg.com/a/i/us/we/52/'+ wdata.item.condition.code +'.gif" /> </div>'+
	'<div>  <strong style="color:#0FCC; font-size:11px;font:Arial, Helvetica, sans-serif"><a style="margin-left:10px; font-size:34px">' + wdata.item.condition.temp+ '&deg;</a>' +'</strong><br />'+
	'</div></div><div style="padding:5px 0; font-size:11px;font:Arial, Helvetica, sans-serif;clear:both;">   ' + wdata.item.condition.text + '  </div></div> <div style="float:left;width:140px;margin-top:5px;"><div><strong style="font-size:10px">TOMORROW</strong></div><div style="width:124px; border-bottom: 1px solid #E1E1E1;overflow: hidden; padding: 8px 0 9px 0;">'+
	'<div style="float:left"><img style="vertical-align:bottom" height="32" width="32" src="http://l.yimg.com/a/i/us/we/52/'+ wdata.item.forecast[1].code +'.gif" /> </div><div >'+
	'<strong style="margin-left:16px; color:#0FCC; font-size:11px;font:Arial, Helvetica, sans-serif">hi   <a style="margin-left:5px; font-size:14px">' + wdata.item.forecast[1].high+ '&deg;</a>' +'</strong><br />'+
	'<strong style="margin-left:16px; color:#0FCC; font-size:11px;font:Arial, Helvetica, sans-serif">lo   <a style="margin-left:5px;font-size:14px">' + wdata.item.forecast[1].low+ '&deg;</a>' +'</strong><br />'+
	'</div> </div><div style="padding-top:5px; font-size:11px;font:Arial, Helvetica, sans-serif;clear:both;"> ' + wdata.item.forecast[1].text + ' </div></div><div style="clear:both"></div></div>';	

	container = document.createElement('div');
	container.innerHTML = badge;

	document.getElementById("weather").appendChild(container);
	
}

//l10n.js
var L10N = {
	required: {			
		username: 'please enter your name',
		password: 'please enter your password',
		email: 'please enter email address',
		address: 'address is required',
		gender: 'gender is required'
	},
	valid: {
		email: 'please enter valid email address'
	},
	confirm: {
		password: 'are you sure you want to delete?'
	},
	alert: {
		register: 'your account has been created successfully'
	}
};
//start.js
var TuoitreNews = TuoitreNews || {};
TuoitreNews.variable1 = 'variable';	

/**
 * Website start here
 **/
jQuery(document).ready(function(){	
	jQuery('.highlight-type-2').sliderImg();
	jQuery('.highlight-type-1').galleryHome();		
	//jQuery('.news-main').changeImgNews();		
	jQuery('.under-header').fadeHotNews();		
	jQuery('.block-sidebar-01').tabChange();		
});
