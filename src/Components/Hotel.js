import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBillById } from '../Services/BillServices';
import './Hotel.css';

const Hotel = () => {
  const { billId } = useParams();
  const [billDetails, setBillDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await getBillById(billId);
        setBillDetails(response.data);
      } catch (error) {
        setError('Error fetching bill details');
        console.error('Error fetching bill details:', error);
      }
    };

    fetchBillDetails();
  }, [billId]);

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!billDetails) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <div className="container">
      <h5 className="mt-3 mb-4">Bill Details</h5>
      <div className="row mb-3">
        <div className="col-md-6">
          {/* <p><strong>Bill ID:</strong> {billId}</p>
          <p><strong>Order ID:</strong> {billDetails.orderId}</p>
          <p><strong>Order Date:</strong> {new Date(billDetails.orderDate).toLocaleDateString()}</p> */}
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* <h6 className="mb-3">Ordered Items:</h6> */}
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>SNo</th>
                <th>Bill ID</th>
                <th>Order ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>State GST</th>
                <th>Central GST</th>
                <th>Price</th>
                <th>Price With GST</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {billDetails.orderedItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{billId}</td>
                  <td>{billDetails.orderId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.stateGST}</td>
                  <td>{item.centralGST}</td>
                  <td>{item.price}</td>
                  <td>{item.priceWithGST}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <p className="mt-4"><strong>Total Bill Amount:</strong> {billDetails.totalBillAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Hotel;

