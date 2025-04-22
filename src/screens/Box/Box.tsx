import { ShoppingCartIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Checkout } from "../Checkout/Checkout";

export const Box = (): JSX.Element => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  // Product data
  const products = [
    { id: '1', name: "Gold Chain", price: 369, image: "/chain1.jpg" },
    { id: '2', name: "Silver Chain", price: 299, image: "/chain2.jpg" },
    { id: '3', name: "Platinum Chain", price: 499, image: "/chain3.jpg" },
    { id: '4', name: "Diamond Chain", price: 899, image: "/chain4.jpg" },
    { id: '5', name: "Pearl Chain", price: 259, image: "/chain5.jpg" },
    { id: '6', name: "Ruby Chain", price: 459, image: "/chain6.jpg" },
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
      [productId]: (prev[productId] || 0) + (increment ? 1 : -1)
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

  return (
    <main className="relative w-full min-h-screen bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        {/* Background pattern elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {/* Horizontal RARE PACKAGE pattern */}
          <div className="absolute w-full h-12 top-1/4 -rotate-4 opacity-50">
            <div className="inline-flex items-start gap-1 p-2.5 bg-[#f1f1f1] rounded">
              {Array(24).fill(0).map((_, index) => (
                <div
                  key={`h-${index}`}
                  className="inline-flex items-center justify-center gap-2.5 p-1 rounded border border-solid border-[#373737]"
                >
                  <div className="[font-family:'JetBrains_Mono',Helvetica] font-bold text-[#373737] text-base tracking-[-0.96px]">
                    RARE PACKAGE
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical RARE PACKAGE pattern */}
          <div className="absolute w-full h-12 top-1/4 left-72 rotate-86 opacity-60">
            <div className="inline-flex items-start gap-1 p-2.5 bg-[#f1f1f1] rounded">
              {Array(24).fill(0).map((_, index) => (
                <div
                  key={`v-${index}`}
                  className="inline-flex items-center justify-center gap-2.5 p-1 rounded border border-solid border-[#373737]"
                >
                  <div className="[font-family:'JetBrains_Mono',Helvetica] font-bold text-[#373737] text-base tracking-[-0.96px]">
                    RARE PACKAGE
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-32 mb-16">
          {products.map((product) => (
            <Card key={product.id} className="w-full border-none shadow-none">
              <CardContent className="p-0">
                <div className="flex flex-col items-start gap-2.5">
                  {/* Product image */}
                  <div className="w-full h-[231px] rounded-[3.56px] bg-gray-100" />

                  <div className="flex flex-col items-start gap-2 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="[font-family:'Inter',Helvetica] font-light text-[#595959] text-xl">
                        {product.name}
                      </div>

                      <div className="flex items-center gap-2">
                        {cart[product.id] > 0 && (
                          <>
                            <button
                              onClick={() => updateQuantity(product.id, false)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{cart[product.id]}</span>
                          </>
                        )}
                        <button
                          onClick={() => updateQuantity(product.id, true)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="[font-family:'Inter',Helvetica] font-medium text-black text-2xl">
                      ₹ {product.price}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checkout button */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
            <Button 
              onClick={() => setShowCheckout(true)}
              className="bg-neutral-800 text-white rounded-[10px] px-[30px] py-4 flex items-center gap-2.5"
            >
              <span className="[font-family:'Inter',Helvetica] font-normal text-xl">
                Checkout (₹{getTotalPrice()})
              </span>
              <ShoppingCartIcon className="w-6 h-6" />
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16">
          <Separator className="mb-4" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="[font-family:'Inter',Helvetica] font-normal text-black text-xs"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="[font-family:'Inter',Helvetica] font-normal text-black text-xs text-right">
              rarepackage regd. trademark
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};