import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <Helmet>
        <title>Product Detail - Premium Meats</title>
      </Helmet>
      <main className="container-wide py-12">
        <h1>Product Detail</h1>
        <p className="mt-4 text-secondary-600">Viewing product: {slug}</p>
      </main>
    </>
  );
}
