'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Phone, 
  User,
  MessageCircle,
  Send
} from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section className="py-20 bg-white">
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
            Hubungi Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tim customer service kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami 
            untuk pertanyaan, saran, atau bantuan terkait layanan SEA Catering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Manager Contact */}
            <Card className="bg-gradient-to-r from-primary-orange/5 to-primary-green/5 border-primary-orange/20">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-orange/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-primary-navy">
                      Manager
                    </h4>
                    <p className="text-gray-600">Customer Service Lead</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-primary-orange" />
                    <span className="font-semibold text-primary-navy text-lg">Brian</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-green" />
                    <a 
                      href="tel:08123456789" 
                      className="text-primary-green hover:underline font-medium text-lg"
                    >
                      08123456789
                    </a>
                  </div>
                  <motion.div className="pt-4">
                    <Button 
                      className="w-full"
                      onClick={() => window.open('tel:08123456789')}
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Hubungi Brian Sekarang
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-2xl font-bold text-primary-navy mb-2 font-inter">
                  Kirim Pesan Cepat
                </h3>
                <p className="text-gray-600">
                  Punya pertanyaan? Kirim pesan dan kami akan merespons dalam 24 jam.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-navy mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-primary-orange outline-none transition-colors"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary-navy mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-primary-orange outline-none transition-colors"
                      placeholder="nama@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-primary-navy mb-2">
                      Pesan
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-primary-orange outline-none transition-colors resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    <Send className="mr-2 w-4 h-4" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Contact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary-orange to-primary-green rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-inter">
              Butuh Bantuan Segera? Hubungi Brian!
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Manager customer service kami siap membantu Anda kapan saja
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-primary-orange hover:bg-gray-100"
                onClick={() => window.open('tel:08123456789')}
              >
                <Phone className="mr-2 w-4 h-4" />
                Telepon: 08123456789
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-orange"
                onClick={() => window.open('https://wa.me/628123456789')}
              >
                <MessageCircle className="mr-2 w-4 h-4" />
                WhatsApp Chat
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 