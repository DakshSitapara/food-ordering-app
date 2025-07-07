"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Clock, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import toast from "react-hot-toast";
import dishDetails from "@/lib/dishData";

const allDishes = Object.values(dishDetails);

const categories = ["All", "Pizza", "Biryani", "Curry", "Burger", "Snacks", "Indian", "Pasta", "Dessert"];

const FoodPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const filteredDishes = allDishes.filter(dish => {
    const matchesCategory = selectedCategory === "All" || dish.category === selectedCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCartItemQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0;
  };

  const handleAddToCart = (dish: typeof allDishes[0]) => {
    addToCart({ ...dish, quantity: 1 });
    toast.success(`${dish.name} added to cart!`);
  };

  const handleIncrement = (id: string) => {
    const currentQty = getCartItemQuantity(id);
    updateQuantity(id, currentQty + 1);
  };

  const handleDecrement = (id: string) => {
    const currentQty = getCartItemQuantity(id);
    if (currentQty === 1) {
      removeFromCart(id);
      toast.success(` ${dishDetails[id].name} Removed from cart`);
    } else {
      updateQuantity(id, currentQty - 1);
    }
  };

  const totalItemsInCart = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-30 bg-gray-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
        {categories.map(category => (
          <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => setSelectedCategory(category)}
          className={selectedCategory === category ? "bg-green-500 hover:bg-green-600" : ""}
          >
          {category}
          </Button>
        ))}
        </div>
        <div className="relative flex-1 max-w-md w-auto md:ml-auto flex items-center gap-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 py-3 text-gray-900"
          aria-label="Search for dishes"
          />
        </div>
        <Link href="/cart" className="relative">
          <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600" />
          {totalItemsInCart > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 rounded-full">
            {totalItemsInCart}
          </span>
          )}
        </Link>
        </div>
      </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map(dish => {
        const qty = getCartItemQuantity(dish.id);
        return (
          <Card key={dish.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden py-0 rounded-xl">
          <div className="relative">
            <img 
            src={dish.image} 
            alt={dish.name}
            className="w-full h-48 object-cover"
            />
            <Badge className="absolute top-2 right-2 bg-white text-gray-800 shadow">
            {dish.category}
            </Badge>
          </div>
          
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
            <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{dish.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">{dish.cookTime}</span>
            </div>
            </div>
            
            <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">₹{dish.price}</span>
            <div className="flex gap-2 items-center">
              <Link href={`/food/${dish.id}`}>
              <Button variant="outline" size="sm">View</Button>
              </Link>

              {qty === 0 ? (
              <Button 
                size="sm"
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handleAddToCart(dish)}
              >
                Add to Cart
              </Button>
              ) : (
              <div className="flex items-center gap-1">
                <Button size="sm" variant="outline" onClick={() => handleDecrement(dish.id)}>-</Button>
                <span className="px-2">{qty}</span>
                <Button size="sm" variant="outline" onClick={() => handleIncrement(dish.id)}>+</Button>
              </div>
              )}
            </div>
            </div>
          </CardContent>
          </Card>
        );
        })}
      </div>

      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No dishes found matching your criteria.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default FoodPage;
