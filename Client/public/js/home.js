$(document).ready(function(){
        $.ajax('http://localhost:9000/login/loginAuthentication',{
            type: 'GET',
            dataType:"json",
            contentType:"application/json",
            headers:{
                'token':localStorage.getItem('userToken')
            },
            success: function(data,status){

            },
            error: function(error){

            }
        })
    //})
})