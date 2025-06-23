'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  Clock,
  Flame,
  Leaf,
  Star,
  Plus,
  Info
} from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  calories: number;
  time: string;
  rating: number;
  tags: string[];
  imageUrl?: string;
  popular?: boolean;
}

const categories = [
  { id: 'all', name: 'Semua Menu', icon: '🍽️' },
  { id: 'breakfast', name: 'Sarapan', icon: '🌅' },
  { id: 'lunch', name: 'Makan Siang', icon: '☀️' },
  { id: 'dinner', name: 'Makan Malam', icon: '🌙' },
  { id: 'snack', name: 'Snack', icon: '🥨' },
  { id: 'beverage', name: 'Minuman', icon: '🥤' }
];

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Nasi Goreng Quinoa",
    category: "breakfast",
    description: "Nasi goreng sehat dengan quinoa, sayuran segar, dan telur kampung",
    price: 45000,
    calories: 380,
    time: "15 min",
    rating: 4.8,
    tags: ["High Protein", "Gluten Free"],
    popular: true
  },
  {
    id: 2,
    name: "Buddha Bowl Salmon",
    category: "lunch",
    description: "Salmon panggang dengan brown rice, edamame, dan sayuran colorful",
    price: 75000,
    calories: 520,
    time: "20 min",
    rating: 4.9,
    tags: ["Omega 3", "High Protein"],
    popular: true
  },
  {
    id: 3,
    name: "Ayam Bakar Herbs",
    category: "dinner",
    description: "Ayam kampung bakar dengan herbs, quinoa, dan salad segar",
    price: 65000,
    calories: 450,
    time: "25 min",
    rating: 4.7,
    tags: ["Low Carb", "High Protein"]
  },
  {
    id: 4,
    name: "Green Smoothie Bowl",
    category: "breakfast",
    description: "Smoothie bowl dengan spinach, banana, topped dengan granola dan buah segar",
    price: 35000,
    calories: 280,
    time: "10 min",
    rating: 4.6,
    tags: ["Vegan", "Antioxidant"]
  },
  {
    id: 5,
    name: "Quinoa Salad Mediterranean",
    category: "lunch",
    description: "Quinoa dengan feta, olive, tomat cherry, dan lemon dressing",
    price: 48000,
    calories: 360,
    time: "15 min",
    rating: 4.7,
    tags: ["Vegetarian", "Fresh"]
  },
  {
    id: 6,
    name: "Energy Balls",
    category: "snack",
    description: "Snack balls dari dates, almond, dan dark chocolate",
    price: 25000,
    calories: 180,
    time: "5 min",
    rating: 4.8,
    tags: ["No Sugar Added", "Energy Boost"]
  },
  {
    id: 7,
    name: "Matcha Latte",
    category: "beverage",
    description: "Premium matcha dengan oat milk dan hint of vanilla",
    price: 28000,
    calories: 120,
    time: "5 min",
    rating: 4.9,
    tags: ["Antioxidant", "Energy"]
  },
  {
    id: 8,
    name: "Grilled Tofu Bowl",
    category: "dinner",
    description: "Tofu marinated dengan miso, brown rice, dan sayuran panggang",
    price: 52000,
    calories: 380,
    time: "20 min",
    rating: 4.6,
    tags: ["Vegan", "Plant Protein"]
  }
];

export const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M20 20v20H0V20H20zM40 20v20H20V20H40zM20 0v20H0V0H20zM40 0v20H20V0H40z'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6"
          >
            <Leaf className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Menu Pilihan</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Lezat & Sehat
            <span className="text-orange-500 block">Setiap Hari</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Pilihan menu yang dirancang khusus oleh ahli gizi untuk memenuhi kebutuhan nutrisi harian Anda
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-3 rounded-full font-medium transition-all
                ${selectedCategory === category.id 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400">Food Image</span>
                </div>
                
                {/* Popular Badge */}
                {item.popular && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}

                {/* Quick View */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center"
                >
                  <Button
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    Quick View
                  </Button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                      }).format(item.price)}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {item.calories} cal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
            Masih banyak menu lezat lainnya menunggu Anda
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg"
          >
            Lihat Semua Menu →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
