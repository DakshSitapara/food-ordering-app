"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, MapPin, ShoppingBag } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

export default function ThankYou() {
  const [lastOrder, setLastOrder] = useState<any[]>([]);
  const orderNumber = uuidv4().replace(/\D/g, '').slice(0, 3);
  const estimatedTime = "25-30 minutes";

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("lastOrder") || "[]");
    setLastOrder(storedOrder);
  }, []);

  const clearLastOrder = () => {
    localStorage.removeItem("lastOrder");
  };


  if (lastOrder.length === 0) {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your order. We're preparing your delicious meal!
          </p>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {["Order Confirmed", "Preparing", "On the Way"].map((title, i) => (
            <Card key={title}>
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${i < 2 ? "bg-orange-100" : "bg-gray-100"}`}>
                  <span className={`text-2xl font-bold ${i < 2 ? "text-green-500" : "text-gray-400"}`}>{i + 1}</span>
                </div>
                <h3 className={`font-semibold mb-2 ${i === 2 ? "text-gray-400" : ""}`}>{title}</h3>
                <p className={`text-sm ${i === 2 ? "text-gray-400" : "text-gray-600"}`}>
                  {i === 0 && "Your order has been received and is being prepared"}
                  {i === 1 && "Our chefs are preparing your meal with love"}
                  {i === 2 && "Your order will be delivered soon"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Info */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-semibold">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Time:</span>
                    <span className="font-semibold">{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
                <div className="flex items-start gap-3 mb-3">
                  <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Estimated Delivery Time</p>
                    <p className="text-gray-600">{estimatedTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-semibold">Delivery Address</p>
                    <p className="text-gray-600">Your delivery address</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center mb-8">
          <p className="text-gray-600 mb-4">
            We'll send you updates about your order via SMS and email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-green-500 hover:bg-green-600" onClick={clearLastOrder}>
                Order Again
              </Button>
            </Link>
            <Button variant="outline">Track Your Order</Button>
          </div>
        </div>

        {/* Rating Card */}
        <Card className="mt-8 bg-orange-50 border-orange-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Enjoying our service?
            </h3>
            <p className="text-green-700 mb-4">
              Help us improve by rating your experience once your order arrives!
            </p>
            <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
              Rate Your Experience
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
