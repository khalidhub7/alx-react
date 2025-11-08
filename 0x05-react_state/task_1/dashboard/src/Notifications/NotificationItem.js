import React from "react";
/* import "./Notifications.css"; */
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const defineStyles = StyleSheet.create({
  defaultNotification: { color: "blue" },
  urgentNotification: { color: "red" },
});

class NotificationItem extends React.PureComponent {
  render() {
    const { id, type, value, html, markAsRead } = this.props;
    const notifColor = css(
      type === "urgent"
        ? defineStyles.urgentNotification
        : defineStyles.defaultNotification,
    );
    return html ? (
      <li
        className={notifColor}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        onClick={() => markAsRead(id)}
      />
    ) : (
      <li
        className={notifColor}
        data-notification-type={type}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  id: 0,
  type: "default",
  value: "",
  html: null,
  markAsRead: () => {},
};

export default NotificationItem;
