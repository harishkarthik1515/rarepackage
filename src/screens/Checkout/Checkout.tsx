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
    email: '',
    address: '',
    coupon: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format order details for Razorpay
  const getOrderDetails = () => {
    const orderItems = products
      .filter(product => cart[product.id] > 0)
      .map(product => `${product.name} x ${cart[product.id]} - ₹${product.price * cart[product.id]}`)
      .join(', ');
    
    return orderItems;
  };

  // Send order data to Google Sheets
  const sendToGoogleSheets = async (paymentId: string) => {
    try {
      // Create timestamp for order
      const orderDate = new Date().toISOString();
      
      // Prepare order items details
      const orderItems = products
        .filter(product => cart[product.id] > 0)
        .map(product => `${product.name} (${product.id}) x ${cart[product.id]} @ ₹${product.price}`)
        .join('; ');

      // Prepare data for Google Sheets
      const sheetData = {
        timestamp: orderDate,
        paymentId: paymentId,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        orderItems: orderItems,
        totalItems: Object.values(cart).reduce((sum, qty) => sum + qty, 0),
        totalAmount: totalAmount,
        couponUsed: formData.coupon || 'None'
      };

      // Your Google Sheets Web App URL
      // This should be the URL of your Google Apps Script web app that processes the form data
      const googleSheetsWebAppUrl = 'https://script.google.com/macros/s/AKfycbzR_lWvy9VBV3ZhHgEu53VHeNzfvewUCFeuDIE1ShspDgYZlxcPfmXm31WtMRCAgJt5/exec';

      // Send data to Google Sheets via the Apps Script web app
      const response = await fetch(googleSheetsWebAppUrl, {
        method: 'POST',
        mode: 'no-cors', // Important for CORS issues
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
      });

      console.log('Order data sent to Google Sheets');
      return true;
    } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      // Still show success to user but log the error
      return false;
    }
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    
    // Prepare order details for Razorpay
    const orderDetails = getOrderDetails();
    
    const options = {
      key: 'rzp_test_kJXmYY8fho7kYa', 
      amount: totalAmount * 100, 
      currency: 'INR',
      name: 'Rare Package',
      description: 'Purchase from Rare Package',
      order_id: '', // This would come from your backend
      handler: async function(response: any) {
        // Send order details to Google Sheets after payment confirmation
        await sendToGoogleSheets(response.razorpay_payment_id);
        
        // Show success message to user
        setShowSuccess(true);
        setIsSubmitting(false);
        console.log('Payment successful:', response);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.address,
        order_details: orderDetails,
        total_items: Object.values(cart).reduce((sum, qty) => sum + qty, 0),
      },
      theme: {
        color: '#000000'
      },
      modal: {
        ondismiss: function() {
          setIsSubmitting(false);
        }
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

  // Create RARE PACKAGE items with consistent styling - using the same pattern as Box component
  const createBannerItems = (count) => {
    return Array(count).fill(0).map((_, index) => (
      <div
        key={index}
        className="inline-flex items-center justify-center gap-2.5 p-1 mx-1 relative flex-[0_0_auto] rounded border border-solid border-[#373737]"
      >
        <div className="relative w-fit mt-[-1.00px] [font-family:'JetBrains_Mono',Helvetica] font-bold text-[#373737] text-base tracking-[-0.96px] leading-[normal]">
          RARE PACKAGE
        </div>
      </div>
    ));
  };

  // Animation variants - matching Box component
  const horizontalStripVariants = {
    animate: {
      x: [-200, 0],
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
      y: [-200, 0],
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
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
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
        {/* ANIMATIONS FOR ALL SCREEN SIZES - Exactly matching Box component */}
        <div className="hidden sm:block">
          {/* Horizontal strip for tablet and desktop */}
          <div className="fixed w-full h-24 top-20 left-0 z-10 overflow-hidden" 
               style={{ transform: "rotate(-3deg)", transformOrigin: "center center" }}>
            <motion.div 
              className="flex flex-row flex-nowrap whitespace-nowrap py-2 bg-[#f1f1f1] rounded gap-1 p-2.5"
              style={{ width: "400%" }}
              variants={horizontalStripVariants}
              animate="animate"
            >
              {createBannerItems(20)}
              {createBannerItems(20)}
            </motion.div>
          </div>

          {/* Vertical strip for tablet and desktop */}
          <div className="fixed h-screen w-[4%] top-0 right-8 z-10 overflow-hidden" 
               style={{ transform: "rotate(-6deg)", transformOrigin: "top right" }}>
            <div className="h-full w-full flex flex-col">
              <motion.div 
                className="flex flex-col whitespace-nowrap py-8 bg-[#f1f1f1] rounded gap-16 p-2.5"
                style={{ height: "400%" }}
                variants={verticalStripVariants}
                animate="animate"
              >
                {Array(12).fill(0).map((_, index) => (
                  <div key={`vertical-${index}`} className="w-full flex justify-center my-4">
                    <div className="rotate-90 inline-flex items-center justify-center p-2 relative rounded border border-solid border-[#373737]">
                      <div className="relative w-fit [font-family:'JetBrains_Mono',Helvetica] font-bold text-[#373737] text-base tracking-[-0.96px] leading-[normal]">
                        RARE PACKAGE
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile animations - Matching Box component */}
        <div className="sm:hidden">
          {/* Mobile horizontal strip */}
          <div className="fixed w-full h-16 top-16 left-0 z-10 overflow-hidden" 
               style={{ transform: "rotate(5deg)", transformOrigin: "center center" }}>
            <motion.div 
              className="flex flex-row flex-nowrap whitespace-nowrap py-2 bg-[#f1f1f1] rounded gap-1 p-2.5"
              style={{ width: "400%" }}
              variants={horizontalStripVariants}
              animate="animate"
            >
              {createBannerItems(20)}
              {createBannerItems(20)}
            </motion.div>
          </div>

          {/* Mobile vertical strip */}
          <div className="fixed h-screen w-[15%] top-0 left-8 z-10 overflow-hidden"
               style={{ transform: "rotate(11deg)", transformOrigin: "top left" }}>
            <div className="h-full w-full flex flex-col">
              <motion.div 
                className="flex flex-col whitespace-nowrap py-8 bg-[#f1f1f1] rounded gap-16 p-2.5"
                style={{ height: "400%" }}
                variants={verticalStripVariants}
                animate="animate"
              >
                {Array(12).fill(0).map((_, index) => (
                  <div key={`mobile-vertical-${index}`} className="w-full flex justify-center my-4">
                    <div className="-rotate-90 inline-flex items-center justify-center p-2 relative rounded border border-solid border-[#373737]">
                      <div className="relative w-fit [font-family:'JetBrains_Mono',Helvetica] font-bold text-[#373737] text-base tracking-[-0.96px] leading-[normal]">
                        RARE PACKAGE
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 relative z-20">
          <button
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Back to shopping
          </button>
          
          <h1 className="text-2xl font-medium mb-8 text-left">Checkout</h1>

          {/* Order Summary - Responsive for all devices */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg mb-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {products.map(product => {
                const quantity = cart[product.id] || 0;
                if (quantity === 0) return null;

                return (
                  <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-100">
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
            {/* Coupon Section - Improved mobile responsiveness */}
            <div className="flex flex-col sm:flex-row gap-2 mb-8">
              <input
                type="text"
                name="coupon"
                value={formData.coupon}
                onChange={handleInputChange}
                placeholder="Coupon code"
                className="flex-1 px-4 py-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <Button
                onClick={handleApplyCoupon}
                className="bg-white border border-green-500 text-green-500 rounded px-4 py-3 hover:bg-green-50"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Form - Improved input field spacing and responsiveness */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm text-gray-500">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm text-gray-500">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-500">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="address" className="text-sm text-gray-500">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete shipping address"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex justify-center mt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`bg-black text-white py-3 px-8 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors w-full sm:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Proceed To Payment →'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};