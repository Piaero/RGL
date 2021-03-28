export const CommentsAPI = {
  submitComment: (commentData) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentData }),
    };
    fetch('/submit-comment', requestOptions);
  },
};
