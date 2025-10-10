const getFullYear = () => new Date().getFullYear();

const getFooterCopy = (isIndex) => {
  if (isIndex === true) {
    return "ALX";
  } else if (isIndex === false) {
    return "ALX main dashboard";
  }
};

const getLatestNotification = () =>
  "<strong>Urgent requirement</strong> - complete by EOD";

export { getFooterCopy, getFullYear, getLatestNotification };
