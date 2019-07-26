function accept(){
    img = document.getElementById("animalimg");
    namer = document.getElementById("animalname");
    type = document.getElementById("animaltype");
    bio = document.getElementById("bio");
    hobby = document.getElementById("hobby");
    loc = document.getElementById("location"); 
    $.ajax({
            url: "acceptMatch",                  
              type: "get",             
              data:  $('#blank-form').serialize(), 
            success: function(response) {
                var res = response; 
                console.log(res);
                if(res == "")
                {
                    location.href = "http://meowmates.sites.tjhsst.edu";
                }
                else
                {
                    img.src = res['imagelink']; 
                    namer.innerHTML = "<h1>" + res['name'] + "</h1>";
                    type.innerHTML = "Animal Type:" + res['petType'];
                    hobby.innerHTML  = "Hobbies:" + res['hobbies']; 
                    bio.innerHTML = "Bio: " + res['bio']; 
                    loc.innerHTML = "Location: " + res['location']; 
                }
            },
            error: function (stat, err) {
                console.log("something went wrong");
                    }       
                });
}