import React, { useState } from 'react';
import { motion } from "framer-motion";
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
      key: 'rzp_test_jGfRdmlCNRkARB', 
      amount: totalAmount * 100, 
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

  const handleApplyCoupon = () => {
    // Coupon application logic would go here
    console.log("Applying coupon:", formData.coupon);
  };

  // Get total items function
  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  // Create RARE PACKAGE items for horizontal strips
  const createHorizontalRarePackageItems = (count) => {
    return Array(count).fill(0).map((_, index) => (
      <div
        key={index}
        className="inline-flex items-center justify-center px-2 py-1 mx-1 border border-gray-300 bg-white"
      >
        <div className="font-mono font-bold text-gray-700 text-xs tracking-tight whitespace-nowrap">
          RARE PACKAGE
        </div>
      </div>
    ));
  };

  // Create RARE PACKAGE items for vertical strips
  const createVerticalRarePackageItems = (count) => {
    return Array(count).fill(0).map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-center px-1 py-2 my-1 border border-gray-300 bg-white"
      >
        <div 
          className="font-mono font-bold text-gray-700 text-xs tracking-tight whitespace-nowrap"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
        >
          RARE PACKAGE
        </div>
      </div>
    ));
  };

  // Animation variants - matching Box component
  const horizontalStripVariants = {
    animate: {
      x: [0, -200],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear"
        }
      }
    }
  };

  const verticalStripVariants = {
    animate: {
      y: [0, -200],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear"
        }
      }
    }
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
    <main className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative">
        {/* DESKTOP ANIMATIONS */}
        <div className="hidden md:block">
          {/* Desktop horizontal strip */}
          <div className="fixed w-full h-24 top-20 left-0 z-10 overflow-hidden" 
               style={{ transform: "rotate(-3deg)", transformOrigin: "center center" }}>
            <motion.div 
              className="flex flex-row flex-nowrap whitespace-nowrap py-2"
              style={{ width: "400%" }}
              variants={horizontalStripVariants}
              animate="animate"
            >
              {createHorizontalRarePackageItems(40)}
              {createHorizontalRarePackageItems(40)}
            </motion.div>
          </div>

          {/* Desktop vertical strip */}
          <div className="fixed h-screen w-16 top-0 left-[90%] z-10 overflow-hidden"
               style={{ transform: "rotate(-6deg)", transformOrigin: "top right" }}>
            <motion.div 
              className="flex flex-col items-center"
              style={{ height: "200%" }}
              variants={verticalStripVariants}
              animate="animate"
            >
              {createVerticalRarePackageItems(25)}
              {createVerticalRarePackageItems(25)}
            </motion.div>
          </div>
        </div>

        {/* MOBILE ANIMATIONS */}
        <div className="md:hidden">
          {/* Mobile horizontal strip */}
          <div className="fixed w-full h-20 top-[6%] left-0 z-10 overflow-hidden" 
               style={{ transform: "rotate(5deg)", transformOrigin: "center center" }}>
            <motion.div 
              className="flex flex-row flex-nowrap whitespace-nowrap py-2"
              style={{ width: "400%" }}
              variants={horizontalStripVariants}
              animate="animate"
            >
              {createHorizontalRarePackageItems(40)}
              {createHorizontalRarePackageItems(40)}
            </motion.div>
          </div>

          {/* Mobile vertical strip */}
          <div className="fixed h-screen w-12 top-0 left-[15%] z-10 overflow-hidden"
               style={{ transform: "rotate(11deg)", transformOrigin: "top left" }}>
            <motion.div 
              className="flex flex-col items-center"
              style={{ height: "200%" }}
              variants={verticalStripVariants}
              animate="animate"
            >
              {createVerticalRarePackageItems(25)}
              {createVerticalRarePackageItems(25)}
            </motion.div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 relative z-20">
          <button
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Back to shopping
          </button>
          
          <h1 className="text-2xl font-medium mb-8 text-left">Checkout</h1>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {products.map(product => {
                const quantity = cart[product.id] || 0;
                if (quantity === 0) return null;

                return (
                  <div key={product.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Qty: {quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">₹{product.price * quantity}</p>
                  </div>
                );
              })}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <p>Total Items: {getTotalItems()}</p>
                  <p>Total: ₹{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            {/* Coupon Section */}
            <div className="flex gap-2 mb-8">
              <input
                type="text"
                name="coupon"
                value={formData.coupon}
                onChange={handleInputChange}
                placeholder="Coupon code"
                className="flex-1 px-4 py-2 border rounded focus:outline-none text-sm"
              />
              <Button
                onClick={handleApplyCoupon}
                className="bg-white border border-green-500 text-green-500 rounded px-4 text-sm"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none"
              />
              
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone No"
                required
                className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none"
              />
            </div>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              required
              className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none mb-8"
            />

            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                className="bg-black text-white py-2 px-8 rounded flex items-center gap-2"
              >
                Proceed To Payment →
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};