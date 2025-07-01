'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/useToast';
import { 
  Check, 
  Star, 
  Clock, 
  Truck, 
  Shield,
  Calculator,
  Users,
  Utensils,
  Loader2
} from 'lucide-react';

// Types from API responses
interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  features: string[];
  color: string;
  sortOrder: number;
}

interface MealType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  timeRange: string;
  sortOrder: number;
}

interface DeliveryDay {
  id: string;
  name: string;
  slug: string;
  dayOfWeek: number;
}

interface SubscriptionFormData {
  name: string;
  phone: string;
  planId: string;
  mealTypeIds: string[];
  deliveryDayIds: string[];
  allergies: string;
}

export const Subscription: React.FC = () => {
  // State management
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: '',
    phone: '',
    planId: '',
    mealTypeIds: [],
    deliveryDayIds: [],
    allergies: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Data from APIs
  const [plans, setPlans] = useState<Plan[]>([]);
  const [mealTypes, setMealTypes] = useState<MealType[]>([]);
  const [deliveryDays, setDeliveryDays] = useState<DeliveryDay[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Toast notifications
  const toast = useToast();

  // Fetch data from APIs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);

        const [plansRes, mealTypesRes, deliveryDaysRes] = await Promise.all([
          fetch('/api/plans'),
          fetch('/api/meal-types'),
          fetch('/api/delivery-days')
        ]);

        if (!plansRes.ok || !mealTypesRes.ok || !deliveryDaysRes.ok) {
          throw new Error('Failed to fetch subscription data');
        }

        const [plansData, mealTypesData, deliveryDaysData] = await Promise.all([
          plansRes.json(),
          mealTypesRes.json(),
          deliveryDaysRes.json()
        ]);

        setPlans(plansData.data || []);
        setMealTypes(mealTypesData.data || []);
        setDeliveryDays(deliveryDaysData.data || []);

      } catch (error) {
        console.error('Error fetching subscription data:', error);
        toast.error('Gagal memuat data subscription. Silakan refresh halaman.');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleInputChange = (field: keyof SubscriptionFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'mealTypeIds' | 'deliveryDayIds', value: string) => {
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
          planId: formData.planId,
          mealTypeIds: formData.mealTypeIds,
          deliveryDayIds: formData.deliveryDayIds,
          allergies: formData.allergies,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          `🎉 Subscription berhasil dibuat! Total: ${formatCurrency(result.data.totalPrice)}. Brian akan menghubungi Anda di ${formData.phone} untuk konfirmasi pesanan dalam 1x24 jam.`,
          {
            duration: 7000,
            title: 'Subscription Berhasil!'
          }
        );
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          planId: '',
          mealTypeIds: [],
          deliveryDayIds: [],
          allergies: ''
        });
        setCurrentStep(1);
      } else {
        // Handle validation errors
        if (result.details && Array.isArray(result.details)) {
          result.details.forEach((detail: { field: string; message: string }) => {
            toast.error(`${detail.field}: ${detail.message}`);
          });
        } else {
          toast.error(result.error || 'Gagal membuat subscription');
        }
      }
    } catch (error) {
      console.error('Error submitting subscription:', error);
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return formData.name.trim() && formData.phone.trim();
      case 2: return formData.planId !== '';
      case 3: return formData.mealTypeIds.length > 0 && formData.deliveryDayIds.length > 0;
      default: return true;
    }
  };

  // Show loading state while fetching data
  if (isLoadingData) {
    return (
      <section id="subscription" className="py-20 bg-gradient-to-br from-orange-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
              <p className="text-gray-600">Loading subscription options...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Pilih paket katering sehat yang sesuai dengan kebutuhan dan gaya hidup Anda
          </motion.p>
        </motion.div>

        {/* Multi-step Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step Progress */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${currentStep >= step 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`
                        w-16 h-0.5 mx-2
                        ${currentStep > step ? 'bg-orange-500' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8">
                  <div className="text-center mb-8">
                    <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Informasi Personal</h3>
                    <p className="text-gray-600">Berikan data diri untuk pengiriman</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Contoh: 081234567890"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!isStepValid(1)}
                      className="px-8 py-3"
                    >
                      Lanjut
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Plan Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8">
                  <div className="text-center mb-8">
                    <Utensils className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pilih Paket</h3>
                    <p className="text-gray-600">Pilih paket yang sesuai dengan tujuan kesehatan Anda</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {plans.map((plan) => (
                      <motion.div
                        key={plan.id}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`
                          border-2 rounded-xl p-6 cursor-pointer transition-all
                          ${formData.planId === plan.id
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-orange-300'
                          }
                        `}
                        onClick={() => handleInputChange('planId', plan.id)}
                      >
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gradient-to-r ${plan.color} text-white`}>
                          {plan.name}
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(plan.basePrice)}
                          </div>
                          <div className="text-sm text-gray-500">per porsi</div>
                        </div>

                        <p className="text-gray-600 mb-4 text-sm">
                          {plan.description}
                        </p>

                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="px-8 py-3"
                    >
                      Kembali
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      disabled={!isStepValid(2)}
                      className="px-8 py-3"
                    >
                      Lanjut
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Schedule & Preferences */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8">
                  <div className="text-center mb-8">
                    <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Jadwal & Preferensi</h3>
                    <p className="text-gray-600">Atur jadwal pengiriman sesuai kebutuhan Anda</p>
                  </div>

                  <div className="space-y-8">
                    {/* Meal Types Selection */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Jenis Makanan *
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {mealTypes.map((mealType) => (
                          <div
                            key={mealType.id}
                            className={`
                              border-2 rounded-lg p-4 cursor-pointer transition-all
                              ${formData.mealTypeIds.includes(mealType.id)
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-orange-300'
                              }
                            `}
                            onClick={() => toggleArrayItem('mealTypeIds', mealType.id)}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">{mealType.icon}</div>
                              <div className="font-medium text-gray-900">{mealType.name}</div>
                              <div className="text-sm text-gray-500">{mealType.timeRange}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Days Selection */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Hari Pengiriman *
                      </h4>
                      <div className="grid grid-cols-7 gap-2">
                        {deliveryDays.map((day) => (
                          <div
                            key={day.id}
                            className={`
                              text-center py-3 px-2 rounded-lg cursor-pointer transition-all border-2
                              ${formData.deliveryDayIds.includes(day.id)
                                ? 'border-orange-500 bg-orange-500 text-white' 
                                : 'border-gray-200 hover:border-orange-300'
                              }
                            `}
                            onClick={() => toggleArrayItem('deliveryDayIds', day.id)}
                          >
                            <div className="text-sm font-medium">{day.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Allergies */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Alergi Makanan (Opsional)
                      </h4>
                      <textarea
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows={3}
                        placeholder="Contoh: Kacang, seafood, produk susu..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3"
                    >
                      Kembali
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isStepValid(3) || isSubmitting}
                      className="px-8 py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Memproses...
                        </>
                      ) : (
                        'Buat Subscription'
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </form>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-orange-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Gratis Ongkir</h4>
              <p className="text-sm text-gray-600">Pengiriman gratis untuk area Jabodetabek</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-orange-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Higienis & Aman</h4>
              <p className="text-sm text-gray-600">Diproses dengan standar keamanan pangan</p>
            </div>
            <div className="flex flex-col items-center">
              <Calculator className="w-8 h-8 text-orange-500 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Hitung Kalori</h4>
              <p className="text-sm text-gray-600">Kalori sudah dihitung sesuai target Anda</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 