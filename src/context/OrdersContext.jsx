import React, { createContext, useState, useEffect } from "react";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('flourshop-orders');
    const parsedOrders = saved ? JSON.parse(saved) : [];
    console.log("Initialized orders from localStorage:", parsedOrders);
    return parsedOrders;
  });

  useEffect(() => {
    localStorage.setItem('flourshop-orders', JSON.stringify(orders));
    console.log("Orders saved to localStorage:", orders);
  }, [orders]);

  const addOrder = (order) => {
    console.log("Adding new order:", order);
    setOrders(prev => {
      const newOrders = [order, ...prev];
      console.log("Updated orders array:", newOrders);
      return newOrders;
    });
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}; 