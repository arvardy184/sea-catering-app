'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Flame, Leaf, Users, ChefHat } from 'lucide-react';
import { Button } from './Button';
import { formatCurrency } from '@/lib/utils';

interface MealPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  time: string;
  rating: number;
  tags: string[];
  category: string;
  popular?: boolean;
  nutritionInfo?: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  ingredients?: string[];
  allergens?: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealPlan: MealPlan | null;
}

export const MealPlanModal: React.FC<ModalProps> = ({ isOpen, onClose, mealPlan }) => {
  if (!mealPlan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              
              {/* Header */}
              <div className="relative p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {mealPlan.name}
                      </h2>
                      {mealPlan.popular && (
                        <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        {mealPlan.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {mealPlan.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {mealPlan.calories} cal
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  
                  {/* Left Column */}
                  <div className="space-y-6">
                    
                    {/* Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-gray-400 text-lg">Food Image</span>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Deskripsi
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {mealPlan.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Kategori
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {mealPlan.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    
                    {/* Price */}
                    <div className="bg-orange-50 rounded-xl p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {formatCurrency(mealPlan.price)}
                        </div>
                        <p className="text-gray-600">per porsi</p>
                      </div>
                    </div>

                    {/* Nutrition Info */}
                    {mealPlan.nutritionInfo && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-green-500" />
                          Informasi Nutrisi
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-red-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-red-600">
                              {mealPlan.nutritionInfo.protein}g
                            </div>
                            <div className="text-sm text-gray-600">Protein</div>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {mealPlan.nutritionInfo.carbs}g
                            </div>
                            <div className="text-sm text-gray-600">Karbohidrat</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">
                              {mealPlan.nutritionInfo.fats}g
                            </div>
                            <div className="text-sm text-gray-600">Lemak</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {mealPlan.nutritionInfo.fiber}g
                            </div>
                            <div className="text-sm text-gray-600">Serat</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Ingredients */}
                    {mealPlan.ingredients && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <ChefHat className="w-5 h-5 text-orange-500" />
                          Bahan Utama
                        </h3>
                        <ul className="space-y-2">
                          {mealPlan.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-600">
                              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Allergens */}
                    {mealPlan.allergens && mealPlan.allergens.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          ⚠️ Alergen
                        </h3>
                        <p className="text-amber-600 bg-amber-50 rounded-lg p-3 text-sm">
                          Mengandung: {mealPlan.allergens.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Tutup
                  </Button>
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Tambah ke Keranjang
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 