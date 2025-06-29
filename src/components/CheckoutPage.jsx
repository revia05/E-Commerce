import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrdersContext } from "../context/OrdersContext";
import "./AmazonStyle.css";

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [onlinePaymentType, setOnlinePaymentType] = useState("card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
    upiId: "",
    bankName: "",
    accountNumber: "",
    ifscCode: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  // Calculate fees and discounts based on payment method
  const deliveryFee = paymentMethod === "cod" ? 50 : 0;
  const discount = paymentMethod === "online" ? Math.round(subtotal * 0.05) : 0;
  const totalPrice = subtotal + deliveryFee - discount;

  if (cartItems.length === 0 && !success) {
    return (
      <div className="cart-page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const validateCardPayment = () => {
    if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 16) {
      return "Please enter a valid 16-digit card number";
    }
    if (!paymentDetails.cardHolder || paymentDetails.cardHolder.length < 3) {
      return "Please enter the cardholder name";
    }
    if (!paymentDetails.expiry || !/^\d{2}\/\d{2}$/.test(paymentDetails.expiry)) {
      return "Please enter expiry date in MM/YY format";
    }
    if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
      return "Please enter a valid 3-digit CVV";
    }
    return null;
  };

  const validateUPIPayment = () => {
    if (!paymentDetails.upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(paymentDetails.upiId)) {
      return "Please enter a valid UPI ID (e.g., name@bank)";
    }
    return null;
  };

  const validateNetBanking = () => {
    if (!paymentDetails.bankName || paymentDetails.bankName.length < 2) {
      return "Please select a bank";
    }
    if (!paymentDetails.accountNumber || paymentDetails.accountNumber.length < 10) {
      return "Please enter a valid account number";
    }
    if (!paymentDetails.ifscCode || paymentDetails.ifscCode.length !== 11) {
      return "Please enter a valid 11-character IFSC code";
    }
    return null;
  };

  const validatePaymentDetails = () => {
    switch (onlinePaymentType) {
      case "card":
        return validateCardPayment();
      case "upi":
        return validateUPIPayment();
      case "netbanking":
        return validateNetBanking();
      default:
        return "Please select a payment method";
    }
  };

  const simulatePaymentProcessing = async () => {
    setIsProcessing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate payment success (90% success rate)
    const isSuccess = Math.random() > 0.1;
    
    setIsProcessing(false);
    
    if (!isSuccess) {
      throw new Error("Payment failed. Please try again or use a different payment method.");
    }
    
    return {
      transactionId: "TXN" + Date.now(),
      status: "success",
      amount: totalPrice,
      paymentType: onlinePaymentType
    };
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!shipping.name || !shipping.address || !shipping.phone) {
      setError("Please fill in all shipping details.");
      return;
    }

    if (paymentMethod === "online") {
      const validationError = validatePaymentDetails();
      if (validationError) {
        setError(validationError);
        return;
      }

      try {
        const paymentResult = await simulatePaymentProcessing();
        
        const order = {
          id: Date.now(),
          items: cartItems,
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          discount: discount,
          total: totalPrice,
          paymentMethod: paymentMethod,
          paymentType: onlinePaymentType,
          paymentDetails: {
            transactionId: paymentResult.transactionId,
            status: paymentResult.status,
            paymentType: paymentResult.paymentType
          },
          date: new Date().toLocaleString(),
          shipping
        };
        
        addOrder(order);
        setCartItems([]);
        setSuccess(true);
        
        setTimeout(() => {
          navigate("/orders");
        }, 2000);
        
      } catch (error) {
        setError(error.message);
      }
    } else {
      // Cash on Delivery
      const order = {
        id: Date.now(),
        items: cartItems,
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        discount: discount,
        total: totalPrice,
        paymentMethod: paymentMethod,
        date: new Date().toLocaleString(),
        shipping
      };
      
      addOrder(order);
      setCartItems([]);
      setSuccess(true);
      
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setError("");
    if (method === "online") {
      setShowPaymentForm(true);
    } else {
      setShowPaymentForm(false);
    }
  };

  const handleOnlinePaymentTypeChange = (type) => {
    setOnlinePaymentType(type);
    setError("");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Bank of India",
    "Central Bank of India"
  ];

  return (
    <div className="cart-page checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Information</h2>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">Order placed successfully! Redirecting to your orders...</div>}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={shipping.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={shipping.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={shipping.phone} onChange={handleChange} required />
          </div>
          
          <h2>Payment Method</h2>
          <div className="payment-methods">
            <div className="payment-option">
              <input
                type="radio"
                id="online"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
              />
              <label htmlFor="online" className="payment-label">
                <div className="payment-info">
                  <div className="payment-title">
                    <span className="payment-icon">💳</span>
                    Online Payment
                  </div>
                  <div className="payment-benefits">
                    <span className="discount-badge">5% OFF</span>
                    <span className="payment-desc">Credit/Debit Card, UPI, Net Banking</span>
                  </div>
                </div>
              </label>
            </div>
            
            <div className="payment-option">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
              />
              <label htmlFor="cod" className="payment-label">
                <div className="payment-info">
                  <div className="payment-title">
                    <span className="payment-icon">💰</span>
                    Cash on Delivery
                  </div>
                  <div className="payment-benefits">
                    <span className="fee-badge">+₹50</span>
                    <span className="payment-desc">Pay when you receive your order</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          {/* Online Payment Options */}
          {showPaymentForm && (
            <div className="online-payment-options">
              <h3>Select Payment Option</h3>
              <div className="payment-type-options">
                <div className="payment-type-option">
                  <input
                    type="radio"
                    id="card"
                    name="onlinePaymentType"
                    value="card"
                    checked={onlinePaymentType === "card"}
                    onChange={(e) => handleOnlinePaymentTypeChange(e.target.value)}
                  />
                  <label htmlFor="card" className="payment-type-label">
                    <span className="payment-type-icon">💳</span>
                    <span className="payment-type-text">Credit/Debit Card</span>
                  </label>
                </div>
                
                <div className="payment-type-option">
                  <input
                    type="radio"
                    id="upi"
                    name="onlinePaymentType"
                    value="upi"
                    checked={onlinePaymentType === "upi"}
                    onChange={(e) => handleOnlinePaymentTypeChange(e.target.value)}
                  />
                  <label htmlFor="upi" className="payment-type-label">
                    <span className="payment-type-icon">📱</span>
                    <span className="payment-type-text">UPI</span>
                  </label>
                </div>
                
                <div className="payment-type-option">
                  <input
                    type="radio"
                    id="netbanking"
                    name="onlinePaymentType"
                    value="netbanking"
                    checked={onlinePaymentType === "netbanking"}
                    onChange={(e) => handleOnlinePaymentTypeChange(e.target.value)}
                  />
                  <label htmlFor="netbanking" className="payment-type-label">
                    <span className="payment-type-icon">🏦</span>
                    <span className="payment-type-text">Net Banking</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {/* Payment Forms */}
          {showPaymentForm && (
            <div className="payment-form">
              <h3>Payment Details</h3>
              
              {/* Credit/Debit Card Form */}
              {onlinePaymentType === "card" && (
                <>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardHolder">Cardholder Name</label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={paymentDetails.cardHolder}
                      onChange={handlePaymentChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="card-details-row">
                    <div className="form-group">
                      <label htmlFor="expiry">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={paymentDetails.expiry}
                        onChange={(e) => setPaymentDetails({...paymentDetails, expiry: formatExpiry(e.target.value)})}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value.replace(/\D/g, '')})}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              
              {/* UPI Form */}
              {onlinePaymentType === "upi" && (
                <div className="form-group">
                  <label htmlFor="upiId">UPI ID</label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={paymentDetails.upiId}
                    onChange={handlePaymentChange}
                    placeholder="name@bank"
                    required
                  />
                  <small className="form-help">Enter your UPI ID (e.g., john@hdfc, 9876543210@okicici)</small>
                </div>
              )}
              
              {/* Net Banking Form */}
              {onlinePaymentType === "netbanking" && (
                <>
                  <div className="form-group">
                    <label htmlFor="bankName">Select Bank</label>
                    <select
                      id="bankName"
                      name="bankName"
                      value={paymentDetails.bankName}
                      onChange={handlePaymentChange}
                      required
                    >
                      <option value="">Choose your bank</option>
                      {banks.map(bank => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="accountNumber">Account Number</label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={paymentDetails.accountNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, accountNumber: e.target.value.replace(/\D/g, '')})}
                      placeholder="Enter account number"
                      maxLength="20"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ifscCode">IFSC Code</label>
                    <input
                      type="text"
                      id="ifscCode"
                      name="ifscCode"
                      value={paymentDetails.ifscCode}
                      onChange={(e) => setPaymentDetails({...paymentDetails, ifscCode: e.target.value.toUpperCase()})}
                      placeholder="SBIN0001234"
                      maxLength="11"
                      required
                    />
                  </div>
                </>
              )}
            </div>
          )}
          
          <button 
            type="submit" 
            className="amazon-btn cart-checkout-btn" 
            disabled={success || isProcessing}
          >
            {isProcessing ? (
              <span className="processing-text">
                <span className="spinner"></span>
                Processing Payment...
              </span>
            ) : (
              paymentMethod === "online" ? "Pay Now" : "Place Order"
            )}
          </button>
        </form>
        
        <div className="cart-summary checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items-list">
            {cartItems.map(item => (
              <div className="checkout-item" key={item.id}>
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <div className="checkout-item-name">{item.name}</div>
                  <div className="checkout-item-qty">Qty: {item.quantity || 1}</div>
                  <div className="checkout-item-price">₹{item.price}</div>
                  {item.size && <div className="checkout-item-size">Size: {item.size}</div>}
                </div>
                <div className="checkout-item-subtotal">₹{item.price * (item.quantity || 1)}</div>
              </div>
            ))}
          </div>
          
          <div className="price-breakdown">
            <div className="price-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{subtotal}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="price-row fee">
                <span>Delivery Fee</span>
                <span>+₹{deliveryFee}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="price-row discount">
                <span>Discount (5% OFF)</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="price-row total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
          
          {paymentMethod === "online" && (
            <div className="savings-info">
              <span className="savings-text">You save ₹{discount} with online payment!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 