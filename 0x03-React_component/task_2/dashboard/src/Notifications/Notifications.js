import "./Notifications.css";
import PropTypes from "prop-types";
import React from "react";
import close_icon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import NotificationItemShape from "./NotificationItemShape";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;
    return (
      <>
        <div className="menuItem">Your notifications</div>
        {displayDrawer ? (
          listNotifications.length === 0 ? (
            <NotificationItem
              type="default"
              value="No new notification for now"
            />
          ) : (
            <div className="Notifications">
              <p>Here is the list of notifications</p>
              <ul>
                {listNotifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    id={n.id}
                    type={n.type}
                    value={n.value}
                    html={n.html}
                    markAsRead={this.markAsRead}
                  />
                ))}
              </ul>
              <button
                style={{ display: "inline" }}
                aria-label="Close"
                onClick={() =>
                  console.log("Close button has been clicked")
                }
              >
                <img src={close_icon} alt="close" />
              </button>
            </div>
          )
        ) : (
          <></>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};
Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
