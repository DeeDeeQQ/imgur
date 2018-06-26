export default function noData(state = [], action) {
  if (action.type === "NO_DATA_RECIEVED") {
    return [
      {
        link:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_5YdSGond9UpYd_m4kkVkKZvogi2tNQwttBNYzJRGfnsNQus",
        title: "Imgur Api dont send images"
      }
    ];
  }
  return state;
}
