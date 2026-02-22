import { Helmet } from 'react-helmet-async';

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title>Shopping Cart - Premium Meats</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1>Shopping Cart</h1>
        <p className="mt-4 text-secondary-600">Review your selected items</p>
      </main>
    </>
  );
}
