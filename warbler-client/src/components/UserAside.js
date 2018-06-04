import React from 'react';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const UserAside = ({ profileImageUrl, username, biography, onSelectUser }) => (
  <aside className="col-sm-10 col-md-3 mb-4">
    <div className="card">
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        width="200"
        height="200"
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/${username}`} onClick={onSelectUser}>
            @{username}
          </Link>
        </h5>
        <p className="card-text">{biography}</p>
      </div>
    </div>
  </aside>
);

export default UserAside;
