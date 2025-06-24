'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Phone } from 'lucide-react';
import { Button } from './Button';

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#hero' },
  { name: 'Menu', href: '#menu' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'features', 'menu', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900">SEA Catering</span>
                <span className="text-xs text-gray-600">Healthy Meals</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <span key={item.name} className="px-4 py-2 text-sm font-medium text-gray-700">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                SEA Catering
              </span>
              <span className={`text-xs ${scrolled ? 'text-gray-600' : 'text-white/80'}`}>
                Healthy Meals
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ y: -2 }}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-all duration-300
                  ${activeSection === item.href.replace('#', '') 
                    ? scrolled 
                      ? 'text-orange-600' 
                      : 'text-orange-300'
                    : scrolled 
                      ? 'text-gray-700 hover:text-orange-600' 
                      : 'text-white/90 hover:text-orange-300'
                  }
                `}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection('#contact')}
              className={`
                ${scrolled 
                  ? 'text-gray-700 hover:text-orange-600' 
                  : 'text-white hover:text-orange-300'
                }
              `}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Brian
            </Button>
            <Button
              size="sm"
              onClick={() => scrollToSection('#contact')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              lg:hidden p-2 rounded-lg transition-colors
              ${scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
              }
            `}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors
                    ${activeSection === item.href.replace('#', '')
                      ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.name}
                </motion.button>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection('#contact')}
                  className="w-full justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Manager Brian
                </Button>
                                 <Button
                   size="sm"
                   onClick={() => scrollToSection('#contact')}
                   className="w-full bg-orange-500 hover:bg-orange-600 text-white justify-center"
                 >
                   <ShoppingBag className="w-4 h-4 mr-2" />
                   Order Now
                 </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}; 