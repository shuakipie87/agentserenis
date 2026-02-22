import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import PageLoadingSpinner from '@/components/ui/PageLoadingSpinner';

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header will be built in Phase 2 */}
      <header className="sticky top-0 z-40 border-b border-bone bg-white/95 backdrop-blur-sm">
        <div className="container-wide flex h-16 items-center justify-between">
          <a href="/" className="font-heading text-2xl font-bold text-primary-600">
            Premium Meats
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="/products" className="text-sm font-medium text-charcoal hover:text-primary-600">
              Products
            </a>
            <a href="/about" className="text-sm font-medium text-charcoal hover:text-primary-600">
              About
            </a>
            <a href="/contact" className="text-sm font-medium text-charcoal hover:text-primary-600">
              Contact
            </a>
            <a href="/cart" className="text-sm font-medium text-charcoal hover:text-primary-600">
              Cart
            </a>
            <a href="/login" className="btn-primary text-sm">
              Sign In
            </a>
          </nav>
        </div>
      </header>

      <div className="flex-1">
        <Suspense fallback={<PageLoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>

      {/* Footer will be built in Phase 2 */}
      <footer className="border-t border-bone bg-charcoal py-12 text-bone">
        <div className="container-wide text-center">
          <p className="font-heading text-xl font-semibold text-white">Premium Meats</p>
          <p className="mt-2 text-sm text-secondary-200">
            Quality cuts delivered fresh to your door
          </p>
          <p className="mt-6 text-xs text-secondary-300">
            &copy; {new Date().getFullYear()} Premium Meats. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
