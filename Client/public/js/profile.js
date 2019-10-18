$(document).ready(function()
{
   $("#updatePassword").click(function(event){
      console.log('hello')
        event.preventDefault()
           currPwd = $("#oldPwd").val(),
           newPwd = $("#newPwd").val(),
           cnfPwd = $("#cnfPwd").val()
         if( newPwd != cnfPwd ){
            return alert("Confirm Password does not match");
         }        
        console.log(currPwd,newPwd,cnfPwd)
       $.ajax("http://localhost:9000/profilePage/updatePassword",{
            type:"PATCH",
            dataType: "json",
            headers:{
               token:localStorage.getItem('userToken')
            },

            contentType: "application/json;charset=utf-8",

            data:JSON.stringify({
               "oldPwd": currPwd,
               "newPassword": newPwd
            }),
            contentType: "application/json; charset=utf-8",
            success:function(data, status){
                          console.log(data.msg)
            },
            error: function(data,error){
              //  console.log(error +" "+ "error occurred");
            }
       })
   })
   $("#update").click(function(event){
      event.preventDefault()
      existingUsername = $("#oldEmail").val()
      newUsername = $("#newEmail").val()
      if(newUsername == existingUsername){
         return alert("Please Enter new username ")
      }
      // console.log(existingUsername)
      // console.log(newUsername)

      $.ajax("http://localhost:9000/profilePage/updateUsername",{
            type:"PATCH",
            dataType: "json",
            headers:{
               token:localStorage.getItem('userToken')
            },

            contentType: "application/json;charset=utf-8",

            data:JSON.stringify({
               "existUname": existingUsername,
               "newUname": newUsername
            }),
            contentType: "application/json; charset=utf-8",
            success:function(data, status){
                          console.log(data)
                        //   alert("Email Id already exits.Please re-enter your new Username")
            },
            error: function(data,error){
                console.log(error +" "+ "error occurred");
            }
       })
   })
   $("#logout").click(function(event){
    event.preventDefault()
      
         token = localStorage.removeItem('usertoken'),
         window.alert("you are being logged out now")
         window.location = '/login';
     

     })
   
})