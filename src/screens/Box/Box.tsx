import { ShoppingCartIcon } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkout } from "../Checkout/Checkout"; // Import the external Checkout component

export const Box = (): JSX.Element => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  // Product data with placeholder images
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

  // Use the imported Checkout component instead of the internal one
  if (showCheckout) {
    return <Checkout 
      cart={cart} 
      products={products}
      onBack={() => setShowCheckout(false)}
      totalAmount={getTotalPrice()}
    />;
  }

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

  // Animation variants
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

  return (
    <main className="relative flex flex-col w-full min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-4 flex-grow flex flex-col">
        {/* ANIMATIONS FOR ALL SCREEN SIZES */}
        <div className="hidden sm:block">
          {/* Horizontal strip for tablet and desktop */}
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

          {/* Vertical strip for tablet and desktop */}
          <div className="fixed h-screen w-16 top-0 right-8 z-10 overflow-hidden"
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

        {/* Mobile animations - optimized for consistent display */}
        <div className="sm:hidden">
          {/* Mobile horizontal strip */}
          <div className="fixed w-full h-16 top-16 left-0 z-10 overflow-hidden" 
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
          <div className="fixed h-screen w-12 top-0 left-8 z-10 overflow-hidden"
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

        {/* Tablet and desktop product grid - consistent spacing */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-36 mb-8 relative z-20 max-w-5xl mx-auto">
          {products.map((product) => (
            <Card key={`desktop-${product.id}`} className="flex flex-col overflow-hidden border border-gray-200 rounded shadow-sm">
              <CardContent className="p-0">
                <div className="w-full aspect-square">
                  <img 
                    src={product.image} 
                    alt={`${product.name} product image`} 
                    className="w-full h-full object-cover"
                  />
                </div>
            
                <div className="p-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-gray-700 font-medium">
                      {product.name}
                    </div>
            
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(product.id, false)}
                        disabled={!cart[product.id]}
                        className={`w-6 h-6 flex items-center justify-center text-sm ${
                          cart[product.id] ? 'bg-gray-100 border border-gray-300' : 'bg-gray-50 border border-gray-200 text-gray-300'
                        }`}
                      >
                        -
                      </button>
                      <div className="w-8 h-6 bg-gray-100 border border-gray-300 flex items-center justify-center text-sm">
                        {cart[product.id] || 0}
                      </div>
                      <button
                        onClick={() => updateQuantity(product.id, true)}
                        className="w-6 h-6 bg-gray-100 border border-gray-300 flex items-center justify-center text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
            
                  <div className="font-bold text-black mt-1">
                    ₹ {product.price}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile product layout - more consistent across different mobile devices */}
        <div className="block sm:hidden mt-32 mb-5 relative z-20 flex-grow">
          <div className="flex flex-col gap-4 items-center">
            {products.map((product) => (
              <Card key={`mobile-${product.id}`} className="w-full overflow-hidden border border-gray-200 rounded shadow-sm">
                <CardContent className="p-3">
                  <div className="flex flex-row">
                    {/* Product image */}
                    <div className="w-1/3 mr-3">
                      <img 
                        src={product.image} 
                        alt={`${product.name} product image`} 
                        className="w-full aspect-square object-cover rounded"
                      />
                    </div>
                    
                    {/* Product details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-gray-800 font-medium mb-1">
                          {product.name}
                        </div>
                        <div className="text-black font-bold">
                          ₹ {product.price}
                        </div>
                      </div>
                      
                      {/* Quantity controls - consistent sizing */}
                      <div className="flex items-center gap-1 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, false)}
                          disabled={!cart[product.id]}
                          className={`w-8 h-8 flex items-center justify-center text-sm ${
                            cart[product.id] ? 'bg-gray-100 border border-gray-300' : 'bg-gray-50 border border-gray-200 text-gray-300'
                          }`}
                        >
                          -
                        </button>
                        <div className="w-10 h-8 bg-gray-100 border border-gray-300 flex items-center justify-center text-sm">
                          {cart[product.id] || 0}
                        </div>
                        <button
                          onClick={() => updateQuantity(product.id, true)}
                          className="w-8 h-8 bg-gray-100 border border-gray-300 flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Checkout button - fixed size for consistent display */}
        <div className="sticky bottom-20 sm:bottom-8 flex justify-center mb-2 relative z-20 mt-auto">
          <Button 
            onClick={() => setShowCheckout(true)}
            className="bg-white text-black rounded px-6 py-3 flex items-center gap-2 border border-gray-200 hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-md"
            disabled={getTotalItems() === 0}
          >
            <span className="font-medium text-sm">
              Checkout {getTotalItems() > 0 && `(${getTotalItems()})`}
            </span>
            <ShoppingCartIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Footer - Fixed at bottom with consistent spacing */}
      <footer className="relative z-20 bg-white py-3 border-t border-gray-300 w-full mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-normal text-black text-xs hover:underline"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="font-normal text-black text-xs text-center sm:text-right">
              rarepackage regd. trademark
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};