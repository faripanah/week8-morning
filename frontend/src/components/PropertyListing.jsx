import { Link } from "react-router-dom";

const PropertyListing = ({ property }) => {
  return (
    <div className="property-preview">
      <h2>{property.title}</h2>
      <p>Type: {property.type}</p>
      <p>Description: {property.description}</p>
      <p>Price: {property.price}</p>
      <p>Location: {property.location.address}</p>
      <p>YearBuilt: {property.yearBuilt}</p>
      <Link to={`/properties/${property._id}`}  className="btn">View Property</Link> 
      <Link to={`/edit-property/${property._id}`} className="btn">Edit Property</Link>
    </div>
  );
};

export default PropertyListing;