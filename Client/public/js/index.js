function checkPassword(form) { 
    pwd = form.pwd.value; 
    confirmpwd = form.confirmpwd.value;  
    if (pwd == '') 
        alert ("Please enter Password"); 
    else if (confirmpwd == '') 
        alert ("Please enter confirm password"); 
     
    else if (pwd != confirmpwd) { 
        alert ("\nPassword did not match: Please try again...") 
        return false; 
    } 
 
    else{ 
        
        return true; 
    } 
} 

$(document).ready( function(){
    $('#btnSave').click( function(event){
        event.preventDefault()
        let signUpData  = {
            FirstName: $('#SignUpFirstName').val(),
            LastName: $('#SignUpLastName').val(),
            Email: $('#SignUpFormEmail').val(),
            Password: $('#SignUpFormPassword').val(),
            Phone: $('#SignUpFormPhone').val()
        }
        $.ajax("http://localhost:9000/signup",{
            type:"POST",
            dataType: "json",

            contentType: "application/json;charset=utf-8",

            data:JSON.stringify(signUpData),
            contentType: "application/json; charset=utf-8",
            success:function(data, status){
                //console.log(data.msg)
            },
            error: function(error){
                console.log("error : "+error)
            }
        });
    });

    $('#loginbtn').click(function(event){
        event.preventDefault()
        let logindata = {
            Email: $('#LoginFormEmail').val(),
            Password: $("#LoginFormPassword").val()
        }
        console.log(logindata)
        $.ajax("http://localhost:9000/login",{
            type:"POST",
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify(logindata),
            success: function(data,status){
                console.log("data: "+data)
                localStorage.setItem('userToken',data.token)
                $(location).attr('href','./views/home.html')
            },
            error: function(data,error){
                // let statusMessage = JSON.stringify(data)
                // console.log('data : '+data.responseJSON)
                console.log('error '+ error)
            }
        })
    })
});

