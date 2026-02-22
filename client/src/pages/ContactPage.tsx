import { Helmet } from 'react-helmet-async';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us - Premium Meats</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1>Contact Us</h1>
        <p className="mt-4 text-secondary-600">
          Get in touch with our team
        </p>
      </main>
    </>
  );
}
