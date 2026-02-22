import { Helmet } from 'react-helmet-async';

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Our Products - Premium Meats</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1>Our Products</h1>
        <p className="mt-4 text-secondary-600">Browse our selection of premium cuts</p>
      </main>
    </>
  );
}
