import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser, updatePassword } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from './MessageForm';

const Main = props => {
  const { currentUser, authUser, errors, removeError, updatePassword } = props;
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => <Homepage currentUser={currentUser} {...props} />}
      />
      <Route
        exact
        path="/signin"
        render={props => {
          return (
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              buttonText="Log in"
              heading="Welcome back!"
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path="/signup"
        render={props => {
          return (
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              signUp
              buttonText="Sign me up!"
              heading="Join Warbler today!"
              {...props}
            />
          );
        }}
      />
      <Route
        path="/users/:id/messages/new"
        component={withAuth({})(MessageForm)}
      />
      <Route
        path="/users/:id/settings"
        component={withAuth({
          removeError,
          errors,
          onAuth: authUser,
          onChangePassword: updatePassword,
          updateUser: true,
          currentUser,
          buttonText: 'Save Changes',
          heading: 'Account Settings'
        })(AuthForm)}
      />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, removeError, updatePassword })(Main)
);
