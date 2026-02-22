import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - Premium Meats</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1>About Us</h1>
        <p className="mt-4 text-secondary-600">
          Our story, our craft, our commitment to quality
        </p>
      </main>
    </>
  );
}
