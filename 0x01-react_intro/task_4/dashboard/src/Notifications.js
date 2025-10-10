import "./Notifications.css";
import close_icon from "./close-icon.png";
import { getLatestNotification } from "./utils";

const Notifications = () => (
  <div className="Notifications">
    <p>Here is the list of notifications</p>
    <ul>
      <li data-priority="default">New course available</li>
      <li data-priority="urgent">New resume available</li>
      <li
        dangerouslySetInnerHTML={{
          __html: getLatestNotification(),
        }}
      ></li>
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
);

export default Notifications;
