import React, { useState } from 'react';
import './Tiffin.css';

import Dosa from '../TiffinImgs/Dosa.jpg';
import Idli1 from '../TiffinImgs/Idli1.jpg';
import NormalIdli from '../TiffinImgs/NormalIdli.jpg';
import Uttapam from '../TiffinImgs/Uttapam.jpg';

function Tiffin() {
  const [orderItems, setOrderItems] = useState({});

  const handleAddToOrder = (itemId) => {
    setOrderItems(prevOrderItems => {
      const currentQuantity = prevOrderItems[itemId] ? prevOrderItems[itemId].quantity : 0;
      return {
        ...prevOrderItems,
        [itemId]: { quantity: currentQuantity + 1 }
      };
    });
  };

  const handleRemoveFromOrder = (itemId) => {
    setOrderItems(prevOrderItems => {
      const currentQuantity = prevOrderItems[itemId] ? prevOrderItems[itemId].quantity : 0;
      if (currentQuantity <= 1) {
        const { [itemId]: removedItem, ...rest } = prevOrderItems;
        return rest;
      }
      return {
        ...prevOrderItems,
        [itemId]: { quantity: currentQuantity - 1 }
      };
    });
  };

  return (
    <div className="Tiffin-container">
      {[
        { id: 'Dosa', src: Dosa, alt: 'Dosa', text: 'Dosa' },
        { id: 'Idli1', src: Idli1, alt: 'Idli1', text: 'Idli' },
        { id: 'NormalIdli', src: NormalIdli, alt: 'NormalIdli', text: 'Normal Idli' },
        { id: 'Uttapam', src: Uttapam, alt: 'Uttapam', text: 'Uttapam' }
      ].map(foodItem => (
        <div className="card" key={foodItem.id}>
          <img src={foodItem.src} alt={foodItem.alt} className="circle" />
          <div className="text">{foodItem.text}</div>
          {orderItems[foodItem.id] && orderItems[foodItem.id].quantity > 0 ? (
            <div className="btn-group">
              <button className="btn btn-sm btn-success" onClick={() => handleRemoveFromOrder(foodItem.id)}>-</button>
              <span className="btn btn-sm btn-light">{orderItems[foodItem.id].quantity}</span>
              <button className="btn btn-sm btn-success" onClick={() => handleAddToOrder(foodItem.id)}>+</button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => handleAddToOrder(foodItem.id)} style={{ marginRight: '10px' }}>Add Card</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tiffin;
