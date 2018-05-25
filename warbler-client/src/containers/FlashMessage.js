import React, { Component } from 'react';
import { connect } from 'react-redux';

class FlashMessage extends Component {
  render() {
    const { category, message } = this.props;
    return (
      <div className={`alert alert-${category}`}>
        {message}
        <span className="float-right">&times;</span>
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

export default connect(mapStateToProps, null)(FlashMessage);
