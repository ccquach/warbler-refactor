import React, { Component } from 'react';
import PasswordForm from './PasswordForm';
import DefaultProfileImg from '../images/default-profile-image.jpg';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: props.currentUser ? props.currentUser.user.username : '',
      password: '',
      groupPassword: '',
      profileImageUrl: props.currentUser
        ? props.currentUser.user.profileImageUrl
        : '',
      changePassword: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp
      ? 'signup'
      : this.props.updateUser
        ? 'updateUser'
        : 'signin';
    this.props
      .onAuth(
        authType,
        this.state,
        this.props.currentUser ? this.props.currentUser.user.id : null
      )
      .then(() => {
        if (!this.props.updateUser) {
          this.props.history.push('/');
        }
        return;
      })
      .catch(() => {
        return;
      });
  };

  handleChangePassword = e => {
    e.preventDefault();
    this.setState({ changePassword: !this.state.changePassword });
  };

  render() {
    const { email, username, profileImageUrl, changePassword } = this.state;
    const { heading, buttonText, signUp, updateUser, currentUser } = this.props;

    return (
      <div className="row justify-content-md-center text-center">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
            {!updateUser && (
              <div>
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                  type="text"
                />
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                />
              </div>
            )}
            {signUp && (
              <div>
                <label htmlFor="group-password">Group Password</label>
                <input
                  className="form-control"
                  id="group-password"
                  name="groupPassword"
                  onChange={this.handleChange}
                  type="password"
                />
              </div>
            )}
            {(signUp || updateUser) && (
              <div>
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                  type="text"
                />
                <label htmlFor="image-url">Image URL</label>
                <input
                  className="form-control"
                  id="image-url"
                  name="profileImageUrl"
                  onChange={this.handleChange}
                  value={profileImageUrl}
                  type="text"
                />
                <label htmlFor="image-preview">Image Preview</label>
                <img
                  src={profileImageUrl || DefaultProfileImg}
                  alt="avatar preview"
                  className="img-thumbnail mx-auto d-block"
                  width="200"
                  height="200"
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block">
              {buttonText}
            </button>
            {updateUser && (
              <a onClick={this.handleChangePassword} className="float-right">
                {changePassword ? 'Changed my mind' : 'Change Password'}
              </a>
            )}
          </form>
          {changePassword && (
            <PasswordForm
              handleChangePassword={this.props.onChangePassword}
              currentUser={currentUser}
            />
          )}
        </div>
      </div>
    );
  }
}

export default AuthForm;
