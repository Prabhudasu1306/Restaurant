import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addBill } from '../Services/BillServices';

const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.orderId || !location.state.orderDate || !location.state.orderedItems || !location.state.totalBillAmount) {
    navigate('/home');
    return null;
  }

  const { orderId, orderDate, orderedItems, totalBillAmount } = location.state;

  const handlePrint = async () => {
    try {
      const simplifiedItems = orderedItems.map(item => ({
        itemName: item.itemName,
        quantity: item.quantity,
        stateGST: item.stateGST,
        centralGST: item.centralGST,
        price: item.price,
        priceWithGST: item.priceWithGST,
        totalPrice: item.quantity * item.priceWithGST 
      }));

      console.log("Simplified Bill Data:", {
        orderId,
        orderDate,
        orderedItems: simplifiedItems,
        totalBillAmount
      });

      // Call addBill function to add the bill to the database
      await addBill({
        orderId,
        orderDate,
        orderedItems: simplifiedItems,
        totalBillAmount
      });

      // Create a new window to print the bill details
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>KLN Hotels</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              h1, h2 {
                text-align: center;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                padding: 8px;
                text-align: left;
              }
              th.label {
                font-weight: bold;
              }
              .dotted-line {
                border-bottom: 1px dotted #000;
              }
            </style>
          </head>
          <body>
            <h1>KLN Hotels</h1>
            <p>Order ID: ${orderId}</p>
            <p>Order Date: ${orderDate}</p>
            <h2>Ordered Items</h2>
            <table>
              <thead>
                <tr>
                  <th class="label">SNo</th>
                  <th class="label">Item Name</th>
                  <th class="label">Quantity</th>
                  <th class="label">State GST</th>
                  <th class="label">Central GST</th>
                  <th class="label">Price</th>
                  <th class="label">Price With GST </th>
                  <th class="label">Total Price</th>
                </tr>
              </thead>
              <tbody>
                ${orderedItems.map((item, index) => `
                  <tr>
                    <td class="dotted-line">${index + 1}</td>
                    <td class="dotted-line">${item.itemName}</td>
                    <td class="dotted-line">${item.quantity}</td>
                    <td class="dotted-line">${item.stateGST}</td>
                    <td class="dotted-line">${item.centralGST}</td>
                    <td class="dotted-line">${item.price}</td>
                    <td class="dotted-line">${item.priceWithGST}</td>
                    <td className="dotted-line">${item.quantity * item.priceWithGST}</td> 
                  </tr>
                `).join('')}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="label">Total Bill Amount:</td>
                  <td class="label">${totalBillAmount}</td>
                </tr>
              </tbody>
            </table>
          </body>
          </html>
        `);

        // Close the document stream
        printWindow.document.close();

        // Print the bill details
        printWindow.print();
      } else {
        console.error('Failed to open print window');
      }
    } catch (error) {
      console.error('Error adding bill to the database:', error);
    }
  };

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div>
      <h4>KLN Hotels</h4>
      <div style={{ textAlign: 'center', textAlignLast: 'center' }}>
        <p>Order ID: {orderId}</p>
        <p>Order Date: {orderDate}</p>
      </div>

      <table style={{ margin: 'auto' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>SNo</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>State GST</th>
            <th>Central GST</th>
            <th>price</th>
            <th>Price With GST</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderedItems.map((item, index) => (
            <tr key={index}>
              <td className="dotted-line">{index + 1}</td>
              <td className="dotted-line">{item.itemName}</td>
              <td className="dotted-line">{item.quantity}</td>
              <td className="dotted-line">{item.stateGST}</td>
              <td className="dotted-line">{item.centralGST}</td>
              <td className="dotted-line">{item.price}</td>
              <td className="dotted-line">{item.priceWithGST}</td>
              <td className="dotted-line">{item.quantity * item.priceWithGST}</td> {/* Calculate total price */}
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="label" style={{ textAlign: 'center', fontWeight: 'bold' }}>Total Bill Amount:</td>
            <td className="label">{totalBillAmount}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center' }}>
        <button onClick={handlePrint} style={{ backgroundColor: 'blue', color: 'white' }}>Print</button>
        <button onClick={handleClose} style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}>Close</button>
      </div>
    </div>
  );
};

export default Bill;
