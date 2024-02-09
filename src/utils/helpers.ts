export const capitalise = (words) => {
  if (typeof words !== "string") {
    let capFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);
    return words.map(capFirstLetter).join(" ");
  } else {
    return words.charAt(0).toUpperCase() + words.slice(1);
  }
};
