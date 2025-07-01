'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Clock,
  DollarSign,
  Package,
  Play,
  Pause,
  X,
  ArrowLeft,
  User,
  Phone,
  CheckCircle,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { formatCurrency } from '@/lib/utils';

// API response nested types
interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
}

interface MealType {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  timeRange?: string;
}

interface DeliveryDay {
  id: string;
  name: string;
  slug: string;
  dayOfWeek: number;
}

interface Subscription {
  id: string;
  name: string;
  phone: string;
  plan: Plan;
  mealTypes: MealType[];
  deliveryDays: DeliveryDay[];
  allergies?: string;
  totalPrice: number;
  status: 'ACTIVE' | 'PAUSED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

const planNames = {
  diet: 'Diet Plan',
  protein: 'Protein Plan',
  royal: 'Royal Plan'
};

const mealTypeNames = {
  breakfast: 'Sarapan',
  lunch: 'Makan Siang',
  dinner: 'Makan Malam'
};

const dayNames = {
  monday: 'Senin',
  tuesday: 'Selasa',
  wednesday: 'Rabu',
  thursday: 'Kamis',
  friday: 'Jumat',
  saturday: 'Sabtu',
  sunday: 'Minggu'
};

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = { page: 1, limit: 10 };
      const url = '/api/subscriptions?' + Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      console.log(url);
      const response = await fetch(url);
      
      const result = await response.json();

      if (response.ok && result.data) {
        console.log(result.data);
        setSubscriptions(result.data);
      } else {
        // Better error handling
        console.error('Failed to fetch subscriptions:', result);
        
        if (response.status === 401) {
          // Redirect ke login jika unauthorized
          router.push('/auth/signin');
          return;
        }
        
        // Show user-friendly error message
        alert(`❌ Gagal memuat subscription: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      alert('❌ Terjadi kesalahan saat memuat data. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    fetchSubscriptions();
  }, [session, status, router, fetchSubscriptions]);

  const handlePauseSubscription = async (subscriptionId: string) => {
    const pauseDate = prompt('Masukkan tanggal mulai pause (YYYY-MM-DD):');
    const resumeDate = prompt('Masukkan tanggal resume (YYYY-MM-DD):');
    
    if (!pauseDate || !resumeDate) return;

    try {
      setActionLoading(subscriptionId);
      
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'pause',
          pauseStart: pauseDate,
          pauseEnd: resumeDate,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Subscription berhasil di-pause dari ${pauseDate} sampai ${resumeDate}`);
        fetchSubscriptions(); // Refresh data
      } else {
        alert(`❌ Error: ${result.error || 'Gagal pause subscription'}`);
      }
    } catch (error) {
      console.error('Error pausing subscription:', error);
      alert('❌ Gagal pause subscription. Silakan coba lagi.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    const confirmCancel = confirm(
      'Apakah Anda yakin ingin membatalkan subscription ini? Tindakan ini tidak dapat dibatalkan.'
    );
    
    if (!confirmCancel) return;

    try {
      setActionLoading(subscriptionId);
      
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'cancel',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Subscription berhasil dibatalkan.`);
        fetchSubscriptions(); // Refresh data
      } else {
        alert(`❌ Error: ${result.error || 'Gagal cancel subscription'}`);
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('❌ Gagal cancel subscription. Silakan coba lagi.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReactivateSubscription = async (subscriptionId: string) => {
    try {
      setActionLoading(subscriptionId);
      
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reactivate',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Subscription berhasil diaktifkan kembali.`);
        fetchSubscriptions(); // Refresh data
      } else {
        alert(`❌ Error: ${result.error || 'Gagal reaktivasi subscription'}`);
      }
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      alert('❌ Gagal reaktivasi subscription. Silakan coba lagi.');
    } finally {
      setActionLoading(null);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Home
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Dashboard User</h1>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {session?.user?.name || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Selamat Datang, {session?.user?.name}! 👋
          </h2>
          <p className="text-gray-600">
            Kelola subscription makanan sehat Anda dengan mudah
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptions.filter(sub => sub.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Paused Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptions.filter(sub => sub.status === 'PAUSED').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Monthly Spend</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    subscriptions
                      .filter(sub => sub.status === 'ACTIVE')
                      .reduce((total, sub) => total + sub.totalPrice, 0)
                  )}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Subscriptions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Subscription Saya</h3>
            <Button
              onClick={() => router.push('/#subscription')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Package className="w-4 h-4 mr-2" />
              Buat Subscription Baru
            </Button>
          </div>

          {subscriptions.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum Ada Subscription
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai hidup sehat dengan berlangganan paket makanan SEA Catering
              </p>
              <Button
                onClick={() => router.push('/#subscription')}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Buat Subscription Pertama
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subscriptions.map((subscription, index) => (
                <motion.div
                  key={subscription.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="p-6">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`
                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                        ${subscription.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800' 
                          : subscription.status === 'PAUSED'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                        }
                      `}>
                        {subscription.status === 'ACTIVE' && <CheckCircle className="w-4 h-4" />}
                        {subscription.status === 'PAUSED' && <Pause className="w-4 h-4" />}
                        {subscription.status === 'CANCELLED' && <X className="w-4 h-4" />}
                        {subscription.status === 'ACTIVE' ? 'Aktif' : 
                         subscription.status === 'PAUSED' ? 'Di-pause' : 'Dibatalkan'}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(subscription.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>

                    {/* Subscription Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {planNames[subscription.plan.slug as keyof typeof planNames] || subscription.plan.name}
                        </h4>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatCurrency(subscription.totalPrice)}
                          <span className="text-sm text-gray-500 font-normal">/bulan</span>
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Jenis Makanan:</p>
                          <div className="space-y-1">
                            {subscription.mealTypes.map((type) => (
                              <span key={type.id} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1">
                                {mealTypeNames[type.slug as keyof typeof mealTypeNames] || type.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Hari Pengiriman:</p>
                          <div className="space-y-1">
                            {subscription.deliveryDays.map((day) => (
                              <span key={day.id} className="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-1">
                                {dayNames[day.slug as keyof typeof dayNames] || day.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{subscription.name}</span>
                        <Phone className="w-4 h-4 ml-2" />
                        <span>{subscription.phone}</span>
                      </div>

                      {subscription.allergies && (
                        <div className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                          <div>
                            <p className="text-gray-600">Alergi:</p>
                            <p className="text-gray-900">{subscription.allergies}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        {subscription.status === 'ACTIVE' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePauseSubscription(subscription.id)}
                              disabled={actionLoading === subscription.id}
                              className="flex-1"
                            >
                              {actionLoading === subscription.id ? (
                                <LoadingSpinner />
                              ) : (
                                <>
                                  <Pause className="w-4 h-4 mr-2" />
                                  Pause
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelSubscription(subscription.id)}
                              disabled={actionLoading === subscription.id}
                              className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              {actionLoading === subscription.id ? (
                                <LoadingSpinner />
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Cancel
                                </>
                              )}
                            </Button>
                          </>
                        )}
                        
                        {subscription.status === 'PAUSED' && (
                          <Button
                            size="sm"
                            onClick={() => handleReactivateSubscription(subscription.id)}
                            disabled={actionLoading === subscription.id}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          >
                            {actionLoading === subscription.id ? (
                              <LoadingSpinner />
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Reaktivasi
                              </>
                            )}
                          </Button>
                        )}

                        {subscription.status === 'CANCELLED' && (
                          <Button
                            size="sm"
                            onClick={() => handleReactivateSubscription(subscription.id)}
                            disabled={actionLoading === subscription.id}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            {actionLoading === subscription.id ? (
                              <LoadingSpinner />
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Berlangganan Lagi
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 