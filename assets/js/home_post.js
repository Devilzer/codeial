{
  // method to submit the form data for new post using AJAX
  let createPost = () => {
    let newPostForm = $("#new-post-form");

    newPostForm.submit((e) => {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          console.log(data);
          let newPost = newPostDom(data.data.post);
          $("#Posts-list-container").prepend(newPost);
          deletePost($(".delete-post-button", newPost));
          new Noty({
            theme: "metroui",
            text: data.message,
            type: "info",
            layout: "topRight",
            timeout: 750,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
      <div>
        <h1> ${post.content}</h1>
        
        <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        
        <small>${post.user.name}</small>
      </div>
  
      <div class="post-comment">
        
        <form action="/comments/create" method="POST">
          <input type="text" name="content" placeholder="add comment..." />
          <input type="hidden" name="post" value="${post._id}"/>
          <input type="submit" value="Comment" />
        </form>
       
        <div class="comments-list-container">
        <ul id="comment-${post._id}">
            
        </ul>
    </div>
      </div>
    </li>`);
  };

  //function to delete a post
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "metroui",
            text: data.message,
            type: "warning",
            layout: "topRight",
            timeout: 750,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}
