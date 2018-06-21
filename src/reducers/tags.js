export default function tags(state = [], action) {
  if (action.type === "GET_TAGS") {
    return [...action.payload];
  }
  return state;
}
