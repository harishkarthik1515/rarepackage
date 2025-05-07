import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Checkout } from "../Checkout/Checkout";

export const Box = (): JSX.Element => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  // Product data with placeholder images
  const products = [
    { id: '1', name: "CHAIN", price: 369, image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
    { id: '2', name: "RING", price: 369, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" },
    { id: '3', name: "BRACELET", price: 369, image: "https://images.unsplash.com/photo-1744472457504-f99a96ecbd3e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

   const [menuOpen, setMenuOpen] = useState(false);
  // Footer links data
  const footerLinks = [
    { name: "TOS", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Return Policy", href: "#" },
    { name: "Testimonials", href: "#" },
  ];

  const updateQuantity = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
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

  // Use the imported Checkout component
  if (showCheckout) {
    return <Checkout 
      cart={cart} 
      products={products}
      onBack={() => setShowCheckout(false)}
      totalAmount={getTotalPrice()}
    />;
  }

  // Create RARE PACKAGE items with consistent styling for both horizontal and vertical strips
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

  // Animation variants
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

  return (
    <main className="relative flex flex-col w-full min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-4 flex-grow flex flex-col">
        {/* ANIMATIONS FOR ALL SCREEN SIZES */}
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

        {/* Mobile animations */}
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

        {/* PRODUCT GRID - Desktop & Tablet */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-36 mb-8 relative z-20 max-w-5xl mx-auto">
          {products.map((product) => (
            <div key={`desktop-${product.id}`} className="flex flex-col items-center group">
              <div className="w-full aspect-square relative border border-gray-200 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${product.name} product image`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay with product details - appears on hover */}
                <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-gray-800 font-medium">
                    {product.name}
                  </div>
                  <div className="font-bold text-black mt-1">
                    ₹ {product.price}
                  </div>
                </div>
              </div>
              
              {/* NEW: Product controls positioned below the card for desktop */}
              <div className="flex items-center justify-between w-full mt-3">
                <div className="font-medium text-sm">
                </div>
                <div className="flex items-center gap-2">
                  {cart[product.id] > 0 && (
                    <div className="text-sm bg-white px-3 py-1 border border-gray-300">
                      {cart[product.id]}
                    </div>
                  )}
                  <button
                    onClick={() => updateQuantity(product.id)}
                    className="w-8 h-8 bg-white border border-gray-300 flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT GRID - Mobile */}
        <div className="block sm:hidden mt-32 mb-5 relative z-20 flex-grow">
          <div className="flex flex-col gap-8 items-center">
            {products.map((product) => (
              <div key={`mobile-${product.id}`} className="w-full flex flex-row items-center justify-between group relative">
                {/* Product image and details */}
                <div className="w-40 aspect-square relative border border-gray-200 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={`${product.name} product image`} 
                    className="w-full h-full object-cover"
                  />
                  
                
                  {/* Product details overlay - visible on tap in mobile */}
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 active:opacity-100">
                    <div className="text-gray-800 font-medium">
                      {product.name}
                    </div>
                    <div className="font-bold text-black mt-1">
                      ₹ {product.price}
                    </div>
                  </div>
                </div>
                <div className="absolute right-20  flex-col items-start gap-2">
                  <button
                    onClick={() => updateQuantity(product.id)}
                    className="w-8 h-8 bg-white border border-gray-300 flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                
                {/* NEW: Product controls positioned to the right for mobile */}
                
                  {cart[product.id] > 0 && (
                    <div className="text-sm bg-white px-3 py-1 border border-gray-300 text-center">
                      {cart[product.id]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout button */}
        <div className="sticky bottom-20 sm:bottom-8 flex justify-center mb-2 relative z-20 mt-auto">
          <Button 
            onClick={() => setShowCheckout(true)}
            className="bg-white text-black rounded px-6 py-3 flex items-center gap-2 border border-gray-200 hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-md"
            disabled={getTotalItems() === 0}
          >
            <span className="font-medium text-sm">
              Checkout {getTotalItems() > 0 && `(${getTotalItems()})`}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-white py-3 border-t border-gray-300 w-full mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">

          {/* Mobile hamburger and trademark row - UPDATED with better icon */}
          <div className="flex items-center justify-center sm:hidden w-full gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-gray-100 rounded"
              aria-label="Toggle Footer Menu"
            >
              {/* Replaced SVG with clearer hamburger icon */}
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-gray-800 block"></span>
                <span className="w-full h-0.5 bg-gray-800 block"></span>
                <span className="w-full h-0.5 bg-gray-800 block"></span>
              </div>
            </button>
            <span className="font-normal text-gray-500 text-sm">rarepackage regd. trademark</span>
          </div>

          {/* Footer Links – visible only when toggled on mobile, always visible on desktop */}
          <div
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } sm:flex flex-wrap gap-3 justify-center sm:justify-start`}
          >
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

          {/* Desktop trademark display (hidden on mobile) */}
          <div className="hidden sm:block font-normal text-black text-xs text-right">
            rarepackage regd. trademark
          </div>
        </div>
      </div>
    </footer>
    </main>
  );
};