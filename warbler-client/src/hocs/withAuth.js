import React, { Component } from 'react';
import { connect } from 'react-redux';

const withAuth = injectedProps => ComponentToBeRendered => {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/signin');
      }
    }
    render() {
      return <ComponentToBeRendered {...injectedProps} {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
};

export default withAuth;
