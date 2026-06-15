import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#2563EB" />
      <rect x="8" y="9" width="10" height="2" rx="1" fill="white" />
      <rect x="8" y="14" width="7.5" height="2" rx="1" fill="white" />
      <rect x="8" y="19" width="9" height="2" rx="1" fill="white" />
      <path d="M22 8.5L22.7 10.5L24.5 11.2L22.7 11.9L22 14L21.3 11.9L19.5 11.2L21.3 10.5Z" fill="white" opacity="0.95" />
    </svg>
  );
}

const navLinks = [
  { label: 'Home', href: '/', exact: true },
  { label: 'Document Corrector', href: '/upload' },
  { label: 'Resume Optimizer', href: '/resume-tailor' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string, exact?: boolean): boolean {
    if (exact || href === '/') return location.pathname === '/';
    if (href === '/upload') return location.pathname === '/upload' || location.pathname === '/results';
    return location.pathname === href || location.pathname.startsWith(href);
  }

  return (
    <header className="border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setMobileOpen(false)}
          >
            <LogoMark />
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gray-900">Elevate</span>
              <span className="text-blue-600">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive(link.href, link.exact)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 pb-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive(link.href, link.exact)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
