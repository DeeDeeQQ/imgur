function isEmpty(data) {
  if (data.images_count === 0) {
    console.log("no image");
    return true;
  } else {
    console.log("with images");
    return false;
  }
}

export default isEmpty;
