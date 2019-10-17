

$(document).ready( function(){
    document.getElementById('btnSave').addEventListener('click',validateForm)
    function validateForm(){
        var fname = document.getElementById("SignUpFirstName").value;
        var lname = document.getElementById("SignUpLastName").value;
        var email = document.getElementById("SignUpFormEmail").value;
        var mobile = document.getElementById("SignUpFormPhone").value;
        var password = document.getElementById("SignUpFormPassword").value;
        var confirmPassword = document.getElementById("SignUpFormConfirmPassword").value;
        if(fname === "") {
            alert("Please enter your first name");
        } 
        else {
            fname = true
            var regex = /^[a-zA-Z\s]+$/;                
            if(regex.test(fname) === false) {
                alert("Please enter a valid first name");
            } 
            else{
                fname = true;
            }
        }

        if(lname === "") {
            alert("Please enter your last name");
        }
        else {
            lname = true
            var regex = /^[a-zA-Z\s]+$/;                
            if(regex.test(lname) === false) {
                alert("Please enter a valid last name");
            } 
            else{
                lname = true;
            }
        }

        if(email === "") {
            alert("Please enter your email");
        }
        else {
            email = true
            var regex = /^[a-zA-Z\s]+$/;                
            if(regex.test(email) === false) {
                alert("Please enter a valid email");
            } 
            else{
                email = true;
            }
        }

        if(mobile == "") {
            alert( "Please enter your mobile number");
        } else {
          
            var regex = /^[1-9]\d{9}$/;
            if(regex.test(mobile) === false) {
                alert("Please enter a valid 10 digit mobile number");
            } else{
                phone= true;
                
            }
        }

        if (password != confirmPassword) {
            alert("Passwords do not match.");
            
        }
        else{
            password = true;
            
        }

        if((fname || lname || email || phone || password )== true) {
            let signUpData  = {
                firstName: $('#SignUpFirstName').val(),
                lastName: $('#SignUpLastName').val(),
                email: $('#SignUpFormEmail').val(),
                password: $('#SignUpFormPassword').val(),
                phone: $('#SignUpFormPhone').val()
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
            })
        } 
        else {
            return false;
        }
    }
})


$(document).ready( function(){
    document.getElementById('loginbtn').addEventListener('click',validateForm)
    function validateForm(){
        
        var email = document.getElementById("LoginFormEmail").value;
        
        var password = document.getElementById("LoginFormPassword").value;
        
       

        if(email === "") {
            alert("Please enter your email");
        }
        else {
            email = true
            var regex = /^[a-zA-Z\s]+$/;                
            if(regex.test(email) === false) {
                alert("Please enter a valid email");
            } 
            else{
                email = true;
            }
        }

        

        if (password == "") {
            alert("Enter Password");
            
        }
        else{
            password = true;
            
        }

        if(( email || password )== true) {
            let logindata = {
                email: $('#LoginFormEmail').val(),
                password: $("#LoginFormPassword").val()
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
        } 
        else {
            return false;
        }
    }
})

