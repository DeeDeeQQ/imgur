export default function noData(state = [], action) {
  if (action.type === "NO_DATA_RECEIVED") {
    return [
      {
        link:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQXG4D7cQOVrqhxPH-tSw4HUcJg3dsGafGWkrRMv_rBlcltL36PQ",
        title: "Imgur Api don't send images"
      }
    ];
  }
  return state;
}
