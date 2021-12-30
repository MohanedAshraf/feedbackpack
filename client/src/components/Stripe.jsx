import { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Stripe extends Component {
  render() {
    return <StripeCheckout />;
  }
}

export default Stripe;
