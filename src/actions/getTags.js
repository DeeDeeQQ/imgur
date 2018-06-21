const API_URL = "https://api.imgur.com/3/tags";
export const getTags = () => dispatch => {
  fetch(API_URL, {
    async: true,
    crossDomain: true,
    method: "GET",
    headers: {
      authorization: "Client-ID 4983217019809fb"
    }
  }).then(response => {
    response.json().then(data =>
      dispatch({
        type: "GET_TAGS",
        payload: data.data.tags
      })
    );
  });
};
