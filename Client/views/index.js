
$(document).ready( function(){
    $('#btnSave').click( function(event){
        event.preventDefault()
        var fname = document.getElementById("SignUpFirstName").value;
        var lname = document.getElementById("SignUpLastName").value;
        var email = document.getElementById("SignUpFormEmail").value;
        var pwd = document.getElementById("SignUpFormPassword").value;
        var phone = document.getElementById("SignUpFormPhone").value;
        console.log(lname+' '+fname);
        
        $.ajax("http://localhost:9000/signup",{
            type:"POST",
            dataType: "json",
            contentType: "application/json",
            data:JSON.stringify(
                {  
                    "First Name" : fname,
                    "Last Name" : lname,
                    "Email" : email,
                    "Password": pwd,
                    "Phone" : phone
                    
                }
            ),
            success:function(data, status){
                console.log("Hello", data, status);
               
                 
            },
            error: function(){
                alert('something went worng');
            }
        });
    });
});

