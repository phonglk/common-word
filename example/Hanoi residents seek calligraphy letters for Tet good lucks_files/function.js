$(function() {
	/**************************** COMMENT ****************************/
	// Send comment
	$('.btn_send').click(function() {
		var email = $('#email_comment').val();
		var name = $('#name_comment').val();
		var content = $('#content_comment').val();
		var content_url = $('#content_url').val();
		var app_url = $('#app_url').val();
		var object_id = $('#object_id').val();
		var object_title = $("#object_title").val();
		var layout = $('#comment_layout').val();
		//var recaptcha_challenge_field = $('#recaptcha_challenge_field').val();
 		//var recaptcha_response_field = $('#recaptcha_response_field').val();

		if (email != '' && name != '' && content != '' && IsEmail($('#email_comment').val()) == true){
	 		$.ajax({
				type: 'POST',
				url: $('#host').val() + '/comment/sendcomment',
				data: {email: email, name: name, content: content, content_url: content_url, app_url: app_url, object_id: object_id, object_title: object_title},
				//data: {email: email, name: name, content: content, content_url: content_url, recaptcha_challenge_field: recaptcha_challenge_field, recaptcha_response_field: recaptcha_response_field},
			}).done(function(result) {
				resultArr = result.split('-');
				if (resultArr[0] == 'captcha_error') {
					if (layout == 1) {
						alert('Captcha không đúng. Bạn vui lòng nhập lại.');
					} else {
						alert('Captcha is incorrect. Please re-input captcha.');
					}
				} else {
					$('#content_comment').val('');
					$('#email_comment').val('');
					$('#name_comment').val('');

					if (resultArr[0] == 1) {
						if (layout == 1) {
							alert('Bình luận thành công.');
						} else {
							alert('Your comment has been sent to us!');
						}
						window.top.location = content_url;
					} else if (resultArr[0] == 'time_not_expire') {
						if (layout == 1) {
							alert('Bạn vui lòng đợi ' + resultArr[1] + 's để tiếp tục bình luận.');
						} else {
							alert('Please wait ' + resultArr[1] + 's to comment.');
						}
					} else if (resultArr[0] == 'field_miss') {
						if (layout == 1) {
							alert('Bạn vui lòng nhập đầy đủ thông tin trên.');
						} else {
							alert('Please fill in all fields above.');
						}
					} else if (resultArr[0] == 'not_allowed') {
						if (layout == 1) {
							alert('Bạn không được phép bình luận!');
						} else {
							alert('You are not allowed to comment!');
						}
					}
				}
			});
		} else if (email != '' && name != '' && content != '' && IsEmail($('#email_comment').val()) == false) {
			if (layout == 1) {
				alert('Email không đúng định dạng.');
			} else {
				alert('Your email is wrong format.');
			}
		} else {
			if (layout == 1) {
				alert('Bạn vui lòng nhập đầy đủ thông tin trên.');
			} else {
				alert('Please fill in all fields above.');
			}
		}
	});

	// View more comment
	$('#view_more_comment').live('click', function() {
		var url = $('#host').val() + '/comment/ttocreateiframe';
		var offset = parseInt($('#offset').val()) + 1;
		var object_id = $('#object_id').val();
		var app_url = $('#app_url').val();
		var content_url = $('#content_url').val();
		var layout = $('#comment_layout').val();
		// var max_page_size = $('#max_page_size').val();

		$.ajax({
			type: 'POST',
			url: url,
			data: {offset: offset, app_url: app_url, content_url: content_url, object_id: object_id, layout: layout}
		}).done(function(result) {
			$('.content_view_comment').append(result);
			$('#offset').val(offset);

			// Increase height of iframe
			var iframe = $('#comment_frame', window.parent.document);
            var height = $(".container").height() + 70;
            iframe.height(height);
		});
	});

	// Minimize list comment
	$('.title_view_comment .open').click(function() {
		$('.content_view_comment').slideToggle();
	});

	/**************************** LIKE ****************************/
	// Like comment
	$('.like_btn').live('click', function() {
		var id = $(this).attr('id');
		id = id.split('-');
		var c = id[1];
		var content_url = $('#content_url').val();
		var app_url = $('#app_url').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var comment_id = $('#comment').val();
		var object_title = $('#object_title').val();

		var like_number = $(this).parent().siblings('.like_number');
		var like_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/likecomment',
			data: {content_url: content_url, app_url: app_url, o: o, c: c, object_id: object_id, comment_id: comment_id, object_title: object_title}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) > 0) {
				like_number.html(result);
				$('<a href="javascript:void(0);" class="unlike_btn" id="like_comment_id-' + c + '">Bỏ thích</a>').insertAfter(like_button);
				like_button.remove();
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	});

	//  Like comment
	$('.unlike_btn').live('click', function() {
		var id = $(this).attr('id');
		id = id.split('-');
		var c = id[1];
		var content_url = $('#content_url').val();
		var app_url = $('#app_url').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var comment_id = $('#comment').val();

		var like_number = $(this).parent().siblings('.like_number');
		var unlike_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/unlikecomment',
			data: {content_url: content_url, app_url: app_url, c: c, o: o, object_id: object_id, comment_id: comment_id}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				like_number.html(result);
				$('<a href="javascript:void(0);" class="like_btn" id="like_comment_id-' + c + '">Thích</a>').insertAfter(unlike_button);
				unlike_button.remove();
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	});

	// Like article
	$('.object_like_btn').live('click', function() {
		var content_url = $('#content_url').val();
		var app_url = $('#app_url').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var object_title = $('#object_title').val();

 		var like_number = $(this).parent().siblings('.sl');
		var like_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/likeobject',
			data: {content_url: content_url, app_url: app_url, o: o, object_id: object_id, object_title: object_title}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				like_number.html(result);
				if ($('#comment_layout').val() == 'wc') {
					$('<a href="javascript:void(0);" class="object_unlike_btn"><img src="../images/btn-unlike-wc.png" /></a>').insertAfter(like_button);
				} else {
					$('<a href="javascript:void(0);" class="object_unlike_btn"><img src="../images/btn-unlike.png" /></a>').insertAfter(like_button);
				}
				like_button.remove();
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	})

	// Unlike article
	$('.object_unlike_btn').live('click', function() {
		var content_url = $('#content_url').val();
		var app_url = $('#app_url').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();

		var like_number = $(this).parent().siblings('.sl');
		var unlike_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/unlikeobject',
			data: {content_url: content_url, app_url: app_url, o: o, object_id: object_id}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				like_number.html(result);
				if ($('#comment_layout').val() == 'wc') {
					$('<a href="javascript:void(0);" class="object_like_btn"><img src="../images/btn-like-wc.png" /></a>').insertAfter(unlike_button);
				} else {
					$('<a href="javascript:void(0);" class="object_like_btn"><img src="../images/btn-like.png" /></a>').insertAfter(unlike_button);
				}
				unlike_button.remove();
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	})

	// Get cookie to show whether like or dislike button - Like Object
	var key_timeout = 'likeobjecttimeout' + $('#object_id').val() + $('#app_url').val();
	var key_flag = 'likeobjectflag' + $('#object_id').val() + $('#app_url').val();

	var like_object_flag = 1;
	var flag = getCookie(key_flag);
	if (flag != null && flag != '') {
		var timeout = getCookie(key_timeout);
		if (timeout != null && timeout != '' && flag == 0) {
			var current_time = Math.round(new Date().getTime() / 1000);
			if (timeout < current_time) {
				like_object_flag = 1;

				var like_number = parseInt($('.sl').text());
				$('.sl').text(like_number + 1);
			} else {
				like_object_flag = 0;
			}
		}
	}

	if (like_object_flag == 1) {
		if ($('#comment_layout').val() == 'wc') {
			var like_object_btn = '<a href="javascript:void(0);" class="object_like_btn"><img src="../images/btn-like-wc.png" /></a>';
		} else {
			var like_object_btn = '<a href="javascript:void(0);" class="object_like_btn"><img src="../images/btn-like.png" /></a>';
		}
	} else {
		if ($('#comment_layout').val() == 'wc') {
			var like_object_btn = '<a href="javascript:void(0);" class="object_unlike_btn"><img src="../images/btn-unlike-wc.png" /></a>'	
		} else {
			var like_object_btn = '<a href="javascript:void(0);" class="object_unlike_btn"><img src="../images/btn-unlike.png" /></a>'
		}
	}

	$('.like_div').append(like_object_btn);

	// Get cookie to show whether like or dislike button - Like Comment
	$('.view_comment_small').each(function() {
		var id = $(this).attr('id');
		id = id.split('comment_div-');
		var key_comment_timeout = 'likecommenttimeout' + id[1];
		var key_comment_flag = 'likecommentflag' + id[1];

		var like_comment_flag = 1;

		var flag = getCookie(key_comment_flag);
		if (flag != null && flag != '') {
			var timeout = getCookie(key_comment_timeout);
			if (timeout != null && timeout != '' && flag == 0) {
				var current_time = Math.round(new Date().getTime() / 1000);
				if (timeout < current_time) {
					like_comment_flag = 1;

					var like_number = parseInt($(this).find('.like_number').text());
					$(this).find('.like_number').text(like_number + 1);
				} else {
					like_comment_flag = 0;
				}
			}
		}

		if (like_comment_flag == 1) {
			var like_comment_btn = '<a href="javascript:void(0);" class="like_btn" id="like_comment_id-' + id[1] + '">Thích</a>';
		} else {
			var like_comment_btn = '<a href="javascript:void(0);" class="unlike_btn" id="like_comment_id-' + id[1] + '">Bỏ thích</a>';
		}

		$(this).find('.like_comment_div').append(like_comment_btn);
	});

	/**************************** REPLY ****************************/
	// Reply comment
	$('.reply').click(function(e) {
		$('.reply_div').each(function() {
			$(this).remove();
		});

		var parent_id = getId($(this).attr('id'));
		var new_element = 
			'<p class="reply_div">' +
				'<textarea></textarea><br />' +
				'<input type="button" class="reply_btn" id ="reply_btn-' + parent_id + '" value="Gửi" />' +
			'</p>';

		$(this).parent().parent().append(new_element);
	});

	$('.reply_btn').live('click', function() {
		var parent_id = getId($(this).attr('id'));
		var content = ($(this).siblings('textarea')).val();
		var app_url = $('#app_url').val();
		var object_id = $('#object_id').val();
		var layout = $('#comment_layout').val();
		var email = 'triettest@gmail.com';
		var name = 'trietest';

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/comment/sendcomment',
			data: {email: email, name: name, content: content, app_url: app_url, object_id: object_id, parent_id: parent_id},
		}).done(function(result) {
			alert(result);
		});
	});

	// Like article
	$('.tto_object_like_btn').live('click', function() {
		var content_url = $('#content_url').val();
		var app_url = $('#app_url').val();
		var o = $('#object_id').val();
		var object_id = $('#object').val();
		var object_title = $('#object_title').val();

 		var like_number = $(this).siblings('.sl');
		var like_button = $(this);

		$.ajax({
			type: 'POST',
			url: $('#host').val() + '/like/likeobject',
			data: {content_url: content_url, app_url: app_url, o: o, object_id: object_id, object_title: object_title}
		}).done(function(result) {
			resultArr = result.split('-');
			if (parseInt(resultArr[0]) >= 0) {
				like_number.html(result);
				like_button.css({
					'background-color': '#000',
					'color': '#fff !important',
				});
			} else if (resultArr[0] == 'time_not_expire') {
				alert('Bạn vui lòng đợi ' + resultArr[1] + ' để tiếp tục thực hiện thao tác này.');
			} else if (resultArr[0] == 'save_error') {
				alert('Save error!');
			} else {
				alert('Bạn không được phép thực hiện thao tác này!');
			}
		});
	})

})

/*
 * Check valid email
 */
function IsEmail(email)
{
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function getId(value)
{
	var id = value.split('-');
	return id[1];
}

/*
 * Get cookie
 */
function getCookie(c_name)
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)
	  {
	  c_start = c_value.indexOf(c_name + "=");
	  }
	if (c_start == -1)
	  {
	  c_value = null;
	  }
	else
	  {
	  c_start = c_value.indexOf("=", c_start) + 1;
	  var c_end = c_value.indexOf(";", c_start);
	  if (c_end == -1)
	  {
	c_end = c_value.length;
	}
	c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}