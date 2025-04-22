import React, { useState } from 'react';
import { Button } from '../../components/ui/button';

interface CheckoutProps {
  cart: { [key: string]: number };
  products: Array<{ id: string; name: string; price: number; image: string }>;
  onBack: () => void;
  totalAmount: number;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, products, onBack, totalAmount }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    coupon: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
      amount: totalAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'Rare Package',
      description: 'Purchase from Rare Package',
      handler: function(response: any) {
        setShowSuccess(true);
        console.log('Payment successful:', response);
      },
      prefill: {
        name: formData.name,
        contact: formData.phone,
      },
      theme: {
        color: '#000000'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePayment();
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-semibold mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">Thank you for your purchase.</p>
          <Button
            onClick={onBack}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          ← Back to shopping
        </button>

        <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone No
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  name="coupon"
                  value={formData.coupon}
                  onChange={handleInputChange}
                  placeholder="Coupon code"
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="px-6"
                >
                  Apply
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Proceed To Payment →
              </Button>
            </form>
          </div>

          <div className="order-1 md:order-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {products.map(product => {
                  const quantity = cart[product.id] || 0;
                  if (quantity === 0) return null;

                  return (
                    <div key={product.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                      </div>
                      <p className="font-medium">₹{product.price * quantity}</p>
                    </div>
                  );
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <p>Total</p>
                    <p>₹{totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};