import "./Notifications.css";
import PropTypes from "prop-types";
import close_icon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import { getLatestNotification } from "../utils/utils";

const Notifications = ({ displayDrawer = false }) => (
  <>
    <div className="menuItem">Your notifications</div>
    {displayDrawer ? (
      <div className="Notifications">
        <p>Here is the list of notifications</p>
        <ul>
          <NotificationItem
            type={"default"}
            value={"New course available"}
          />
          <NotificationItem
            type={"urgent"}
            value={"New resume available"}
          />
          <NotificationItem
            html={{ __html: getLatestNotification() }}
          />
        </ul>
        <button
          style={{ display: "inline" }}
          aria-label="Close"
          onClick={() => console.log("Close button has been clicked")}
        >
          <img src={close_icon} alt="close"></img>
        </button>
      </div>
    ) : (
      <></>
    )}
  </>
);

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
};

export default Notifications;
