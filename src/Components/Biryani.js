import React, { useState } from 'react';
import './Biryani.css';

import ChickenDum from '../BiryaniImg/ChickenDum.jpg';
import ChickenLegBiryani from '../BiryaniImg/ChickenLegBriyani.jpg';
import KLN_HotelsSpecial from '../BiryaniImg/KLN_HotelsSpecial.jpg';
import MuttonBiryani from '../BiryaniImg/MuttonBiryani.jpg';

function Biryani() {
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
    <div className="biryani-container">
      {[
        { id: 'ChickenDum', src: ChickenDum, alt: 'Chicken Dum Biryani', text: 'Chicken Dum Biryani' },
        { id: 'ChickenLegBiryani', src: ChickenLegBiryani, alt: 'Chicken Leg Biryani', text: 'Chicken Leg Biryani' },
        { id: 'MuttonBiryani', src: MuttonBiryani, alt: 'Mutton Biryani', text: 'Mutton Biryani' },
        { id: 'KLN_HotelsSpecial', src: KLN_HotelsSpecial, alt: 'KLN Hotels Special Biryani', text: 'KLN Hotels Special Biryani' }
      ].map(foodItem => (
        <div className="card" key={foodItem.id}>
          <img src={foodItem.src} alt={foodItem.alt} className="circle" />
          <div className="text">{foodItem.text}</div>
          {orderItems[foodItem.id] && orderItems[foodItem.id].quantity > 0 ? (
            <div className="quantity-controls">
              <button className="quantity-button" onClick={() => handleRemoveFromOrder(foodItem.id)}>-</button>
              <span className="quantity">{orderItems[foodItem.id].quantity}</span>
              <button className="quantity-button" onClick={() => handleAddToOrder(foodItem.id)}>+</button>
            </div>
          ) : (
            <button className="button" onClick={() => handleAddToOrder(foodItem.id)}>Add to Order</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Biryani;
