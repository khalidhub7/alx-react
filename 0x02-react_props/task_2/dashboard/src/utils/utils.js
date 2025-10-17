const getFullYear = () => new Date().getFullYear();

const getFooterCopy = (isIndex) => {
  if (isIndex === true) { return 'ALX'; }
  if (isIndex === false) { return 'ALX main dashboard'; }
  return '';
};

const footer = '<strong>Urgent requirement</strong> - complete by EOD';
const getLatestNotification = () => footer;

export { getFooterCopy, getFullYear, getLatestNotification };
