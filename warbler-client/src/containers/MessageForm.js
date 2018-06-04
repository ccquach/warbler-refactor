import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage, fetchMessages } from '../store/actions/messages';
import CharButton from '../components/CharButton';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleNewMessage = e => {
    e.preventDefault();
    this.props
      .postNewMessage(this.state.message)
      .then(() => {
        this.setState({ message: '' });
        this.props.fetchMessages();
      })
      .catch(() => {
        return;
      });
  };

  render() {
    const { isFetching } = this.props;

    const textAreaStyle = {
      resize: 'none'
    };

    const buttonStyle = {
      position: 'absolute',
      top: 6,
      right: 35
    };

    return (
      <div className="col-sm-12 offset-md-1 col-md-10">
        <form
          onSubmit={this.handleNewMessage}
          style={{ opacity: isFetching ? 0.5 : 1 }}
        >
          <textarea
            style={textAreaStyle}
            rows="3"
            maxLength="160"
            className="form-control"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            autoComplete="false"
            autoCapitalize="none"
            placeholder="Hello world!"
          />
          <CharButton
            buttonType="submit"
            buttonChar="\u002B"
            buttonStyle={buttonStyle}
          />
        </form>
      </div>
    );
  }
}

export default connect(null, { postNewMessage, fetchMessages })(MessageForm);
