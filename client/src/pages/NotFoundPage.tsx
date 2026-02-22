import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Premium Meats</title>
      </Helmet>
      <main className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-12 text-center">
        <h1 className="text-6xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-2xl">Page Not Found</h2>
        <p className="mt-2 text-secondary-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Back to Home
        </Link>
      </main>
    </>
  );
}
