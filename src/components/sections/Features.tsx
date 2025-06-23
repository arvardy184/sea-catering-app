'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { 
  Utensils, 
  Truck, 
  BarChart3, 
  Clock, 
  Shield, 
  Heart,
  MapPin,
  ChefHat,
  Star,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';

const features = [
  {
    icon: Utensils,
    title: "AI Kustomisasi Menu",
    description: "Teknologi machine learning untuk personalisasi menu berdasarkan profil kesehatan, preferensi diet, dan alergi Anda.",
    color: "text-orange-500",
    bgColor: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    emoji: "🤖"
  },
  {
    icon: Truck,
    title: "Smart Delivery Network",
    description: "Sistem logistik pintar dengan real-time tracking, optimisasi rute AI, dan jamingan pengiriman 30 menit ke 25+ kota.",
    color: "text-green-500",
    bgColor: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
    borderColor: "border-green-500/30",
    emoji: "🚀"
  },
  {
    icon: BarChart3,
    title: "Nutrition Analytics",
    description: "Dashboard nutrisi real-time dengan analisis kalori, makronutrien, dan rekomendasi berdasarkan target kesehatan personal.",
    color: "text-purple-500",
    bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    emoji: "📊"
  },
  {
    icon: Clock,
    title: "Subscription Automation",
    description: "Sistem berlangganan pintar dengan prediksi konsumsi, auto-scheduling, dan reminder berbasis behavior pattern.",
    color: "text-blue-500",
    bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    emoji: "⚡"
  },
  {
    icon: Shield,
    title: "Blockchain Quality",
    description: "Sertifikasi kualitas berbasis blockchain, traceability bahan dari farm-to-table, dan smart contract garantee.",
    color: "text-yellow-600",
    bgColor: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
    emoji: "🔒"
  },
  {
    icon: Heart,
    title: "Health AI Coach",
    description: "Personal AI nutritionist dengan konsultasi 24/7, meal planning, dan health goal tracking terintegrasi.",
    color: "text-red-500",
    bgColor: "bg-gradient-to-br from-red-500/20 to-pink-500/20",
    borderColor: "border-red-500/30",
    emoji: "❤️"
  }
];

const achievements = [
  {
    icon: Award,
    number: "50K+",
    label: "Active Users",
    color: "text-yellow-500"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "User Rating",
    color: "text-orange-500"
  },
  {
    icon: MapPin,
    number: "25+",
    label: "Cities",
    color: "text-green-500"
  },
  {
    icon: Zap,
    number: "30 min",
    label: "Avg Delivery",
    color: "text-blue-500"
  }
];

export const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <motion.div 
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [20, -20, 20],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-lg mb-8"
          >
            <Sparkles className="w-5 h-5 text-orange-500" />
            <span className="text-slate-700 font-semibold">Revolutionary Food Technology</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight"
          >
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              SEA Catering?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
          >
            Platform makanan sehat pertama di Indonesia yang menggunakan <span className="font-semibold text-orange-600">teknologi AI</span> dan <span className="font-semibold text-purple-600">blockchain</span> untuk memberikan pengalaman kuliner yang revolusioner.
          </motion.p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  rotateY: 5
                }}
                transition={{ duration: 0.3 }}
                className={`relative h-full p-8 ${feature.bgColor} backdrop-blur-xl rounded-3xl border ${feature.borderColor} shadow-xl overflow-hidden group cursor-pointer`}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon & Emoji */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </motion.div>
                  <span className="text-4xl">{feature.emoji}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Floating Sparkle */}
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  className="absolute top-4 right-4 opacity-30"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/30`}
                >
                  <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                </motion.div>
                <div className="text-3xl font-black text-slate-800 mb-2">
                  {achievement.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
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
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent"
              />
            </div>

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-white mb-6"
              >
                Ready to Experience the Future?
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              >
                Bergabunglah dengan revolusi makanan sehat berbasis teknologi AI. Dapatkan nutrisi optimal dengan pengalaman yang tak terlupakan.
              </motion.p>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-50 transition-all duration-300 shadow-xl"
              >
                <Zap className="inline mr-2 w-6 h-6" />
                Start Your Journey Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 