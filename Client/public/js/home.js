$(document).ready( function(){
    $.ajax("http://localhost:9000/home/getPosts",{
            type:'GET',
            dataType:'JSON',
            headers:{
                token: localStorage.getItem('userToken')
            },
            success: function(data){
                console.log(data)
            },
            error: function(error){
                localStorage.removeItem("userToken")
                $(location).attr('href','../index.html')
            }
        })

    $("#btn").click( function(){
        $.ajax("http://localhost:9000/post",{
                type:"POST",
                dataType: "json",
                headers:{
                    token:localStorage.getItem('userToken')
                },
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({
                    "posts":[{
                        "postData":$.trim($("#myTextarea").val())
                    }]
                }),
                success:function(data, status){
                    console.log(data.msg +" "+status);
                },
                error: function(error){
                    console.log(error +" "+ "error occurred");
            }
        });
    });
});
