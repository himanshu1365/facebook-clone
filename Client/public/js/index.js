

$(document).ready( function(){
    document.getElementById('btnSave').addEventListener('click',validateForm)
    function validateForm(){
        console.log("hrerehere")
        var fname = document.getElementById("SignUpFirstName")
        var lname = document.getElementById("SignUpLastName");
        var email = document.getElementById("SignUpFormEmail");
        var phone = document.getElementById("SignUpFormPhone");
        if(fname === "") {
            alert("Please enter your name");
        } 
        else {
            fname = true
            var regex = /^[a-zA-Z\s]+$/;                
            if(regex.test(fname) === false) {
                alert("Please enter a valid name");
            } 
            else{
                fname = true;
            }
        }

        if(lname === "") {
            alert("Please enter your name");
        }
        else {
            lname = true
            var regex = /^[a-zA-Z\s]+$/;                
            if(regex.test(lname) === false) {
                alert("Please enter a valid name");
            } 
            else{
                lname = true;
            }
        }

        if(email === "") {
            alert("Please enter your name");
        }
        else {
            email = true
            var regex = /^[a-zA-Z\s]+$/;                
            if(regex.test(email) === false) {
                alert("Please enter a valid name");
            } 
            else{
                email = true;
            }
        }

        if(phone === "") {
            alert("Please enter your name");
        }
        else {
            phone = true
            var regex = /^[1-9]\d{9}$/;                
            if(regex.test(phone) === false) {
                alert("Please enter a valid name");
            } 
            else{
                phone = true;
            }
        }
        
        if((fname || lname || email || phone )== true) {
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


