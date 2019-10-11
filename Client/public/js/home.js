$(document).ready(function(){
    //$(document).on('load',function(event){
        // event.preventDefault()
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