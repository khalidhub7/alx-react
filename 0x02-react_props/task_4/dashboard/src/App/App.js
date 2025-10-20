import React from 'react';
import PropTypes from 'prop-types';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import Notifications from '../Notifications/Notifications';

function App({ isLoggedIn, displayDrawer }) {
  return (
    <>
      <Notifications displayDrawer={displayDrawer} />
      <Header />
      {isLoggedIn ? (
        <div className="courses"><CourseList /></div>
      ) : (<Login />)}
      <Footer />
    </>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
};
App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
};

export default App;
