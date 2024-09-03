import React from 'react';
import KLN1 from '../Images/KLN1.jpeg'; // Ensure the path is correct

const Home = () => {
  return (
    <div>
      <h4>Welcome to KLN Hotels</h4>
      <img src={KLN1} alt="KLN Hotel" /> {/* Use the imported image */}
    </div>
  );
}

export default Home;




