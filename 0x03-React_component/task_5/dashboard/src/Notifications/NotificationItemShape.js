import PropTypes from "prop-types";

const NotificationItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  markAsRead: PropTypes.func,
});

export default NotificationItemShape;
