const API_URL = "https://api.imgur.com/3/gallery/t";
export const getListByTag = (tag, sort, window, page = 0) => dispatch => {
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
    response.json().then(data => {
      if (data.success) {
        page > 0
          ? dispatch({
              type: "GALLERY_NEXT_PAGE",
              payload: data.data.items
            })
          : dispatch({
              type: "GET_NEW_IMAGES",
              payload: data.data.items
            });
      } else {
        dispatch({
          type: "NO_DATA_RECIEVED"
        });
      }
    });
  });
};
