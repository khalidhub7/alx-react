import "./Notifications.css";
import PropTypes from "prop-types";
import close_icon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import NotificationItemShape from "./NotificationItemShape";

const Notifications = ({ displayDrawer, listNotifications }) => (
  <>
    <div className="menuItem">Your notifications</div>
    {displayDrawer ? (
      listNotifications.length === 0 ? (
        <NotificationItem
          type={"default"}
          value={"No new notification for now"}
        />
      ) : (
        <div className="Notifications">
          <p>Here is the list of notifications</p>
          <ul>
            {listNotifications.map((n) => (
              <NotificationItem
                key={n.id}
                type={n.type}
                value={n.value}
                html={n.html}
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
            <img src={close_icon} alt="close"></img>
          </button>
        </div>
      )
    ) : (
      <></>
    )}
  </>
);

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};
Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
