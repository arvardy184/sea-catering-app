'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { 
  Check, 
  Star, 
  Clock, 
  Truck, 
  Shield,
  Calculator,
  Users,
  Utensils
} from 'lucide-react';

interface SubscriptionFormData {
  name: string;
  phone: string;
  plan: 'diet' | 'protein' | 'royal' | '';
  mealTypes: string[];
  deliveryDays: string[];
  allergies: string;
}

const plans = [
  {
    id: 'diet',
    name: 'Diet Plan',
    price: 30000,
    description: 'Menu rendah kalori untuk program diet sehat',
    features: ['Low Calorie', 'High Fiber', 'Fresh Vegetables', '300-400 cal/meal'],
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'protein',
    name: 'Protein Plan', 
    price: 40000,
    description: 'Menu tinggi protein untuk massa otot',
    features: ['High Protein', 'Lean Meat', 'Post-Workout', '25-30g protein/meal'],
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'royal',
    name: 'Royal Plan',
    price: 60000,
    description: 'Menu premium dengan bahan terbaik',
    features: ['Premium Ingredients', 'Gourmet Style', 'Balanced Nutrition', 'Chef Special'],
    color: 'from-purple-400 to-purple-600'
  }
];

const mealTypes = [
  { id: 'breakfast', name: 'Sarapan', icon: '🌅', time: '07:00 - 09:00' },
  { id: 'lunch', name: 'Makan Siang', icon: '☀️', time: '12:00 - 14:00' },
  { id: 'dinner', name: 'Makan Malam', icon: '🌙', time: '18:00 - 20:00' }
];

const weekDays = [
  { id: 'monday', name: 'Senin' },
  { id: 'tuesday', name: 'Selasa' },
  { id: 'wednesday', name: 'Rabu' },
  { id: 'thursday', name: 'Kamis' },
  { id: 'friday', name: 'Jumat' },
  { id: 'saturday', name: 'Sabtu' },
  { id: 'sunday', name: 'Minggu' }
];

export const Subscription: React.FC = () => {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: '',
    phone: '',
    plan: '',
    mealTypes: [],
    deliveryDays: [],
    allergies: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price calculation formula: Plan Price × Meal Types × Delivery Days × 4.3
  const calculatePrice = () => {
    if (!formData.plan || formData.mealTypes.length === 0 || formData.deliveryDays.length === 0) {
      return 0;
    }
    
    const selectedPlan = plans.find(p => p.id === formData.plan);
    if (!selectedPlan) return 0;
    
    return selectedPlan.price * formData.mealTypes.length * formData.deliveryDays.length * 4.3;
  };

  const handleInputChange = (field: keyof SubscriptionFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'mealTypes' | 'deliveryDays', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          plan: formData.plan,
          mealTypes: formData.mealTypes,
          deliveryDays: formData.deliveryDays,
          allergies: formData.allergies,
          totalPrice: calculatePrice(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`🎉 Subscription berhasil dibuat!\n\nTotal: ${formatCurrency(calculatePrice())}\n\nBrian akan menghubungi Anda di ${formData.phone} untuk konfirmasi pesanan dalam 1x24 jam.`);
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          plan: '',
          mealTypes: [],
          deliveryDays: [],
          allergies: ''
        });
        setCurrentStep(1);
      } else {
        alert(`❌ Error: ${result.error || 'Gagal membuat subscription'}`);
      }
    } catch (error) {
      console.error('Error submitting subscription:', error);
      alert('❌ Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return formData.name.trim() && formData.phone.trim();
      case 2: return formData.plan !== '';
      case 3: return formData.mealTypes.length > 0 && formData.deliveryDays.length > 0;
      default: return true;
    }
  };

  return (
    <section id="subscription" className="py-20 bg-gradient-to-br from-orange-50 to-green-50">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Subscription</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Mulai Hidup <span className="text-orange-500">Sehat</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Berlangganan paket makanan sehat SEA Catering dan nikmati kemudahan hidup sehat setiap hari
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Subscription Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold
                      ${currentStep >= step 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {step}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      {step === 1 ? 'Info Dasar' : step === 2 ? 'Pilih Paket' : 'Kustomisasi'}
                    </span>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-4 ${
                        currentStep > step ? 'bg-orange-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Informasi Dasar
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Masukkan nama lengkap Anda"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="08123456789"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Untuk konfirmasi pesanan dan update pengiriman
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Plan Selection */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Pilih Paket Makanan
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          onClick={() => handleInputChange('plan', plan.id)}
                          className={`
                            relative p-6 border-2 rounded-xl cursor-pointer transition-all
                            ${formData.plan === plan.id 
                              ? 'border-orange-500 bg-orange-50' 
                              : 'border-gray-200 hover:border-orange-300'
                            }
                          `}
                        >
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                            <Utensils className="w-6 h-6 text-white" />
                          </div>
                          
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {plan.name}
                          </h4>
                          
                          <p className="text-2xl font-bold text-orange-600 mb-3">
                            {formatCurrency(plan.price)}
                            <span className="text-sm text-gray-500 font-normal">/meal</span>
                          </p>
                          
                          <p className="text-gray-600 text-sm mb-4">
                            {plan.description}
                          </p>
                          
                          <ul className="space-y-2">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          {formData.plan === plan.id && (
                            <div className="absolute top-4 right-4">
                              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Customization */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Kustomisasi Pengiriman
                    </h3>
                    
                    {/* Meal Types */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Jenis Makanan * (Pilih minimal 1)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {mealTypes.map((meal) => (
                          <div
                            key={meal.id}
                            onClick={() => toggleArrayItem('mealTypes', meal.id)}
                            className={`
                              p-4 border-2 rounded-lg cursor-pointer transition-all
                              ${formData.mealTypes.includes(meal.id)
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-300'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{meal.icon}</span>
                              <div>
                                <div className="font-semibold text-gray-900">{meal.name}</div>
                                <div className="text-sm text-gray-500">{meal.time}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Days */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Hari Pengiriman * (Pilih minimal 1)
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                        {weekDays.map((day) => (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => toggleArrayItem('deliveryDays', day.id)}
                            className={`
                              p-3 border-2 rounded-lg font-medium transition-all
                              ${formData.deliveryDays.includes(day.id)
                                ? 'border-orange-500 bg-orange-500 text-white'
                                : 'border-gray-200 text-gray-700 hover:border-orange-300'
                              }
                            `}
                          >
                            {day.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Allergies */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alergi atau Pantangan (Opsional)
                      </label>
                      <textarea
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        placeholder="Contoh: Tidak bisa makan seafood, alergi kacang, vegetarian, dll."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                    className="px-6"
                  >
                    Kembali
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={!isStepValid(currentStep)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                    >
                      Lanjut
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isStepValid(currentStep) || isSubmitting}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                    >
                      {isSubmitting ? 'Memproses...' : 'Berlangganan Sekarang'}
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Price Calculator */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Ringkasan Pesanan
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paket:</span>
                    <span className="font-medium">
                      {formData.plan ? plans.find(p => p.id === formData.plan)?.name : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga per meal:</span>
                    <span className="font-medium">
                      {formData.plan ? formatCurrency(plans.find(p => p.id === formData.plan)?.price || 0) : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jenis makanan:</span>
                    <span className="font-medium">
                      {formData.mealTypes.length > 0 ? `${formData.mealTypes.length} jenis` : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hari pengiriman:</span>
                    <span className="font-medium">
                      {formData.deliveryDays.length > 0 ? `${formData.deliveryDays.length} hari` : '-'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Periode:</span>
                    <span className="font-medium">1 bulan (4.3 minggu)</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {calculatePrice() > 0 ? formatCurrency(calculatePrice()) : '-'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Formula: Harga × Jenis Makanan × Hari × 4.3 minggu
                  </p>
                </div>
              </Card>

              {/* Benefits */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Keuntungan Berlangganan
                </h3>
                
                <ul className="space-y-3">
                  {[
                    { icon: Truck, text: 'Pengiriman gratis setiap hari' },
                    { icon: Clock, text: 'Hemat waktu memasak' },
                    { icon: Shield, text: 'Kualitas terjamin segar' },
                    { icon: Users, text: 'Konsultasi gizi gratis' }
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <benefit.icon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 