import { Helmet } from 'react-helmet-async';

export default function AdminProductsPage() {
  return (
    <>
      <Helmet>
        <title>Manage Products - Premium Meats Admin</title>
      </Helmet>
      <main className="p-6">
        <h1 className="text-3xl">Manage Products</h1>
        <p className="mt-4 text-secondary-600">
          Add, edit, and manage your product catalog
        </p>
      </main>
    </>
  );
}
