'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Testimonial {
  id: number;
  name: string;
  message: string;
  rating: number;
  date: string;
  avatar?: string;
  location?: string;
}

interface TestimonialFormData {
  name: string;
  message: string;
  rating: number;
}

interface ApiTestimonial {
  id: string;
  name: string;
  message: string;
  rating: number;
  location?: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

// Sample testimonials data
const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Putri",
    message: "Makanan di SEA Catering benar-benar luar biasa! Fresh, sehat, dan rasanya enak banget. Udah 3 bulan langganan dan gak pernah kecewa. Pengiriman juga selalu tepat waktu.",
    rating: 5,
    date: "2024-01-15",
    location: "Jakarta"
  },
  {
    id: 2,
    name: "Ahmad Rizki",
    message: "Sebagai fitness enthusiast, SEA Catering jadi pilihan perfect buat diet saya. Protein tinggi, kalori terkontrol, dan yang paling penting rasanya gak membosankan!",
    rating: 5,
    date: "2024-01-12",
    location: "Surabaya"
  },
  {
    id: 3,
    name: "Maya Sari",
    message: "Pelayanan customer service nya top! Brian sebagai manager sangat responsif dan membantu. Menu variety juga banyak banget, cocok buat yang bosen makanan rumah.",
    rating: 4,
    date: "2024-01-10",
    location: "Bandung"
  },
  {
    id: 4,
    name: "Budi Santoso",
    message: "Awalnya skeptis order makanan online, tapi SEA Catering mengubah pandangan saya. Packaging rapi, makanan masih hangat, dan nutrisi lengkap sesuai yang dijanjikan.",
    rating: 5,
    date: "2024-01-08",
    location: "Yogyakarta"
  }
];

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    message: '',
    rating: 5
  });

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/testimonials');
        const result = await response.json();
        
        if (response.ok && result.data) {
          const transformedTestimonials: Testimonial[] = result.data.map((item: ApiTestimonial, index: number) => ({
            id: index + 1,
            name: item.name,
            message: item.message,
            rating: item.rating,
            date: new Date(item.createdAt).toISOString().split('T')[0],
            location: item.location || "Indonesia"
          }));
          setTestimonials(transformedTestimonials);
          
          // Reset currentIndex if testimonials array changes
          if (transformedTestimonials.length > 0) {
            setCurrentIndex(0);
          }
        } else {
          console.warn('No testimonials data received from API');
          setTestimonials(initialTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials(initialTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name.trim() && formData.message.trim()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            message: formData.message,
            rating: formData.rating,
            location: 'Indonesia'
          }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('🎉 Terima kasih atas review Anda! Review akan ditampilkan setelah dimoderasi.');
          setFormData({ name: '', message: '', rating: 5 });
          setShowForm(false);
          
          // Optionally refresh testimonials
          // Note: New testimonial won't show immediately due to approval process
        } else {
          alert(`❌ Error: ${result.error || 'Gagal mengirim review'}`);
        }
      } catch (error) {
        console.error('Error submitting testimonial:', error);
        alert('❌ Terjadi kesalahan. Silakan coba lagi.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: keyof TestimonialFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`
              ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
              transition-transform
            `}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-6"
          >
            <Heart className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-800">Customer Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Apa Kata <span className="text-orange-500">Mereka?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Ribuan pelanggan sudah merasakan manfaat hidup sehat bersama SEA Catering
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            
            {isLoading ? (
              /* Loading State */
              <div className="animate-pulse">
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <div className="flex gap-2 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : testimonials.length > 0 ? (
              /* Main Testimonial Card */
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 relative overflow-hidden">
                    
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <Quote className="w-16 h-16 text-orange-500" />
                    </div>
                    
                    <div className="relative z-10">
                      
                      {/* Rating */}
                      <div className="mb-4">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                      
                      {/* Message */}
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                        &quot;{testimonials[currentIndex].message}&quot;
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {testimonials[currentIndex].name[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonials[currentIndex].name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <p className="text-gray-500">Belum ada testimonial tersedia.</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-gray-100 hover:bg-orange-100 rounded-full transition-colors group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
              </button>
              
              {/* Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      w-3 h-3 rounded-full transition-all
                      ${index === currentIndex 
                        ? 'bg-orange-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                      }
                    `}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 bg-gray-100 hover:bg-orange-100 rounded-full transition-colors group"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
              </button>
            </div>
          </motion.div>

          {/* Testimonial Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="sticky top-8"
          >
            
            {!showForm ? (
              <Card className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Bagikan Pengalaman Anda
                  </h3>
                  <p className="text-gray-600">
                    Ceritakan pengalaman Anda dengan SEA Catering dan bantu customer lain membuat keputusan yang tepat.
                  </p>
                </div>
                
                <Button
                  onClick={() => setShowForm(true)}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                >
                  Tulis Review
                </Button>
              </Card>
            ) : (
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Tulis Review Anda
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Masukkan nama Anda"
                      required
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating (1-5 bintang)
                    </label>
                    <div className="flex items-center gap-2">
                      {renderStars(formData.rating, true, (rating) => handleInputChange('rating', rating))}
                      <span className="text-sm text-gray-600 ml-2">
                        ({formData.rating}/5)
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pesan Review
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Ceritakan pengalaman Anda dengan SEA Catering..."
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                    >
                      {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200"
        >
          {[
            { label: "Total Reviews", value: "2,394" },
            { label: "Rating Rata-rata", value: "4.9/5" },
            { label: "Customer Puas", value: "98%" },
            { label: "Repeat Orders", value: "89%" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 