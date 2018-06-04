import React, { Component } from 'react';
import PasswordForm from './PasswordForm';
import DefaultProfileImg from '../images/default-profile-image.jpg';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    if (props.currentUser) {
      let user = props.currentUser.user;
      this.state = {
        username: user.username,
        biography: user.biography,
        profileImageUrl: user.profileImageUrl,
        phoneNumber: user.phoneNumber ? user.phoneNumber : '',
        smsEnabled: user.phoneNumber ? true : false,
        changePassword: false
      };
    } else {
      this.state = {
        email: '',
        username: '',
        password: '',
        groupPassword: '',
        biography: '',
        profileImageUrl: '',
        phoneNumber: '',
        smsEnabled: false
      };
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePhoneChange = e => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    this.setState({ phoneNumber: val });
  };

  handlePhoneCheckbox = e => {
    this.setState({ smsEnabled: e.target.checked });
    if (!e.target.checked) this.setState({ phoneNumber: '' });
  };

  handleChangePassword = e => {
    e.preventDefault();
    this.setState({ changePassword: !this.state.changePassword });
  };

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp
      ? 'signup'
      : this.props.updateUser
        ? 'updateUser'
        : 'signin';
    this.props
      .onAuth(authType, this.state)
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

  render() {
    const {
      email,
      username,
      password,
      groupPassword,
      biography,
      profileImageUrl,
      phoneNumber,
      smsEnabled,
      changePassword
    } = this.state;

    const { heading, buttonText, signUp, updateUser, isFetching } = this.props;

    return (
      <div className="row">
        <div className="col-8 offset-2 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <form
            onSubmit={this.handleSubmit}
            style={{ opacity: isFetching ? 0.5 : 1 }}
          >
            <h2 className="text-center">{heading}</h2>
            {!updateUser && (
              <div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    value={email}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                    value={password}
                    type="password"
                  />
                </div>
              </div>
            )}
            {signUp && (
              <div>
                <div className="form-group">
                  <label htmlFor="group-password">Group Password</label>
                  <input
                    className="form-control"
                    id="group-password"
                    name="groupPassword"
                    onChange={this.handleChange}
                    value={groupPassword}
                    type="password"
                  />
                </div>
              </div>
            )}
            {(signUp || updateUser) && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">SMS Phone #</label>
                  <input
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={this.handlePhoneChange}
                    value={phoneNumber}
                    disabled={!smsEnabled}
                    type="text"
                  />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="phone-number-check"
                      checked={smsEnabled}
                      onChange={this.handlePhoneCheckbox}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="phone-number-check"
                    >
                      Enable SMS Notifications
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="biography">Bio</label>
                  <textarea
                    style={{ resize: 'none' }}
                    rows="3"
                    maxLength="160"
                    className="form-control"
                    id="biography"
                    name="biography"
                    onChange={this.handleChange}
                    value={biography}
                    autoComplete="false"
                    autoCapitalize="none"
                    placeholder="This is me :)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image-url">Image URL</label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    onChange={this.handleChange}
                    value={profileImageUrl}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <img
                    src={profileImageUrl || DefaultProfileImg}
                    alt="avatar preview"
                    className="img-thumbnail mx-auto d-block"
                    width="200"
                    height="200"
                  />
                </div>
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
            <PasswordForm handleChangePassword={this.props.onChangePassword} />
          )}
        </div>
      </div>
    );
  }
}

export default AuthForm;
