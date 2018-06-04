import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';
import MessageForm from '../containers/MessageForm';
import withAuth from '../hocs/withAuth';

class MessageTimeline extends Component {
  componentDidMount() {
    // set user profile route, set active profile
    const { match, activeProfile, getActiveProfileUser } = this.props;
    const urlUsername = match.params.username;
    if (urlUsername && activeProfile.username !== urlUsername) {
      getActiveProfileUser(urlUsername).catch(err => {
        return;
      });
    }
  }

  render() {
    const {
      profileImageUrl,
      username,
      biography,
      activeProfile,
      onSelectUser
    } = this.props;

    return (
      <div className="row d-flex justify-content-md-center">
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
  }
}

export default withRouter(withAuth(MessageTimeline));
