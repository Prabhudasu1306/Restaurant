import { addItem } from "../Services/FoodItemServices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Item = () => {
  const [data, setData] = useState({
    itemId: "",
    itemName: "",
    price: "",
    centralGST: "",
    stateGST: "",
    description: "",
    priceWithGST: "",
    totalGST: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newData = { ...data, [name]: value };

    if (name === "price" || name === "stateGST" || name === "centralGST") {
      const priceWithGST =
        parseFloat(newData.price || 0) +
        parseFloat(newData.stateGST || 0) +
        parseFloat(newData.centralGST || 0);
      newData = { ...newData, priceWithGST: priceWithGST.toFixed(2) };
    }

    if (name === "stateGST" || name === "centralGST") {
      const totalGST = parseFloat(newData.stateGST || 0) + parseFloat(newData.centralGST || 0);
      newData = { ...newData, totalGST: totalGST.toFixed(2) };
    }

    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { ...data };
    const validationErrors = {};

    for (const key in itemData) {
      if (!itemData[key]){
        validationErrors[key] = `${key} is required`;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await addItem(itemData);
      console.log(response);
      console.log("itemData", itemData);
      navigate('/order');

      setData({
        itemId: "",
        itemName: "",
        price: "",
        centralGST: "",
        stateGST: "",
        description: "",
        priceWithGST: "",
        totalGST: ""
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleClear = () => {
    setData({
      itemId: "",
      itemName: "",
      price: "",
      centralGST: "",
      stateGST: "",
      description: "",
      priceWithGST: "",
      totalGST: ""
    });
    setErrors({});
  };

  return (
    <div className="text-center" style={{ marginBottom: "20px" }}>
      <h3>Add Items</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              Item ID:
            </label>
            <input type="text" name="itemId" value={data.itemId} onChange={handleChange} />
            {errors.itemId && <span style={{ color: 'red' }}>{errors.itemId}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              Item Name:
            </label>
            <input type="text" name="itemName" value={data.itemName} onChange={handleChange} />
            {errors.itemName && <span style={{ color: 'red' }}>{errors.itemName}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              Price:
            </label>
            <input type="text" name="price" value={data.price} onChange={handleChange} />
            {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              State GST:
            </label>
            <input type="text" name="stateGST" value={data.stateGST} onChange={handleChange} />
            {errors.stateGST && <span style={{ color: 'red' }}>{errors.stateGST}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              Central GST:
            </label>
            <input type="text" name="centralGST" value={data.centralGST} onChange={handleChange} />
            {errors.centralGST && <span style={{ color: 'red' }}>{errors.centralGST}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              Description:
            </label>
            <input type="text" name="description" value={data.description} onChange={handleChange} />
            {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
          </div>
           <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              Price With GST
            </label>
            <input type="text" name="priceWithGST" value={data.priceWithGST} onChange={handleChange} />
            {errors.priceWithGST && <span style={{ color: 'red' }}>{errors.priceWithGST}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "inline-block", width: "100px", fontWeight: "bold", textAlign: "left" }}>
              Total GST:
            </label>
            <input type="text" name="totalGST" value={data.totalGST} onChange={handleChange} />
            {errors.totalGST && <span style={{ color: 'red' }}>{errors.totalGST}</span>}
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit" style={{ backgroundColor: "green",marginRight:"15px" }}>
            Add
          </button>
          <button type="button" onClick={handleClear} style={{ backgroundColor: "red" }}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Item;
