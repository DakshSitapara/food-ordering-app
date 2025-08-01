"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/CartContext"; 

function getTotalPrice(items: any[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export default function CartPage() {
  const { items, updateQuantity, removeFromCart } = useCart();

  const totalPrice = getTotalPrice(items);
  const deliveryFee = totalPrice > 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some delicious dishes to get started!</p>
        <Link href="/">
          <Button className="bg-green-500 hover:bg-green-600">
            Browse Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1 w-full text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-base sm:text-lg font-bold text-green-600">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
              <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              >
              <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg sm:text-xl font-semibold w-8 text-center">
              {item.quantity}
              </span>
              <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
              <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            </div>
          </CardContent>
          </Card>
        ))}
        </div>
        <div className="lg:col-span-1 mt-6 lg:mt-0">
        <Card className="lg:sticky lg:top-24">
          <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className={deliveryFee === 0 ? "text-green-600" : ""}>
            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>
          <hr />
          <div className="flex justify-between text-lg sm:text-xl font-bold">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>
          {totalPrice < 500 && (
            <p className="text-xs sm:text-sm text-gray-600 bg-yellow-50 p-2 sm:p-3 rounded-lg">
            Add ₹{500 - totalPrice} more for free delivery!
            </p>
          )}
          <Link href="/billing-details" className="block">
            <Button className="w-full bg-green-600 hover:bg-green-700 py-4 sm:py-6 text-base sm:text-lg">
            Proceed to Checkout
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full py-4 sm:py-6 text-base sm:text-lg">
            Continue Shopping
            </Button>
          </Link>
          </CardContent>
        </Card>
        </div>
      </div>
      </div>
    </div>
  );
}