import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CharButton from './CharButton';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const MessageItem = ({
  date,
  profileImageUrl,
  text,
  username,
  removeMessage,
  isCorrectUser,
  onSelectUser,
  style
}) => (
  <div style={style}>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <Link to={`/${username}`} onClick={onSelectUser}>
          <img
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
            height="100"
            width="100"
            className="timeline-image"
          />
        </Link>
        <div className="message-area">
          <Link to={`/${username}`} onClick={onSelectUser}>
            @{username} &nbsp;
          </Link>
          <span className="text-muted">
            <Moment className="text-muted" format="Do MMM YYYY">
              {date}
            </Moment>
          </span>
          <p>{text}</p>
        </div>
      </div>
      {isCorrectUser && (
        <CharButton
          buttonType="button"
          buttonChar="\u00D7"
          onClose={removeMessage}
        />
      )}
    </li>
  </div>
);

export default MessageItem;
