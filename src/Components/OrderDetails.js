// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getOrderById } from '../Services/OrdersServices';

// const OrderDetails = () => {
//   const { orderId } = useParams();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await getOrderById(orderId);
//         setOrderDetails(response.data);
//       } catch (error) {
//         setError('Error fetching order details');
//         console.error('Error fetching order details:', error);
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!orderDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Order Details</h2>
//       <p>Order ID: {orderId}</p>
//       <p>Customer Name: {orderDetails.customerName}</p>
//       <p>Mobile Number: {orderDetails.mobileNumber}</p>
//       <table>
//         <thead>
//           <tr>
//             <th>Item ID</th>
//             <th>Item Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total Price</th>
//             <th>State GST</th>
//             <th>Central GST</th>
//             <th>Total GST</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orderDetails.orderedItems.map(item => (
//             <tr key={item.itemId}>
//               <td>{item.itemId}</td>
//               <td>{item.itemName}</td>
//               <td>{item.price}</td>
//               <td>{item.quantity}</td>
//               <td>{item.price * item.quantity}</td>
//               <td>{item.stateGST}</td>
//               <td>{item.centralGST}</td>
//               <td>{item.totalGST}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <p>Total Bill Amount: {orderDetails.totalBillAmount}</p>
//     </div>
//   );
// };

// export default OrderDetails;

