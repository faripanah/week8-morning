import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPropertyPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Apartment");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
 
 

  const navigate = useNavigate();
  const addProperty = async (newProperty) => {
    try {
      const res = await fetch("/property/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(newProperty),
      });
      if (!res.ok) {
        throw new Error("Failed to add property");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newProperty = {
      title,
      type,
      description,
      price,
      location: {
        address,
        city,
        state,
        zipCode,
      },
      squareFeet,
      yearBuilt,
     
     
    };

    addProperty(newProperty);
    return navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={submitForm}>
        <label>Property title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Property type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
         
        </select>

        <label>Property Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Property Price:</label>
        <input
          type="text"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Address:</label>
        <input
          type="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>City:</label>
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
         <label>State:</label>
        <input
          type="text"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>Zipcode:</label>
        <input
          type="text"
          required
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />

        <label>SquareFeet:</label>
        <input
          type="text"
          required
          value={squareFeet}
          onChange={(e) => setSquareFeet(e.target.value)}
        />

        <label>Year Of Built:</label>
        <input
          type="number"
          required
          value={yearBuilt}
          onChange={(e) => setYearBuilt(e.target.value)}
        />



        

        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
