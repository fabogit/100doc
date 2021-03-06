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

  try {
    // fetch data from GET /posts/:id/comments
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "GET",
    });

    if (!response.ok) {
      alert("Fetching comments failed!");
      return;
    }
    // decode json response
    const responseData = await response.json();

    if (responseData && responseData.length > 0) {
      // create comments <ol> containing comment <li>
      const commentsListElement = createCommentsList(responseData);
      // empty comments section html
      commentsSectionElement.innerHTML = "";
      // populate it
      commentsSectionElement.appendChild(commentsListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent =
        "There are no comments yet, Maybe add one?";
    }
  } catch (error) {
    alert("Getting comments failed!");
  }
}

async function saveComment(event) {
  // prevent browser from sending automatic request (btn submission)
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  // add comment
  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      // encode to json
      body: JSON.stringify(comment),
      headers: { "Content-Type": "application/json" },
    });
    // res status 20x/30x
    if (response.ok) {
      // fetch new comments
      fetchCommentsForPost();
    } else {
      alert("Could not send comment!");
    }
  } catch (error) {
    alert("Could not send request - try later");
  }
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);
