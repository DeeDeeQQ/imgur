export default function galleriesList(state = [], action) {
  if (action.type === "GET_NEW_IMAGES") {
    return [...state, ...action.payload];
  }
  return state;
}
