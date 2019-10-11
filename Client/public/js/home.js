$(document).ready( function(){
    $("#btn").click( function(){
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var output = d.getFullYear() + '-' +
            (month<10 ? '0' : '') + month + '-' +
            (day<10 ? '0' : '') + day;
        $.ajax("http://localhost:9000/home",{
                type:"POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({
                    "userid":"birendra@gmail.com",
                    "posts":[{
                        "postdate":output,
                        "postdata":$.trim($("#myTextarea").val())
                    }]
                }),
                success:function(data, status){
                    console.log(data.msg +" "+status);
                },
                error: function(error){
                    console.log(error);
            }
        });
    });
});