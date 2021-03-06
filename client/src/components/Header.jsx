import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Stripe from './Stripe';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );

      default:
        return [
          <li key="1">
            <Stripe />
          </li>,
          <li key="2" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    console.log(this.props.auth);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.user ? '/surveys' : '/'} className="brand-logo">
            Feedbp
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
