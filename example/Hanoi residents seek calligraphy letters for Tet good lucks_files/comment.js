$(function() {
	var modal = 
		'<div class="commentDialog modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding:5px;width:300px;">' +
	    	'<div class="email" style="display:inline-block;float:left">' +
	    		'<label style="float:left;margin-top:5px;margin-right:10px;width:50px">Email</label>' +
	    		'<input type="text" name="email_comment" id="email_comment" style="float:left"/>' +
	    		'<span class="email_error" style="float:left;color:red;display:none;margin-top:5px;margin-left:10px">Email is required</span>' +
	    		'<span class="email_error1" style="float:left;color:red;display:none;margin-top:5px;margin-left:10px">Email is invalid</span>' +
	    	'</div>' +
	    	'<div class="clear"></div>' +
	    	'<div class="name" style="display:inline-block;float:left">' +
		    	'<label style="float:left;margin-top:5px;margin-right:10px;width:50px">Name</label>' +
		    	'<input type="text" name="name_comment" id="name_comment" style="float:left" />' +
		    	'<span class="name_error" style="float:left;color:red;display:none;margin-top:5px;margin-left:10px">Name is required</span>' +
		    '</div>' +
		    '<div class="clear"></div>' +
		    '<button type="button" class="btn submit_info_comment">OK</button>' +
		'</div>​';

	var resultDialog =
		'<div class="resultDialog modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding:10px;width:300px;display:none">' +
			'<div class="modal-header">' +
    			'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
  			'</div>' +
		    '<div class="content">Nội dung</div>' +
		    '<button type="button" class="btn">OK</button>' +
		'</div>​';

	$('body').append(resultDialog);

	// Css for modal dialog
	$('.resultDialog .modal-header').css({
			'padding': '0px',
			'height': '30px'
	});
	$('.resultDialog .content').css({
			'border-bottom': '1px solid #EEEEEE',
			'font-size': '14px',
			'margin-top': '10px',
			'margin-bottom': '10px',
			'height': '30px'
	});
	$('.resultDialog button').css({
			'float': 'right'
	});


})

/************************** Create comment iframe ***************************/
var app_url = window.location.hostname;
var full_url = window.location;
var object_id = $('#object_id').val();
var title = document.title;
title = title.replace(/"/g, '');

var url = 'http://comment.tuoitre.vn/comment/createiframe?app_url=' + app_url + '&full_url=' + full_url + '&object_id=' + object_id + '&object_title=' + title + '&layout=2';
//var url = 'http://localhost/tuoitre/comment/frontend/www/comment/createiframe?app_url=' + app_url + '&full_url=' + full_url + '&object_id=' + object_id + '&layout=2';

var loading = '<img src="http://comment.tuoitre.vn/images/loading.gif" id="loading_comment" style="width:150px;height:100px;display:block;margin:0 auto;" />';
//var loading = '<img src="http://localhost/tuoitre/comment/frontend/www/images/loading.gif" id="loading_comment" width="100" style="display:block;margin:0 auto;" />';
$('#comment_thread').append(loading);

$('<iframe />');
$('<iframe />', 
	{name:'frame1',id:'frame1',width:'100%',frameborder:'0',scrolling:'no',horizontalscrolling:'no',verticalscrolling:'no',overflow:'hidden',src:url}
).load(function(){
	$('#loading_comment').hide();
	resizeCrossDomainIframe('frame1', 'http://comment.tuoitre.vn');
}).appendTo('#comment_thread');


/*
 * Show dialog to fill user info when submit comment
 */ 
function showDialog()
{
	// Reset form
	$('#email_comment').val('');
	$('#name_comment').val('');
	$('.email_error').hide();
	$('.email_error1').hide();
	$('.name_error').hide();

	// Show dialog
	$('.commentDialog').modal('show');
}

function showDialogByContent(content)
{
	$('.resultDialog .content').text(content);
	$('.resultDialog').modal('show');
}

function resizeCrossDomainIframe(id, other_domain, type) {
    var iframe = document.getElementById(id);
    window.addEventListener('message', function(event) {
    	// if (event.origin !== other_domain) return; // only accept messages from the specified domain
    	// if (isNaN(event.data)) return; // only accept something which can be parsed as a number
    	// var height = parseInt(event.data) - 20; // add some extra height to avoid scrollbar
    	// iframe.height = height + "px";
    	if (event.origin == other_domain) {
    		if (isNaN(event.data)) return; // only accept something which can be parsed as a number
    		var height = parseInt(event.data) - 20; // add some extra height to avoid scrollbar
    		iframe.height = height + "px";
    	}
    }, false);
}