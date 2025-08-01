'use client';

import { use, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Clock, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useCart } from "@/lib/CartContext";
import dishDetails from "@/lib/dishData";
import toast from "react-hot-toast";

const allDishes = Object.values(dishDetails);

export default function DishDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dish = allDishes.find(d => d.id === id);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart, items } = useCart();
  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);

  const currentIndex = allDishes.findIndex(d => d.id === dish?.id);
  const prevDish = currentIndex > 0 ? allDishes[currentIndex - 1] : null;
  const nextDish = currentIndex < allDishes.length - 1 ? allDishes[currentIndex + 1] : null;

  const handleAddToCart = () => {
    if (!dish) return;
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
      category: dish.category,
      quantity
    });
    toast.success(`${dish.name} added to cart!`);
    setQuantity(1);
  };

  if (!dish) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Dish not found</h1>
          <Button onClick={() => router.push("/")}>Back to Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <Link
        href="/"
        className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Menu
        </Link>
        <Link href="/cart" className="relative">
        <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600" />
        {totalItemsInCart > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 rounded-full">
          {totalItemsInCart}
          </span>
        )}
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-shrink-0 w-full lg:w-1/2">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
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
              <div className="flex justify-between mt-4">  
                {prevDish ? (
                <Link href={`/food/${prevDish.id}`}>
                  <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                ) : (
                <span />
                )}
                {nextDish ? (
                <Link href={`/food/${nextDish.id}`}>
                  <Button variant="outline" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 " />
                  </Button>
                </Link>
                ) : (
                <span />
                )}
              </div>
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