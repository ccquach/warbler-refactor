import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import MessageForm from '../containers/MessageForm';
import withAuth from '../hocs/withAuth';

const MessageTimeline = ({
  profileImageUrl,
  username,
  biography,
  activeProfile,
  onSelectUser
}) => (
  <div className="row d-flex justify-content-sm-center">
    <UserAside
      profileImageUrl={
        activeProfile ? activeProfile.profileImageUrl : profileImageUrl
      }
      username={activeProfile ? activeProfile.username : username}
      biography={activeProfile ? activeProfile.biography : biography}
      onSelectUser={onSelectUser}
    />
    <div className="col-sm-12 col-md-8 loading-wrapper">
      {!activeProfile && (
        <div>
          <MessageForm />
        </div>
      )}
      <MessageList />
    </div>
  </div>
);

export default withAuth(MessageTimeline);
