'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Star,
  Sparkles,
  Zap,
  Globe,
  Users,
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
}

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    info: "+62 811-8888-SEA (732)",
    description: "24/7 Customer Service",
    color: "text-green-500",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    emoji: "📞"
  },
  {
    icon: Mail,
    title: "Email Support", 
    info: "hello@seacatering.id",
    description: "Response dalam 2 jam",
    color: "text-blue-500",
    bgGradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    emoji: "✉️"
  },
  {
    icon: MapPin,
    title: "Head Office",
    info: "Jakarta Selatan, Indonesia",
    description: "25+ kota dilayani",
    color: "text-purple-500",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    emoji: "🏢"
  },
  {
    icon: Clock,
    title: "Operating Hours",
    info: "24/7 Non-Stop",
    description: "Delivery & Customer Service",
    color: "text-orange-500",
    bgGradient: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    emoji: "⏰"
  }
];

const faqs = [
  {
    question: "Bagaimana cara kerja subscription?",
    answer: "Pilih paket meal, tentukan jadwal pengiriman, dan sistem AI kami akan otomatis mengatur delivery sesuai preferensi Anda."
  },
  {
    question: "Apakah ada jaminan kualitas?",
    answer: "100%! Semua makanan menggunakan blockchain traceability dan jaminan uang kembali jika tidak puas."
  },
  {
    question: "Berapa lama pengiriman?",
    answer: "Rata-rata 30 menit di Jakarta, 45-60 menit di kota lain dengan real-time tracking."
  }
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: ''
      });
    }, 3000);
  };

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
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <motion.div 
          animate={{ 
            y: [-30, 30, -30],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [30, -30, 30],
            rotate: [360, 180, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-10 left-10 w-56 h-56 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl"
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
            <MessageCircle className="w-5 h-5 text-purple-500" />
            <span className="text-slate-700 font-semibold">24/7 Premium Support</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight"
          >
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Get Started?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
          >
            Tim customer success kami siap membantu Anda 24/7. Dari konsultasi nutrisi hingga technical support, 
            kami berkomitmen memberikan <span className="font-semibold text-purple-600">pengalaman terbaik</span> untuk setiap pelanggan.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8 overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-50"></div>
              
              {/* Floating Sparkles */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                className="absolute top-6 right-6 opacity-30"
              >
                <Sparkles className="w-8 h-8 text-purple-500" />
              </motion.div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Send Message</h3>
                    <p className="text-slate-600">We'll respond within 2 hours</p>
                  </div>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="group"
                      >
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                          placeholder="Your full name"
                        />
                      </motion.div>

                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        className="group"
                      >
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                          placeholder="+62 812-3456-7890"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="group"
                    >
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="group"
                    >
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:bg-white"
                      >
                        <option value="">Select a topic...</option>
                        <option value="subscription">Subscription Plans</option>
                        <option value="nutrition">Nutrition Consultation</option>
                        <option value="delivery">Delivery Issues</option>
                        <option value="partnership">Business Partnership</option>
                        <option value="technical">Technical Support</option>
                        <option value="other">Other Questions</option>
                      </select>
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      className="group"
                    >
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:bg-white resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: 2 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-4">Message Sent! 🎉</h4>
                    <p className="text-slate-600">
                      Terima kasih! Tim kami akan segera menghubungi Anda dalam 2 jam.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Methods & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-800 mb-8">Get in Touch</h3>
              
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`relative p-6 bg-gradient-to-br ${method.bgGradient} backdrop-blur-xl rounded-2xl border ${method.borderColor} shadow-lg overflow-hidden group cursor-pointer`}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30"
                      >
                        <method.icon className={`w-7 h-7 ${method.color}`} />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-800 mb-1">{method.title}</h4>
                        <p className="text-slate-700 font-semibold">{method.info}</p>
                        <p className="text-slate-600 text-sm">{method.description}</p>
                      </div>
                    </div>
                    <span className="text-3xl">{method.emoji}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl p-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Quick FAQ
              </h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-slate-200 pb-4 last:border-b-0"
                  >
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-500" />
                      {faq.question}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed pl-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-slate-800 via-purple-900 to-slate-800 rounded-3xl p-12 overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 opacity-20">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400/30 to-pink-400/30"
              />
            </div>

            <div className="relative z-10">
              <motion.div
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg mb-6"
              >
                <Heart className="w-5 h-5 text-pink-400" />
                <span className="text-white font-semibold">Trusted by 50K+ Happy Customers</span>
              </motion.div>

              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">
                Join the Healthy Food Revolution!
              </h3>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Mulai hidup sehat hari ini. Dapatkan free consultation dengan nutritionist dan diskon 50% untuk order pertama.
              </p>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-800 px-12 py-4 rounded-2xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 shadow-xl"
              >
                <Zap className="inline mr-2 w-6 h-6" />
                Start Free Trial Today
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 