function showdata1(data) {
   for (let i = 0; i < data.length; i++) {
      let body = document.getElementById('show-post-div')

      let postcard = document.createElement("div")
      postcard.setAttribute('class', 'card postcard')
      postcard.setAttribute('id', data[i]._id)
      body.appendChild(postcard)

      let cardheader = document.createElement("div")
      cardheader.setAttribute('class', 'card-header')
      postcard.appendChild(cardheader)

      let dflex = document.createElement("div")
      dflex.setAttribute('class', 'd-flex')
      cardheader.appendChild(dflex)
      let image = document.createElement('img')
      image.setAttribute('src', '../assets/post.jpg')
      image.setAttribute('class', 'rounded-circle postUserPhoto')
      dflex.appendChild(image)
      let author = document.createElement("p")
      author.innerHTML = data[i].userName
      dflex.appendChild(author)

      let date = document.createElement('p')
      date.setAttribute('class', 'post-date')
      cardheader.appendChild(date)
      date.innerHTML = data[i].postedAt

      let cardbody = document.createElement("div")
      let postContent = document.createElement("p")
      postContent.setAttribute("class", "text-justify")
      postContent.innerHTML = data[i].postText
      cardbody.appendChild(postContent)
      postcard.appendChild(cardbody)

      let postImage = document.createElement("div")
      postImage.setAttribute('class', 'post-img')
      cardbody.appendChild(postImage)
      let postImg = document.createElement('img')
      postImg.setAttribute('src', '../assets/post.jpg')
      postImage.appendChild(postImg)

      let hr = document.createElement("hr")
      cardbody.appendChild(hr)

      let likebox = document.createElement("div")
      likebox.setAttribute("class", "like-share-box")
      let row = document.createElement("div")
      likebox.appendChild(row)
      row.setAttribute("class", "row")
      let likecontent = document.createElement("div")
      likecontent.setAttribute('class', 'like-share-contents col-md-3')
      likecontent.setAttribute('id', 'saveLike')
      row.appendChild(likecontent)
      let thumbs = document.createElement('span')
      let ithumbs = document.createElement('i')
      ithumbs.setAttribute('class', 'fa fa-thumbs-o-up')
      thumbs.appendChild(ithumbs)
      likecontent.appendChild(thumbs)

      let commentcontent = document.createElement("div")
      commentcontent.setAttribute('class', 'like-share-contents col-md-3')
      row.appendChild(commentcontent)
      let comment = document.createElement('span')
      let icomment = document.createElement('i')
      icomment.setAttribute('class', 'fa fa-comment-o')
      comment.appendChild(icomment)
      commentcontent.appendChild(comment)

      let sharecontent = document.createElement('div')
      sharecontent.setAttribute('class', 'col-md-3 like-share-contents')
      sharecontent.setAttribute('id', 'sharePost')
      row.appendChild(sharecontent)
      let share = document.createElement('span')
      let ishare = document.createElement('i')
      ishare.setAttribute('class', 'fa fa-share-square-o')
      share.appendChild(ishare)
      sharecontent.appendChild(share)

      let cardfooter = document.createElement("div")
      cardfooter.setAttribute('class', 'card-footer')
      let input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('class', 'send-comment')
      input.setAttribute('placeholder', 'Share your comments')
      cardfooter.appendChild(input)
      postcard.appendChild(cardfooter)
      cardbody.appendChild(likebox)
   }
}

$(document).ready(function () {

   console.log(localStorage.getItem('userToken'))
   $.ajax("http://localhost:9000/profilePage", {
      type: 'GET',
      dataType: 'JSON',
      headers: {
         token: localStorage.getItem('userToken')
      },
      success: function (data) {
          console.log(data)
         var img = document.getElementById('profile-pic');
         img.setAttribute('src', data.obj.uploadImage)
         document.getElementById('showName').innerHTML = data.obj.name
         showdata1(data.userPost)
      },
      error: function (error) {
        // localStorage.removeItem("userToken")
         //  $(location).attr('href','../index.html')
      }
   })

   $("#profileToHome").click(() => {
      $(location).attr('href', '../views/home.html')
      //console.log("route hit on clicking profile")
   })


   $("#updatePassword").click(function (event) {
      console.log('hello')
      event.preventDefault()
      currPwd = $("#oldPwd").val(),
         newPwd = $("#newPwd").val(),
         cnfPwd = $("#cnfPwd").val()
      if (newPwd != cnfPwd) {
         return alert("Confirm Password does not match");
      }
      console.log(currPwd, newPwd, cnfPwd)
      $.ajax("http://localhost:9000/profilePage/updatePassword", {
         type: "PATCH",
         dataType: "json",
         headers: {
            token: localStorage.getItem('userToken')
         },

         contentType: "application/json;charset=utf-8",

         data: JSON.stringify({
            "oldPwd": currPwd,
            "newPassword": newPwd
         }),
         success: function (data, status) {
            console.log(data.msg)
         },
         error: function (data, error) {
            //  console.log(error +" "+ "error occurred");
         }
      })
   })
   $("#update").click(function (event) {
      event.preventDefault()
      existingUsername = $("#oldEmail").val()
      newUsername = $("#newEmail").val()
      if (newUsername == existingUsername) {
         return alert("Please Enter new username ")
      }
      // console.log(existingUsername)
      // console.log(newUsername)

      $.ajax("http://localhost:9000/profilePage/updateUsername", {
         type: "PATCH",
         dataType: "json",
         headers: {
            token: localStorage.getItem('userToken')
         },

         contentType: "application/json;charset=utf-8",

         data: JSON.stringify({
            "existUname": existingUsername,
            "newUname": newUsername
         }),
         success: function (data, status) {
            console.log(data.msg)
            //   alert("Email Id already exits.Please re-enter your new Username")
         },
         error: function (data, error) {
            // console.log(error +" "+ "error occurred");
         }
      })
   })
   $("#logout").click(function (event) {
      event.preventDefault()

      token = localStorage.removeItem('usertoken'),
         window.alert("you are being logged out now")
      window.location = '../index.html';


   })

   $("#uploadpp").click(() => {
      console.log("You are on the right path to upload your image")
      var formData = new FormData();
      return
      formData.append('image', $('input[type=file]')[0].files[0]);
      console.log("jhjhjkvsdadfSGVREV")
      console.log(formData.values('image'));
      $.ajax("http://localhost:9000/profilePage/uploadProfilePhoto", {
         type: "PATCH",
         data: formData,
         dataType: "json",
         headers: {
            token: localStorage.getItem('userToken')
         },
         contentType: false,
         processData: false,
         success: function (data, status) {
            console.log(data.msg + " " + status);
            location.reload(true);
         },
         error: function (error) {
            console.log(error + " " + "error occurred");
         }
      });
   })

})