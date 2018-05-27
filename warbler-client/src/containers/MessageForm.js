import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';
import Loading from '../components/Loading';

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
      .then(() => this.props.history.push('/'))
      .catch(() => {
        return;
      });
  };

  render() {
    const { isFetching } = this.props;
    return (
      <div className="offset-2 col-md-8 loading-wrapper">
        {isFetching ? <Loading /> : null}
        <form
          onSubmit={this.handleNewMessage}
          style={{ opacity: isFetching ? 0.5 : 1 }}
        >
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

function mapStateToProps(state) {
  return {
    isFetching: state.loading.isFetching
  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
