export const CommentsAPI = {
  submitComment: (commentData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentData }),
    };
    return fetch('/submit-comment', requestOptions);
  },
};
