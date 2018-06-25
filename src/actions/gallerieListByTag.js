const API_URL = "https://api.imgur.com/3/gallery/t";
const page = 0;
export const getListByTag = (tag, sort, window) => dispatch => {
  const url = `${API_URL}/${tag}/${sort}/${window}/${page}`;
  console.log(url);
  fetch(url, {
    async: true,
    crossDomain: true,
    method: "GET",
    headers: {
      authorization: "Client-ID 4983217019809fb"
    }
  }).then(response => {
    response.json().then(data =>
      dispatch({
        type: "GET_NEW_IMAGES",
        payload: data.data.items
      })
    );
  });
};
