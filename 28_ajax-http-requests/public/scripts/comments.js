const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

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
  const response = await fetch(`/posts/${postId}/comments`, { method: "GET" });
  // decode json response
  const responseData = await response.json();

  // create comments <ol> containing comment <li>
  const commentsListElement = createCommentsList(responseData);
  // empty comments section html
  commentsSectionElement.innerHTML = "";
  // populate it
  commentsSectionElement.appendChild(commentsListElement);
}

async function saveComment(event) {
  // prevent browser from sending automatic request
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  console.log(enteredTitle, enteredText);
  await fetch(`/posts/${postId}/comments`, {
    method: "POST",
    // encode to json
    body: JSON.stringify(comment),
    headers: { "Content-Type": "application/json" },
  });
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);
