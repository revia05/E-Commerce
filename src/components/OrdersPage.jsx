import React, { useContext } from "react";
import { OrdersContext } from "../context/OrdersContext";
import "./AmazonStyle.css";

const OrdersPage = () => {
  const { orders } = useContext(OrdersContext);

  if (!orders.length) {
    return (
      <div className="cart-page">
        <h1>Your Orders</h1>
        <p>You have not placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Orders</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <span>Order Placed: {order.date}</span>
              <span>Total: ₹{order.total}</span>
            </div>
            <div className="order-items">
              {order.items.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-qty">Qty: {item.quantity || 1}</div>
                    <div className="order-item-price">₹{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 