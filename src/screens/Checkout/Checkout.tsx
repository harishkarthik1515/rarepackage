import React, { useState, useEffect, useRef } from 'react';
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
  const horizontalRef = useRef(null);
  const verticalRef = useRef(null);

  // Animation for RARE PACKAGE strips - Added the same animation as in Box component
  useEffect(() => {
    let horizontalPosition = 0;
    let verticalPosition = 0;
    
    const animate = () => {
      if (horizontalRef.current) {
        horizontalPosition = (horizontalPosition + 1) % 200;
        horizontalRef.current.style.transform = `translateX(-${horizontalPosition}px)`;
      }
      
      if (verticalRef.current) {
        verticalPosition = (verticalPosition + 1) % 200;
        verticalRef.current.style.transform = `translateY(-${verticalPosition}px)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, []);

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

  // Get total items function from Box component
  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  // Create RARE PACKAGE items - Added from Box component
  const createRarePackageItems = (count, isVertical = false) => {
    return Array(count).fill(0).map((_, index) => (
      <div
        key={index}
        className={`inline-flex items-center justify-center px-2 py-1 ${isVertical ? 'my-10' : 'mx-1'} border border-gray-300 bg-white`}
        style={isVertical ? { transform: 'rotate(90deg)' } : {}}
      >
        <div className="font-mono font-bold text-gray-700 text-xs tracking-tight whitespace-nowrap">
          RARE PACKAGE
        </div>
      </div>
    ));
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
        {/* Background pattern elements - Updated to match Box component */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Horizontal RARE PACKAGE strip */}
          <div className="absolute w-full overflow-hidden h-12 top-32 left-0 z-0">
            <div 
              ref={horizontalRef}
              className="flex flex-row flex-nowrap whitespace-nowrap py-2"
              style={{ width: "400%" }}
            >
              {createRarePackageItems(40)}
              {createRarePackageItems(40)} {/* Duplicate for seamless scrolling */}
            </div>
          </div>

          {/* Vertical RARE PACKAGE strip */}
          <div className="absolute h-full overflow-hidden w-16 top-0 right-12 z-50">
            <div 
              ref={verticalRef}
              className="flex flex-col items-center py-2"
              style={{ height: "200%" }}
            >
              {createRarePackageItems(10, true)}
              {createRarePackageItems(10, true)} {/* Duplicate for seamless scrolling */}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 relative z-10">
          <button
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← Back to shopping
          </button>
          
          <h1 className="text-2xl font-medium mb-8 text-left">Checkout</h1>

          {/* Order Summary from Box component - Now above coupon code */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {products.map(product => {
                const quantity = cart[product.id] || 0;
                if (quantity === 0) return null;

                return (
                  <div key={product.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      {/* Fixed the image display by using the actual product image path */}
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
            {/* Coupon Section - Now below order summary */}
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
            <div className="grid grid-cols-2 gap-4 mb-4">
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