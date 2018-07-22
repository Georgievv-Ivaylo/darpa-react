import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../users/actions';

class Header extends React.Component {

  render() {
    const user = this.props.user || {};
    const activeLink = this.props.location.pathname;
    return (
      <section className="navigation-grid">
        <Link key='home'
          to='/'
          className={'href'+ (activeLink === '/' ? ' active' : '')}
        >Home</Link>
        {/* <Link key='statistics'
          to='/statistics'
          className={'href'+ (activeLink === '/statistics' ? ' active' : '')}
        >Statistics</Link>
        {!user.id &&
          <Link key='logIn'
            to='log-in'
            className={'href'+ (activeLink === '/log-in' ? ' active' : '')}
          >Log In</Link>
        } */}
        {user.id &&
          <div key='logOut'onClick={this.logOut} className="href">Log Out</div>
        }
        {user.id && <div key='welcome' className="info-msg">{user.fullName}</div>}
      </section>
    );
  }

  logOut = () => {
    let { dispatch } = this.props;
    const action = actions.unset();
    dispatch(action);
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Header);