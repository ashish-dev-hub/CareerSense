import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas selection:bg-surface-strong selection:text-ink overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
