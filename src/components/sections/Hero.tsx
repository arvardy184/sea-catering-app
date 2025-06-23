'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  ArrowRight, 
  Star, 
  Play,
  Sparkles,
  Zap,
  Award,
  Users,
  MapPin,
  Clock
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingElements = [
    { icon: Sparkles, delay: 0.2, x: "10%", y: "20%" },
    { icon: Zap, delay: 0.4, x: "85%", y: "15%" },
    { icon: Award, delay: 0.6, x: "15%", y: "70%" },
    { icon: Users, delay: 0.8, x: "90%", y: "75%" },
  ];

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-none">
                SEA<br/>
                <span className="text-yellow-300">Catering</span>
              </h1>
                              <p className="text-2xl md:text-3xl text-white/90 font-light mb-8">
                 &quot;Healthy Meals, Anytime, Anywhere&quot;
                </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Interactive Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: element.delay }}
          className="absolute z-20 hidden lg:block"
          style={{ left: element.x, top: element.y }}
        >
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.5
            }}
            className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl"
          >
            <element.icon className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-8"
            >
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">Premium Food Tech Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-7xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight"
            >
              SEA<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">
                Catering
              </span>
            </motion.h1>

            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl md:text-3xl text-white/90 font-light mb-8 max-w-lg"
            >
              &quot;Healthy Meals, <span className="text-yellow-300 font-medium">Anytime</span>, Anywhere&quot;
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
            >
              Platform makanan sehat revolusioner dengan teknologi AI untuk kustomisasi nutrisi personal dan pengiriman cepat ke seluruh Indonesia.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-8 mb-8"
            >
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold">50K+</span>
                <span className="text-white/70 text-sm">Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <span className="text-white font-bold">4.9</span>
                <span className="text-white/70 text-sm">Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold">25+</span>
                <span className="text-white/70 text-sm">Cities</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-yellow-50 font-bold text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="mr-2 w-6 h-6" />
                Mulai Berlangganan
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              
              <Button 
                variant="ghost"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-md font-semibold px-8 py-4"
              >
                <Play className="mr-2 w-6 h-6" />
                Lihat Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Food Cards */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main Food Card */}
            <motion.div
              animate={{ 
                y: [-20, 20, -20],
                rotate: [-2, 2, -2]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 p-8 shadow-2xl mb-6"
            >
              <div className="bg-gradient-to-r from-orange-400 to-red-400 w-full h-48 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-white text-6xl">🍱</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Signature Bowl</h3>
              <p className="text-white/70 mb-4">Protein tinggi, rendah kalori</p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-300 font-bold text-2xl">Rp 45K</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mini Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center"
              >
                <div className="text-3xl mb-2">🥗</div>
                <span className="text-white text-sm font-medium">Fresh Salad</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center"
              >
                <div className="text-3xl mb-2">🍜</div>
                <span className="text-white text-sm font-medium">Protein Bowl</span>
              </motion.div>
            </div>

            {/* Delivery Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>30 min delivery</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white transition-colors"
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