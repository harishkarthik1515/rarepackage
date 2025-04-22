import { ShoppingCartIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Checkout } from "../Checkout/Checkout";

export const Box = (): JSX.Element => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const horizontalRef = useRef(null);
  const verticalRef = useRef(null);

  // Product data with original Unsplash images
  const products = [
    { id: '1', name: "CHAIN", price: 369, image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
    { id: '2', name: "RING", price: 369, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
    { id: '3', name: "BRACELET", price: 369, image: "https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  // Footer links data
  const footerLinks = [
    { name: "TOS", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Return Policy", href: "#" },
    { name: "Testimonials", href: "#" },
  ];

  // Animation for RARE PACKAGE strips
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

  const updateQuantity = (productId: string, increment: boolean) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + (increment ? 1 : -1))
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return products.reduce((sum, product) => {
      return sum + (cart[product.id] || 0) * product.price;
    }, 0);
  };

  if (showCheckout) {
    return <Checkout 
      cart={cart} 
      products={products}
      onBack={() => setShowCheckout(false)}
      totalAmount={getTotalPrice()}
    />;
  }

  // Create RARE PACKAGE items
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

  return (
    <main className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative">
        {/* Background pattern elements - Responsive adjustments */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Horizontal RARE PACKAGE strip - Responsive positioning */}
          <div className="absolute w-full overflow-hidden h-12 top-24 md:top-32 left-0 z-0">
            <div 
              ref={horizontalRef}
              className="flex flex-row flex-nowrap whitespace-nowrap py-2"
              style={{ width: "400%" }}
            >
              {createRarePackageItems(40)}
              {createRarePackageItems(40)}
            </div>
          </div>

          {/* Vertical RARE PACKAGE strip - Hidden on mobile, visible on larger screens */}
          <div className="absolute h-full overflow-hidden w-16 top-0 right-0 md:right-12 z-10 hidden md:block">
            <div 
              ref={verticalRef}
              className="flex flex-col items-center py-2"
              style={{ height: "200%" }}
            >
              {createRarePackageItems(10, true)}
              {createRarePackageItems(10, true)}
            </div>
          </div>
        </div>

        {/* Product grid - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-32 md:mt-48 mb-16 relative z-10 max-w-6xl mx-auto">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden border border-gray-200 rounded text-sm">
            <CardContent className="p-0">
              <div className="w-full aspect-square">
                <img 
                  src={product.image} 
                  alt={`${product.name} product image`} 
                  className="w-full h-full object-cover"
                />
              </div>
          
              <div className="p-2"> {/* Reduced padding */}
                <div className="flex items-center justify-between w-full">
                  <div className="text-gray-700 text-sm"> {/* Smaller font */}
                    {product.name}
                  </div>
          
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs">
                      {cart[product.id] || 0}
                    </div>
                    <button
                      onClick={() => updateQuantity(product.id, true)}
                      className="w-5 h-5 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
          
                <div className="font-medium text-black text-sm w-full mt-1">
                  ₹ {product.price}
                </div>
              </div>
            </CardContent>
          </Card>
          
          ))}
        </div>

        {/* Checkout button */}
        <div className="flex justify-center my-8 relative z-10">
          <Button 
            onClick={() => setShowCheckout(true)}
            className="bg-neutral-900 text-white rounded px-6 py-2 flex items-center gap-2"
          >
            <span className="font-normal text-sm">
              Checkout
            </span>
            <ShoppingCartIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Footer - Responsive layout */}
        <footer className="mt-20 relative z-10 bg-white pt-6">
          <Separator className="mb-4 bg-gray-300" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4">
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-normal text-black text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="font-normal text-black text-xs text-center md:text-right mt-4 md:mt-0">
              rarepackage regd. trademark
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};