import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart, cartItemCount, cartTotal, removeFromCart } = useCart();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const miniCartRef = useRef(null);
  const navigate = useNavigate();

  // Close mini cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target)) {
        setIsMiniCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl tracking-tight text-gray-900">FakeStore</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Products</Link>
            
            <div className="relative" ref={miniCartRef}>
              <button 
                onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mini Cart Dropdown */}
              {isMiniCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Your Cart ({cartItemCount})</h3>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        Your cart is empty.
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-100">
                        {cart.map((item) => (
                          <li key={item.id} className="p-4 flex gap-4">
                            <img src={item.image} alt={item.title} className="h-16 w-16 object-contain rounded" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              <p className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1 self-start"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-600">Subtotal:</span>
                        <span className="font-bold text-lg text-gray-900">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="space-y-2">
                        <Link 
                          to="/cart" 
                          onClick={() => setIsMiniCartOpen(false)}
                          className="block w-full text-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors font-medium"
                        >
                          View Cart
                        </Link>
                        <button 
                          onClick={() => {
                            setIsMiniCartOpen(false);
                            navigate('/checkout'); // Optional/dummy
                          }}
                          className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <Link to="/cart" className="relative p-2 text-gray-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Products
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
