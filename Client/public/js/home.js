function showComments(id, data) {
    var b = document.getElementById(id)
    $('#' + id).toggle("slow", function() {
        if ($('#' + id).is(":hidden")) {
            $('#' + id).hide()
        } else {
            $('#' + id).show()
            $('#' + id).empty()
            for (i = 0; i < data.length; i++) {
                let comment_div = document.createElement('div')
                comment_div.setAttribute('class', 'comment-div')
                let comment_user_image = document.createElement('img')
                comment_user_image.setAttribute('src', '../assets/1571682893768-baby.jpeg')
                comment_div.appendChild(comment_user_image)
                let comment_container = document.createElement('div')
                comment_container.setAttribute('class', 'comment_container')
                let comment_user = document.createElement('h4');
                comment_user.innerHTML = data[i].userName
                comment_container.appendChild(comment_user)
                let comment_Text = document.createElement('p')
                comment_Text.innerHTML = data[i].commentText
                comment_container.appendChild(comment_Text)
                let comment_At = document.createElement('h6')
                comment_At.innerHTML = moment(data[i].createdAt).calendar()
                comment_container.appendChild(comment_At)
                comment_div.appendChild(comment_container)
                b.appendChild(comment_div)
            }

        }
    });
}

function showdata(data) {
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
        date.innerHTML = moment(data[i].postedAt).calendar();

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
        postImg.setAttribute('src', data[i].postImage)
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
        commentcontent.setAttribute('id', 'commentButton')
        row.appendChild(commentcontent)
        let comment = document.createElement('span')
        let icomment = document.createElement('i')
        icomment.setAttribute('class', 'fa fa-conmment-o')
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

        let commentdom = document.createElement("div")
        commentdom.setAttribute("id", "show-comments")
        commentdom.setAttribute("class", "show-comments-class")

        likebox.appendChild(commentdom)
        icomment.setAttribute('class', '"fa fa-comments-o')

        let cardfooter = document.createElement("div")
        cardfooter.setAttribute('class', 'card-footer')
        let likeOutput = document.createElement("div")
        postcard.appendChild(likeOutput)

        let input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('class', 'send-comment')
        input.setAttribute('placeholder', 'Share your comments')
        cardfooter.appendChild(input)
        postcard.appendChild(cardfooter)
        cardbody.appendChild(likebox)
    }
}

$(document).ready(function() {
    $.ajax("http://localhost:9000/post", {
        type: 'GET',
        dataType: 'JSON',
        headers: {
            token: localStorage.getItem('userToken')
        },
        success: function(data) {

            document.getElementById("userName").innerHTML = data.obj.name
                // if( data.obj.image !=''){
                // var img = document.getElementById("user-profile");
                // img.setAttribute('src',data.obj.image);
                // }
            showdata(data.post)
        },
        error: function(error) {
            localStorage.removeItem("userToken")
            $(location).attr('href', '../index.html')
        }
    })
    $(document).on('keydown', 'input.send-comment', function(e) {
        let classnName = document.getElementsByClassName('send-comment');
        //check for enter press and submit comments to backend on enter press
        if (e.key == 'Enter') {
            let i = 0
            for (; i < classnName.length; i++) {
                if ($(classnName[i]).val() != '') {
                    break
                }
            }
            //route to save comment of particular post
            $.ajax("http://localhost:9000/post/comment", {
                type: "POST",
                dataType: "json",
                headers: {
                    token: localStorage.getItem('userToken')
                },
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "postId": $(classnName[i]).parent().parent().attr('id'),
                    "commentText": $(classnName[i]).val()
                }),
                success: function(data, status) {
                    console.log(data.msg + " " + status);
                    location.reload(true);
                },
                error: function(error) {
                    console.log(error + " " + "error occurred");
                }
            });
        }
    })

    //logout user
    $(".fa-sign-out").click(() => {
            localStorage.removeItem('userToken')
            $(location).attr('href', '../index.html')
        })
        //load user profile
    $("#user_profile").click(() => {

            $(location).attr('href', '../views/profilePage.html')
        })
        //this will submit post

    $("#btn").click(function() {
        //get text
        var postText = $.trim($("#myTextarea").val());
        var formData = new FormData();
        formData.append('postText', postText);
        // Attach upload file
        formData.append('image', $('input[type=file]')[0].files[0]);
        $.ajax("http://localhost:9000/post", {
            type: "POST",
            data: formData,
            dataType: "json",
            headers: {
                token: localStorage.getItem('userToken')
            },
            contentType: false,
            processData: false,
            success: function(data, status) {
                location.reload(true);
            },
            error: function(error) {
                console.log(error + " " + "error occurred");
            }
        });
    });

});

$(document).on('click', '#saveLike', function() {
    let postId = $(this).parent().parent().parent().parent().attr('id')
    $(this).parent().parent().parent().parent().children(":nth-last-child(2)").attr("id", '_like' + postId)
    let likeID = $(this).parent().parent().parent().parent().children(":nth-last-child(2)").attr("id")
    if ($(this).css("color") == 'rgb(128, 128, 128)') {
        $(this).css("color", "blue")
        $.ajax('http://localhost:9000/post/like', {
            type: 'POST',
            dataType: 'JSON',
            headers: {
                token: localStorage.getItem('userToken')
            },
            data: {
                postId: $(this).parent().parent().parent().parent().attr('id')
            },
            success: function(data) {
                document.getElementById(likeID).innerHTML = data.count + " Likes"
            },
            error: function() {}
        })
    } else {
        $(this).css("color", "rgb(128, 128, 128)")
        $.ajax('http://localhost:9000/post/like', {
            type: 'DELETE',
            dataType: 'JSON',
            headers: {
                token: localStorage.getItem('userToken')
            },
            data: JSON.stringify({
                postId: $(this).parent().parent().parent().parent().attr('id')
            }),
            success: function(data) {
                document.getElementById(likeID).innerHTML = data.count + " Likes"
            },
            error: function() {}
        })
    }
})

$(document).on('click', '#sharePost', function() {
    let postId = $(this).parent().parent().parent().parent().attr('id')
    let postContent = $(this).parent().parent().parent().text()
    $.ajax('http://localhost:9000/post/sharePost', {
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: {
            token: localStorage.getItem('userToken')
        },
        data: JSON.stringify({
            'postId': postId,
            "postData": postContent
        }),
        success: function() {},
        error: function() {
            $(location).attr('href', '../index.html')
        }
    })
});

$(document).on('click', '#commentButton', function(e) {
    const postID = $(this).parent().parent().parent().parent().attr('id')
    console.log('postID : ' + postID)
    $(this).parent().parent().children().eq(1).attr('id', '_post' + postID)
    let commentID = $(this).parent().parent().children().eq(1).attr('id')
    $.ajax("http://localhost:9000/post/comment", {

        type: "GET",

        headers: {
            token: localStorage.getItem('userToken')
        },
        dataType: "json",
        contentType: "application/json",
        data: {
            postId: postID
        },
        success: function(data, status) {
            showComments(commentID, data)
        },
        error: function(error) {
            console.log(error + " " + "error occurred");
        }
    });

})