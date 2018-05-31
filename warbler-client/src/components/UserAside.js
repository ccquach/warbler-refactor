import React from 'react';
import DefaultProfileImg from '../images/default-profile-image.jpg';

const UserAside = ({ profileImageUrl, username }) => (
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
        <h5 className="card-title">@{username}</h5>
        <p className="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod
          id ipsum eu pretium. Integer in dui non purus congue iaculis in in
          velit.
        </p>
      </div>
    </div>
  </aside>
);

export default UserAside;
