import React, { Component } from 'react';

class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleChangePassword(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h5 style={{ textAlign: 'center' }}>Update Password</h5>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            name="oldPassword"
            onChange={this.handleChange}
            type="password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            onChange={this.handleChange}
            type="password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={this.handleChange}
            type="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-block btn-outline-danger">
          Change Password
        </button>
      </form>
    );
  }
}

export default PasswordForm;
