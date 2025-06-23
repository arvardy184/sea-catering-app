'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  Truck, 
  Heart,
  Shield, 
  Leaf,
  MapPin,
  ChefHat,
  Star,
  Award,
  Users,
  ThumbsUp
} from 'lucide-react';

const features = [
  {
    icon: ChefHat,
    title: "Chef Berpengalaman",
    description: "Setiap hidangan disiapkan oleh chef profesional dengan pengalaman lebih dari 10 tahun di industri kuliner sehat.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    icon: Leaf,
    title: "100% Bahan Organik",
    description: "Menggunakan bahan-bahan segar dari petani lokal tanpa pestisida, hormon, atau bahan kimia berbahaya.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    icon: Heart,
    title: "Nutrisi Seimbang",
    description: "Setiap menu dirancang ahli gizi untuk memenuhi kebutuhan kalori dan nutrisi harian Anda.",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    description: "Diantar fresh dalam 30 menit dengan kemasan ramah lingkungan yang menjaga kualitas makanan.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    icon: Shield,
    title: "Standar Kebersihan",
    description: "Dapur bersertifikat HACCP dengan protokol kebersihan ketat untuk menjamin keamanan pangan.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: ThumbsUp,
    title: "Garansi Kepuasan",
    description: "Tidak puas? Kami ganti 100% atau uang kembali. Kepuasan Anda adalah prioritas kami.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  }
];

const stats = [
  {
    number: "50K+",
    label: "Pelanggan Puas",
    icon: Users,
    color: "text-orange-600"
  },
  {
    number: "150+",
    label: "Menu Pilihan",
    icon: Utensils,
    color: "text-green-600"
  },
  {
    number: "4.9★",
    label: "Rating Google",
    icon: Star,
    color: "text-yellow-600"
  },
  {
    number: "25+",
    label: "Kota Jangkauan",
    icon: MapPin,
    color: "text-blue-600"
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
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 20L20 0L40 20L20 40L0 20z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6"
          >
            <Award className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Mengapa Memilih Kami?</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Komitmen Kami untuk
            <span className="text-orange-500 block">Kesehatan Anda</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Lebih dari sekadar katering, kami adalah partner kesehatan Anda dengan standar kualitas tertinggi.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
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
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className={`h-full p-8 ${feature.bgColor} rounded-2xl border-2 ${feature.borderColor} group cursor-pointer transition-all hover:shadow-xl`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg p-12 mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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
                  className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center"
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section with Food Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Text Content */}
            <div className="p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Mulai Hidup Sehat Hari Ini!
              </h3>
              <p className="text-xl text-white/90 mb-8">
                Dapatkan gratis konsultasi nutrisi dan diskon 20% untuk pemesanan pertama Anda.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
              >
                Pesan Sekarang →
              </motion.button>
            </div>

            {/* Food Image Placeholder */}
            <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-orange-600"></div>
              <div className="w-full h-full bg-orange-400/20 flex items-center justify-center">
                <span className="text-white/50 text-lg">Food Image</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
}; 