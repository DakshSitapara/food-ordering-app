'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Clock, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';    
import { useCart } from "@/components/context/CartContext";
import dishDetails from "@/lib/dishData";

const allDishes = Object.values(dishDetails);

export default function DishDetailPage({ params }: { params: { id: string } }) {
  const dish = allDishes.find(d => d.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      category: dish.category,
      quantity
     });
    router.push("/cart");
  };

  if (!dish) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dish not found</h1>
          <Button onClick={() => router.push("/food")}>Back to Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6">
        <Link
          href="/food"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Link>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-shrink-0 w-full lg:w-1/2">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-64 sm:h-80 lg:h-full object-cover rounded-xl shadow-md"
            />
            <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 shadow">
              {dish.category}
            </Badge>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{dish.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{dish.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-500">{dish.cookTime}</span>
                </div>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{dish.description}</p>
            </div>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 w-auto">
                  <span className="text-2xl sm:text-3xl font-bold text-green-600">₹{dish.price}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg sm:text-xl font-semibold w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-4 transition-colors"
                    onClick={handleAddToCart}
                >
                  Add {quantity} to Cart - ₹{dish.price * quantity}
                </Button>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {dish.ingredients.map((ingredient: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">Nutritional Info</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <span className="text-gray-600 text-xs">Calories</span>
                      <p className="font-semibold">{dish.nutritionalInfo.calories}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-xs">Protein</span>
                      <p className="font-semibold">{dish.nutritionalInfo.protein}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-xs">Carbs</span>
                      <p className="font-semibold">{dish.nutritionalInfo.carbs}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 text-xs">Fat</span>
                      <p className="font-semibold">{dish.nutritionalInfo.fat}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}