import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';
import { spring, TransitionMotion } from 'react-motion';
import { getFilteredDataByUser } from '../utils/filters';
import { setActiveProfile } from '../store/actions/activeProfile';

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  willEnter = () => ({
    translateY: 500,
    opacity: 0
  });

  willLeave = () => ({
    translateY: 0,
    opacity: spring(0)
  });

  render() {
    const {
      messages,
      filteredData,
      removeMessage,
      currentUser,
      isFetching,
      setActiveProfile,
      location
    } = this.props;

    const messageList = location.pathname === '/' ? messages : filteredData;

    return (
      <div>
        <div className="col-sm-12 offset-md-1 col-md-10">
          <ul
            className="list-group"
            id="messages"
            style={{ opacity: isFetching ? 0.5 : 1, width: '100%' }}
          >
            <TransitionMotion
              willEnter={this.willEnter}
              willLeave={this.willLeave}
              styles={messageList.map(m => ({
                key: m._id,
                style: {
                  translateY: spring(0),
                  opacity: spring(1)
                },
                data: m
              }))}
            >
              {interpolated =>
                interpolated.length || isFetching ? (
                  <div>
                    {interpolated.map(({ key, style, data }) => (
                      <MessageItem
                        key={`${key}-transition`}
                        style={{
                          transform: `translateY(${style.translateY}px)`,
                          opacity: style.opacity
                        }}
                        date={data.createdAt}
                        text={data.text}
                        username={data.user.username}
                        profileImageUrl={data.user.profileImageUrl}
                        removeMessage={removeMessage.bind(
                          this,
                          data.user._id,
                          data._id
                        )}
                        isCorrectUser={currentUser === data.user._id}
                        onSelectUser={setActiveProfile.bind(this, data.user)}
                      />
                    ))}
                  </div>
                ) : (
                  <p style={{ textAlign: 'center' }}>No messages found.</p>
                )
              }
            </TransitionMotion>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    currentUser: state.currentUser.user._id,
    filteredData: getFilteredDataByUser(
      state.messages,
      state.activeProfile.username
    ),
    isFetching: state.loading.isFetching
  };
}

export default withRouter(
  connect(mapStateToProps, {
    fetchMessages,
    removeMessage,
    setActiveProfile
  })(MessageList)
);
