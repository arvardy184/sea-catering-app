'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Phone, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-orange to-primary-green">
        {/* Static content for SSR */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight font-inter">
                SEA Catering
              </h1>
              <div className="flex items-center justify-center gap-2 text-white/90 text-xl">
                <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                <span className="ml-2 font-medium">5.0 Rating</span>
              </div>
            </div>

            <p className="text-2xl md:text-4xl text-white/95 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
              &quot;Healthy Meals, Anytime, Anywhere&quot;
            </p>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Selamat datang di SEA Catering, layanan makanan sehat kustomizable dengan pengiriman ke seluruh Indonesia. 
              Nikmati makanan bergizi dengan informasi nutrisi lengkap dan opsi pengiriman yang fleksibel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary-orange hover:bg-gray-100 min-w-[200px]"
              >
                Mulai Berlangganan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-orange min-w-[200px]"
              >
                <Phone className="mr-2 w-5 h-5" />
                Hubungi Kami
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/80">Pelanggan Puas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-white/80">Menu Sehat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-white/80">Kota Terjangkau</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-orange to-primary-green"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight font-inter">
              SEA Catering
            </h1>
            <div className="flex items-center justify-center gap-2 text-white/90 text-xl">
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
              <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
              <span className="ml-2 font-medium">5.0 Rating</span>
            </div>
          </motion.div>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-4xl text-white/95 font-light mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            &quot;Healthy Meals, Anytime, Anywhere&quot;
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Selamat datang di SEA Catering, layanan makanan sehat kustomizable dengan pengiriman ke seluruh Indonesia. 
            Nikmati makanan bergizi dengan informasi nutrisi lengkap dan opsi pengiriman yang fleksibel.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="bg-white text-primary-orange hover:bg-gray-100 min-w-[200px]"
            >
              Mulai Berlangganan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-orange min-w-[200px]"
            >
              <Phone className="mr-2 w-5 h-5" />
              Hubungi Kami
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Pelanggan Puas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-white/80">Menu Sehat</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-white/80">Kota Terjangkau</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}; 