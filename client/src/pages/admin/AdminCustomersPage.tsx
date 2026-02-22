import { Helmet } from 'react-helmet-async';

export default function AdminCustomersPage() {
  return (
    <>
      <Helmet>
        <title>Manage Customers - Premium Meats Admin</title>
      </Helmet>
      <main className="p-6">
        <h1 className="text-3xl">Manage Customers</h1>
        <p className="mt-4 text-secondary-600">
          View customer accounts and activity
        </p>
      </main>
    </>
  );
}
