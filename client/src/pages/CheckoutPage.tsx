import { Helmet } from 'react-helmet-async';

export default function CheckoutPage() {
  return (
    <>
      <Helmet>
        <title>Checkout - Premium Meats</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1>Checkout</h1>
        <p className="mt-4 text-secondary-600">Complete your order</p>
      </main>
    </>
  );
}
