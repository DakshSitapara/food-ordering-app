"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, Banknote } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

function getTotal(items: { price: number; quantity: number }[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;
  return { subtotal, delivery, tax, total };
}

export default function BillingDetailsPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: ""
  });

  const { subtotal, delivery, tax, total } = getTotal(items);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('lastOrder', JSON.stringify(items));
    clearCart();
    router.push("/thank-you");
  };

//   useEffect(() => {
//     if (items.length === 0) router.push("/food");
//   }, [items, router]);

  if (items.length === 0) return (
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Card */}
            {/* <Card>
              <CardHeader><CardTitle>Delivery Address</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="mt-1" />
                    <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <div className="mt-1" />
                    <Input id="phone" name="phone" required type="tel" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="mt-1" />
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <div className="mt-1" />
                  <Textarea id="address" name="address" rows={3} required value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <div className="mt-1" />
                    <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <div className="mt-1" />
                    <Input id="pincode" name="pincode" required value={formData.pincode} onChange={handleInputChange} />
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Payment Card */}
            <Card>
              <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
              <CardContent>
                {/* <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="upi" id="upi" />
                    <Wallet className="h-5 w-5" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Banknote className="h-5 w-5" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                  </div>
                </RadioGroup> */}

                {/* Card Form */}
                {/* {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Label htmlFor="cardHolderName">Cardholder Name *</Label>
                      <div className="mt-1" />
                      <Input id="cardHolderName" name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <div className="mt-1" />
                      <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleInputChange} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <div className="mt-1" />
                        <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <div className="mt-1" />
                        <Input id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                )} */}
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
                <div className="flex justify-between"><span>Tax (5%)</span><span>₹{tax}</span></div>
                <hr />
                <div className="flex justify-between text-xl font-bold"><span>Total</span><span>₹{total}</span></div>
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 py-6 text-lg"
                  onClick={handlePlaceOrder}
                  type="submit"
                >
                  Place Order - ₹{total}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2 py-6 text-lg border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={() => router.push("/cart")}
                >
                  Edit Cart
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full mt-2 py-6 text-lg"
                  onClick={() => {
                  if (window.confirm("Are you sure you want to cancel your order?")) {
                    clearCart();
                    router.push("/");
                  }
                  }}
                >
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
