import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, Upload, BarChart2, Activity, Info, FileText } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Leaf size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Methodology', path: '/methodology', icon: <FileText size={18} /> },
    { name: 'Upload', path: '/upload', icon: <Upload size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Activity size={18} /> },
    { name: 'Results', path: '/results', icon: <BarChart2 size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-emerald-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="font-bold text-xl tracking-tight">AgroScan AI</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-emerald-800 text-emerald-400'
                      : 'hover:bg-emerald-800 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-400 hover:text-white hover:bg-emerald-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-900 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-emerald-800 text-emerald-400'
                    : 'text-white hover:bg-emerald-800'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
