import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, removeMessage } from '../store/actions/messages';
import MessageItem from '../components/MessageItem';
import { spring, TransitionMotion } from 'react-motion';
import Loading from '../components/Loading';

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
    const { messages, removeMessage, currentUser, isFetching } = this.props;
    return (
      <div className="col-sm-12 col-md-8 loading-wrapper">
        {isFetching ? <Loading /> : null}
        <div className="col-sm-12 offset-md-1 col-md-10">
          <ul
            className="list-group"
            id="messages"
            style={{ opacity: isFetching ? 0.5 : 1 }}
          >
            <TransitionMotion
              willEnter={this.willEnter}
              willLeave={this.willLeave}
              styles={messages.map(m => ({
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
    currentUser: state.currentUser.user.id,
    isFetching: state.loading.isFetching
  };
}

export default connect(mapStateToProps, { fetchMessages, removeMessage })(
  MessageList
);
