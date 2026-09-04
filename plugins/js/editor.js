
 $(document).ready(function(){
	  var csrf_token = $('meta[name=csrf-token]').attr('content');
	  var csrf_param = $('meta[name=csrf-param]').attr('content');
	  var customTemplates = {
	    image : function(context) {
	      var locale = context.locale;
	      var options = context.options;
	      return "<li>" +
	        "<div class='bootstrap-wysihtml5-insert-image-modal modal fade' data-wysihtml5-dialog='insertImage'>" +
	        "<div class='modal-dialog'>" +
	        "<div class='modal-content'>" +
	        "<div class='modal-header'>" +
	        " <a class='close' data-dismiss='modal'>×</a>" +
	        "<h3>" + locale.image.insert + "</h3>" +
	        "</div>" +
	        "<div class='modal-body'>" +
	        "<div class='upload-picture'>" +
	        "<form accept-charset='UTF-8'    class='form-horizontal' id='wysiwyg_image_upload_form' method='post' enctype='multipart/form-data'>"+
	        "<div style='display:none'>"+
	        "<input name='utf8' value='✓' type='hidden'></input>"+
	        "<input name='"+ csrf_param +"' value='"+　csrf_token +"' type='hidden'></input>" +
	        "</div>" +
	        "<div class='form-group'>" +
	        "<div class='col-xs-9 col-md-10'>"+
	        "<input value='' accept='image/jpeg,image/gif,image/png' class='form-control' id='wysiwyg_image_picture' name='image[picture]' type='file' required='required'></input>"+
	        "</div>" +
	        "<div class='col-xs-3 col-md-2'>"+
	        "<input class='btn btn-primary' id='wysiwyg_image_submit' name='commit' type='submit' value='上传'></input>"+
	        "</div>" +
	        "</div>" +
	        "</form>"+
	        "</div>"+
	        "<div class='form-group'>" +
	        "<input value='http://' id='bootstrap-wysihtml5-picture-src' class='bootstrap-wysihtml5-insert-image-url form-control' data-wysihtml5-dialog-field='src'>"+
	        "</div>" +
	        "<div id='wysihtml5_upload_notice'>"+
	        "</div>"+
	        "</div>" +
	        "<div class='modal-footer'>" +
	        "<a href='#' class='btn btn-default' data-dismiss='modal'>" + locale.image.cancel + "</a>" +
	        "<a class='btn btn-primary' data-dismiss='modal' data-wysihtml5-dialog-action='save' href='#'>" + locale.image.insert + "</a>"+
	        "</div>" +
	        "</div>" +
	        "</div>" +
	        "</div>" +
	        "<a class='btn btn-sm btn-default' data-wysihtml5-command='insertImage' title='" + locale.image.insert + "' tabindex='-1'><span class='glyphicon glyphicon-picture'></span></a>" +
	        "</li>";
	    }
	  };
	  $('.wysihtml5').each(function(i, elem) {
	    $(elem).wysihtml5({
	      toolbar: {
	        "color": false,
	        "size": 'sm'
	      },
	      "locale" : 'zh-CN',
	      customTemplates: customTemplates
	    });
	    
	  });
	  
	$('#wysiwyg_image_upload_form').on('submit',function(event){ 
	
	   event.stopPropagation();
	    event.preventDefault();
	    
	    $('#wysiwyg_image_submit').val('Uploading');
	    var wysiwyg_file = $('#wysiwyg_image_picture')[0].files[0];
	    var wysiwyg_formData = new FormData();
	    wysiwyg_formData.append('utf8', "✓");
	    wysiwyg_formData.append(csrf_param, csrf_token);
	    wysiwyg_formData.append('image[picture]', wysiwyg_file,wysiwyg_file.name);
	    $.ajax({
	        url: webapp+'/image/upload',
	        type: 'POST',
	        data: wysiwyg_formData,
	        dataType: 'json',
	        processData: false,
	        contentType: false,
	        success: function(data, textStatus, jqXHR)
	        {
	        	console.log(data);
	          $('#wysiwyg_image_submit').val('上传');
	          $('#wysiwyg_image_picture').val('');
	           
	          //兼容旧系统 webapp->webstore
	          $('#bootstrap-wysihtml5-picture-src').val(domain+"/webstore/"+data.image_url);
	        },
	        error: function(jqXHR, textStatus, errorThrown)
	        {
	        	console.log(textStatus);
	        }}
	    );
	    
	    
	    
	    
	});
	   
	  
	   
	  
	});

	

	 

