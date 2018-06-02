import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser, updatePassword } from '../store/actions/auth';
import { removeFlash } from '../store/actions/flash';
import withAuth from '../hocs/withAuth';
import FlashMessage from './FlashMessage';
import Scale from '../components/animations/Scale';
import MessageTimeline from '../components/MessageTimeline';

const AuthenticatedUserSettings = withAuth(AuthForm);

const Main = props => {
  const {
    currentUser,
    authUser,
    removeFlash,
    updatePassword,
    flash,
    history,
    isFetching,
    mainStyle,
    activeProfile
  } = props;

  // remove flash on route change
  history.listen(() => {
    removeFlash();
  });

  return (
    <div className="container" style={mainStyle}>
      <Scale el="flash">{flash.message && <FlashMessage />}</Scale>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={props => (
            <AuthForm
              onAuth={authUser}
              buttonText="Log in"
              heading="Welcome back!"
              isFetching={isFetching}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={props => (
            <AuthForm
              onAuth={authUser}
              signUp
              buttonText="Sign me up!"
              heading="Join Warbler today!"
              isFetching={isFetching}
              {...props}
            />
          )}
        />
        <Route
          path="/users/:id/settings"
          render={() => (
            <AuthenticatedUserSettings
              onAuth={authUser}
              onChangePassword={updatePassword}
              updateUser={true}
              currentUser={currentUser}
              buttonText="Save Changes"
              heading="Account Settings"
              isFetching={isFetching}
              {...props}
            />
          )}
        />
        <Route
          path="/users/:username"
          render={() => <MessageTimeline activeProfile={activeProfile} />}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    flash: state.flash,
    isFetching: state.loading.isFetching,
    activeProfile: state.activeProfile
  };
}

export default withRouter(
  connect(mapStateToProps, {
    authUser,
    removeFlash,
    updatePassword
  })(Main)
);
