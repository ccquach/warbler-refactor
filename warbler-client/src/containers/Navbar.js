import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../images/warbler-logo.png';
import { logout } from '../store/actions/auth';
import NavPanel from '../components/NavPanel';
import NavbarBackgroundImg from '../images/nav-bg.png';
import './Navbar.css';

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
    this.props.closePanel();
  };

  render() {
    const {
      currentUser,
      history,
      panelOpen,
      closePanel,
      togglePanel
    } = this.props;

    history.listen(() => {
      closePanel();
    });

    return (
      <nav
        className="navbar navbar-expand"
        style={{
          backgroundImage: panelOpen ? 'none' : `url(${NavbarBackgroundImg})`
        }}
      >
        <div className="container-fluid">
          {/* Logo */}
          <div
            className="navbar-header"
            style={{
              opacity: panelOpen ? 0.5 : 1,
              pointerEvents: panelOpen ? 'none' : 'auto'
            }}
          >
            <Link to="/" className="navbar-brand">
              <span className="navbar-img-helper" />
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          {/* Nav Panel */}
          <NavPanel
            currentUser={currentUser}
            panelOpen={panelOpen}
            closePanel={closePanel}
            togglePanel={togglePanel}
          />
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
