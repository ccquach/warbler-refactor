import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CloseButton from './CloseButton';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const MessageItem = ({
  date,
  profileImageUrl,
  text,
  username,
  removeMessage,
  isCorrectUser,
  style
}) => (
  <div style={style}>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <img
          src={profileImageUrl || DefaultProfileImg}
          alt={username}
          height="100"
          width="100"
          className="timeline-image"
        />
        <div className="message-area">
          <Link to="/">@{username} &nbsp;</Link>
          <span className="text-muted">
            <Moment className="text-muted" format="Do MMM YYYY">
              {date}
            </Moment>
          </span>
          <p>{text}</p>
        </div>
      </div>
      {isCorrectUser && <CloseButton onClose={removeMessage} />}
    </li>
  </div>
);

export default MessageItem;
