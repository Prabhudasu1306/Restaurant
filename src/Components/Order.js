import React, { useState, useEffect } from 'react';
import { getAllItems } from '../Services/FoodItemServices';
import { addOrder } from '../Services/OrdersServices';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [customerNameError, setCustomerNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const getCurrentDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    return formattedDate;
  };

  useEffect(() => {
    fetchFoodItems();
    
    setDate(getCurrentDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    calculateTotalAmount(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderItems]);

  const fetchFoodItems = async () => {
    try {
      const response = await getAllItems();
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
      setError(error);
    }
  };

  const handleAddToOrder = (itemId) => {
    const item = foodItems.find(item => item.itemId === itemId);
    if (item) {
      setOrderItems(prevOrderItems => ({
        ...prevOrderItems,
        [itemId]: { ...item, quantity: (prevOrderItems[itemId]?.quantity || 0) + 1 }
      }));
    }
  };

  const handleRemoveFromOrder = (itemId) => {
    setOrderItems(prevOrderItems => {
      const updatedItems = { ...prevOrderItems };
      if (updatedItems[itemId]) {
        updatedItems[itemId] = {
          ...updatedItems[itemId],
          quantity: Math.max(updatedItems[itemId].quantity - 1, 0)
        };
      }
      return updatedItems;
    });
  };

  const calculateTotalAmount = () => {
    let total = 0;
    Object.values(orderItems).forEach(item => {
      total += item.priceWithGST * item.quantity;
    });
    setTotalBillAmount(total);
  };

  const handlePlaceOrder = async () => {
    try {
      const validOrderItems = Object.values(orderItems).filter(item => item.quantity > 0);

      if (!customerName.trim()) {
        setCustomerNameError('Customer Name is required');
        return;
      } else {
        setCustomerNameError('');
      }

      if (!mobileNumber.trim()) {
        setMobileNumberError('Mobile Number is required');
        return;
      } else {
        setMobileNumberError('');
      }

      const orderData = validOrderItems.map(item => ({
        itemId: item.itemId,
        itemName: item.itemName,
        price: item.price,
        centralGST: item.centralGST,
        stateGST: item.stateGST,
        totalGST: item.totalGST,
        priceWithGST: item.priceWithGST,
        description: item.description,
        quantity: item.quantity
      }));

      const newOrder = {
        orderedItems: orderData,
        totalBillAmount: totalBillAmount,
        orderDate: date,
        mobileNumber: mobileNumber,
        customerName: customerName
      };

      console.log('Order Data:', newOrder);

      const response = await addOrder(newOrder);

      console.log('Order placed successfully:', response.data);
      navigate('/bill', {
        state: {
          customerName,
          mobileNumber,
          orderId: response.data.orderId, 
          orderDate: date,
          orderedItems: validOrderItems,
          totalBillAmount
        }
      }); 
      setOrderItems({});
      setCustomerName('');
      setMobileNumber('');
      setError(null);
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.response?.data?.message || 'An error occurred while placing the order');
    }
  };

  return (
    <div className='container'>
      <h3>Available Items</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <div>
          <label style={{fontWeight: 'bold'}}>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label style={{fontWeight: 'bold'}}>Customer Name:</label>
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          {customerNameError && <div className="text-danger">{customerNameError}</div>}
        </div>
        <div>
          <label style={{fontWeight: 'bold'}}>Mobile Number:</label>
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
          {mobileNumberError && <div className="text-danger">{mobileNumberError}</div>}
        </div>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Central GST</th>
            <th>State GST</th>
            <th>Total GST</th>
            <th>Price with GST</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((foodItem) => (
            <tr key={foodItem.itemId}>
              <td>{foodItem.itemId}</td>
              <td>{foodItem.itemName}</td>
              <td>{foodItem.price}</td>
              <td>{foodItem.centralGST}</td>
              <td>{foodItem.stateGST}</td>
              <td>{foodItem.totalGST}</td>
              <td>{foodItem.priceWithGST}</td>
              <td>{foodItem.description}</td>

              <td>
                {orderItems[foodItem.itemId] && orderItems[foodItem.itemId].quantity > 0 ? (
                  <div className="btn-group">
                    <button className="btn btn-sm btn-success" onClick={() => handleRemoveFromOrder(foodItem.itemId)}>-</button>
                    <span className="btn btn-sm btn-light">{orderItems[foodItem.itemId].quantity}</span>
                    <button className="btn btn-sm btn-success" onClick={() => handleAddToOrder(foodItem.itemId)}>+</button>
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleAddToOrder(foodItem.itemId)} style={{ marginRight: '10px' }}>Add</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
      {error && (
        <div className="text-danger">
          {error}
        </div>
      )}
      <div>
        <h5>Total Bill Amount: {totalBillAmount}</h5>
      </div>
    </div>
  );
};

export default Order;














