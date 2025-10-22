import React from "react";
import PropTypes from "prop-types";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import Notifications from "../Notifications/Notifications";

const listCourses = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React", credit: 40 },
];
const listNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  {
    id: 3,
    html: { __html: getLatestNotification() },
    type: "urgent",
  },
];

const App = ({ isLoggedIn, displayDrawer }) => {
  return (
    <>
      <Notifications
        displayDrawer={displayDrawer}
        listNotifications={listNotifications}
      />
      <Header />
      {isLoggedIn ? (
        <div className="courses">
          <CourseList listCourses={listCourses} />
        </div>
      ) : (
        <Login />
      )}
      <Footer />
    </>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
};
App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
};

export { listNotifications, listCourses };
export default App;
