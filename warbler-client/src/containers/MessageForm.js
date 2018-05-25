import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';

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
        this.props.history.push('/');
      })
      .catch(() => {
        return;
      });
  };

  render() {
    return (
      <div className="offset-2 col-md-8">
        <form onSubmit={this.handleNewMessage}>
          <textarea
            maxLength="160"
            className="form-control"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <button type="submit" className="btn btn-success float-right">
            Add my message!
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { postNewMessage })(MessageForm);
