const API_URL = "https://api.imgur.com/3/gallery";
export const getList = (section, sort, window, page = 0) => dispatch => {
  const url = `${API_URL}/${section}/${sort}/${window}/${page}?album_previews=true`;
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
              payload: data.data
            })
          : dispatch({
              type: "GET_NEW_IMAGES",
              payload: data.data
            });
      } else {
        dispatch({
          type: "NO_DATA_RECEIVED"
        });
      }
    });
  });
};
