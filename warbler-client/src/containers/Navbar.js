import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../images/warbler-logo.png';
import { logout } from '../store/actions/auth';
import { Motion, spring } from 'react-motion';
import './Navbar.css';

const panelStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  width: 180,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100vh',
  background: 'rgba(85, 223, 189, 0.8)',
  zIndex: 98,
  paddingTop: 90
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { panelOpen: false };
  }

  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
    this.closePanel();
  };

  closePanel = () => {
    this.setState({ panelOpen: false });
  };

  togglePanel = e => {
    this.setState({ panelOpen: !this.state.panelOpen });
  };

  render() {
    const { panelOpen } = this.state;
    const { currentUser, history } = this.props;

    history.listen(() => {
      this.closePanel();
    });

    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          {/* Logo */}
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <span className="navbar-img-helper" />
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          {/* Nav Panel Toggle */}
          {/* Source: https://codepen.io/kylehenwood/pen/Alayb */}
          <div
            id="hamburger"
            className={`hamburglar ${panelOpen ? 'is-open' : 'is-closed'}`}
            onClick={this.togglePanel}
          >
            <div className="burger-icon">
              <div className="burger-container">
                <span className="burger-bun-top" />
                <span className="burger-filling" />
                <span className="burger-bun-bot" />
              </div>
            </div>
            {/* svg ring containter */}
            <div className="burger-ring">
              <svg className="svg-ring">
                <path
                  className="path"
                  fill="none"
                  stroke="#fff"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                  d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"
                />
              </svg>
            </div>
            {/* the masked path that animates the fill to the ring */}
            <svg width="0" height="0">
              <mask id="mask">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#ff0000"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                  d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4"
                />
              </mask>
            </svg>
            <div className="path-burger">
              <div className="animate-path">
                <div className="path-rotation" />
              </div>
            </div>
          </div>
          {/* Nav Panel */}
          {/* Source: https://codepen.io/tkh44/pen/BLAmxa */}
          <Motion
            style={{
              x: spring(panelOpen ? 0 : -100),
              opacity: spring(panelOpen ? 1 : 0)
            }}
          >
            {interpolated => (
              <div
                style={{
                  ...panelStyle,
                  transform: `translate3d(${interpolated.x}%, 0, 0)`,
                  opacity: interpolated.opacity
                }}
              >
                {panelOpen && (
                  <div>
                    {currentUser.isAuthenticated ? (
                      <ul className="nav navbar-nav navbar-right">
                        <li>
                          <Link to={`/users/${currentUser.user.id}/settings`}>
                            Account
                          </Link>
                        </li>
                        <li>
                          <a onClick={this.logout}>Log out</a>
                        </li>
                      </ul>
                    ) : (
                      <ul className="nav navbar-nav navbar-right">
                        <li>
                          <Link to="/signup">Sign up</Link>
                        </li>
                        <li>
                          <Link to="/signin">Log in</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </Motion>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
