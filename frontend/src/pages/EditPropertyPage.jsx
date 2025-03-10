import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditPropertyPage = () => {
  const [property, setProperty] = useState(null); // Initialize job state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { id } = useParams();

  // Declare state variables for form fields
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

  const updateProperty = async (property) => {
    try {
      const res = await fetch(`/api/properties/${property.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(property),
      });
      if (!res.ok) throw new Error("Failed to update property");
      return res.ok;
    } catch (error) {
      console.error("Error updating property:", error);
      return false;
    }
  };

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setProperty(data); // Set the property data

        // Initialize form fields with fetched property data
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setPrice(data.price);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setZipCode(data.zipCode);
        setSquareFeet(data.squareFeet);
        setYearBuilt(data.yearBuilt);
        
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchProperty();
  }, [id]);

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    const updatedProperty= {
      id,
      title,
      type,
      description,
      price,
      address,
      city,
      state,
      zipCode,
      squareFeet,
      yearBuilt,
    };

    const success = await updateProperty(updatedProperty);
    if (success) {
        toast.success("Job Updated Successfully");
        navigate(`/properties/${id}`);
      
    } else {
        toast.error("Failed to update the job");
    }
  };

  return (
    <div className="create">
      <h2>Update Property</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
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



        

        <button>Update Property</button>
      </form>
      )}
    </div>
  );
};

export default EditPropertyPage;