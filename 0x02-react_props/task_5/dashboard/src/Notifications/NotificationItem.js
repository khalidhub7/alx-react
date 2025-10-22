import React from "react";
import "./Notifications.css";
import PropTypes from "prop-types";

const NotificationItem = ({
  type = "default",
  value = "",
  html = null,
}) => {
  return html ? (
    <li
      data-notification-type={type}
      dangerouslySetInnerHTML={html}
    />
  ) : (
    <li data-notification-type={type}>{value}</li>
  );
};

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
};

export default NotificationItem;
