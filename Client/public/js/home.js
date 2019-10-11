$(document).ready(function(){
        $.ajax('',{
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
