
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../Services/OrdersServices';
import { getAllBills } from '../Services/BillServices';

const BillDetails = () => {
  const [billDetails, setBillDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const ordersResponse = await getAllOrders();
        const ordersData = ordersResponse.data;

        const billsResponse = await getAllBills();
        const billsData = billsResponse.data;

        // Map bill details with corresponding order details
        const mappedBillDetails = billsData.map(bill => {
          const correspondingOrder = ordersData.find(order => order.orderId === bill.orderId);
          return {
            billId: bill.billId,
            orderId: bill.orderId,
            customerName: correspondingOrder.customerName,
            mobileNumber: correspondingOrder.mobileNumber
          };
        });

        setBillDetails(mappedBillDetails);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchAllData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (billDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5>All Bill Details</h5>
      <table className="table">
        <thead>
          <tr>
            <th>SNo</th>
            <th>Bill ID</th>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {billDetails.map((bill, index) => (
            <tr key={bill.billId}>
              <td>{index + 1}</td>
              <td><Link to={`/hotel/${bill.billId}`}>Bill ID: {bill.billId}</Link></td>
              <td>{bill.orderId}</td>
              <td>{bill.customerName}</td>
              <td>{bill.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillDetails;





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllBills } from '../Services/BillServices';

// const BillDetails = () => {
//   const [bills, setBills] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllBills = async () => {
//       try {
//         const response = await getAllBills();
//         setBills(response.data);
//       } catch (error) {
//         setError('Error fetching bill details');
//         console.error('Error fetching bill details:', error);
//       }
//     };

//     fetchAllBills();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (bills.length === 0) {
//     return <div>No bills available.</div>;
//   }

//   return (
//     <div>
//       <h5>All Bill Details</h5>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>SNo</th>
//             <th>Bill ID</th>
//             <th>Customer Mobile</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bills.map((bill, index) => (
//             <tr key={bill.billId}>
//               <td>{index + 1}</td>
//               <td><Link to={`/hotel/${bill.billId}`}>Bill ID: {bill.billId}</Link></td>
//               <td>{bill.customer.mobile}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BillDetails;
