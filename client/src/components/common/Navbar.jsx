import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Gap Analysis', path: '/analysis' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume AI', path: '/resume' },
    { name: 'Interview Mode', path: '/interview' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-hairline transition-all">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group transition-opacity hover:opacity-85"
          >
            <img 
              src="/favicon-32x32.png" 
              alt="CareerSense Logo" 
              className="w-8 h-8 rounded-lg object-contain shadow-sm"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-[22px] tracking-tight text-ink font-light">
                CareerSense
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-rose"></span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[15px] font-medium transition-colors duration-150 relative py-1 ${
                  isActive(link.path)
                    ? 'text-ink'
                    : 'text-body hover:text-ink'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-body">
                  <div className="w-8 h-8 rounded-full bg-surface-strong flex items-center justify-center text-ink border border-hairline">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:block truncate max-w-[150px]">{user?.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-muted hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button variant="primary" size="md" onClick={() => setIsAuthModalOpen(true)}>
                Login / Sign up
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ink hover:bg-surface-strong transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-hairline bg-canvas px-6 pt-2 pb-6 space-y-3">
            {isAuthenticated && (
              <div className="py-2 mb-2 border-b border-hairline flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-strong flex items-center justify-center text-ink">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-ink truncate">{user?.email}</span>
              </div>
            )}
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-[16px] font-medium transition-colors ${
                  isActive(link.path) ? 'text-ink font-semibold' : 'text-body'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-3 border-t border-hairline">
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  size="md" 
                  className="w-full justify-center text-rose-500 border-rose-200 hover:bg-rose-50"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full"
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Login / Sign up
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
