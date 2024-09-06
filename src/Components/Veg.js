import React, { useState } from 'react';
import './Veg.css';

import Mixed_Dal from '../VegItemsImgs/Mixed_Dal.jpg';
import Mushroom from '../VegItemsImgs/Mushroom.jpg';
import Panner_Roti from '../VegItemsImgs/Panner_Roti.jpg';
import Rajma_chawal from '../VegItemsImgs/Rajma_chawal.jpg';

function Veg() {
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
    <div className="Veg-container">
      {[
        { id: 'Mixed_Dal', src: Mixed_Dal, alt: 'Mixed Dal', text: 'Mixed Dal' },
        { id: 'Mushroom', src: Mushroom, alt: 'Mushroom', text: 'Mushroom' },
        { id: 'Panner_Roti', src: Panner_Roti, alt: 'Panner Roti', text: 'Panner Roti' },
        { id: 'Rajma_chawal', src: Rajma_chawal, alt: 'Rajma Chawal', text: 'Rajma Chawal' }
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
            <button className="btn btn-primary" onClick={() => handleAddToOrder(foodItem.id)} style={{ marginRight: '10px' }}>Add</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Veg;
