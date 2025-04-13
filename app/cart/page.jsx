"use client";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useFireBase } from "@/context/FireBase";

const Cart = () => {
  const firebase = useFireBase();

  const [cartItems, setCartItems] = useState([]);

  //   useEffect(() => {
  //     const allItems = firebase.GetCartItems();
  //     if (allItems) {
  //     📦
  useEffect(() => {
    const loadCart = async () => {
      const items = await firebase.getCartItems();
      setCartItems(items || []);
    };
    loadCart();
  }, [firebase]);
  console.log(cartItems);
  const updateQuantity = async (id, change) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.quantity + change);
    await firebase.updateCartItemQuantity(id, newQty);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = async (id) => {
    await firebase.removeFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🛒 Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition-all"
          >
            <img
              src={item.imageUrl}
              alt={item.bookName}
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.bookName}
              </h2>
              <p className="text-gray-500">${item.price}</p>
              <div className="flex items-center mt-2 space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm border rounded">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <p className="text-lg font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 mt-2 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold text-blue-700">
          Total: ${totalPrice.toFixed(2)}
        </h2>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
