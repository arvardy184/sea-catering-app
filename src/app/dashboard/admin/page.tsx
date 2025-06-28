'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  DollarSign,
  Users,
  RotateCcw,
  ArrowLeft,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { formatCurrency } from '@/lib/utils';

interface Subscription {
  id: string;
  name: string;
  phone: string;
  plan: string;
  mealTypes: string[];
  deliveryDays: string[];
  allergies?: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardMetrics {
  newSubscriptions: number;
  monthlyRecurringRevenue: number;
  reactivations: number;
  totalActiveSubscriptions: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  churnRate: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    newSubscriptions: 0,
    monthlyRecurringRevenue: 0,
    reactivations: 0,
    totalActiveSubscriptions: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    churnRate: 0
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // Check if user is admin
    const userRole = session.user?.role || 'USER';
    if (userRole !== 'ADMIN') {
      router.push('/dashboard/user');
      return;
    }

    fetchSubscriptions();
  }, [session, status, router]);

  useEffect(() => {
    calculateMetrics();
  }, [subscriptions, dateRange]);

  useEffect(() => {
    // Set dates after component mounts to prevent hydration mismatch
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    setDateRange({
      startDate: firstDay.toISOString().split('T')[0],
      endDate: now.toISOString().split('T')[0]
    });
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/subscriptions');
      const result = await response.json();

      if (response.ok && result.data) {
        setSubscriptions(result.data);
      } else {
        console.error('Failed to fetch subscriptions:', result);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateMetrics = () => {
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    
    // Filter subscriptions within date range
    const filteredSubscriptions = subscriptions.filter(sub => {
      const createdDate = new Date(sub.createdAt);
      return createdDate >= startDate && createdDate <= endDate;
    });

    // Calculate metrics
    const newSubscriptions = filteredSubscriptions.length;
    
    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
    const monthlyRecurringRevenue = activeSubscriptions.reduce((total, sub) => total + sub.totalPrice, 0);
    
    // For demo purposes, simulate reactivations (would need proper tracking in real app)
    const reactivations = Math.floor(filteredSubscriptions.length * 0.15);
    
    const totalActiveSubscriptions = activeSubscriptions.length;
    const totalRevenue = subscriptions.reduce((total, sub) => total + sub.totalPrice, 0);
    const averageOrderValue = subscriptions.length > 0 ? totalRevenue / subscriptions.length : 0;
    
    // Simulate conversion and churn rates
    const conversionRate = 85.5; // 85.5%
    const churnRate = 12.3; // 12.3%

    setMetrics({
      newSubscriptions,
      monthlyRecurringRevenue,
      reactivations,
      totalActiveSubscriptions,
      totalRevenue,
      averageOrderValue,
      conversionRate,
      churnRate
    });
  };

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Name', 'Phone', 'Plan', 'Total Price', 'Status', 'Created At'],
      ...subscriptions.map(sub => [
        sub.id,
        sub.name,
        sub.phone,
        sub.plan,
        sub.totalPrice,
        sub.status,
        sub.createdAt
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sea-catering-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={exportData}
                className="text-gray-600 hover:text-gray-900"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  Admin: {session?.user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Date Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-semibold text-gray-900">Filter Data</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Dari:</label>
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Sampai:</label>
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* New Subscriptions */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.newSubscriptions}</p>
                <p className="text-xs text-green-600">+12.5% dari bulan lalu</p>
              </div>
            </div>
          </Card>

          {/* Monthly Recurring Revenue */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Recurring Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics.monthlyRecurringRevenue)}
                </p>
                <p className="text-xs text-green-600">+8.3% dari bulan lalu</p>
              </div>
            </div>
          </Card>

          {/* Reactivations */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reactivations</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.reactivations}</p>
                <p className="text-xs text-orange-600">+5.2% dari bulan lalu</p>
              </div>
            </div>
          </Card>

          {/* Total Active Subscriptions */}
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalActiveSubscriptions}</p>
                <p className="text-xs text-green-600">+15.7% dari bulan lalu</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Secondary Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Excellent
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
            <p className="text-xl font-bold text-gray-900">{metrics.conversionRate}%</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Good
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Avg Order Value</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(metrics.averageOrderValue)}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Monitor
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Churn Rate</p>
            <p className="text-xl font-bold text-gray-900">{metrics.churnRate}%</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Growing
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(metrics.totalRevenue)}
            </p>
          </Card>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Subscription Growth Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Subscription Growth</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Chart akan tersedia setelah integrasi charting library</p>
              </div>
            </div>
          </Card>

          {/* Revenue Breakdown */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue by Plan</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {['Diet Plan', 'Protein Plan', 'Royal Plan'].map((plan, index) => {
                const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500'];
                const percentages = [35, 40, 25];
                return (
                  <div key={plan} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${colors[index]}`} />
                      <span className="text-sm font-medium text-gray-700">{plan}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{percentages[index]}%</span>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recent Subscriptions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Subscriptions</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert('Feature coming soon!')}
              >
                View All
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.slice(0, 5).map((subscription) => (
                    <tr key={subscription.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{subscription.name}</p>
                          <p className="text-sm text-gray-500">{subscription.phone}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                          {subscription.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {formatCurrency(subscription.totalPrice)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`
                          inline-block px-2 py-1 rounded text-xs font-medium
                          ${subscription.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : subscription.status === 'paused'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                          }
                        `}>
                          {subscription.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Date(subscription.createdAt).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 