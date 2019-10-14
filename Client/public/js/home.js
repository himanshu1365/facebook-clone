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
                $(location).attr('href','../index.html')
            }
        })

    $("#btn").click( function(){
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var output = d.getFullYear() + '-' +
            (month<10 ? '0' : '') + month + '-' +
            (day<10 ? '0' : '') + day;
        $.ajax("http://localhost:9000/post",{
                type:"POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                headers:{
                    token: localStorage.getItem('userToken')
                },
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
    $("#comment-btn").click( function(){
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var output = d.getFullYear() + '-' +
            (month<10 ? '0' : '') + month + '-' +
            (day<10 ? '0' : '') + day;
            console.log('hello');
        $.ajax("http://localhost:9000/home/comment",{
                type:"POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({
                    "post_id" : "p1235",
                    "user_id":"bhujel@gmail.com",
                    "comment_user": $.trim($("#comment-id").val()),
                    "comment_date" : output
                }),
                success:function(data, status){
                    console.log(data.msg +" "+status);
                },
                error: function(error){
                    console.log(error +" "+ "error occurred");
            }
        });
    });
    $("#show-comments").click( function(){
        console.log('hide')
        $(".display-comment").show();
    });
});