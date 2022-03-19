const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");


function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  // create comment-item template elements for every comment
  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
    <article class="comment-item">
      <h2>${comment.title}</h2>
      <p>${comment.text}</p>
    </article>
    `;
    commentListElement.appendChild(commentElement);
  }
  return commentListElement;
}

async function fetchCommentsForPost() {
  // const btn = event.target
  const postId = loadCommentsBtnElement.dataset.postid;
  // fetch data from GET /posts/:id/comments
  const response = await fetch(`/posts/${postId}/comments`);
  // decode json response
  const responseData = await response.json();

  // create comments <ol> containing comment <li> 
  const commentsListElement = createCommentsList(responseData);
  // empty comments section html
  commentsSectionElement.innerHTML = ''
  // populate it
  commentsSectionElement.appendChild(commentsListElement)
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
