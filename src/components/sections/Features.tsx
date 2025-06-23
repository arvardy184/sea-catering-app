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
  Star
} from 'lucide-react';

const features = [
  {
    icon: Utensils,
    title: "Kustomisasi Makanan",
    description: "Sesuaikan menu sesuai preferensi diet, alergi, dan selera Anda dengan lebih dari 100 pilihan makanan sehat.",
    color: "text-food-breakfast",
    bgColor: "bg-food-breakfast/10"
  },
  {
    icon: Truck,
    title: "Pengiriman ke Seluruh Indonesia",
    description: "Jangkauan pengiriman ke 25+ kota besar di Indonesia dengan sistem logistik yang handal dan tepat waktu.",
    color: "text-primary-green",
    bgColor: "bg-primary-green/10"
  },
  {
    icon: BarChart3,
    title: "Informasi Nutrisi Lengkap",
    description: "Dapatkan detail kalori, protein, karbohidrat, dan vitamin dalam setiap makanan untuk gaya hidup sehat.",
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10"
  },
  {
    icon: Clock,
    title: "Jadwal Fleksibel",
    description: "Atur jadwal pengiriman sesuai kebutuhan Anda, dari harian hingga mingguan dengan reminder otomatis.",
    color: "text-food-dessert",
    bgColor: "bg-food-dessert/10"
  },
  {
    icon: Shield,
    title: "Kualitas Terjamin",
    description: "Standar keamanan pangan internasional dan bahan-bahan segar dari supplier terpercaya.",
    color: "text-primary-orange",
    bgColor: "bg-primary-orange/10"
  },
  {
    icon: Heart,
    title: "Konsultasi Nutrisi",
    description: "Akses ke ahli gizi profesional untuk panduan diet personal dan tips kesehatan harian.",
    color: "text-accent-teal",
    bgColor: "bg-accent-teal/10"
  }
];

const additionalFeatures = [
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Lacak pesanan Anda secara real-time dari dapur hingga pintu rumah"
  },
  {
    icon: ChefHat,
    title: "Chef Profesional",
    description: "Dimasak oleh chef berpengalaman dengan standar restoran"
  },
  {
    icon: Star,
    title: "Rating 5 Bintang",
    description: "Dipercaya ribuan pelanggan dengan kepuasan 99%"
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6 font-inter">
            Kenapa Pilih SEA Catering?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami berkomitmen memberikan pengalaman terbaik dalam setiap aspek layanan makanan sehat, 
            dari kualitas bahan hingga pengiriman yang tepat waktu.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy mb-2">
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-primary-navy mb-8 text-center font-inter">
            Plus Fitur Unggulan Lainnya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-primary-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary-orange" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary-navy mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-orange to-primary-green rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-inter">
              Siap Memulai Hidup Sehat Anda?
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Bergabunglah dengan ribuan pelanggan yang sudah merasakan manfaat makanan sehat SEA Catering
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Mulai Berlangganan Sekarang
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 