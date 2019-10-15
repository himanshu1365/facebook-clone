
function showdata(data){
    
    for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].posts.length;j++){
            console.log(data[i].posts[j])
            let body = document.getElementById('show-post-div')

            let postcard = document.createElement("div")
            postcard.setAttribute('class','card postcard')
            body.appendChild(postcard)

            let cardheader = document.createElement("div")
            cardheader.setAttribute('class','card-header')
            postcard.appendChild(cardheader)

            let dflex = document.createElement("div")
            dflex.setAttribute('class','d-flex')
            cardheader.appendChild(dflex)
            let image = document.createElement('img')
            image.setAttribute('src','../assets/post.jpg')
            image.setAttribute('class','rounded-circle postUserPhoto')
            dflex.appendChild(image)
            let author = document.createElement("p")
            author.innerHTML = data[i].name
            dflex.appendChild(author)

            let date = document.createElement('p')
            date.setAttribute('class','post-date')
            cardheader.appendChild(date)
            date.innerHTML = data[i].posts[j].postDate

            let cardbody = document.createElement("div")
            let postContent = document.createElement("p")
            postContent.setAttribute("class","text-justify")
            postContent.innerHTML = data[i].posts[j].postdata
            cardbody.appendChild(postContent)
            postcard.appendChild(cardbody)

            let postImage = document.createElement("div")
            postImage.setAttribute('class','post-img')
            cardbody.appendChild(postImage)
            let postImg = document.createElement('img')
            postImg.setAttribute('src','../assets/post.jpg')
            postImage.appendChild(postImg)

            let hr = document.createElement("hr")
            cardbody.appendChild(hr)
            
            let likebox = document.createElement("div")
            likebox.setAttribute("class","like-share-box")
            let row = document.createElement("div")
            likebox.appendChild(row)
            row.setAttribute("class","row")
            let likecontent = document.createElement("div")
            likecontent.setAttribute('class','like-share-contents col-md-3')
            row.appendChild(likecontent)
            let thumbs = document.createElement('span')
            let ithumbs = document.createElement('i')
            ithumbs.setAttribute('class','fa fa-thumbs-o-up')
            thumbs.appendChild(ithumbs)
            likecontent.appendChild(thumbs)

            let commentcontent = document.createElement("div")
            commentcontent.setAttribute('class','like-share-contents col-md-3')
            row.appendChild(commentcontent)
            let comment = document.createElement('span')
            let icomment = document.createElement('i')
            icomment.setAttribute('class','fa fa-comment-o')
            comment.appendChild(icomment)
            commentcontent.appendChild(comment)

            let sharecontent = document.createElement('div')
            sharecontent.setAttribute('class','col-md-3 like-share-contents')
            row.appendChild(sharecontent)
            let share = document.createElement('span')
            let ishare = document.createElement('i')
            ishare.setAttribute('class','fa fa-share-square-o')
            share.appendChild(ishare)
            sharecontent.appendChild(share)

            let cardfooter = document.createElement("div")
            cardfooter.setAttribute('class','card-footer')
            let input = document.createElement('input')
            input.setAttribute('type','text')
            input.setAttribute('class','send-comment')
            input.setAttribute('placeholder','Share your comments')
            cardfooter.appendChild(input)
            postcard.appendChild(cardfooter)
            cardbody.appendChild(likebox)
        }
    }
}

$(document).ready( function(){
    $.ajax("http://localhost:9000/home/getPosts",{
            type:'GET',
            dataType:'JSON',
            headers:{
                token: localStorage.getItem('userToken')
            },
            success: function(data){
                console.log(data[0].name)
                showdata(data)
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
