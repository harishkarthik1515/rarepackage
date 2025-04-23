import { ShoppingCartIcon } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Checkout } from "../Checkout/Checkout";

export const Box = (): JSX.Element => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

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

  // Create RARE PACKAGE items for vertical strips with reduced gap
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
      <div className="container mx-auto px-2 sm:px-4 py-8 flex-grow">
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

        {/* Product grid - Mobile optimized with 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-8 mt-32 md:mt-44 mb-16 relative z-20 max-w-4xl mx-auto">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden border border-gray-200 rounded text-sm w-full mx-auto">
              <CardContent className="p-0">
                {/* Desktop layout (vertical) */}
                <div className="hidden sm:block">
                  <div className="w-full aspect-square">
                    <img 
                      src={product.image} 
                      alt={`${product.name} product image`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
              
                  <div className="p-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-gray-700 text-xs md:text-sm">
                        {product.name}
                      </div>
              
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs">
                          {cart[product.id] || 0}
                        </div>
                        <button
                          onClick={() => updateQuantity(product.id, true)}
                          className="w-4 h-4 md:w-5 md:h-5 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
              
                    <div className="font-medium text-black text-xs md:text-sm w-full mt-1">
                      ₹ {product.price}
                    </div>
                  </div>
                </div>

                {/* Mobile layout (vertical compact cards for 2-column layout) */}
                <div className="block sm:hidden">
                  <div className="w-full aspect-square">
                    <img 
                      src={product.image} 
                      alt={`${product.name} product image`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-gray-700 text-xs font-medium">
                        {product.name}
                      </div>
                      
                      <button
                        onClick={() => updateQuantity(product.id, true)}
                        className="w-5 h-5 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center w-full mt-1">
                      <div className="font-medium text-black text-xs">
                        ₹ {product.price}
                      </div>
                      
                      {cart[product.id] > 0 && (
                        <div className="text-xs bg-gray-100 px-1 rounded">
                          {cart[product.id]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checkout button */}
        <div className="flex justify-center my-6 md:my-8 relative z-20">
          <Button 
            onClick={() => setShowCheckout(true)}
            className="bg-white text-black rounded px-4 md:px-6 py-2 flex items-center gap-2 border border-gray-200 hover:bg-gray-200 active:bg-gray-300 transition-colors"
            disabled={getTotalItems() === 0}
          >
            <span className="font-normal text-xs md:text-sm">
              Checkout {getTotalItems() > 0 && `(${getTotalItems()})`}
            </span>
            <ShoppingCartIcon className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <footer className="relative z-20 bg-white py-4 border-t border-gray-300 w-full mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-3 md:gap-6 justify-center md:justify-start">
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
            <div className="font-normal text-black text-xs text-center md:text-right mt-2 md:mt-0">
              rarepackage regd. trademark
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};