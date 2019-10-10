
$(document).ready( function(){
    $('#btnSave').click( function(){
        var fname = document.getElementById("FirstName").value;
        var lname = document.getElementById("LastName").value;
        var email = document.getElementById("FormEmail").value;
        var pwd = document.getElementById("FormPassword").value;
        var phone = document.getElementById("FormPhone").value;
         console.log(lname+' '+fname);
        
        $.ajax("http://0.0.0.0:9000/",{
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

