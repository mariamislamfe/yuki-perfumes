"use client";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);
const KEY = "blossom-cart-v1";

function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const { item, qty } = action;
      const exists = state.find((i) => i._id === item._id);
      if (exists)
        return state.map((i) => (i._id === item._id ? { ...i, quantity: i.quantity + qty } : i));
      return [...state, { ...item, quantity: qty }];
    }
    case "set": {
      return state.map((i) =>
        i._id === action.id ? { ...i, quantity: Math.max(1, i.quantity + action.delta) } : i
      );
    }
    case "remove":
      return state.filter((i) => i._id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) dispatch({ type: "hydrate", items: saved });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const totalQuantities = items.reduce((n, i) => n + i.quantity, 0);
  const totalPrice = items.reduce((n, i) => n + i.quantity * i.price, 0);

  const value = {
    items,
    open,
    setOpen,
    totalQuantities,
    totalPrice,
    add: (item, qty = 1) => {
      dispatch({ type: "add", item, qty });
      toast.success(`${qty} × ${item.name} added to your bag`);
    },
    change: (id, delta) => dispatch({ type: "set", id, delta }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
