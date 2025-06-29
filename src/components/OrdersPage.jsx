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

  const getPaymentMethodText = (method) => {
    return method === "online" ? "Online Payment" : "Cash on Delivery";
  };

  const getPaymentMethodIcon = (method) => {
    return method === "online" ? "💳" : "💰";
  };

  const getPaymentTypeText = (paymentType) => {
    switch (paymentType) {
      case "card":
        return "Credit/Debit Card";
      case "upi":
        return "UPI";
      case "netbanking":
        return "Net Banking";
      default:
        return "Online Payment";
    }
  };

  const getPaymentTypeIcon = (paymentType) => {
    switch (paymentType) {
      case "card":
        return "💳";
      case "upi":
        return "📱";
      case "netbanking":
        return "🏦";
      default:
        return "💳";
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Orders</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <div className="order-info">
                <span className="order-date">Order Placed: {order.date}</span>
                <span className="order-number">Order #: {order.id}</span>
              </div>
              <div className="order-payment">
                <span className="payment-method">
                  {getPaymentMethodIcon(order.paymentMethod)} {getPaymentMethodText(order.paymentMethod)}
                </span>
              </div>
            </div>
            
            <div className="order-items">
              {order.items.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-qty">Qty: {item.quantity || 1}</div>
                    <div className="order-item-price">₹{item.price}</div>
                    {item.size && <div className="order-item-size">Size: {item.size}</div>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{order.subtotal || order.total}</span>
              </div>
              {order.deliveryFee > 0 && (
                <div className="price-row fee">
                  <span>Delivery Fee</span>
                  <span>+₹{order.deliveryFee}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="price-row discount">
                  <span>Discount (5% OFF)</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="price-row total">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
            
            {/* Transaction Details for Online Payments */}
            {order.paymentMethod === "online" && order.paymentDetails && (
              <div className="transaction-details">
                <h4>Transaction Details</h4>
                <div className="transaction-info">
                  <div className="transaction-row">
                    <span>Transaction ID:</span>
                    <span className="transaction-id">{order.paymentDetails.transactionId}</span>
                  </div>
                  <div className="transaction-row">
                    <span>Status:</span>
                    <span className="status-success">✅ {order.paymentDetails.status}</span>
                  </div>
                  <div className="transaction-row">
                    <span>Payment Method:</span>
                    <span>
                      {getPaymentTypeIcon(order.paymentDetails.paymentType)} {getPaymentTypeText(order.paymentDetails.paymentType)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="order-shipping">
              <h4>Shipping Address:</h4>
              <p>{order.shipping.name}</p>
              <p>{order.shipping.address}</p>
              <p>Phone: {order.shipping.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 