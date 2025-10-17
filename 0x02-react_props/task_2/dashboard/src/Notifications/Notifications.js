import "./Notifications.css";
import close_icon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import { getLatestNotification } from "../utils/utils";

const Notifications = () => (
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
      <NotificationItem html={getLatestNotification()} />
    </ul>
    <button
      style={{ display: "inline" }}
      aria-label="Close"
      onClick={() => console.log("Close button has been clicked")}
    >
      <img src={close_icon} alt="close"></img>
    </button>
  </div>
);

export default Notifications;
