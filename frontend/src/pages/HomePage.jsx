import { useEffect, useState } from "react";
import PropertyListings from "../components/PropertyListings";

const Home = () => {
  const [properties, setProperties] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json();
       
        console.log(isPending);
        setIsPending(false);
        setProperties(data);
        setError(null);
      } catch (err) {
        console.log("errrro");
        setIsPending(false);
        setError(err.message);
      }
    };
    // setTimeout(() => {fetchJobs();}, 1000); // Delay of 1 second
    fetchProperties();
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {properties && <PropertyListings properties={properties} />}
    </div>
  );
};

export default Home;