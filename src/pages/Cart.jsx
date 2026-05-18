import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const shippingCost = cartTotal > 0 ? (cartTotal > 100 ? 0 : 15) : 0;
  const finalTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="bg-indigo-50 p-6 rounded-full mb-6">
          <ShoppingBag className="h-16 w-16 text-indigo-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
        </p>
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Start Shopping <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="w-32 h-32 flex-shrink-0 bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
                      <div className="mb-4 sm:mb-0 sm:pr-6">
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize mb-2">{item.category}</p>
                        <p className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-l-lg transition-colors focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-r-lg transition-colors focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping estimate</span>
                  <span className="font-medium text-gray-900">
                    {shippingCost === 0 ? <span className="text-green-600 font-semibold">Free</span> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-gray-500">Free shipping on orders over $100</p>
                )}
                
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-indigo-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm flex justify-center items-center gap-2">
                Proceed to Checkout
              </button>
              
              <div className="mt-6 flex justify-center">
                <Link to="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1">
                  Or continue shopping <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
