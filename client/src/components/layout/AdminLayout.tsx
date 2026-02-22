import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import { LayoutDashboard, Package, ClipboardList, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageLoadingSpinner from '@/components/ui/PageLoadingSpinner';

const adminNavItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package, end: false },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList, end: false },
  { to: '/admin/customers', label: 'Customers', icon: Users, end: false },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-bone">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 border-r border-secondary-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-bone px-6">
          <a href="/" className="font-heading text-xl font-bold text-primary-600">
            Premium Meats
          </a>
        </div>
        <nav className="mt-6 space-y-1 px-3" aria-label="Admin navigation">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-600 hover:bg-bone hover:text-charcoal',
                )
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-6 left-0 w-full px-6">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-secondary-500 transition-colors hover:text-charcoal"
          >
            &larr; Back to Store
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-bone bg-white/95 px-6 backdrop-blur-sm">
          <h2 className="font-heading text-lg font-semibold text-charcoal">Admin Panel</h2>
        </header>
        <main className="flex-1">
          <Suspense fallback={<PageLoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
