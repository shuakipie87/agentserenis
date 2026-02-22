import { Helmet } from 'react-helmet-async';

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Premium Meats</title>
      </Helmet>
      <main className="p-6">
        <h1 className="text-3xl">Admin Dashboard</h1>
        <p className="mt-4 text-secondary-600">
          Overview of sales, orders, and inventory
        </p>
      </main>
    </>
  );
}
