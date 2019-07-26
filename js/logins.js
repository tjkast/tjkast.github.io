function loginProcess(){
    r = document.getElementById("showerror");

    $("#login-form").validate({
  	rules: {
      lg_username: "required",
  	  lg_password: "required",
    },
  	errorClass: "form-invalid"
  });
    console.log("works");
    $.ajax({
            url: "validateLogin",                  
              type: "get",             
              data:  $('#login-form').serialize(), 
            success: function(response) {
                var res = response; 
                console.log(res);
                if(res == "")
                {
                    location.href = "http://meowmates.sites.tjhsst.edu";
                }
                else
                {
                    r.innerHTML = res; 
                }
            },
            error: function (stat, err) {
                console.log("something went wrong");
                    }       
                });
}
function registerVal(){
    	// Validation
  $("#register-form").validate({
  	rules: {
      reg_username: "required",
  	  reg_password: {
  			required: true,
  			minlength: 5
  		},
   		reg_password_confirm: {
  			required: true,
  			minlength: 5,
  			equalTo: "#register-form [name=reg_password]"
  		},
  		reg_email: {
  	    required: true,
  			email: true
  		},
  		reg_fullname: "required",
    },
	  errorClass: "form-invalid",
	  errorPlacement: function( label, element ) {
	    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
    		element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
	    }
			else {
  	  	label.insertAfter( element ); // standard behaviour
  	  }
    }
  });
  r = document.getElementById("showerrorreg");
    console.log("works");
    $.ajax({
            url: "registerVal",                  
              type: "get",             
              data:  $('#register-form').serialize(), 
            success: function(response) {
              var res = response; 
                console.log(res);
                if(res == "")
                {
                    location.href = "http://meowmates.sites.tjhsst.edu/login";
                }
                else
                {
                    r.innerHTML = res; 
                }
                    },
            error: function (stat, err) {
                console.log("something went wrong");
                    }       
                });
}


