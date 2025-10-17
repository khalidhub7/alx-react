import "./Notifications.css";

const NotificationItem = ({ type, value, html }) =>
  html ? (
    <li
      data-notification-type={type}
      dangerouslySetInnerHTML={{ __html: html }}
    ></li>
  ) : (
    <li data-notification-type={type}>{value}</li>
  );

export default NotificationItem;
