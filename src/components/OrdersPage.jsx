import React, { useContext, useEffect } from "react";
import { OrdersContext } from "../context/OrdersContext";
import "./AmazonStyle.css";

const OrdersPage = () => {
  const { orders, addOrder } = useContext(OrdersContext);

  // Debug: Log orders to console
  useEffect(() => {
    console.log("Orders in OrdersPage:", orders);
  }, [orders]);

  const addTestOrder = () => {
    const testOrder = {
      id: Date.now(),
      items: [
        {
          id: 1,
          name: "Test Product",
          price: 100,
          image: "/img/logo.png",
          quantity: 2
        }
      ],
      subtotal: 200,
      deliveryFee: 50,
      discount: 0,
      total: 250,
      paymentMethod: "cod",
      date: new Date().toLocaleString(),
      shipping: {
        name: "Test User",
        address: "123 Test Street, Test City",
        phone: "1234567890"
      }
    };
    console.log("Adding test order:", testOrder);
    addOrder(testOrder);
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Orders</h1>
        <div className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your order history here!</p>
          <a href="/" className="amazon-btn">Start Shopping</a>
          <button 
            onClick={addTestOrder}
            className="amazon-btn"
            style={{ marginLeft: '10px' }}
          >
            Add Test Order
          </button>
        </div>
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
      <h1>Your Orders ({orders.length})</h1>
      
      {/* Debug Information */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          background: '#f0f0f0', 
          padding: '10px', 
          margin: '10px 0', 
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          <strong>Debug Info:</strong> Orders count: {orders.length}
          <br />
          <strong>Orders data:</strong> {JSON.stringify(orders, null, 2)}
        </div>
      )}
      
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
              {order.items && order.items.length > 0 ? order.items.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-qty">Qty: {item.quantity || 1}</div>
                    <div className="order-item-price">₹{item.price}</div>
                    {item.size && <div className="order-item-size">Size: {item.size}</div>}
                  </div>
                </div>
              )) : (
                <div className="order-item">
                  <div className="order-item-details">
                    <div className="order-item-name">No items found</div>
                  </div>
                </div>
              )}
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
                      {getPaymentTypeIcon(order.paymentType || order.paymentDetails.paymentType)} {getPaymentTypeText(order.paymentType || order.paymentDetails.paymentType)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="order-shipping">
              <h4>Shipping Address:</h4>
              {order.shipping ? (
                <>
                  <p>{order.shipping.name || 'N/A'}</p>
                  <p>{order.shipping.address || 'N/A'}</p>
                  <p>Phone: {order.shipping.phone || 'N/A'}</p>
                </>
              ) : (
                <p>Shipping information not available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 