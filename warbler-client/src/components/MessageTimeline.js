import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import MessageForm from '../containers/MessageForm';
import withAuth from '../hocs/withAuth';

const MessageTimeline = ({ profileImageUrl, username }) => {
  return (
    <div className="row d-flex justify-content-sm-center">
      <UserAside profileImageUrl={profileImageUrl} username={username} />
      <div className="col-sm-12 col-md-8 loading-wrapper">
        <MessageForm />
        <MessageList />
      </div>
    </div>
  );
};

export default withAuth(MessageTimeline);
