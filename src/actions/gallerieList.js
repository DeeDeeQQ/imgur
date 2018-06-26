const API_URL = "https://api.imgur.com/3/gallery";
const page = 0;
export const getList = (section, sort, window) => dispatch => {
  const url = `${API_URL}/${section}/${sort}/${window}/${page}?album_previews=true`;
  console.log(1);
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
        dispatch({
          type: "GET_NEW_IMAGES",
          payload: data.data
        });
      } else {
        dispatch({
          type: "NO_DATA_RECIEVED"
        });
      }
    });
  });
};
