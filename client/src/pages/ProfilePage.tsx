import { Helmet } from 'react-helmet-async';

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title>My Profile - Premium Meats</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1>My Profile</h1>
        <p className="mt-4 text-secondary-600">
          Manage your account and orders
        </p>
      </main>
    </>
  );
}
