import { Helmet } from 'react-helmet-async';

export default function AdminOrdersPage() {
  return (
    <>
      <Helmet>
        <title>Manage Orders - Premium Meats Admin</title>
      </Helmet>
      <main className="p-6">
        <h1 className="text-3xl">Manage Orders</h1>
        <p className="mt-4 text-secondary-600">
          View and process customer orders
        </p>
      </main>
    </>
  );
}
