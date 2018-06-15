function isAnimated(data) {
  if (data.animated) {
    console.log("animated");
    return true;
  } else {
    console.log("not Animated");
    return false;
  }
}

export default isAnimated;
