import PropertyListing from "./PropertyListing";

const PropertyListings = ({properties}) => {
  
  return (
    <div className="job-list">
      {properties.map(p => (
        <PropertyListing key={property._id} p={property} />
      ))}
    </div>
  );
};

export default PropertyListings;