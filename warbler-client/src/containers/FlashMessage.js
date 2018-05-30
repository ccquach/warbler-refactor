import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFlash } from '../store/actions/flash';
import CharButton from '../components/CharButton';

const DURATION = 8000;

class FlashMessage extends Component {
  componentDidMount() {
    if (this.timer !== null) clearTimeout(this.timer);
    this.setTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  setTimer = () => {
    this.timeout = setTimeout(() => {
      this.props.removeFlash();
      this.timeout = null;
    }, DURATION);
  };

  onEnter = () => {
    clearTimeout(this.timeout);
  };

  onExit = () => {
    this.setTimer();
  };

  onClose = () => {
    this.props.removeFlash();
  };

  render() {
    const { category, message } = this.props;
    return (
      <div
        className={`alert alert-${category}`}
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onExit}
      >
        {message}
        <CharButton
          buttonType="button"
          buttonChar="\u00D7"
          onClose={this.onClose}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    category: state.flash.category,
    message: state.flash.message
  };
}

export default connect(mapStateToProps, { removeFlash })(FlashMessage);
