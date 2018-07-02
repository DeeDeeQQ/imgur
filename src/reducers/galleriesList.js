export default function galleriesList(state = [], action) {
  if (action.type === "GET_NEW_IMAGES") {
    return [...action.payload];
  } else if (action.type === "GALLERY_NEXT_PAGE") {
    return [...state, ...action.payload];
  }
  return state;
}
