import { Helmet } from 'react-helmet-async';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Sign In - Premium Meats</title>
      </Helmet>
      <main className="container-narrow py-12">
        <h1 className="text-center">Sign In</h1>
        <p className="mt-4 text-center text-secondary-600">
          Welcome back to Premium Meats
        </p>
      </main>
    </>
  );
}
