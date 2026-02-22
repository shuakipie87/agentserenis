import { Helmet } from 'react-helmet-async';

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Create Account - Premium Meats</title>
      </Helmet>
      <main className="container-narrow py-12">
        <h1 className="text-center">Create Account</h1>
        <p className="mt-4 text-center text-secondary-600">
          Join Premium Meats today
        </p>
      </main>
    </>
  );
}
