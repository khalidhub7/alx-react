const getFullYear = () =>
  new Date().getFullYear();
const getFooterCopy = (isIndex) => {
  if (isIndex === true) {
    return "ALX";
  } else if (isIndex === false) {
    return "ALX main dashboard";
  }
};

export { getFooterCopy, getFullYear };
