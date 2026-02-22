import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Premium Meats - Quality Cuts Delivered Fresh</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1 className="text-center">Premium Meats</h1>
        <p className="mt-4 text-center text-lg text-secondary-600">
          Quality cuts delivered fresh to your door
        </p>
      </main>
    </>
  );
}
