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

class App extends React.Component {
  render() {
    return (
      <>
        <Notifications listNotifications={listNotifications} />
        <Header />
        {this.props.isLoggedIn ? (
          <div className="courses">
            <CourseList listCourses={listCourses} />
          </div>
        ) : (
          <Login />
        )}
        <Footer />
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};
App.defaultProps = {
  isLoggedIn: false,
};

export { listNotifications, listCourses }; // for tests
export default App;
