export const CommentsAPI = {
  submitComment: (formRef, articleID, commentID) => {
    let commentToSubmit = {
      author: 'ID? autor',
      content: formRef.current.value,
      articleID: articleID,
      responseToCommentID: commentID,
    };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentToSubmit }),
    };

    fetch('/submit-comment', requestOptions).then((response) =>
      response.json()
    );
  },
};
