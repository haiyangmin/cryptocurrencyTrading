import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import appLayout from 'SharedStyles/appLayout';
import styles from './styles.css';

// components for Header
import UserMenu from 'Components/Header/UserMenu';
import Logo from 'Components/Header/Logo';

class Header extends Component {

  render() {
    const {
      authenticated,
      name,
      username,
      avatarUrl,
    } = this.props.user;

    return (
      <div className={classnames(appLayout.constraintWidth)}>
        <div className={styles.headerTop}>
          <Logo />
          <UserMenu
            signedIn={authenticated}
            userName={name || username}
            gitHandler={username}
            avatar={avatarUrl}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    user: state.user,
  }; }
)(Header);
