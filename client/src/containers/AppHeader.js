import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../redux/actions';
import AppHeaderComponent from '../components/AppHeaderComponent';

class AppHeader extends Component {

  handleLogout = (e) => {

    e.preventDefault();

    const authenticated = this.props.authenticated;

    if (authenticated) {
      this.props.logout();
    }
  };

  render() {
    const authenticated = this.props.authenticated;

    return (
      <AppHeaderComponent
        handleLogout={this.handleLogout}
        authenticated={authenticated}
      />
    );

  };
};

const mapStateToProps = state => {

  return {
    authenticated: state.loginStatus.authenticated
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
