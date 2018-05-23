const API_URL = "https://api.imgur.com/3/gallery/";

export const getList = () => dispatch => {
  dispatch({
    type: "GET_NEW_IMAGES"
  });
};
