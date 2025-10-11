import React from 'react';
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import { getLatestNotification } from '../utils/utils';

const Notifications = () => {
  const btnStyle = {
    position: 'fixed',
    top: '1em',
    right: '1em',
    background: 'transparent',
    border: 'none',
  };

  const imgStyle = {
    width: '20px',
    height: '20px',
  }

  return (
    <div className="Notifications">
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority='default'>New course available</li>
        <li data-priority='urgent'>New resume available</li>
        <li data-priority='urgent' dangerouslySetInnerHTML={{__html: getLatestNotification()}}></li>
      </ul>
      <button style={btnStyle} aria-label='Close' onClick={() => console.log('Close button has been clicked')}>
        <img src={close_icon} style={imgStyle}/>
      </button>
    </div>
  )
}

export default Notifications;
