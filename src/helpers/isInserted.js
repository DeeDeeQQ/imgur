function isInserted(data) {
  if (!data.images) {
    console.log("not inserted");
    return false;
  } else {
    console.log("inserted");
    return true;
  }
}

export default isInserted;
